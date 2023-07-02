<script setup>
const { proxy } = getCtx();
const state=reactive({
  fontColor:$c.wh,
  subFontColor:$c.bk,
  chartData:{
    title:"業務利潤佔比",
    colors:[$c.aql7, $c.cyl5],
    data:[
      {
        name: '軟件',
        children: [
          {
            name: '產品',value:123,
            children: [
              { name: 'GIS系統', value: 49 },
              { name: '可視化', value: 25},
              { name: '財務系統', value: 11 }
            ]
          },
          {
            name: '定制',value:90,
            children: [ 
              { name: '業務系統', value: 35 }, 
              { name: '門戶', value:15 } 
            ]
          }
        ]
      },
      {
        name: '硬件', children: [
          {
            name: '服務器',value:230, children: [ 
              { name: '入門級', value: 43 }, 
              { name: '企業級', value: 121 } 
            ]
          },
          {
            name: '網管設備',value:55, children: [ 
              { name: '安全網關', value: 23 }, 
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
      text:"數據單位:萬元 點擊數據可下鑽",subtext:"", right:20, bottom:0, 
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
