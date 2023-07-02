<script setup>
const state=reactive({
  chartData:{
    legend:['埋深'],
    colors:[$c.bll5,],
    data:[235, 210, 187, 212, 278, 220, 320, 302, 301, 334],
  },
  chartOption:{ }
})

const props=defineProps({ 
  barColor:{
    type:String,
    default:""
  },
})

const processData=()=>{
  const {barColor}=props
  let {colors,xAxis,data}=state.chartData,
      processedData=[],
      color=barColor?barColor:colors[0]
  processedData.push({
    type: "line",
    symbolSize: 0,
    label: { show: false, },
    itemStyle:{
      color: $c.fade(color,.1),
      borderRadius: 3,
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: $c.fade(color,.9)
      }, {
        offset: 0.8,
        color: $c.fade(color,.5)
      }], false),
      // shadowcolor: $c.fade(color,.3),
      // shadowBlur: 10
    },
    smooth: true,
    data: data
  })
  state.chartOption.series=processedData;
  state.chartOption.xAxis.data=xAxis;
}

const processOption=()=>{
  state.chartOption={
    update:false,
    // title:{ text:"barA", left:200, top:0, textStyle:{ color:$c.gyl3, fontSize:16, fontWeight:"normal" }, },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    yAxis:{
      type: 'value',
      axisLine: {show:false},
      splitLine: {show:false},
      axisLabel: {show:false}
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLine: {show:false},
      splitLine: {show:false},
      axisLabel: {show:false,}
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
