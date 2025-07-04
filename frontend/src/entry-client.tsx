import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "uno.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { Features } from "./pages/Features";
import { AppThemeProvider } from "./context/ThemeContextProvider";

const queryClient = new QueryClient();

const AppComponent = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<Features />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root")!;

// In development, use createRoot since we're not doing SSR
// In production, use hydrateRoot for SSR
if (import.meta.env.DEV) {
  ReactDOM.createRoot(rootElement).render(AppComponent);
} else {
  ReactDOM.hydrateRoot(rootElement, AppComponent);
}
