import { TestTube2, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { DashboardStat, AlertItem } from "../types/dashboard.types";

// ─── Dashboard feature constants ──────────────────────────────────────────────

/** Mock statistics displayed on the dashboard */
export const DASHBOARD_STATS: DashboardStat[] = [
  {
    title: "Total Samples",
    value: "1,284",
    icon: TestTube2,
    trend: "+12.5%",
    trendLabel: "vs last month",
    trendUp: true,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Pending Tests",
    value: "42",
    icon: Activity,
    trend: "-4",
    trendLabel: "vs yesterday",
    trendUp: true,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Out of Spec",
    value: "3",
    icon: AlertTriangle,
    trend: "+2",
    trendLabel: "requires review",
    trendUp: false,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Completed Today",
    value: "156",
    icon: CheckCircle2,
    trend: "+24.1%",
    trendLabel: "vs yesterday",
    trendUp: true,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

/** Mock alert items for the actionable alerts panel */
export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 1,
    sampleId: 1001,
    title: "OOS Result • Sample #1001",
    description: "pH value",
    value: "8.4",
    limit: "8.0",
    timeAgo: "12 mins ago",
  },
  {
    id: 2,
    sampleId: 1002,
    title: "OOS Result • Sample #1002",
    description: "pH value",
    value: "8.4",
    limit: "8.0",
    timeAgo: "12 mins ago",
  },
  {
    id: 3,
    sampleId: 1003,
    title: "OOS Result • Sample #1003",
    description: "pH value",
    value: "8.4",
    limit: "8.0",
    timeAgo: "12 mins ago",
  },
];
