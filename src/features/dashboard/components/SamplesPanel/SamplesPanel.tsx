import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";
import { TestTube2 } from "lucide-react";

export function SamplesPanel() {
  return (
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
  );
}
