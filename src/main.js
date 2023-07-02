import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as echarts from 'echarts';
window.echarts=echarts;

import techUILite from "techui-vue3-lite"

import vue3api from '@/plugins/vue3api'
import common from '@/plugins/common'

const app=createApp(App)
techUILite(app).then(()=>{
  app.use(router)
  app.use(store)
  app.use(vue3api)
  app.use(common)
  app.mount('#app')
})
