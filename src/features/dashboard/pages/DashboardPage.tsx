import { ChartAreaInteractive } from "../components/chart-area-interactive";
import { DataTable } from "../components/data-table";
import { SectionCards } from "../components/selection-cards";

import data from "../data/data.json";
import focusDocumentsData from "../data/format-documents-data.json";
import keyPersonnelData from "../data/key-personal-data.json";
import pastPerformanceData from "../data/past-performance-data.json";

export function DashboardPage() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
      
      <div className="@container/main mt-6 px-4 lg:px-6 pb-6">
        <DataTable
          data={data as any}
          pastPerformanceData={pastPerformanceData as any}
          keyPersonnelData={keyPersonnelData as any}
          focusDocumentsData={focusDocumentsData as any}
        />
      </div>
    </>
  );
}
