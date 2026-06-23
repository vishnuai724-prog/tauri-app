import { useState, useEffect, useCallback } from "react";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { listen } from "@tauri-apps/api/event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Status = "checking" | "idle" | "available" | "downloading" | "installing" | "error";

export default function Updater() {
  const [status, setStatus] = useState<Status>("idle");
  const [update, setUpdate] = useState<Update | null>(null);
  const [downloaded, setDownloaded] = useState(0);
  const [contentLength, setContentLength] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdates = useCallback(async (silent = false) => {
    setStatus("checking");
    setError(null);
    try {
      const result = await check();
      if (result) {
        setUpdate(result);
        setStatus("available");
      } else {
        setStatus("idle");
        if (!silent) {
          toast.info("You are up to date!");
        }
      }
    } catch (err) {
      console.error("Update check failed:", err);
      setError(String(err));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // Check silently on startup (deferred to avoid synchronous setState in effect)
    const timer = setTimeout(() => checkForUpdates(true), 0);

    // Listen for manual menu clicks
    const unlisten = listen("check-for-updates", () => {
      checkForUpdates(false);
    });

    return () => {
      clearTimeout(timer);
      unlisten.then((f) => f());
    };
  }, [checkForUpdates]);

  async function handleUpdate() {
    if (!update) {
      return;
    }
    setError(null);
    setDownloaded(0);
    setContentLength(null);

    try {
      setStatus("downloading");
      await update.download((event) => {
        switch (event.event) {
          case "Started":
            setContentLength(event.data.contentLength ?? null);
            break;
          case "Progress":
            setDownloaded((prev) => prev + event.data.chunkLength);
            break;
          case "Finished":
            break;
        }
      });
    } catch (err) {
      const msg = String(err);
      console.error("Download failed:", err);
      setError(`Download failed: ${msg}`);
      setStatus("error");
      toast.error("Download failed", { description: msg });
      return;
    }

    try {
      setStatus("installing");
      await update.install();
    } catch (err) {
      const msg = String(err);
      console.error("Install failed:", err);
      setError(`Installation failed: ${msg}`);
      setStatus("error");
      toast.error("Installation failed", { description: msg });
      return;
    }

    try {
      await relaunch();
    } catch (err) {
      const msg = String(err);
      console.error("Relaunch failed:", err);
      setError(`Update installed but relaunch failed: ${msg}. Please restart manually.`);
      setStatus("error");
      toast.error("Please restart manually", {
        description: "The update was installed but the app could not restart automatically.",
      });
    }
  }

  const progressPercent =
    contentLength && contentLength > 0 ? Math.round((downloaded / contentLength) * 100) : null;

  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

  const isOpen = status !== "idle" && status !== "checking";
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && status !== "downloading" && status !== "installing") {
          setStatus("idle");
        }
      }}
    >
      <DialogContent className="sm:max-w-106.25">
        {status === "error" && !update ? (
          <>
            <DialogHeader>
              <DialogTitle>Update Failed</DialogTitle>
              <DialogDescription className="text-destructive mt-2">{error}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Dismiss
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Update Available 🎉</DialogTitle>
              <DialogDescription>
                Version <strong className="text-foreground">{update?.version}</strong> is ready. You
                are on <strong className="text-foreground">{update?.currentVersion}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {update?.body && (
                <div className="text-sm">
                  <p className="font-semibold mb-2">Release Notes:</p>
                  <pre className="p-3 bg-muted rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground border border-border max-h-40">
                    {update.body}
                  </pre>
                </div>
              )}

              {status === "error" && (
                <p className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20">
                  {error}
                </p>
              )}

              {status === "downloading" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>
                      Downloading {progressPercent !== null ? `— ${progressPercent}%` : "..."}
                    </span>
                    {contentLength !== null && (
                      <span className="text-muted-foreground">
                        {toMB(downloaded)} / {toMB(contentLength)} MB
                      </span>
                    )}
                  </div>
                  <progress
                    className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary transition-all duration-300"
                    value={contentLength ? downloaded : undefined}
                    max={contentLength ?? undefined}
                  />
                </div>
              )}

              {status === "installing" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Installing update...</p>
                  <progress className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary animate-pulse" />
                </div>
              )}
            </div>

            {(status === "available" || status === "error") && (
              <DialogFooter>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Later
                </Button>
                <Button onClick={handleUpdate}>
                  {status === "error" ? "Retry" : "Update Now"}
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
