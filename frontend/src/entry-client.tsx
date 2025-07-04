import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as OriginalBrowserRouter,
  Routes as OriginalRoutes,
  Route as OriginalRoute,
} from "react-router-dom";
import App from "./App";
import "uno.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { Features } from "./pages/Features";
import { AppThemeProvider } from "./context/ThemeContextProvider";

// CJS/ESM interop fix for react-router-dom
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrowserRouter = (OriginalBrowserRouter as any).default ?? OriginalBrowserRouter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Routes = (OriginalRoutes as any).default ?? OriginalRoutes;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Route = (OriginalRoute as any).default ?? OriginalRoute;

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
