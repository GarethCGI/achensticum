import './assets/index.css'
import es from '@/assets/locales/es.json'
import en from '@/assets/locales/en.json'

import { createApp } from "vue";
import { createPinia } from 'pinia'
import { createPlugin } from 'tauri-plugin-pinia';
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { useStatisticsStore } from './stores/Statistics';



const pinia = createPinia()
pinia.use(createPlugin());

export const i18n = createI18n({
	legacy: false,
	locale: 'es',
	fallbackLocale: 'en',
	messages: {
		es,
		en
	}
})
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.mount('#app')


const statisticsStore = useStatisticsStore();
statisticsStore.$tauri.start();