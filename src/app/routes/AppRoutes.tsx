import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ShellPage = lazy(() => import("@/features/shell/pages/ShellPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Routes */}
      <Route element={<ShellPage />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/samples" element={<div className="p-4">Samples Page Placeholder</div>} />
        <Route path="/users" element={<div className="p-4">Users Page Placeholder</div>} />
        <Route path="/settings" element={<div className="p-4">Settings Page Placeholder</div>} />
      </Route>

      {/* Catch-all redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
