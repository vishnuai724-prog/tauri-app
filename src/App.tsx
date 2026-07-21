import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/shared/components/ui/Sonner";
import { useInitWindow } from "@/shared/hooks/useInitWindow";
import AppRoutes from "@/app/routes/AppRoutes";

// ─── Route loading fallback ───────────────────────────────────────────────────
function RouteFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function App() {
  useInitWindow();
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <AppRoutes />
      </Suspense>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
