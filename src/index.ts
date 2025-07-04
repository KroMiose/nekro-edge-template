import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { etag } from "hono/etag";

import api from "./routes/api";
import { Bindings } from "./types";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.use("*", etag(), secureHeaders(), logger());
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }),
);

// Register API routes
app.route("/api", api);

// Serve OpenAPI spec
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

// Export app type for RPC client (before adding catch-all route)
// export type AppType = typeof app; // This is now in api.ts

// Serve frontend assets (this must come after API routes and type export)
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

  // Production SSR
  try {
    // This is a dynamic import, so it will only be executed in production.
    // By using `?raw`, we instruct the bundler to inline the manifest content at build time.
    // @ts-ignore
    const { default: manifestRaw } = await import("../frontend/dist/.vite/manifest.json?raw");
    const manifest = JSON.parse(manifestRaw);

    // @ts-ignore
    const { render } = await import("../frontend/dist/server/entry-server.js");

    const rendered = await render({ url: c.req.url });
    const entry = manifest["frontend/src/entry-client.tsx"];

    if (!entry) {
      throw new Error("Could not find frontend entry in manifest.json");
    }

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
    const errorMessage = e instanceof Error ? `${e.message}\n${e.stack}` : String(e);
    return c.html(
      `<!DOCTYPE html><html><head><title>Render Error</title></head><body><h1>Server-side rendering failed.</h1><p>Please check the server logs for more details.</p><hr><pre>${errorMessage}</pre></body></html>`,
      500,
    );
  }
});

export default app;
