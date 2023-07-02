<script setup>
import layout from "./layout.vue"
const state=reactive({
  APConfig:{
    // backgroundFillAll:true,
    // backgroundName:"A1",
    height:930,
    userSelect:true,
    chartCount:9
  }
})
</script>
<template>
  <adaptivePanel :config="state.APConfig"><layout></layout></adaptivePanel>
</template>
<style lang="less">
</style>