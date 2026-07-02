import { defineConfig } from "vitest/config";
import { loadEnv, type Plugin, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// ─── Tauri v2 Environment ─────────────────────────────────────────────────────

const TAURI_DEV_HOST = process.env.TAURI_DEV_HOST;
const TAURI_PLATFORM = process.env.TAURI_ENV_PLATFORM ?? ""; // "windows" | "linux" | "macos" | "ios" | "android"
const TAURI_ARCH = process.env.TAURI_ENV_ARCH ?? "unknown"; // "x86_64" | "aarch64" | …
// const TAURI_FAMILY = process.env.TAURI_ENV_FAMILY ?? "unknown";   // "windows" | "unix"
const IS_DEBUG = process.env.TAURI_ENV_DEBUG === "true";
const IS_TAURI = !!TAURI_PLATFORM;
const IS_WINDOWS = TAURI_PLATFORM === "windows";
const IS_MACOS = TAURI_PLATFORM === "macos";
const IS_MOBILE = TAURI_PLATFORM === "ios" || TAURI_PLATFORM === "android";

const BUILD_TARGET = (() => {
  if (IS_WINDOWS) return ["chrome120"]; // WebView2 ships Chromium 120+
  if (IS_MOBILE) return ["safari16", "chrome120"];
  return ["safari17", "chrome120"]; // macOS / Linux WebKit
})();

function classifyChunk(id: string): string | undefined {
  // 1. React core runtime — almost never invalidated
  if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
    return "vendor-react";
  }

  // 2. Tauri platform bindings
  if (id.includes("@tauri-apps/")) {
    return "vendor-tauri";
  }

  // 3. State management
  if (/node_modules\/(zustand|jotai|@reduxjs|@tanstack)\//.test(id)) {
    return "vendor-state";
  }

  // 4. UI primitives — high churn with design iterations
  if (
    /node_modules\/(@radix-ui|class-variance-authority|clsx|tailwind-merge|lucide-react)\//.test(id)
  ) {
    return "vendor-ui";
  }

  // 5. Routing
  if (/node_modules\/(react-router|react-router-dom)\//.test(id)) {
    return "vendor-router";
  }

  // 6. Date / utility helpers
  if (/node_modules\/(date-fns|dayjs|lodash|lodash-es|ramda)\//.test(id)) {
    return "vendor-utils";
  }

  // 7. Charting / visualisation (heavy — keep isolated so lab dashboards don't
  //    bloat the initial bundle)
  if (/node_modules\/(recharts|d3|@visx|chart\.js|victory)\//.test(id)) {
    return "vendor-charts";
  }

  // 8. PDF / document generation (used only in the report module)
  if (/node_modules\/(jspdf|pdfmake|@pdf-lib|docx)\//.test(id)) {
    return "vendor-docs";
  }

  // 9. Everything else from node_modules
  if (id.includes("node_modules")) {
    return "vendor";
  }

  // 10. QLIMS feature modules — coarse split by source path convention
  //     Adjust patterns to match your actual directory structure.
  if (id.includes("/src/pages/") || id.includes("/src/routes/")) {
    return "app-pages";
  }

  if (
    /\/src\/(features|modules)\/(samples|patients|tests|results|instruments|inventory|reports|qc|audit)\//.test(
      id,
    )
  ) {
    return "app-features";
  }

  // Default — let Rollup decide
  return undefined;
}

// ─── Custom plugin: strip console in production ───────────────────────────────

function stripConsolePlugin(): Plugin {
  return {
    name: "qlims:strip-console",
    apply: "build",
    transform(code, id) {
      if (IS_DEBUG) return;
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) return;
      if (id.includes("node_modules")) return;

      // Replace console.log / console.debug calls — leave warn/error intact
      const transformed = code.replace(/console\.(log|debug|info)\s*\([^)]*\)\s*;?/g, "");
      if (transformed === code) return;
      return { code: transformed, map: null };
    },
  };
}

// ─── Custom plugin: inject build metadata ─────────────────────────────────────

function buildMetaPlugin(): Plugin {
  const buildTime = new Date().toISOString();
  return {
    name: "qlims:build-meta",
    apply: "build",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "build-meta.json",
        source: JSON.stringify(
          {
            version: process.env.npm_package_version ?? "0.0.0",
            buildTime,
            platform: TAURI_PLATFORM || "web",
            arch: TAURI_ARCH,
            debug: IS_DEBUG,
            commit: process.env.GIT_COMMIT_SHA ?? "unknown",
          },
          null,
          2,
        ),
      });
    },
  };
}

