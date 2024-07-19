import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    target: ['chrome126', 'firefox128'],
  },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:3001' },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { dimensions: false },
    }),
  ],
})
