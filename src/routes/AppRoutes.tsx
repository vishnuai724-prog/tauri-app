import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const Login = lazy(() => import("@/pages/Login"));
const DashboardLayout = lazy(() => import("@/pages/DashboardLayout"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/samples" element={<div className="p-4">Samples Page Placeholder</div>} />
        <Route path="/users" element={<div className="p-4">Users Page Placeholder</div>} />
        <Route path="/settings" element={<div className="p-4">Settings Page Placeholder</div>} />
      </Route>

      {/* Catch-all redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
