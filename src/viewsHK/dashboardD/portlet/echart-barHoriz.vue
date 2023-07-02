<script setup>
const state=reactive({
  lineSPColor:$c.gyl3,
  lineAXColor:$c.gyl3,
  fontColor:$c.bk,
  chartData:{
    legend:['收入', '支出'],
    yAxis:['業務1', '業務2', '業務3', '業務4', '業務5', '業務6'],
    colors:[$c.cbl4,$c.bll5,],
    data:[
      [320, 302, 341, 374, 390, 450],
      [-120, -132, -101, -134, -190, -230],
    ],
  },
  chartOption:{}
})

const {lineSPColor,lineAXColor,fontColor}=toRefs(state)




const processData=()=>{
  let {legend,colors,yAxis,data}=state.chartData,
      processedData=[];
  legend.forEach((item,i)=>{
    processedData.push({
      name: legend[i],
      type: 'bar',
      barWidth:10,
      stack: 'Total',
      label: {
        color:$c.wh,
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle:{
        color: $c.fade(colors[i],.9),
        borderRadius: 3
      },
      data: data[i]
    })
  })
  state.chartOption.legend.data=legend;
  state.chartOption.series=processedData;
  state.chartOption.yAxis.data=yAxis;
}

const processOption=()=>{
  state.chartOption={
    update:false,
    // title:{ text:"barA", left:200, top:0, textStyle:{ color:$c.gyl3, fontSize:16, fontWeight:"normal" }, },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      right: '10',
      top: '10',
      textStyle: {
        color: fontColor,
      }
    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '8%',
      top: "15%",
      containLabel: true
    },
    xAxis: { 
      type: 'value',
      axisLine: {
        lineStyle: {
          color: lineAXColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: lineSPColor
        },
      },
      axisLabel: {
        color: fontColor,
        align: 'center',
        interval:0,
      }
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      data: [],
      axisLine: {
        show:true,
        lineStyle: {
          color: lineSPColor,
        },
      },
      splitLine: {
        show:false,
        lineStyle: {
          color: lineSPColor
        },
      },
      axisLabel: {
        formatter: '{value}',
        color: fontColor,
        align: 'right'
      }
    }
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
