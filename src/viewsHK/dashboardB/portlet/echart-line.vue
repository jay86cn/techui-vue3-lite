<script setup>
const state=reactive({
  chartData:{
    legend:['本地', '異地'],
    xAxis:['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
    colors:[$c.aql4,$c.bll5,$c.ipl3,$c.cbl3,],
    data:[
      [ 230, 210,220,179,123, 120, 132, 101,168, 181, 134, 126, 134, 190, ],
      [ 301, 334, 390, 330,300,240,235, 210, 187, 212, 278, 220, 320, 302,],
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
      type: 'line',
      barWidth:15,
      label: {
        show: false,
        position: 'insideRight'
      },
      itemStyle:{
        color: colors[i],
        borderRadius: 5
      },
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: $c.fade(colors[i],.9)
        }, {
          offset: 0.8,
          color: $c.fade(colors[i],.1)
        }], false),
        shadowcolor: $c.fade(colors[i],.3),
        shadowBlur: 10
      },
      data: data[i]
    })
  })
  state.chartOption.series=processedData;
  state.chartOption.xAxis.data=xAxis;
  state.chartOption.legend.data=legend;
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
      show:true,
      data: [],
      top:5,
      left:15,
    },
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
      boundaryGap: false,
      data: [],
      axisLabel: { interval:0, align: 'center' }
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
