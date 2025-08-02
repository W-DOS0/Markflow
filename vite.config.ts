import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/markdown-blog-editor/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})