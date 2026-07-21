// ─── Updater feature types ────────────────────────────────────────────────────

/** Lifecycle states of the update process */
export type UpdateStatus =
  | "checking"
  | "idle"
  | "available"
  | "downloading"
  | "installing"
  | "error"
  | "up-to-date";

/** Download progress tracking */
export interface UpdateProgress {
  downloaded: number;
  contentLength: number | null;
  percent: number | null;
}
