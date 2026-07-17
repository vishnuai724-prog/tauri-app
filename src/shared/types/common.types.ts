// ─── Common shared types ──────────────────────────────────────────────────────

/** Branded string ID for type-safe entity references */
export type ID = string;

/** Utility: make a type nullable */
export type Nullable<T> = T | null;

/** Async operation lifecycle status */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

/** Standard paginated API response envelope */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
