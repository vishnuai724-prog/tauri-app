import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  TestTube2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* High-density Statistical Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Data Grid Area */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Recent Samples
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex flex-col items-center justify-center h-75 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <TestTube2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Data Grid Initialization Pending
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                TanStack Table integration will render here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Alerts Panel */}
        <Card className="lg:col-span-3 shadow-sm border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Action Required
              </CardTitle>
              <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400">
                3 ALERTS
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-red-50 dark:bg-red-500/10 h-fit">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      OOS Result • Sample #{1000 + i}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      pH value{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">8.4</span>{" "}
                      exceeds upper specification limit (8.0). Immediate supervisor review
                      requested.
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
                      12 mins ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
