import { useState, useEffect, useCallback } from "react";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { listen } from "@tauri-apps/api/event";
import { toast } from "sonner";

export type UpdateStatus =
  | "checking"
  | "idle"
  | "available"
  | "downloading"
  | "installing"
  | "error"
  | "up-to-date";

export interface UpdateProgress {
  downloaded: number;
  contentLength: number | null;
  percent: number | null;
}

export interface UseUpdaterResult {
  status: UpdateStatus;
  update: Update | null;
  progress: UpdateProgress;
  error: string | null;
  dismiss: () => void;
  handleUpdate: () => Promise<void>;
}

export function useUpdater(): UseUpdaterResult {
  const [status, setStatus] = useState<UpdateStatus>("idle");
  const [update, setUpdate] = useState<Update | null>(null);
  const [downloaded, setDownloaded] = useState(0);
  const [contentLength, setContentLength] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdates = useCallback(async (silent = false) => {
    setStatus(silent ? "idle" : "checking");
    setError(null);
    try {
      const result = await check();
      if (result) {
        setUpdate(result);
        setStatus("available");
      } else {
        setStatus(silent ? "idle" : "up-to-date");
      }
    } catch (err) {
      console.error("Update check failed:", err);
      setError(String(err));
      setStatus(silent ? "idle" : "error");
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

  const handleUpdate = useCallback(async () => {
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
  }, [update]);

  const dismiss = useCallback(() => {
    if (status !== "downloading" && status !== "installing") {
      setStatus("idle");
    }
  }, [status]);

  const percent = contentLength && contentLength > 0
    ? Math.round((downloaded / contentLength) * 100)
    : null;

  return {
    status,
    update,
    progress: { downloaded, contentLength, percent },
    error,
    dismiss,
    handleUpdate,
  };
}
