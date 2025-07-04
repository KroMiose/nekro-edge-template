// This file is the entry point for the server.
//
// It's responsible for exporting a Hono application that can be used as a
// serverless function.
//
// The server-side rendering is handled by the `../frontend/src/entry-server.tsx`
// file, which is imported here. The Vite plugin for Hono will handle bundling
// this file and its dependencies.

import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { etag } from "hono/etag";

import api from "./routes/api";
import { Bindings } from "./types";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Middlewares
app.use("*", etag(), secureHeaders(), logger());
app.use(
  "/api/*",
  cors({
    origin: "*", // You may want to configure this more strictly for production
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }),
);

// API routes
app.route("/api", api);

// OpenAPI Docs
app.doc("/api/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "NekroEdge API",
  },
});

// Serve Swagger UI
app.get(
  "/doc",
  swaggerUI({
    url: "/api/doc",
  }),
);

// Serve frontend assets
app.get("*", async (c) => {
  if (c.env.NODE_ENV === "development") {
    const vitePort = c.env.VITE_PORT || "5173";
    const url = new URL(c.req.url);
    url.hostname = "localhost";
    url.port = vitePort;
    url.protocol = "http";

    const res = await fetch(url.toString(), c.req.raw);
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: new Headers(res.headers),
    });
  }

  // Production: Handle static assets first
  const url = new URL(c.req.url);
  if (url.pathname.startsWith("/assets/")) {
    try {
      // Use ASSETS Fetcher to serve static files
      const assetResponse = await c.env.ASSETS.fetch(c.req.raw);
      return assetResponse;
    } catch (error) {
      console.error("Error serving static asset:", error);
      return new Response("Asset not found", { status: 404 });
    }
  }

  // Production SSR for pages
  try {
    // Note: These are dynamic imports, and will only be available after building the frontend.
    // @ts-ignore
    const manifestModule = await import("../dist/client/.vite/manifest.json");
    // @ts-ignore
    const { render } = await import("../dist/server/entry-server.mjs");

    // The imported module may have the content under a `default` key.
    const manifest = manifestModule.default || manifestModule;

    const url = new URL(c.req.url);
    const rendered = await render(url.pathname);

    // The manifest key is the path to the entrypoint file relative to the
    // Vite root. In our case, the client build entry is `index.html` (the
    // default for Vite), so we use that as the key.
    const entry = (manifest as Record<string, any>)["index.html"];

    if (!entry) {
      throw new Error("Could not find a valid client entry in manifest.json");
    }

    // This is a simplified template. In a real-world scenario, you'd likely
    // use a more robust templating solution.
    const template = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NekroEdge</title>
      <link rel="stylesheet" href="/${entry.css?.[0]}">
    </head>
    <body>
      <div id="root">${rendered.html}</div>
      <script type="module" src="/${entry.file}"></script>
    </body>
  </html>
`;
    return c.html(template);
  } catch (e) {
    console.error("SSR failed:", e);
    // Fallback to a simple error page if SSR fails.
    let detailedError = "An unknown error occurred.";
    if (e instanceof Error) {
      detailedError = `Error: ${e.message}\n\nStack Trace:\n${e.stack}\n`;
      try {
        const serializedError = JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
        detailedError += `\nFull Error Object:\n${serializedError}`;
      } catch (jsonError) {
        detailedError += "\nCould not serialize the full error object.";
      }
    } else {
      detailedError = `An non-error was thrown: ${String(e)}`;
    }

    return c.html(
      `<!DOCTYPE html><html><head><title>Render Error</title><style>body{font-family:sans-serif;background:#111;color:#eee;}pre{background:#222;padding:1em;border-radius:8px;white-space:pre-wrap;word-wrap:break-word;}</style></head><body><h1>Server-side rendering failed.</h1><p>Please check the server logs for more details.</p><hr><pre>${detailedError}</pre></body></html>`,
      500,
    );
  }
});

export default app;
