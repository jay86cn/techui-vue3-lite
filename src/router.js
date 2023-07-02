
import { createRouter, createWebHistory,createWebHashHistory,useRoute } from 'vue-router'
import{ defineAsyncComponent } from"vue"
import store from './store'


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes :[
    {
      path: "/",
      name: "layout",
      redirect:"/dashboardA",
    },
    {
      path: "/dashboardA",
      name: "dashboardA",
      component:()=>import("@/views/dashboardA/dashboardA-index.vue"),
    },
    {
      path: "/dashboardB",
      name: "dashboardB",
      component:()=>import("@/views/dashboardB/dashboardB-index.vue"),
    },
    {
      path: "/dashboardC",
      name: "dashboardC",
      component:()=>import("@/views/dashboardC/dashboardC-index.vue"),
    },
    {
      path: "/dashboardD",
      name: "dashboardD",
      component:()=>import("@/views/dashboardD/dashboardD-index.vue"),
    },
  ]
});



export default router;

