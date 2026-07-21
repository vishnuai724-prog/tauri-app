import { apiClient } from '@/shared/api/apiClient';
import type { LoginCredentials, AuthUser } from '../types/auth.types';

// Spring Boot typically returns a token and user details on login.
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

export const AuthService = {
  /**
   * Authenticate a user with email and password.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  /**
   * Fetch the current authenticated user's profile.
   * Useful for verifying token validity on app load.
   */
  async getMe(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>('/auth/me');
    return response.data;
  },
  
  /**
   * Logout the user from the backend (if required by Spring Boot for token invalidation)
   */
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }
};
