import { Outlet } from "react-router-dom";
import AppSidebar from "../layout/app-sidebar";
import { DashboardHeader } from "../layout/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { SidebarConfigProvider } from "@/shared/contexts/sidebar-context";

/**
 * ShellLayout assembles the shadcn-admin sidebar, top bar, and scrollable content area.
 * All page content is rendered via <Outlet />.
 */
export function ShellLayout() {
  return (
    <SidebarConfigProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarConfigProvider>
  );
}
