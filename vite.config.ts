import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react()],
  define: {
    process: import("process/browser"),
    zlib: import("browserify-zlib"),
    stream: import("stream-browserify"),
    util: import("util"),
    buffer: import("buffer"),
    asset: import("assert"),
  },
  server: {
    port: 3000,
  },
});
