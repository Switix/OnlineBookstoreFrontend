import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './assets/tailwind.css'
import router from './router'
import store from './store'
const app = createApp(App).use(store).use(router);

app.config.globalProperties.$axios = axios;

document.body.classList.add('text-text');
document.body.classList.add('bg-bg');



app.mount('#app');
