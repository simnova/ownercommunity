import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), relay],
  define: {
    process: require("process/browser"),
    zlib: require("browserify-zlib"),
    stream: require("stream-browserify"),
    util: require("util"),
    buffer: require("buffer"),
    asset: require("assert"),
  },
})
