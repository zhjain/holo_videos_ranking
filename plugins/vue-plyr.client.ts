import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default defineNuxtPlugin((nuxtApp) => {
    // Add the plugin to the app
    nuxtApp.vueApp.use(VuePlyr)
})