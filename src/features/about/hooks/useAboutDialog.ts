import { useState, useEffect, useCallback } from "react";
import { listen } from "@tauri-apps/api/event";

/**
 * Manages the About dialog open/close state,
 * listening for the Tauri menu "open-about-dialog" event.
 */
export function useAboutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unlisten = listen("open-about-dialog", () => {
      setIsOpen(true);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, setIsOpen, open, close };
}
