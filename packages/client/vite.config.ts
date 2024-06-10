import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
// import { ViteFaviconsPlugin as favicons } from 'vite-plugin-favicon2'
import svgr from 'vite-plugin-svgr'

// import pkgInfo from '../../package.json' with { type: 'json' }

export default defineConfig({
  envDir: '../..',
  envPrefix: 'NEWSDASH_', // Exposed to client
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:3001' },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { dimensions: false },
    }),
    // favicons({
    //   favicons: {
    //     appName: pkgInfo.name,
    //     appDescription: pkgInfo.description,
    //     version: pkgInfo.version,
    //     icons: {
    //       appleIcon: false,
    //       appleStartup: false,
    //     },
    //   },
    //   logo: '../../artwork/favicon.svg',
    // }),
  ],
})
