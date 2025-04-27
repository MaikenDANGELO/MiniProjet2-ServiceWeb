import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@primevue/nuxt-module', 'nuxt-icons',],
  primevue: {
    options: {
      theme: {
          preset: Aura
      }
  }
  },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

})