import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { AboutDialog } from "@/features/about";
import { UpdaterDialog } from "@/features/updater";
import App from "./App";
import "./styles/globals.css";
import "./App.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="qlims-theme">
          <AboutDialog />
          <UpdaterDialog />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
