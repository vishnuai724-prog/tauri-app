import type { LucideIcon } from "lucide-react";

// ─── Shell feature types ──────────────────────────────────────────────────────

/** A navigation item in the sidebar */
export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}
