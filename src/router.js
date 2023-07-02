
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
      redirect:"/dashboardA-en",
    },
    {
      path: "/dashboardA-en",
      name: "dashboardA-en",
      component:()=>import("@/viewsEN/dashboardA/dashboardA-index.vue"),
    },
    {
      path: "/dashboardB-en",
      name: "dashboardB-en",
      component:()=>import("@/viewsEN/dashboardB/dashboardB-index.vue"),
    },
    {
      path: "/dashboardC-en",
      name: "dashboardC-en",
      component:()=>import("@/viewsEN/dashboardC/dashboardC-index.vue"),
    },
    {
      path: "/dashboardD-en",
      name: "dashboardD-en",
      component:()=>import("@/viewsEN/dashboardD/dashboardD-index.vue"),
    },
    {
      path: "/dashboardA-cn",
      name: "dashboardA-cn",
      component:()=>import("@/viewsCN/dashboardA/dashboardA-index.vue"),
    },
    {
      path: "/dashboardB-cn",
      name: "dashboardB-cn",
      component:()=>import("@/viewsCN/dashboardB/dashboardB-index.vue"),
    },
    {
      path: "/dashboardC-cn",
      name: "dashboardC-cn",
      component:()=>import("@/viewsCN/dashboardC/dashboardC-index.vue"),
    },
    {
      path: "/dashboardD-cn",
      name: "dashboardD-cn",
      component:()=>import("@/viewsCN/dashboardD/dashboardD-index.vue"),
    },
    
    {
      path: "/dashboardA-hk",
      name: "dashboardA-hk",
      component:()=>import("@/viewsHK/dashboardA/dashboardA-index.vue"),
    },
    {
      path: "/dashboardB-hk",
      name: "dashboardB-hk",
      component:()=>import("@/viewsHK/dashboardB/dashboardB-index.vue"),
    },
    {
      path: "/dashboardC-hk",
      name: "dashboardC-hk",
      component:()=>import("@/viewsHK/dashboardC/dashboardC-index.vue"),
    },
    {
      path: "/dashboardD-hk",
      name: "dashboardD-hk",
      component:()=>import("@/viewsHK/dashboardD/dashboardD-index.vue"),
    },
  ]
});



export default router;

