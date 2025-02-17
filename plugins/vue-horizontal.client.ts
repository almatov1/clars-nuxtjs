import VueHorizontal from 'vue-horizontal'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('vue-horizontal', VueHorizontal)
})