import './assets/index.css'
import { createApp } from "vue";
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'



const pinia = createPinia()
const i18n = createI18n({
	legacy: false,
	locale: 'es',
	fallbackLocale: 'en',
})
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.mount('#app')