import { createApp } from "vue"
import { createPinia } from "pinia"
import { Quasar, Notify } from "quasar"
import mdi from "quasar/icon-set/mdi-v7"

import "@quasar/extras/mdi-v7/mdi-v7.css"
import "quasar/src/css/index.sass"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(Quasar, {
  iconSet: mdi,
  config: {
    dark: true,
    notify: {
      position: "bottom-right"
    }
  },
  plugins: {
    Notify
  },
})
app.use(createPinia())
app.use(router)

app.mount("#app")
