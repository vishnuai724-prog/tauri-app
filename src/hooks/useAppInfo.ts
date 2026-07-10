import { useEffect, useMemo, useState } from "react";
import { getName, getVersion } from "@tauri-apps/api/app";

interface AppInfo {
    name: string;
    version: string;
}

interface UseAppInfoResult {
    data: AppInfo | null;
    isLoading: boolean;
    error: Error | null;
    copyright: string;
}

export function useAppInfo(): UseAppInfoResult {
    const [data, setData] = useState<AppInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const [name, version] = await Promise.all([getName(), getVersion()]);
                if (!cancelled) {
                    setData({ name, version });
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }
        void load();
        return () => { cancelled = true; };
    }, []);

    const copyright = useMemo(() => data ? `© ${new Date().getFullYear()} ${data.name}. All rights reserved.` : "", [data],);
    return { data, isLoading, error, copyright };
}
