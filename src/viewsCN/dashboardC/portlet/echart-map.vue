<script setup>
import { $c } from "ayin-color";
const { proxy } = getCtx();
import symbol from "./map/symbol.json"
import counter from "./map/map-counter.vue"
import {httpGetMap} from "@/api/api.js"



const state=reactive({
  map:{},
  colors:{
    pin_A:$c.cyl6,
    pin_B:$c.cbl6,
    font:$c.cbl3,
    fontHov:$c.wh,
    mapBG_A: $c.blA13,
    mapBG_B: $c.blA18,
    mapBG_hov_A: $c.cbA10,
    mapBG_hov_B: $c.blA15,
    mapBD_A: $c.cbA12,
    mapBD_B: $c.cbA13,
    mapGlow: $c.cbl7,
    visualMap:[$c.fade("cbA13",.7),$c.fade("blA19",.7)],
  },
  chartData:{
    alladcode:[],
    geoJson:{},
    dept:[{code:0,name:"liaoningMap"}, ],
    mapData:[],
    pointData:[],
    pinData:[],
    circleData:[],
    warningData:[],
    dangerData:[],
    sum:0,
    maxData:1000,
    minData:0,
    maxPin:90,
    minPin:20,
    layoutCenter:['50%', '53%'],
    layoutSize:"90%",
    visualMapPos:{
      right:"26.5%",
      bottom:"5%"
    }
  },
  chartInstance:"",
  chartOption:{update:false},
  clickData:{
    show:false,
    area:"北京",
    data:"325",
    info:"文字信息",
    x:120,
    y:120
  }
})

const {colors,chartData,chartOption}=state;

const initChart=()=>{
  state.chartData.geoJson.code=0
  state.chartData.geoJson.name="liaoningMap"
  echarts.registerMap("liaoningMap", state.chartData.geoJson);
  state.chartInstance = echarts.init(proxy.$refs.map);
  
  getMapData();
}

const getMapData=()=>{
  let mapData = [],pointData=[] ,pinData = [], circleData = [],warningData = [],dangerData = [], sum = 0,
      topIndex=[12,8,6,7,11,14],warnIndex=[13,5],dangerIndex=[3];

  state.chartData.geoJson.features.forEach((geo,i) => {
    if(geo.properties.name){
      let value = proxy.randomNumber(1,chartData.maxData/3)
      let maxValue = proxy.randomNumber(chartData.maxData/2,chartData.maxData)
      
      if(geo.properties.center){
        if(topIndex.includes(i)){
          let pin={
            name: geo.properties.name,
            value: [geo.properties.center[0], geo.properties.center[1], maxValue],
            cityCode: parseInt(geo.properties.adcode)
          }
          pinData.push(pin)
          pointData.push(pin)
        }else if(warnIndex.includes(i)){
          warningData.push({
            name: geo.properties.name,
            value: [geo.properties.center[0], geo.properties.center[1], 'warning',"区域数据触发异常告警"],
            cityCode: parseInt(geo.properties.adcode)
          })
        }else if(dangerIndex.includes(i)){
          dangerData.push({
            name: geo.properties.name,
            value: [geo.properties.center[0], geo.properties.center[1], 'danger',"区域数据触发危急告警"],
            cityCode: parseInt(geo.properties.adcode)
          })
        }else{
          if(value<100){ value=0 }
          let circle={
            name: geo.properties.name,
            value: [geo.properties.center[0], geo.properties.center[1], value],
            cityCode: parseInt(geo.properties.adcode)
          }
          pointData.push(circle)
          circleData.push(circle)
        }
        
      }
      sum += value
    }
  })
  state.chartData.mapData=mapData;
  state.chartData.pointData=pointData;
  state.chartData.pinData=pinData;
  state.chartData.circleData=circleData;
  state.chartData.warningData=warningData;
  state.chartData.dangerData=dangerData;
  state.chartData.sum=sum;

  processOption()
}

const processOption=(current)=>{
  current=state.chartData.dept[0]
  const {visualMapPos,layoutCenter,layoutSize}=state.chartData
  let tempOption={
    title: {
      show:false,
      text: current.name,
      left: 'center'
    },
    geo:{
      type: 'map',
      map: current.name,
      roam: true,
      scaleLimit: {
        min: .5,
        max: 3
      },
      //zoom :1.2,
      layoutCenter:layoutCenter,
      layoutSize:layoutSize,
      zlevel:1,
      label: {
        show: true,
        color:colors.font,
        fontSize: 12,
        formatter: p => {
          return p.name; 
        },
        //offset:[0,10],
      },
      
      itemStyle: {
        borderColor:  new echarts.graphic.LinearGradient( 0, 0, 0, 1, [
          { offset: 0, color: colors.mapBD_A }, 
          { offset: 1, color: colors.mapBD_B }
        ], false),
        borderWidth: 2,
        shadowColor: colors.mapGlow,
        shadowOffsetY: 0,
        shadowBlur: 10,
        areaColor: { x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: $c.fade(colors.mapBG_A,.5) }, 
            { offset: 1, color: $c.fade(colors.mapBG_B,.5) }
          ],
        },
      },
      select:{
        label: {
          show:true,
          color:colors.fontHov,
          fontSize: 14,
        },
        itemStyle: {
          areaColor: { x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: $c.lighten(colors.mapBG_hov_A,.2) }, 
              { offset: 1, color: $c.lighten(colors.mapBG_hov_B,.2) }
            ],
          },
        }
      },
      emphasis: {
        label: {
          color:colors.fontHov,
          fontSize: 14,
          show: true
        },
        itemStyle: {
          areaColor: { x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: $c.fade(colors.mapBG_hov_A,.5) }, 
              { offset: 1, color: $c.fade(colors.mapBG_hov_B,.5) }
            ],
          },
        }
      },
    },
    series: [ ]
  }
  // tempOption.visualMap={
    
  //   type: "continuous",
  //   right:visualMapPos.right,
  //   bottom:visualMapPos.bottom,
  //   min:0,
  //   max:chartData.maxData,
  //   seriesIndex:0,
  //   orient:"horizontal",
  //   // backgroundColor: 'red',
  //   inRange:{
  //     color:colors.visualMap,
  //   },
  //   textStyle:{
  //     color:colors.font,
  //   },
  //   calculable: true 
  // }
 
  for(let a in tempOption){
    state.chartOption[a]=tempOption[a]
  }
  processMapData(current)
}

