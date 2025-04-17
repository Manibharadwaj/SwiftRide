import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  // Use Render's dynamic port or fallback to 5173
    host: true,  // Exposes the app to external requests
    allowedHosts: ['swiftride-web.onrender.com', 'localhost']  // Allow Render's domain and localhost for local dev
  }
})
