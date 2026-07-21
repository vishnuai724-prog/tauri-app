import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ShellLayout } from "../components/ShellLayout";

/**
 * Shell page — the authenticated layout wrapper.
 * Redirects to /login if not authenticated.
 */
export default function ShellPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <ShellLayout />;
}
