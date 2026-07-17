import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { TopBar } from "../TopBar";
import { useSidebar } from "../../hooks/useSidebar";

/**
 * ShellLayout assembles the sidebar, top bar, and scrollable content area.
 * All page content is rendered via <Outlet />.
 */
export function ShellLayout() {
  const { isOpen, open, close } = useSidebar();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      <Sidebar isOpen={isOpen} onClose={close} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <TopBar onMenuClick={open} />

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 relative z-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
