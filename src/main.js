import 'regenerator-runtime'
import { createApp } from 'vue'
import 'flowbite'
import './styles/style.css'
import App from './script/views/App.vue'
import router from './script/router'
import './script/globals/api-andpoint'


const app = createApp(App)

app.use(router)

app.mount('#app')
