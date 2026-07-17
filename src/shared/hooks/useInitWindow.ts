import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

/**
 * Shows the Tauri window after the first two animation frames,
 * preventing a visible white flash on app startup.
 */
export function useInitWindow() {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        getCurrentWindow().show();
      });
    });
  }, []);
}
