import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { Features } from "./pages/Features";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { AppThemeProvider } from "./context/ThemeContextProvider";

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
