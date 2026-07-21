import { useLocation } from "react-router-dom";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/shared/components/ui/Input";
import { ModeToggle } from "@/shared/components/ModeToggle";
import { NAV_ITEMS } from "../../constants/shell.constants";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();

  return (
    <header className="h-16 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Button>
        <h1 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight line-clamp-1">
          {NAV_ITEMS.find((n) => n.path === location.pathname)?.name || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
          <Input
            placeholder="Search sample IDs, users..."
            className="pl-9 bg-slate-100/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 focus-visible:ring-cyan-500"
          />
        </div>
        <ModeToggle />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full relative border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-950" />
        </Button>
      </div>
    </header>
  );
}
