import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "frontend",
  plugins: [react(), unocss()],
  build: {
    outDir: "../dist/client",
    manifest: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@frontend": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: [
      "react-router-dom",
      "@mui/material",
      "@mui/system",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "react-i18next",
      "i18next",
    ],
  },
});
