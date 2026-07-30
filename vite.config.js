import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/jactmak/",
  build: {
    outDir: "dist",
    assetsInlineLimit: 2048
  }
});