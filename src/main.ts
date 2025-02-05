import './assets/index.css'
import es from '@/assets/locales/es.json'
import en from '@/assets/locales/en.json'

import { createApp } from "vue";
import { createPinia } from 'pinia'
import { TauriPluginPinia } from 'tauri-plugin-pinia';
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { usePersistentStorage } from './stores/PersistentStorage';

const pinia = createPinia()
pinia.use(TauriPluginPinia({
	syncStrategy: "debounce"
}))

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
/* Persistent store */
const persistentStore = usePersistentStorage();
persistentStore.$tauri.start();

app.use(i18n)
app.mount('#app')

