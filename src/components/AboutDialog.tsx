import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppInfo } from "@/hooks/useAppInfo";

export function AboutDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, copyright } = useAppInfo();

  useEffect(() => {
    const unlisten = listen("open-about-dialog", () => {
      setIsOpen(true);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>About QLIMS</DialogTitle>
          <DialogDescription>Enterprise-grade cross-platform application.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="h-24 w-24 rounded-xl bg-primary/10 flex items-center justify-center">
            {/* You can replace this with your actual logo img later */}
            <span className="text-4xl font-bold text-primary">Q</span>
          </div>
          {isLoading ? (
            <div className="text-center space-y-2 animate-pulse">
              <div className="h-5 w-40 bg-muted rounded mx-auto" />
              <div className="h-4 w-56 bg-muted rounded mx-auto" />
            </div>
          ) : (
            <div className="text-center">
              <h3 className="font-semibold text-lg">QLIMS Version {data?.version}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {copyright}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
