import type { LucideIcon } from "lucide-react";

// ─── Dashboard feature types ─────────────────────────────────────────────────

/** A single stat card's data shape */
export interface DashboardStat {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendLabel: string;
  trendUp: boolean;
  color: string;
  bg: string;
}

/** An actionable alert item */
export interface AlertItem {
  id: number;
  sampleId: number;
  title: string;
  description: string;
  value: string;
  limit: string;
  timeAgo: string;
}
