import '@mdi/font/css/materialdesignicons.css'
import "vue-toastification/dist/index.css";
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './router'
const googlekey = import.meta.env.VITE_MY_VARIABLE;
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
  })
const app = createApp(App)
app.use(vuetify)
app.use(VueGoogleMaps, {
  load: {
    key: googlekey,
  },
})
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
  })
app.use(createPinia())
app.use(router)

app.mount('#app')
