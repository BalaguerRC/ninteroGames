import { createApp } from 'vue'
import App from '@/App.vue'
import './style.css'
import router from '@/router/router'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(router).use(VueAxios, axios).mount('#app')



