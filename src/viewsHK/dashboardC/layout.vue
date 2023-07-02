<script setup>
import echartBarHorizScroll from "./portlet/echart-barHorizScroll.vue"
import echartPie from "./portlet/echart-pie.vue"
import echartGaugeTriple from "./portlet/echart-gaugeTriple.vue"
import echartMap from "./portlet/echart-map.vue"
import echartSunburst from "./portlet/echart-sunburst.vue"
import echartHill from "./portlet/echarts-hill-group/echart-hill.vue"
import echartBar from "./portlet/echart-bar.vue"

import echartLine from "./portlet/echart-line.vue"
import counterGrid from "./portlet/counter-grid.vue"
import echartBarHoriz from "./portlet/echart-barHoriz.vue"

import mainNav from "@/common/mainNav.vue"
import externalLinks from "@/common/externalLinks.vue"

const { proxy } = getCtx();

const comps={
  echartMap,
  echartGaugeTriple,
  echartPie,
  echartBarHorizScroll,
  echartSunburst,
  echartHill,
  echartBar,

  echartBarHoriz,
  echartLine,
  counterGrid,
}
const state=reactive({
  systemTitleConfig:{
    width:1000
  },

  panelTitleConfig:{
    scale:1.1
  },
  
  tabActive:0,

  configBLeft:{
    rotate: {
      y:8,
    },
    transformOrigin:"right",
    view3d:true,
    showShadow:false,
    hoverDelay:0
  },
  configBCenter:{
    rotate: {
      x:30,
    },
    transformOrigin:"bottom",
    view3d:true,
    showShadow:false,
    hoverDelay:0
  },
  configBRight:{
    rotate:{
      y:-8,
    },
    transformOrigin:"left",
    view3d:true,
    showShadow:false,
    hoverDelay:0
  },
  areas:[
    {name:"left",portlets:[
      {id:"r1",title:"銷售情況",component:"echartBar",border:"blank"},
      {id:"r2",title:"任務完成情況",component:"echartGaugeTriple",border:"blank"},
      {id:"r3",title:"開支佔比",component:"echartSunburst",border:"blank"},
    ]},
    {name:"right",portlets:[
      {id:"l2",title:"收支情況",component:"echartPie",border:"blank"},
      {id:"l3",title:"業務收益情況",component:"echartBarHorizScroll",border:"blank"},
      {id:"l1",title:"行業收入佔比",component:"echartHill",border:"blank"},
    ]},
    
    
  ]
      
})


const {systemTitleConfig,panelTitleConfig,areas}=toRefs(state)

onMounted(()=>{
  
})

</script>
<template>
  <div class="screen1080C">
    <mainNav></mainNav>
    <externalLinks></externalLinks>
    <div :class="`area-box area-${area.name}`" v-for="area in areas">
      <div class="portlet-wrapper" v-for="(item,index) in area.portlets">
        <component v-if="item.border" :is='item.border'>
          <panelTitleB1 v-if="!item.hideTitle" :config="panelTitleConfig">{{item.title}}</panelTitleB1>
          <component :is='comps[item.component]' ></component>
          <i>{{item.component}}</i>
        </component>
        <template v-else>
          <component :is='item.component'></component>
          <i>{{item.component}}</i>
        </template>
      </div>
    </div>
    <systemTitleA3 :config="systemTitleConfig">TechUI數據可視化成型工具</systemTitleA3>
    <echartMap></echartMap>
  </div>
</template>
<style lang="less">
.screen1080C{ z-index: 1; padding:60px 30px 30px 30px; height: 100%;
.i(){.poa; bottom:0; right:10px; font-size: 12px; opacity: .1; .fc(@wh); z-index: 10;}
  display: grid; grid-template-columns: repeat(24,1fr); grid-template-rows:repeat(24,1fr); grid-gap: 30px;
  .area-box{.bdr(5px);  pointer-events: visible; position: relative; z-index: 10;  padding:15px; .bdFilter(5px,120%); .bdr(10px); 
    &:before{  content:" "; .poa; .fullbox;  .bdFilter(10px,300%); .bdr(10px); opacity: .8; .bgc(fade(@bll8,30%)); .bd(fade(@bll8,80%));}//
    //<row-start> / <column-start> / <row-end> / <column-end>;
    .blank,
    .portlet-wrapper{.por;
      >i{.i;}
    }
    .border-content{>i{.i;}}
    &.area-left{ grid-area: 1 / 1 / 25 / 7; 
      .portlet-wrapper{
        &:nth-child(3){grid-area:3 / 1 /5/ 2}
      }
    }
    &.area-right{ grid-area: 1 / 19 / 25 / 25; }
    &.area-center{ grid-area: 19 / 7 / 25 / 19; }
    &.area-right{display: grid; grid-template-columns: repeat(1,1fr); grid-template-rows:repeat(3,1fr); grid-gap: 20px;}
    &.area-left{display: grid; grid-template-columns: repeat(1,1fr); grid-template-rows:repeat(4,1fr); grid-gap: 20px;}
    &.area-center{display: grid; grid-template-columns: repeat(2,1fr); grid-template-rows:repeat(1,1fr); grid-gap: 20px; 
      .portlet-wrapper{ margin-top:-8px;}
    }
    
  }
  
  .panelTitleB1{left:0; top:0;}
  // .systemTitle-01{left:40px; transform: none;}
}
</style>