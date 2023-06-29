import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    process: require("process/browser"),
    zlib: require("browserify-zlib"),
    stream: require("stream-browserify"),
    util: require("util"),
    buffer: require("buffer"),
    asset: require("assert"),
  },
  server: {
    port: 3000
  }
})
