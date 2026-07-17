import { StatsGrid } from "../components/StatsGrid";
import { SamplesPanel } from "../components/SamplesPanel";
import { AlertsPanel } from "../components/AlertsPanel";

/**
 * Dashboard page — assembles the stats grid, samples panel, and alerts panel.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* High-density Statistical Overview */}
      <StatsGrid />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Main Data Grid Area */}
        <SamplesPanel />

        {/* Actionable Alerts Panel */}
        <AlertsPanel />
      </div>
    </div>
  );
}
