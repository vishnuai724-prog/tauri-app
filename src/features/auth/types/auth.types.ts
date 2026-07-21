export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  loginApi: (credentials: LoginCredentials) => Promise<void>;
  loginMock: (user: AuthUser, token: string, refreshToken?: string) => void;
  logout: () => void;
  clearError: () => void;
  setTokens: (token: string, refreshToken: string) => void;
}
