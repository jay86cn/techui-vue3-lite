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
        name: 'software',
        children: [
          {
            name: 'Product',value:123,
            children: [
              { name: 'GIS System', value: 49 },
              { name: 'Visualization', value: 25},
              { name: 'Financial System', value: 11 }
            ]
          },
          {
            name: 'Customization',value:90,
            children: [ 
              { name: 'Business System', value: 35 }, 
              { name: 'Portal', value:15 } 
            ]
          }
        ]
      },
      {
        name: 'Hardware', children: [
          {
            name: 'Servers',value:230, children: [ 
              { name: 'Entry Level', value: 43 }, 
              { name: 'Enterprise', value: 121 } 
            ]
          },
          {
            name: 'Network Devices',value:55, children: [ 
              { name: 'Security Gateway', value: 23 }, 
              { name: 'Router', value: 12 } 
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
      text:"Data unit:million Click on data to drill down",subtext:"", right:20, bottom:0, 
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
