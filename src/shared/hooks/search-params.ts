import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export const DEFAULT_PAGE_SIZE = 10;

export function useDashboardSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const range = searchParams.get("range") || "90d";
  const tab = searchParams.get("tab") || "outline";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || String(DEFAULT_PAGE_SIZE), 10);

  const state = useMemo(() => ({ range, tab, page, perPage }), [range, tab, page, perPage]);

  const setStates = useCallback((updates: Partial<{ range: string | null; tab: string | null; page: number | null; perPage: number | null }>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  return [state, setStates] as const;
}
