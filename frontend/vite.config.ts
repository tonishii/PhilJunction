import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@profile": path.resolve(__dirname, "src/pages/profile"),
      "@mockdata": path.resolve(__dirname, "src/mockdata"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@models": path.resolve(__dirname, "src/models"),
    },
  },
  server: {
    port: 3000
  }
});
