import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/I18nPlugin'

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss'
import '@/assets/tailwind.css'
import { DialogService } from 'primevue';

// Load user's preferred language from localStorage or use browser language
const savedLocale = localStorage.getItem('userLocale') as 'en' | 'id' | null;
// if (savedLocale && (savedLocale === 'en' || savedLocale === 'id')) {
//   i18n.global.locale.value = savedLocale;
// } else {
//   // Get browser language or use default if not supported
//   const browserLang = navigator.language.split('-')[0];
//   const supportedLocales = ['en', 'id'];
//   i18n.global.locale.value = supportedLocales.includes(browserLang) ? (browserLang as 'en' | 'id') : 'id';
// }

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark',
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);


app.mount('#app')
