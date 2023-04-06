import 'regenerator-runtime'
import { createApp } from 'vue'
import 'flowbite'
import './styles/style.css'
import App from './views/App.vue'
import router from './router'


const app = createApp(App)

app.use(router)

app.mount('#app')
