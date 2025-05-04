import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // ensure crypto module is polyfilled
      define: {
        global: 'window',
      },
    },
  },
})
