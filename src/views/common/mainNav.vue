<script setup>
const route = useRoute();
const router = useRouter();
const inited=ref(false)
const nav=[
  {label:"DashboardA",path:"/dashboardA"},
  {label:"DashboardB",path:"/dashboardB"},
  {label:"DashboardC",path:"/dashboardC"},
  {label:"DashboardD",path:"/dashboardD"},
]

const goToRouter=(item)=>{
  router.push(item.path);
}

onMounted(() => {
  inited.value=true
})

</script>
<template>
  <div :class="`nav-wrap ${inited&&'inited'}`" >
    <div :class="`item ${route.path==item.path?'active':''}`" @click="goToRouter(item)" v-for="item in nav">
      {{ item.label }}
    </div>
  </div>
</template>
<style lang="less">
.nav-wrap{.poa; right:50px; top:0; display:flex; z-index: 20;
  .item{padding:10px; .fc(@bld6); .por; cursor: pointer; .ani;
    &:before{.poa; top:0; left:50%; .bdr(0 0 10px 10px); .fixc("x"); width: 0%; opacity: 0; .ani; content:" "; height:5px; .bgc(@cbl6);}
    &:hover{.fc(@cbl5);}
    &.active{.fc(@cbl3);
      &:before{ opacity: 1;}
    }
  }
  &.inited{
    .active{
      &:before{width: 90%;}
    }
  }
}
</style>