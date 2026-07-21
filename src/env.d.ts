/// <reference types="vite/client" />

// ─── Vite environment variables ───────────────────────────────────────────────

interface ImportMetaEnv {
  /** Application display name */
  readonly VITE_APP_NAME: string;
  /** Current environment: "development" | "production" */
  readonly VITE_APP_ENV: string;
  /** Logging level: "debug" | "info" | "warn" | "error" */
  readonly VITE_LOG_LEVEL: string;
  /** Whether browser devtools should be enabled */
  readonly VITE_ENABLE_DEVTOOLS: string;
  /** API base URL */
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ─── Global compile-time constants (defined in vite.config.ts) ────────────────

/** Application version from package.json */
declare const __APP_VERSION__: string;
/** Whether running inside the Tauri WebView */
declare const __IS_TAURI__: boolean;
/** Whether this is a debug build (TAURI_ENV_DEBUG=true) */
declare const __IS_DEBUG__: boolean;
/** Whether the target platform is Windows */
declare const __IS_WINDOWS__: boolean;
/** Whether the target platform is macOS */
declare const __IS_MACOS__: boolean;
/** Whether the target platform is mobile (iOS / Android) */
declare const __IS_MOBILE__: boolean;
/** CPU architecture: "x86_64" | "aarch64" | "unknown" */
declare const __TARGET_ARCH__: string;
/** Platform identifier: "windows" | "macos" | "linux" | "ios" | "android" | "web" */
declare const __PLATFORM__: string;
/** ISO 8601 timestamp of the build */
declare const __BUILD_TIME__: string;
