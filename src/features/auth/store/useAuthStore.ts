import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, AuthUser, LoginCredentials } from "../types/auth.types";
import { AuthService } from "../api/auth.service";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      status: 'idle',
      error: null,
      
      loginApi: async (credentials: LoginCredentials) => {
        set({ status: 'loading', error: null });
        try {
          const { user, token, refreshToken } = await AuthService.login(credentials);
          set({ isAuthenticated: true, user, token, refreshToken, status: 'success' });
        } catch (error: any) {
          const message = error.response?.data?.message || 'Authentication failed. Please check your credentials.';
          set({ status: 'error', error: message, isAuthenticated: false, user: null, token: null, refreshToken: null });
          throw new Error(message);
        }
      },
      
      loginMock: (user: AuthUser, token: string, refreshToken?: string) => 
        set({ isAuthenticated: true, user, token, refreshToken: refreshToken || null, status: 'success', error: null }),
      
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null, refreshToken: null, status: 'idle', error: null });
      },
      
      clearError: () => set({ error: null }),
      
      setTokens: (token: string, refreshToken: string) => set({ token, refreshToken }),
    }),
    {
      name: "qlims-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
