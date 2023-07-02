<script setup>
const { proxy } = getCtx();
const state=reactive({
  fontColor:$c.wh,
  subFontColor:$c.bk,
  chartData:{
    title:"业务利润占比",
    colors:[$c.aql7, $c.cyl5],
    data:[
      {
        name: '软件',
        children: [
          {
            name: '产品',value:123,
            children: [
              { name: 'GIS系统', value: 49 },
              { name: '可视化', value: 25},
              { name: '财务系统', value: 11 }
            ]
          },
          {
            name: '定制',value:90,
            children: [ 
              { name: '业务系统', value: 35 }, 
              { name: '门户', value:15 } 
            ]
          }
        ]
      },
      {
        name: '硬件', children: [
          {
            name: '服务器',value:230, children: [ 
              { name: '入门级', value: 43 }, 
              { name: '企业级', value: 121 } 
            ]
          },
          {
            name: '网管设备',value:55, children: [ 
              { name: '安全网关', value: 23 }, 
              { name: '路由器', value: 12 } 
            ]
          }
        ]
      }
    ],
    dataMax:300
  },
  chartOption:{},
  dataOri:[]
})

const {dataOri,fontColor,subFontColor}=toRefs(state)

const mapLinkAction=(data,time)=>{
  const {chartData}=state
  data.forEach((item,i)=>{
    if(time==1&&item.value){
      let rmdval=i*proxy.randomNumber(time*10,100)
      item.value=rmdval
      chartData.dataMax+=rmdval
    }else if(item.value){
      delete item.value
    }
    if(item.children&&item.children.length>0){
      const num=time-1
      mapLinkAction(item.children,num)
    }
  })
}

const processData=()=>{
  const {colors,data}=state.chartData;
  let processedData=[],
      type="bar",
      yAxisIndex=0;
  processedData.push({
    type: 'sunburst',
    data: data,
    radius: [20, '80%'],
    center:['53%','50%'],
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
      borderColor:$c.wh,
    },
    label: {
      show: true,
      color:fontColor,
      fontSize: 12,
      rotate: 'tangential'//文字旋转
      // formatter: function (param) {
      //   return param.name+'\n'+param.value
      // }
    },
    emphasis: {
      label:{
        show: true,
        fontSize: '16',
        color:$c.bk,
        formatter: function (param) {
          return param.name+'\n'+param.value
        }
      }
    },
    levels: [{},]
  })
  state.chartOption.series=processedData;
}

const processOption=()=>{
  const {dataMax,colors}=state.chartData
  state.chartOption={
    update:false,
    title:{ 
      text:"数据单位:万元 点击数据可下钻",subtext:"", right:20, bottom:0, 
      textStyle:{ color:subFontColor, fontSize:12, fontWeight:"normal" }, 
    },
    visualMap: {
      type: 'continuous',
      left:10,
      bottom:40,
      min: 0,
      max: dataMax,
      inRange: {
        color: colors
      },
      textStyle:{
        color:fontColor,
      },
    },
    series: []
  }
  processData();
}

onMounted(() => {
  processOption();
})
</script>
<template>
  <echartsInit :chartOption="state.chartOption"></echartsInit>
</template>
<style lang="less">
</style>
