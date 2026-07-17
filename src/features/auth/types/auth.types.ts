// ─── Auth feature types ───────────────────────────────────────────────────────

/** Supported user roles within the application */
export type UserRole = "admin" | "lab_tech";

/** Authenticated user entity */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** Global authentication state shape */
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

/** Login form field values */
export interface LoginFormValues {
  email: string;
  password: string;
}
