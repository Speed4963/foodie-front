import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      // 네이버 지도 외부 스크립트 허용
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})