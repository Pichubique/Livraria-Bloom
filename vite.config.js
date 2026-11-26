import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: "Livraria-Bloom",
        short_name: "Bloom",
        description: "Livraria online",
        theme_color: "#191525",
        background_color: "#191525",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
