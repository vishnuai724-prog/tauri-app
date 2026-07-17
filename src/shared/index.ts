// ─── Shared module public API ─────────────────────────────────────────────────

// UI Components
export { Button, buttonVariants } from "./components/ui/Button";
export { Input } from "./components/ui/Input";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./components/ui/Card";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/Dialog";
export { Label } from "./components/ui/Label";
export { Toaster } from "./components/ui/Sonner";

// Shared Components
export { ErrorBoundary } from "./components/ErrorBoundary";
export { ModeToggle } from "./components/ModeToggle";

// Providers
export { ThemeProvider, useTheme } from "./providers/ThemeProvider";

// Hooks
export { useInitWindow } from "./hooks/useInitWindow";

// Utils
export { cn } from "./utils/cn";

// API
export { api, ApiError, fetchGreetings, createGreeting } from "./api";

// Types
export type { ID, Nullable, AsyncStatus, PaginatedResponse } from "./types/common.types";
