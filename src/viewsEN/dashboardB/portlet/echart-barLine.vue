<script setup>
const state=reactive({
  chartData:{
    legend:['Contract cost','Gross profit','Received payment', 'Invoiced','Gross profit margin %','Receipt rate %'],
     xAxis:['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6', 'Data 7', 'Data 8', 'Data 9', 'Data 10', 'Data 11', 'Data 12', 'Data 13', 'Data 14', 'Data 15', 'Data 16', 'Data 17', 'Data 18', 'Data 19', 'Data 20', 'Data 21', 'Data 22', 'Data 23', 'Data 24'],
    colors:[$c.aql2,$c.acl6,$c.bil4,$c.ipl4,$c.rel4,$c.yel3],
    data:[
      [235, 210, 187, 212, 278, 220, 320, 302, 301, 334, 390, 330,300,240,345,235, 210, 187, 212, 278, 220, 320, 302, 301, 334, 390, 330,300,240,345],
      [22, 76, 13, 20,35, 30,20,9,13, 10, 50, 15,88,50, 85,22, 76, 13, 20,35, 60,20,9,13, 10, 80, 15,88,50, 85],
      [193, 185, 122, 76, 70, 120, 135, 24,32,9,13, 110, 132, 53,88,193, 185, 122, 76, 32, 120, 135, 14,42,9,13, 110, 132, 12,88 ],
      [35, 10,22,9,13, 10, 32, 15,0,93, 85, 22, 76, 13, 20,35, 10,0,9,13, 10, 32, 15,0,93, 85, 22, 76, 13, 20],
      [5,20,9,13, 10,  22, 23, 13, 20,35,4, 15,37,0, 54,5,20,9,13, 10,  22, 23, 13, 20,35,4, 15,37,0, 54],
      [35,0, 15,58,0,0,20,9,13, 10, 85, 22, 76, 13, 20,35,0, 15,58,0,0,20,9,13, 10, 85, 22, 76, 13, 20],
    ],
  },
  chartOption:{}
})

const processData=()=>{
  let {legend,colors,xAxis,data}=state.chartData,
      processedData=[],
      yAxisIndex=0,
      xName=[
        "Long contract name text Long contract name text A",
        "Long contract name text Long contract name text B",
        "Long contract name text Long contract name text C",
        "Long contract name text Long contract name text D",
        "Long contract name text Long contract name text E",
        "Long contract name text Long contract name text F",
        "Long contract name text Long contract name text G",
        "Long contract name text Long contract name text H",
        "Long contract name text Long contract name text I",
        "Long contract name text Long contract name text J",
        "Long contract name text Long contract name text K",
        "Long contract name text Long contract name text L",
        "Long contract name text Long contract name text M",
        "Long contract name text Long contract name text N",
        "Long contract name text Long contract name text O",
        "Long contract name text Long contract name text P",
        "Long contract name text Long contract name text Q",
        "Long contract name text Long contract name text R",
        "Long contract name text Long contract name text S",
        "Long contract name text Long contract name text T",
        "Long contract name text Long contract name text U",
        "Long contract name text Long contract name text V",
        "Long contract name text Long contract name text W",
        "Long contract name text Long contract name text X",
        "Long contract name text Long contract name text Y",
        "Long contract name text Long contract name text Z",
        
        
      ];
  
  xAxis.forEach((item,i)=>{
    xAxis[i]=xName[i]//+"1"
  })

  legend.forEach((item,i)=>{
    if(i>3){yAxisIndex=1}
    processedData.push({
      name: legend[i],
      type: i>=legend.length-2?'line':'bar',
      stack: i<2?'01':null,
      barWidth:i==0?20:15,
      label: {
        show: false,
        position: 'insideRight'
      },
      itemStyle:{
        color: $c.fade(colors[i],.9),
        borderRadius: 3,
      },
      z:10-i,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: $c.fade(colors[i],.9) }, 
          { offset: 0.8, color: $c.fade(colors[i],.1) }
        ], false),
        shadowcolor: $c.fade(colors[i],.3),
        shadowBlur: 10
      },
      yAxisIndex:yAxisIndex,
      data: data[i]
    })
  })
  state.chartOption.legend.data=legend;
  state.chartOption.series=processedData;
  state.chartOption.xAxis.data=xAxis;
  state.chartOption.xAxis.axisLabel.formatter=(str,index)=>{  
    // if (index % 2 != 0) { return '\n\n\n' + value; }
    // else{ return value; } 
    let newstr= str, strLT=0,theNum=0;
    for(let i=0;i<str.length;i++){  
      if(strLT<20){
        if(str.charCodeAt(i)>255){
          strLT++
        }else{
          strLT+=0.5
        }
      }else{
        theNum=i;
        break;
      }
    }

    if(theNum>0){ newstr=newstr.substring(0,theNum)+"..."; }
    return newstr;
  }
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
    legend: {
      itemGap: 15,
      left: 'center',
      top: '50',
    },
    dataZoom:[
      {
        type: 'slider',
        xAxisIndex: [0],
        height: 30,
        filterMode: 'filter',
        bottom: 40,
        start:0,
        end:20,
        show: true,
        minSpan:5,
        maxSpan:30,
        moveHandleSize: 15 ,
        showDetail:false
      },
      {
        type: 'inside',// 内置于坐标系中
        start: 0,
        end: 20,
        xAxisIndex: [0],
        minSpan:5,
        maxSpan:30
      },
    ],
    grid: {
      left: '2%',
      right: '2%',
      bottom: '20%',
      top: "25%",
      containLabel: true
    },
    yAxis:[
      {
        type: 'value',
        name: 'Unit:$10K',
        // min: 0,
        // max: 300,
        splitNumber: 3,
        position: 'left',
        axisLabel: {
          formatter: '{value}',
          align: 'right'
        }
      },
      {
        type: 'value',
        name: 'Unit:%',
        min: 0,
        max: 100,
        position: 'right',
        offset: 0,
        splitLine:{ 
          show:false,
        },
        axisLabel: {
          formatter: '{value}',
        }
      },
    ],
      
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        align: 'center',
        interval:0,
        width:90,
        lineHeight:14,
        overflow:"breakAll",
        margin:20,
      },
      
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
