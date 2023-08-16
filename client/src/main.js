import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import PanelContainer from './components/globals/PanelContainer.vue'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify()
const app = createApp(App)

app.component('PanelContainer', PanelContainer)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
