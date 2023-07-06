<script setup>
const store=useStore();
const router = useRouter();
const route = useRoute();
const { proxy } = getCtx();
// watch(()=>proxy.$tState.adaptiveConfig.chartCounter,(val,old)=>{
//   // console.log("$tStateWatch",val);
// })

onMounted(()=>{
  
})
</script>
<template>
  <div id="root-techui" :class="`root-BG lang-${store.state.lang}`" >
    <router-view></router-view>
  </div>
</template>
<style lang="less"></style>
