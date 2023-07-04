<script setup>
import layout from "./layout.vue"
const { proxy } = getCtx();
const store=useStore()

const state=reactive({
  APConfig:{
    height:930,
    backgroundFillAll:true,
    backgroundName:"A2",
    chartCount:5,
    backgroundConfig:{
      vectorBGA:$c.wh,
      vectorBGB:$c.wh,
      vectorBGC:$c.wh,
      vectorBGX:$c.bk.replace("#","%23"),
      vectorBGXOpa:0.03,
    }
  }
})



</script>
<template>
  <adaptivePanel :config="state.APConfig"><layout></layout></adaptivePanel>
</template>
<style lang="less">

</style>