<script setup>
import layout from "./layout.vue"
const state=reactive({
  APConfig:{
    height:930,
    backgroundFillAll:true,
    backgroundName:"A1",
    chartCount:6
  }
})

</script>
<template>
  <adaptivePanel :config="state.APConfig"><layout></layout></adaptivePanel>
</template>
<style lang="less">

</style>