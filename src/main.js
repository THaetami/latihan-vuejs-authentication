import 'regenerator-runtime'
import { createApp } from 'vue'
import 'flowbite'
import './styles/style.css'
import './script/globals/api-andpoint'
import router from './script/router'
import store from './script/views/Vuex'
import App from './script/views/App.vue'
import './styles/buttonTriger'
import Notifications from '@kyvg/vue3-notification'


createApp(App).use(store).use(router).use(Notifications).mount('#app')
