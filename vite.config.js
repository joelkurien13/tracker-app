import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Listen on all local IPs
    open: true  // Open browser on server start
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
