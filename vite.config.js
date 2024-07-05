import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tfm-computational-thinking-dashboard/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
