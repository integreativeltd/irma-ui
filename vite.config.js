import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Windicss from 'vite-plugin-windicss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Windicss()],
  server: {
    port: 3000,
  },
})
