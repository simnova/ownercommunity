/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom plugin to transform process.env to import.meta.env
const replaceProcessEnv = () => {
  return {
    name: 'replace-process-env',
    transform(code: string, id: string) {
      return code.replace(/process\.env\./g, 'import.meta.env.');
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    manifest: true,
  },
  plugins: [
    react(),
    replaceProcessEnv(),
  ],

  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    server: {
      deps: {
        inline: ["antd"],
      },
    },
    css: true,
  },
});
