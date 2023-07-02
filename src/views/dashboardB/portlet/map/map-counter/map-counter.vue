<template>
  <!--本组件后续会封装成标注组件，通过参数来配置不同的风格和外观-->
  <div class="map-counter-wrap">
    <div class="counter-item" v-for="(item,index) in state.counterList">
      <div class="content">
        <DigitalTransform class="num" :value="item.num" :useGrouping="false" :interval="2000"></DigitalTransform>
      </div>
      <div class="name">{{item.name}} <span class="unit">({{item.unit}})</span></div>
      <echartLine :barColor="item.barColor"></echartLine>
    </div>
  </div>
</template>
<script setup>
import echartLine from "./echart-line.vue"

const state=reactive({
  counterList:[
    {name:"软件年盈利",num:394,unit:"万元",barColor:$c.rel3},
    {name:"硬件年盈利",num:42558,unit:"万元",barColor:$c.yel3},
    {name:"服务年盈利",num:50262,unit:"万元"},
    {name:"安全年盈利",num:50262,unit:"万元"},
  ]
})

</script>
<style lang="less">
.counter-item-re(){.bgc(fade(@red9,90%));
  .name{.fc(@rer4);
    .unit{.fc(@rer4);}
  }
  .content{
    .num,
    .num .plus{.fc(@rer4);}
  }
}
.counter-item-ye(){.bgc(fade(@yed9,90%));
  .name{.fc(@yer5);
    .unit{.fc(@yer5);}
  }
  .content{
    .num,
    .num .plus{.fc(@yer5);}
  }
}


  .map-counter-wrap{.poa; left:50%; .fixc("x"); top:80px; z-index: 10;
    .counter-item{  width: 190px; display:inline-block; .bgc(fade(@bll9,80%)); height: 60px; margin:0 20px 0 0; padding:10px 0 0 10px; position: relative;.bdr(5px);
      .name{.fc(var(--font-normal)); font-size: 12px; .ff("cn1"); z-index: 1; .poa; left:5px; top:5px;
        .unit{font-size: 12px;}
      }
      .content{.fc(var(--font-normal));.poa; right:5px; top:5px;
        .num{font-size: 18px; .por; .ff(impact);.fc(var(--font-normal));
          .plus{.poa; left:101%; top:-5px; font-size: 12px; .fc(var(--font-normal)); font-weight: normal; .ff("arial");}
        }
      }
      .echartsInit-wrap{.poa!important; left:0; right:0; bottom:0; height: 25px!important;min-height: 25px!important;}

      &:nth-child(1){.counter-item-re;}
      &:nth-child(2){.counter-item-ye;}
      &:nth-child(3){}
      &:last-child{margin:0;}
    }
  }


</style>
