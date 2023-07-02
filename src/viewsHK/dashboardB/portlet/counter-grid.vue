<script setup>
const state=reactive({
  arry:[
    {title:"軟件銷售額",icon:"i carbon:ibm-z-cloud-mod-stack",unit:"萬元",total:"1874"},
    {title:"硬件銷售額",icon:"i carbon:chip",unit:"萬元",total:"3276"},
    {title:"技術服務",icon:"i carbon:user-speaker",unit:"萬元",total:"315"},
    {title:"安全服務",icon:"i carbon:rule",unit:"萬元",total:"769"},
    {title:"總支出費用",icon:"i carbon:airline-digital-gate",unit:"萬元",total:"23769"},
  ],
})

const decoFrameConfig={
  directionAlt: true,
  scale:.8
}


</script>
<template>
  <div class="screenB-counterGrid">
    <div class="content-wrap" v-for="(item,index) in state.arry" :key="index">
      <decoFrameA2 :config="decoFrameConfig"><i :class="[item.icon,'icon']"></i></decoFrameA2>
      <DigitalTransform class="numbers" :value="item.total" :useGrouping="true" :interval="3000"></DigitalTransform>
      <div class="block-title">{{item.title}} <span class="unit" v-if="item.unit">({{item.unit}})</span></div>
      
    </div>
  </div>
</template>
<style lang="less">
.screenB-counterGrid{ margin-top:30px; display: grid; grid-template-columns: repeat(5,1fr); height: 100%; grid-template-rows: repeat(1,1fr); grid-gap: 12px;  position: relative;
  .content-wrap{.por;  text-align: center;
    .decoFrameA2{margin:0 auto;}
    .block-title{.ff("cn1"); .fc(@cbl3); font-size: 20px; line-height: 1.5; 
      .unit{display:block; font-size: 12px;}
    }
    .numbers{display:inline-block; text-align: center; height:38px; line-height: 1; font-size: 38px; .ff("en0");  position: relative; vertical-align: text-top; .fc(@cbl3); }
  }
}
</style>
