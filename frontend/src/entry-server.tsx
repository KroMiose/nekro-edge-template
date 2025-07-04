import React from "react";
import ReactDOMServer from "react-dom/server";
// All other imports are temporarily unused
// import { StaticRouter as OriginalStaticRouter } from "react-router-dom/server";
// import { Routes as OriginalRoutes, Route as OriginalRoute } from "react-router-dom";
// import App from "./App";
// import { Features } from "./pages/Features";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import HomePage from "./pages/HomePage";
// import { AppThemeProvider } from "./context/ThemeContextProvider";

export function render() {
  // For now, we ignore the path and render the simplest possible component
  // to isolate the source of the "Element type is invalid" error.
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <h1>Isolation Test: OK</h1>
    </React.StrictMode>,
  );
  return { html };
}
