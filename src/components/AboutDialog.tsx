import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AboutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for the 'open-about-dialog' event emitted from our Rust native menu
    const unlisten = listen("open-about-dialog", () => {
      setIsOpen(true);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About QLIMS</DialogTitle>
          <DialogDescription>
            Enterprise-grade cross-platform application.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="h-24 w-24 rounded-xl bg-primary/10 flex items-center justify-center">
            {/* You can replace this with your actual logo img later */}
            <span className="text-4xl font-bold text-primary">Q</span>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">QLIMS Version 0.1.0</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Copyright © 2026 vishn. All rights reserved.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
