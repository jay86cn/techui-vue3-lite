<script setup>
const state=reactive({
  chartData:{
    legend:['Business A', 'Business B'],
    xAxis:['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    colors:[$c.bll4,$c.aql4,$c.ipl3,$c.cbl3,],
    data:[
      [235, 210, 187, 212, 278, 220, 320, 302],
      [68, 121, 34, 56, 23, 120, 132, 101, 134]
    ],
  },
  chartOption:{}
})

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
      // barWidth:10,
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
    },
    // toolbox: { feature: { magicType: { type: ['line', 'bar'] } }, },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: "20%",
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLabel: {align: 'right' }
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: { align: 'center' }
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
