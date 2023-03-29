import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store.js'

const Vue = createApp(App)
Vue.use(router)
Vue.use(store)
Vue.mount('#app')