// ─── Main config ──────────────────────────────────────────────────────────────

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "TAURI_"]);
  const isProd = mode === "production";
  const isDev = mode === "development";
  const isTest = mode === "test";
  const apiBase = env.VITE_API_BASE_URL ?? "http://localhost:8080";
  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
      tailwindcss(),
      ...(isProd ? [stripConsolePlugin(), buildMetaPlugin()] : []),
    ],
    // Mirror these in tsconfig.json → compilerOptions.paths
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@context": path.resolve(__dirname, "./src/context"),
      },
      // Ensure single React instance in monorepos or when using npm link
      dedupe: ["react", "react-dom"],
    },

    // ── Global constants ──────────────────────────────────────────────────────
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? "0.0.0"),
      __IS_TAURI__: JSON.stringify(IS_TAURI),
      __IS_DEBUG__: JSON.stringify(IS_DEBUG),
      __IS_WINDOWS__: JSON.stringify(IS_WINDOWS),
      __IS_MACOS__: JSON.stringify(IS_MACOS),
      __IS_MOBILE__: JSON.stringify(IS_MOBILE),
      __TARGET_ARCH__: JSON.stringify(TAURI_ARCH),
      __PLATFORM__: JSON.stringify(TAURI_PLATFORM || "web"),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // ── Env prefix ────────────────────────────────────────────────────────────
    envPrefix: ["VITE_", "TAURI_"],

    // ── Logging ───────────────────────────────────────────────────────────────
    clearScreen: false,
    logLevel: IS_DEBUG || isDev ? "info" : "warn",

    // ── Dependency pre-bundling ───────────────────────────────────────────────
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react-router-dom"],
      // @tauri-apps/* ships native ESM — pre-bundling breaks runtime injection
      exclude: [
        "@tauri-apps/api",
        "@tauri-apps/plugin-shell",
        "@tauri-apps/plugin-fs",
        "@tauri-apps/plugin-dialog",
        "@tauri-apps/plugin-notification",
        "@tauri-apps/plugin-updater",
        "@tauri-apps/plugin-store",
        "@tauri-apps/plugin-log",
        "@tauri-apps/plugin-http",
        "@tauri-apps/plugin-process",
        "@tauri-apps/plugin-os",
        "@tauri-apps/plugin-window-state",
        "@tauri-apps/plugin-clipboard-manager",
      ],

    },

    // ── Dev Server ────────────────────────────────────────────────────────────
    server: {
      port: 1420,
      strictPort: true, // Tauri expects exactly this port
      host: TAURI_DEV_HOST || false, // iOS physical device support
      cors: true,
      open: !IS_TAURI, // Don't auto-open browser in Tauri mode
      hmr: TAURI_DEV_HOST ? { protocol: "ws", host: TAURI_DEV_HOST, port: 1421 } : true,
      watch: {
        // Don't watch Rust source — Tauri's cargo watcher handles that
        ignored: ["**/src-tauri/**", "**/target/**", "**/.git/**"],
      },

      proxy: {
        "/api": {
          target: apiBase,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
          configure(proxy) {
            proxy.on("error", (err) => {
              console.warn("[proxy] /api error:", err.message);
            });
          },
        },

        // WebSocket proxy for real-time instrument feeds / SSE
        "/ws": {
          target: apiBase.replace(/^http/, "ws"),
          ws: true,
        },
      },
    },

    css: {
      devSourcemap: isDev || IS_DEBUG,
      modules: {
        generateScopedName: isDev ? "[name]__[local]--[hash:base64:4]" : "[hash:base64:8]",
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {},
    },

    // ── Production Build ──────────────────────────────────────────────────────
    build: {
      target: BUILD_TARGET,

      minify: isProd && !IS_DEBUG ? "oxc" : false,
      cssMinify: isProd && !IS_DEBUG ? "lightningcss" : false,
      sourcemap: IS_DEBUG ? "inline" : isProd ? false : true,

      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,

      // Tauri serves assets from disk — inline threshold keeps binary assets small
      assetsInlineLimit: 2_048, // 2 KB — inline tiny SVG/images only
      chunkSizeWarningLimit: 800, // warn at 800 KB before compression
      modulePreload: false, // Not useful in Tauri WebView
      reportCompressedSize: false, // Slows CI; enable locally when auditing

      rollupOptions: {
        treeshake: {
          // Aggressive tree-shaking — safe for QLIMS since we control all deps
          moduleSideEffects: (id) => {
            if (id.endsWith(".css")) return true;
            if (id.includes("@tauri-apps/plugin-")) return true;
            return false;
          },
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },

        output: {
          manualChunks: classifyChunk,
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
        external: IS_TAURI ? [] : [],
      },
    },

    // ── Preview (vite preview / CI smoke-test) ────────────────────────────────
    preview: {
      port: 1422,
      strictPort: true,
      host: false,
      proxy: {
        "/api": { target: apiBase, changeOrigin: true },
      },
    },

    // ── Test (Vitest) ─────────────────────────────────────────────────────────
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],

      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: ["node_modules", "dist", "src-tauri"],

      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: ["src/test/**", "src/**/*.d.ts", "src/main.tsx", "src/vite-env.d.ts"],
        thresholds: {
          // Raise these thresholds as coverage improves
          lines: 70,
          functions: 70,
          branches: 60,
          statements: 70,
        },
      },

      // Mock Tauri APIs in unit tests
      server: {
        deps: {
          inline: ["@tauri-apps/api", "@tauri-apps/plugin-store"],
        },
      },
    },
  };
});
