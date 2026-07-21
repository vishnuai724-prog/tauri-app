import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";
import { AlertTriangle } from "lucide-react";
import { MOCK_ALERTS } from "../../constants/dashboard.constants";

export function AlertsPanel() {
  return (
    <Card className="lg:col-span-3 shadow-sm border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <CardHeader className="p-5 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Action Required
          </CardTitle>
          <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400">
            {MOCK_ALERTS.length} ALERTS
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-3">
          {MOCK_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-200 cursor-pointer"
            >
              <div className="mt-0.5 p-1.5 rounded-md bg-red-50 dark:bg-red-500/10 h-fit">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {alert.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {alert.description}{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {alert.value}
                  </span>{" "}
                  exceeds upper specification limit ({alert.limit}). Immediate supervisor review
                  requested.
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
                  {alert.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
