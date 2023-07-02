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
      colorA:$c.wh,
      colorB:$c.wh,
      colorC:$c.wh,
      colorX:$c.bk.replace("#","%23"),
      colorXOpacity:0.03,
    }
  }
})



</script>
<template>
  <adaptivePanel :config="state.APConfig"><layout></layout></adaptivePanel>
</template>
<style lang="less">

</style>