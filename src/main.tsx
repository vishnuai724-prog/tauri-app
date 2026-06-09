import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App";
import "./index.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { AboutDialog } from "@/components/AboutDialog";
import Updater from "./Updater";

const queryClient = new QueryClient();

function InitWindow() {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        getCurrentWindow().show();
      });
    });
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="qlims-theme">
        <InitWindow />
        <AboutDialog />
        <Updater />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
