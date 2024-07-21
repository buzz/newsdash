import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    target: ['chrome126', 'firefox128'],
  },
  server: {
    port: 3001,
    proxy: { '/api': 'http://localhost:3000' },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { dimensions: false },
    }),
  ],
})
