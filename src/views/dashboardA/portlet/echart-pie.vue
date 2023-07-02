<script setup>
const state=reactive({
  chartData:{
    legend:['直接材料费','内部结算成本','其他直接费用','人工成本','折旧及摊销费','间接费用分摊数'],
    colors:[$c.bll5,$c.inl3,$c.aql3,$c.yel3,$c.orl3,$c.rel3],
    data:[325,252,323,183,120,43]
  },
  counter:{title:"费用总量",num:1723},
  chartOption:{}
})

const processData=()=>{
  let {legend,colors,data}=state.chartData,
      processedData=[]
  legend.forEach((item,i)=>{
    processedData.push({
      value:data[i],
      name:legend[i],
      itemStyle:{
        color:colors[i]
      }
    })
  })
  state.chartOption.series[0].data=processedData;
  state.chartOption.legend.data=legend;
}

const processOption=()=>{
  state.chartOption={
    update:false,
    title:{
      show:false,
      text:"",
      x:'center',
      top:'32%',
      textStyle:{
        fontSize:24,
        fontWeight:"bold",
        lineHeight:30
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',//horizontal
      show:true,
      right: '20',
      top:'22%',
      data:[],
      formatter:(name)=>{
        let target;
        for(let i=0;i<state.chartData.data.length;i++){
          if(state.chartData.legend[i]==name){
            target=state.chartData.data[i]
          }
        }
        
        return "{a|"+name+"}"+" "+"{b|"+target+"}"
      },
      textStyle:{
        rich:{
          a:{
              fontSize:14,
              color:$c.bll5,
              padding:10
          },
          b:{
              fontSize:16,
              color:$c.cyl5
          }
        }
      }
    },
    series: [
      {
        name:'数据类别',
        type:'pie',
        radius: ['40%', '65%'],
        center: ['30%', '50%'],
        //roseType: 'radius',
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'outside',
        },
        itemStyle: {
            borderRadius: 10,
            borderColor: $c.bll9,
            borderWidth: 5
        },
        emphasis: {
          label:{
            show: false,
            fontSize: '20',
            color:$c.gyd5,
          }
        },
        labelLine: {
          show: false
        },
        data:[]
      }
    ]
  }
  processData()
}

onMounted(() => {
  processOption();
})
</script>
<template>
  <div class="echart-wrap">
    <div class="total-digital">
      <span class="desc">{{state.counter.title}}</span>
      <DigitalTransform  class="counter" :value="state.counter.num" :interval="1000" :dislocation="false" ></DigitalTransform>
    </div>
    <echartsInit :chartOption="state.chartOption"></echartsInit>
  </div>
</template>
<style lang="less">
.echart-wrap{height: 100%;
  .total-digital{.fc(@cyl5); text-align: center; width: 100px;  .poa; top:52%; left:20%; .fixc("y");
    .desc{display:block; font-size: 18px; margin:0 0 10px 0;}
    .counter{display:block; .ff("en0"); font-size: 24px; font-weight: bold;}
  }
}
</style>
