import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'gsap';
          }
        },
      },
    },
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  preview: {
    host: '0.0.0.0',
    strictPort: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
})
