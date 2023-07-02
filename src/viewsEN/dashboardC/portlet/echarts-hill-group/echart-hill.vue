<script setup>
import symbols from "./svg"
const state=reactive({
  chartData:{
    xAxis: ['Software', 'Hardware', 'Service', 'Security', 'Advertising', 'Patent', 'Licensing', 'Investment'],
    colors:[$c.aql4,$c.cbl4,$c.aql3,],
    data: [23, 40, 15, 12, 9, 7, 12, 5],
    symbolSize:[
        [20, 20],
        [18, 20],
        [18, 20],
        [18, 20],
        [20, 14],
        [16, 20],
        [20, 20],
        [20, 20],
    ]
  },
  chartOption:{ }
})

const processData=()=>{
  let {colors,xAxis,data,symbolSize}=state.chartData,
      processedData=[],subData=[]
  
  data.forEach((item,i)=>{
    subData.push({
        value: data[i],
        symbol: symbols['svg'+i],
        symbolSize:symbolSize[i]
      })
  })
  processedData.push({
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '-130%',
    // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      opacity: 0.5
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: data,
    z: 10
  },
  {
    name: 'glyph',
    type: 'pictorialBar',
    barGap: '-100%',
    symbolPosition: 'end',
    symbolSize: 50,
    symbolOffset: [0, '-120%'],
    data: subData
  })
  state.chartOption.series=processedData;
  state.chartOption.xAxis.data=xAxis;
}

const processOption=()=>{
  const {colors}=state.chartData
  state.chartOption={
    update:false,
    title:{ text:"Unit: $10K", right:0, top:0, textStyle:{ fontSize:16, fontWeight:"normal" }, },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        return params[0].name + ': ' + params[0].value;
      }
    },
    grid: {
      left: '5%',
      right: '8%',
      bottom: '8%',
      top: "25%",
      containLabel: true
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      axisLabel: {
        show:false
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: [],
      axisTick: { show: false },
      axisLine: { show:false, },
      splitLine: { show:false, },
      axisLabel: {
        align: 'center'
      }
    },
    color:colors,
    series: []
  }
  processData()
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