const processMapData=(current)=>{
const {mapData,pointData,pinData,circleData,warningData,dangerData,sum,dept,maxData,minData,maxPin,minPin}=chartData
// let currentDept=dept[dept.length-1]
// let seriesData=convertData(circleData['code'+currentDept.code],currentDept)
let mapD=[]
mapD.push(
  {
    data: pointData,
    geoIndex: 0,
    type:'map',
  },
  {
    symbolSize: 5,
    label: {
      position: 'center',
      align:"center",
      show: false,
      color: colors.font,
      fontSize: 12,
      formatter: function(para) {return para.data.name },
    },
    emphasis: {
      label: {
        show:false,
        fontSize: 14,
        color:colors.fontHov,
        fontWeight:"bold",
      }
    },
    symbolOffset: [0, 0],
    itemStyle: {
      color: '#fff'
    },
    name: 'light',
    type: 'scatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    data: pointData,
  },
  {
    type: 'scatter',
    symbol: 'circle',
    coordinateSystem: 'geo',
    symbolOffset: [0, 0],
    large:true,
    label: {
      show: false,
    },
    emphasis: {
      label: {
        fontSize: 14,
        color:colors.fontHov,
        fontWeight:"bold",
      }
    },
    itemStyle: {
      color: colors.pin_A,
    },
    symbolSize:20,
    data: circleData,
    zlevel: 2,
  },
  {
    type: 'scatter',
    symbol: 'pin',
    // type: 'effectScatter',
    // symbol: 'circle',
    coordinateSystem: 'geo',
    // rippleEffect: { brushType: 'stroke' },
    // showEffectOn: 'render',
    symbolOffset: [0, 0],
    large:true,
    label: {
      show: true,
      position:"inside",
      //offset:[0 ,5],
      align:"center",
      color: $c.wh,
      fontSize: 14,
      formatter: p => {
        if(p.data.value[2].toString().length>4){
          return (p.data.value[2]/10000).toFixed(0)+"万"
        }else{
          return p.data.value[2]
        }
      },
      // rich: { val:{ padding:[20,0,20,0], fontSize: 12, color:$c.re, }, cnNum: { fontSize: 12, color:$c.wh, } },
    },
    emphasis: {
      label: {
        fontSize: 18,
        color:colors.fontHov,
        fontWeight:"bold",
        // formatter: function(para) { return para.data.value[2] },//para.data.name +" : " + 
      }
    },
    itemStyle: {
      color:{
        type: 'radial', x: 0.3, y: 0.3, r: 0.5,
        colorStops: [
          { offset: 0, color: colors.pin_A }, 
          { offset: 1, color: colors.pin_B }
        ],
        global: false // 缺省为 false
      }
    },
    symbolSize: (val)=> {
      var a = (maxPin - minPin) / (maxData - minData);
      var b = maxPin - a * minData;
      b = maxPin - a * maxData;
      return a * val[2] + b * 1.3;
    },
    data: pinData,
    zlevel: 2,
  },
  {
    type: "scatter",
    symbol: symbol.icon,
    coordinateSystem: 'geo',
    symbolOffset: [0, -10],
    label: { show: false, },
    itemStyle: {
      color: {
        type: 'radial', x: 0.3, y: 0.3, r: 0.5,
        colorStops: [
          { offset: 0, color: $c.yel1}, 
          { offset: 1, color: $c.yel6}
        ],
        global: false // 缺省为 false
      },
    },
    symbolSize: 24,
    emphasis: { scale:1.5,},
    data: warningData,
    zlevel: 2,
  },
  {
    type: "scatter",
    symbol: symbol.icon,
    coordinateSystem: 'geo',
    symbolOffset: [0, -10],
    label: { show: false, },
    
    itemStyle: {
      color: {
        type: 'radial', x: 0.3, y: 0.3, r: 0.5,
        colorStops: [
          { offset: 0, color: $c.rel3}, 
          { offset: 1, color: $c.rel5}
        ],
        global: false // 缺省为 false
      },
    },
    symbolSize: 24,
    emphasis: { scale:1.5,},
    data: dangerData,
    zlevel: 2,
  }
  
)
state.chartOption.series=mapD
state.chartInstance.setOption(state.chartOption,true);
}

onMounted(()=>{
  httpGetMap("/static/maps/","shenyangCN.json").then((res)=>{
    console.log("mapRes",res);
    state.chartData.alladcode=res;
    state.chartData.geoJson=res;
    initChart()
  })
})

</script>
<template>
  <div class="mapC-wrap">
    <counter></counter>
    <div ref="map" class="full-map"></div>
  </div>
</template>
<style scoped lang="less">
.mapC-wrap{.poa; .fullbox; 
  .full-map{.poa; .fullbox;  z-index: 5; .bgc(@tr);}
}
</style>
