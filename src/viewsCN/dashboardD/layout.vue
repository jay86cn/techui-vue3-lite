<script setup>
import echartBarHoriz from "./portlet/echart-barHoriz.vue"
import echartLine from "./portlet/echart-line.vue"
import echartBarHorizScroll from "./portlet/echart-barHorizScroll.vue"
import echartGaugeTriple from "./portlet/echart-gaugeTriple.vue"
import echartSunburst from "./portlet/echart-sunburst.vue"
import counterGrid from "./portlet/counter-grid.vue"
import echartMap from "./portlet/echart-map.vue"
import mainNav from "@/common/mainNav.vue"
import externalLinks from "@/common/externalLinks.vue"

const comps={
  echartBarHoriz,
  echartLine,
  echartBarHorizScroll,
  echartGaugeTriple,
  echartSunburst,
  echartMap,
  counterGrid,
}
const state=reactive({
  systemTitleConfig:{
    width:1000,
    decoration:false,
    backgroundColor:$c.cbA01,
    decorationColor:[$c.cbA02,$c.bll5],
    fontColor:[$c.bll7,$c.bll5]
  },
  panelTitleConfig:{
    width:160,
    color:$c.bk,
  },
  dialogConfig:{
    show:false,
    width:'60%',
    height:'60%',
    title:"对话框标题",
    titleWidth:350,
  },
  // panelTitleConfig:{
  //   width:180,
  //   theme:true
  // },
  
  areas:[
    {name:"left",portlets:[
      {id:"l2",title:"收支情况",component:"echartBarHoriz",border:"aYinTechBorderA1",hideTitle:true},
      {id:"l3",title:"业务收益情况",component:"echartLine",border:"aYinTechBorderA1",hideTitle:true},
      {id:"l1",title:"销售任务",component:"echartBarHorizScroll",border:"aYinTechBorderA1",hideTitle:true},
    ]},
    {name:"right",portlets:[
      {id:"r1",title:"销售情况",component:"counterGrid",border:"blank",hideTitle:true},
      {id:"r2",title:"任务完成情况",component:"echartGaugeTriple",border:"aYinTechBorderA1",hideTitle:true},
      {id:"r3",title:"业务利润占比",component:"echartSunburst",border:"aYinTechBorderA1"},
    ]},
    
  ]
      
})

const {systemTitleConfig,panelTitleConfig,dialogConfig,areas}=toRefs(state)

const getConfig=(item)=>{
  const {id}=item
  if(id=='r3'){
    return {
      directionAlt: true,
      rotate: "z",
      opacity: 0.8,
      backgroundColor:$c.gyl1,
      decorationColor:[$c.cyl3,$c.bll4],
      borderColor:$c.gyl5,
      titleColor:$c.bk
    }
  }else if(id.includes("l")){
    return {
      title:item.title,
      titleWidth:120,
      decoration:false,
      decorationAlt: true,
      rotate: "y",
      opacity: 0.8,
      backgroundColor:$c.gyl1,
      decorationColor:[$c.cyl3,$c.bll4],
      borderColor:$c.gyl5,
      titleColor:$c.bk,
      fontWeight:"bold"
    }
  }else{
    return {
      title:item.title,
      titleWidth:120,
      decoration:false,
      opacity:.8,
      backgroundColor:$c.gyl1,
      decorationColor:[$c.cyl3,$c.bll4],
      borderColor:$c.gyl5,
      titleColor:$c.bk,
      fontWeight:"bold"
    }
  }
}

onMounted(()=>{
  
})


</script>
<template>
  <div class="screen1080D">
    <mainNav></mainNav>
    <externalLinks></externalLinks>
    <div :class="`area-box area-${area.name}`" v-for="area in areas">
      <div class="portlet-wrapper" v-for="(item,index) in area.portlets">
        <component v-if="item.border" :is='item.border' :config="getConfig(item)">
          <panelTitleA1 v-if="!item.hideTitle" :config="panelTitleConfig" >{{item.title}}</panelTitleA1>
          <component :is='comps[item.component]' ></component>
        </component>
        <template v-else>
          <component :is='item.component'></component>
          <i>{{item.component}}</i>
        </template>
      </div>
    </div>
    <systemTitleA2 :config="systemTitleConfig">TechUI数据可视化成型工具</systemTitleA2>
    <echartMap></echartMap>
  </div>
</template>
<style lang="less">
.screen1080D{ z-index: 1;padding:60px 30px 30px 30px; height: 100%; //url(../common/images/bg.png) 
  .techButtonA2 {z-index: 10; .poa; bottom:20px; left:50%; .fixc("x");}
.i(){.poa; bottom:0; right:10px; font-size: 12px; opacity: .1; .fc(@wh); z-index: 10;}
  display: grid; grid-template-columns: repeat(24,1fr); grid-template-rows:repeat(24,1fr); grid-gap: 30px;
  .area-box{.bdr(5px);  pointer-events: visible; position: relative; z-index: 10; 
    .board-3d-wrap{ .poa; .fullbox;

    }
    //<row-start> / <column-start> / <row-end> / <column-end>;
    .blank,
    .portlet-wrapper{.por;
      >i{.i;}
    }
    .border-content{>i{.i;}}
    &.area-left{ grid-area: 1 / 1 / 25 / 7; }
    &.area-right{ grid-area: 1 / 19 / 25 / 25; 
      .portlet-wrapper{
        &:nth-child(3){grid-area:3 / 1 /5/ 2}
      }
    }
    &.area-left{ display: grid; grid-template-columns: repeat(1,1fr); grid-template-rows:repeat(3,1fr); grid-gap: 20px;}
    &.area-right{ display: grid; grid-template-columns: repeat(1,1fr); grid-template-rows:repeat(4,1fr); grid-gap: 20px;}
  }
  .content-tabs{.poa;  top:-40px; left:80px; right:80px; text-align: center; height: 40px;
    &:before{content:" "; .bdb(var(--button-bd_hov));left:0; right:0; bottom:10px;.poa; z-index: 1;}
    .tabs-item{display:inline-block; padding:0 10px; .ff("cn1"); .fc(var(--font-normal)); height: 30px;line-height: 30px; cursor: pointer; .ani; z-index: 2; .por;
      &:before{content:" "; .bgc(var(--button-bd_hov)); .poa; .fullbox; opacity: 0;}
      &:hover{&:before{opacity: .3;}}
      &.active{ .bdb(var(--font-strong)); .fc(var(--font-strong));}
    }
  }
  .nav-wrap{
    .item{.fc(@gym5);
      &:before{ .bgc(@cbl3);}
      &:hover{.fc(@cbl5);}
      &.active{.fc(@bk); }
    }
  }
}
</style>