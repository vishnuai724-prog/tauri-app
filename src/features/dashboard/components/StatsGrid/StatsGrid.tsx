import { Card, CardContent } from "@/shared/components/ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DASHBOARD_STATS } from "../../constants/dashboard.constants";

export function StatsGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
        return (
          <Card
            key={stat.title}
            className="group relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl"
          >
            {/* Subtle top border gradient highlight */}
            <div
              className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.trendUp ? "from-emerald-400 to-cyan-400" : "from-red-400 to-amber-400"}`}
            />

            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </h2>
              </div>

              <div className="mt-3 flex items-center text-xs">
                <span
                  className={`flex items-center font-medium ${stat.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {stat.trend}
                </span>
                <span className="text-slate-400 dark:text-slate-500 ml-2">{stat.trendLabel}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
