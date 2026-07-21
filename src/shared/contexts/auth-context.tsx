import { useAuthStore } from "@/features/auth";
import type { User } from "@/shared/lib/types";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useAuth() {
  const store = useAuthStore();
  
  return {
    user: store.user ? {
      id: store.user.id,
      name: store.user.name || "Unknown",
      email: store.user.email,
      avatar: store.user.avatarUrl || "",
      role: store.user.role,
    } as User : null,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.status === 'loading',
    logout: async () => store.logout(),
  };
}
