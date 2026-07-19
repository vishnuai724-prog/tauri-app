import { Link, useLocation } from "react-router-dom";
import { FlaskConical, LogOut, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useAuthStore } from "@/features/auth";
import { NAV_ITEMS } from "../../constants/shell.constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Premium Glassmorphic Design */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              QLIMS
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-slate-500" />
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 font-medium shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className="text-sm">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 m-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate uppercase tracking-wider font-medium">
                {user?.role.replace("_", " ")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="xs"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs"
            onClick={logout}
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            End Session
          </Button>
        </div>
      </aside>
    </>
  );
}
