import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter as OriginalStaticRouter } from "react-router-dom/server";
import { Routes as OriginalRoutes, Route as OriginalRoute } from "react-router-dom";
import App from "./App";
import { Features } from "./pages/Features";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { AppThemeProvider } from "./context/ThemeContextProvider";

// CJS/ESM interop fix for react-router-dom. Vite's SSR build can sometimes
// wrap CJS modules in a `default` property.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StaticRouter = (OriginalStaticRouter as any).default ?? OriginalStaticRouter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Routes = (OriginalRoutes as any).default ?? OriginalRoutes;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Route = (OriginalRoute as any).default ?? OriginalRoute;

export function render(path: string) {
  const queryClient = new QueryClient();

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <StaticRouter location={path}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="features" element={<Features />} />
              </Route>
            </Routes>
          </StaticRouter>
        </AppThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
  return { html };
}
