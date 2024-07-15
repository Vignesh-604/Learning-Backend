import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api" : "http://localhost:3000"  // Any call made to /api will be redirected to localhost:3000
    }
    // "/api base path of the request that you want to proxy. Any request that starts with /api will be proxied."
    // localhost:3000 is the target server where req is sent
  },
  plugins: [react()],
})
