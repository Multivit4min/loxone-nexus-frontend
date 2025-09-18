import { fileURLToPath } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/quasar-variables.sass', import.meta.url)
      )
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dev.govlar.wtf",
        changeOrigin: true,
        secure: true
      },
      "/ws": {
        target: "wss://dev.govlar.wtf",
        ws: true,
        changeOrigin: true,
        secure: true
      }
    },    
    hmr: {
      host: "dev.govlar.wtf",
      protocol: "wss", // or "ws" if not using https
      clientPort: 443   // or 80 for http
    }
  }
})
