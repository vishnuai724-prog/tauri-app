// ─── About feature types ──────────────────────────────────────────────────────

/** Application metadata returned by Tauri APIs */
export interface AppInfo {
  name: string;
  version: string;
}

/** Return shape of the useAppInfo hook */
export interface UseAppInfoResult {
  data: AppInfo | null;
  isLoading: boolean;
  error: Error | null;
  copyright: string;
}
