<script setup>
const state=reactive({
  chartData:{
    title:"任务完成情况",
    legend:['开发任务1','采购任务2','销售任务3'],
    colors:[$c.aql4, $c.cyl4,$c.cbl3],
    colorsD:[$c.aql8,$c.cyl8,$c.bll8],
    data:[72,14,36],
    radius:["60%","75%","60%"],
    position:[
      ['17%', '55%'],
      ['50%', '55%'],
      ['83%', '55%'],
    ],
  },
  chartOption:{}
})

const processData=()=>{
  const {legend,colors,colorsD,data,radius,position}=state.chartData;
  let processedData=[],
      type="bar",
      yAxisIndex=0;
  legend.forEach((item,i)=>{
    processedData.push({
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      center: position[i],
      radius: radius[i],
      pointer: { show: false },
      title: { fontSize: 14 },
      itemStyle: {
        color: colors[i],
        shadowColor: colors[i],
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {}
      },
      detail: {
        width: 50,
        height: 14,
        borderColor: 'inherit',
        borderRadius: 20,
        borderWidth: 0,
        formatter: function (value) {
          return '{value|' + value.toFixed(0) + '}{unit|%}';
        },
        rich: {
          value: { fontSize: 24, color:colors[i], fontWeight: 'bolder'},// color: '#999',
          unit: { fontSize: 12, color:$c.darken(colors[i],1),}
        }
      },
      axisLine: {
        lineStyle: {color: [[1, $c.darken(colors[i],4)]], width:10 }
      },
      splitLine: { show: false, distance: 0, length: 10 },
      axisTick: { show: false },
      axisLabel: { show: false, distance: 50 },
      data:[
        {
          value: data[i],
          name: legend[i],
          title: { color:$c.lighten(colors[i],1), offsetCenter: ['0%', '30%'] },
          detail: { valueAnimation: true, offsetCenter: ['0', '-30%'] }
        }
      ],
    })
    
  })
  state.chartOption.series=processedData;
}

const processOption=()=>{
  state.chartOption={
    update:false,
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
