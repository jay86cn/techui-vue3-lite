<script setup>
const state=reactive({
  arry:[
    {title: "Software sales", icon: "i carbon:ibm-z-cloud-mod-stack", unit: "10,000 yuan", total: "1874"},
     {title:"Hardware sales",icon:"i carbon:chip",unit:"10,000 yuan",total:"3276"},
     {title:"Technical Services",icon:"i carbon:user-speaker",unit:"10,000 yuan",total:"315"},
     {title:"Security Service",icon:"i carbon:rule",unit:"10,000 yuan",total:"769"},
  ],
})

const borderConfig=(index)=>{
  let rotate
  if(index==0){
    rotate="x";
  }else if(index==1){
    rotate="all";
  }else if(index==2){
    rotate=null;
  }else if(index==3){
    rotate="y";
  }
  return {
    dur: 3,
    opacity: 0.7,
    // decoration: false,
    rotate
  }
}

</script>
<template>
  <div class="screenA-counterGrid">
    <aYinTechBorderB3 :config="borderConfig(index)" v-for="(item,index) in state.arry" :key="index">
      <div class="inner-content">
        <div class="block-title">{{item.title}} <span v-if="item.unit">({{item.unit}})</span></div>
        <div class="total">
          <i :class="[item.icon,'icon']"></i>
          <!-- <DigitalTransform class="numbers" :value="123210"  :interval="$vuex.state.globalConfig.ani?3000:0"></DigitalTransform> -->
          <DigitalTransform class="numbers" :value="item.total" :useGrouping="true" :interval="3000"></DigitalTransform>
          <!-- <span class="unit">{{item.unit}}</span> -->
        </div>
      </div>
    </aYinTechBorderB3>
    <!-- <div class="block" > <div class="bdTechBottom"></div> </div> -->
  </div>
</template>
<style lang="less">
.screenA-counterGrid{display: grid; grid-template-columns: repeat(2,1fr); height: 100%; grid-template-rows: repeat(2,1fr); grid-gap: 12px;  position: relative;
  .aYinTechBorderB3{ padding:0;   position: relative; 
    //&:nth-child(1){ grid-area: 1 / 1 / 2 / 3;  }
    .inner-content{
      .block-title{position: absolute;.ff("cn1"); left:0; right:0; text-align: center; top:10px;.fc(var(--font-normal)); font-size: 14px; }
      .total{margin: 0; text-align: center; line-height: 30px; .poa; left:0; right:0; top:60%; .fixc("y");
        i{display:inline-block;font-size:32px; vertical-align: text-top; margin-right: 10px;.fc(var(--font-normal));}
        .numbers{display:inline-block; text-align: center; font-size: 32px; .ff("en0");  position: relative; vertical-align: text-top; .fc(var(--font-strong));
          .badge{position: absolute; left:100%; top:-10px; font-size: 14px; width: 30px; height:30px; padding:0; line-height: 1; }
        }
        .unit{font-size: 14px; margin:0 0 0 10px;.fc(var(--font-strong));}
      }
    }
  }
}
</style>
