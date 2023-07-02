<script setup>
const state=reactive({
  lineColor:$c.bll7,
  fontColor:$c.gyl3,
  chartData:{
    legend:['本地视频会议', '异地视频会议'],
    xAxis:['十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月'],
    colors:[$c.bll4,$c.aql4,$c.ipl3,$c.cbl3,],
    data:[
      [235, 210, 187, 212, 278, 220, 320, 302, 301, 334, 390, 330],
      [68, 121, 34, 56, 23, 120, 132, 101, 134, 90, 230, 210]
    ],
  },
  chartOption:{}
})

const {lineColor,fontColor}=toRefs(state)

const processData=()=>{
  let legend=state.chartData.legend,
      colors=state.chartData.colors,
      xAxis=state.chartData.xAxis,
      data=state.chartData.data,
      processedData=[]
  legend.forEach((item,i)=>{
    processedData.push({
      name: legend[i],
      type: 'bar',
      barWidth:15,
      label: {
        show: false,
        position: 'insideRight'
      },
      itemStyle:{
        color: colors[i],
        borderRadius: 5
      },
      data: data[i]
    })
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
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      //show:false,
      data: [],
      top:"5",
      right:60,
      label: { color:fontColor }
    },
    toolbox: {
      feature: {
        magicType: { type: ['line', 'bar'] }
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: "15%",
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color:lineColor },
      },
      splitLine: {
        lineStyle: { color:lineColor },
      },
      axisLabel: { color:fontColor, align: 'right' }
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: { color:lineColor },
      },
      splitLine: {
        lineStyle: { color:lineColor },
      },
      axisLabel: { color:fontColor, align: 'center' }
    },
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
