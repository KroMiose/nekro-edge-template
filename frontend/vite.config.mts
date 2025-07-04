import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import path from "node:path";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "frontend",
  plugins: [react(), unocss()],
  resolve: {
    alias: {
      "@frontend": resolve(__dirname, "./src"),
      "@": resolve(__dirname, "../src"),
    },
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    hmr: {
      host: "localhost",
      port: Number(process.env.VITE_PORT) || 5173,
    },
  },
  build: {
    outDir: "dist",
    manifest: true,
    ssr: "src/entry-server.tsx",
    rollupOptions: {
      input: "/src/entry-client.tsx",
    },
  },
  ssr: {
    noExternal: [
      "react-router-dom",
      "@mui/material",
      "@mui/system",
      "@emotion/react",
      "@emotion/styled",
      "react-i18next",
      "i18next",
    ],
  },
});
