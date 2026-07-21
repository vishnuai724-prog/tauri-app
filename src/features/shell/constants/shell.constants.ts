import { LayoutDashboard, TestTube2, Users, Settings } from "lucide-react";
import type { NavItem } from "../types/shell.types";

// ─── Shell feature constants ──────────────────────────────────────────────────

/** Main navigation items displayed in the sidebar */
export const NAV_ITEMS: readonly NavItem[] = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Samples", path: "/samples", icon: TestTube2 },
  { name: "Users", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
] as const;
