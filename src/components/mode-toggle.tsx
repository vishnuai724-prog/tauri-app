import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const CYCLE_ORDER = ["light", "dark", "system"] as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = () => {
    const currentIndex = CYCLE_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % CYCLE_ORDER.length;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setTheme(CYCLE_ORDER[nextIndex]!);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={nextTheme}
      className="rounded-full relative border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-900"
      title={`Theme: ${theme}`}
    >
      {theme === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] text-slate-600 dark:text-slate-300 transition-all" />
      )}
      {theme === "dark" && (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-600 dark:text-slate-300 transition-all" />
      )}
      {theme === "system" && (
        <Monitor className="h-[1.2rem] w-[1.2rem] text-slate-600 dark:text-slate-300 transition-all" />
      )}
      <span className="sr-only">Toggle theme ({theme})</span>
    </Button>
  );
}
