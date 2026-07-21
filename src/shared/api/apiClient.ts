import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

// ─── Environment Constants ───────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// ─── Axios Instance ──────────────────────────────────────────────────────────
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, 
});

// ─── Refresh Token State ─────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ─── Request Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    // Handle 401 Unauthorized for token refresh
    if (status === 401 && originalRequest && !originalRequest._retry) {
      const authState = useAuthStore.getState();
      const refreshToken = authState.refreshToken;

      // If there is no refresh token, or the failed request was the refresh request itself, just logout
      if (!refreshToken || originalRequest.url?.includes('/auth/refresh')) {
        authState.logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If currently refreshing, queue the request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Make a raw axios call to avoid interceptor infinite loops
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        // Assuming backend returns { token, refreshToken }
        const newAccessToken = data.token;
        const newRefreshToken = data.refreshToken;

        // Update Zustand store
        authState.setTokens(newAccessToken, newRefreshToken);
        
        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        authState.logout(); // Refresh token failed/expired
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
