<script setup>
const route = useRoute();
const router = useRouter();
const inited=ref(false)
const nav=[
  {label:"Document",path:"/dashboardA"},
  {label:"Demo",path:"/dashboardB"},
  {label:"Premium",path:"/dashboardC"},
]

const goToRouter=(item)=>{
  router.push(item.path);
}

onMounted(() => {
  inited.value=true
})

</script>
<template>
  <div :class="`link-wrap ${inited&&'inited'}`" >
    <div class="item" @click="goToRouter(item)" v-for="item in nav">
      {{ item.label }}
    </div>
  </div>
</template>
<style lang="less">
.link-wrap{.poa; left:140px; top:0; display:flex; z-index: 20;
  .item{padding:10px; .fc(@bld6); .por; cursor: pointer; .ani;
    &:hover{.fc(@cbl5);}
  }
}
</style>