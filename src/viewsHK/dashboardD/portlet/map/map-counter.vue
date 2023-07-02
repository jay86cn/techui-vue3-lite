<template>
  <div class="map-counter-alt-wrap">
    <div class="counter-item" v-for="(item,index) in state.counterList">
      <i :class="'icon '+item.icon"></i>
      <div class="name">{{item.name}} <span class="unit">({{item.unit}})</span></div>
      <div class="content">
        <span class="num">
          <DigitalTransform class="num" :value="item.num" :useGrouping="true" :interval="2000"></DigitalTransform>
          <span class="plus" v-if="item.plus">+{{item.plus}}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>

const state=reactive({
  counterList:[
    {name:"軟件銷售額",icon:"i carbon:ibm-z-cloud-mod-stack",num:13694,unit:"元",plus:218},
    {name:"硬件銷售額",icon:"i carbon:chip",num:14558,unit:"元"},
    {name:"技術服務",icon:"i carbon:user-speaker",num:3962,unit:"元",plus:462},
    {name:"安全服務",icon:"i carbon:rule",num:5302,unit:"元",plus:775},
  ]
})

</script>
<style lang="less">
.mapD-wrap{
  .map-counter-alt-wrap{.poa; left:50%; .fixc("x"); bottom:70px; z-index: 10;
    .counter-item{.bdl(@cbl3,3px); .bdFilter; .bgc(fade(@cbd1,70%)); width: 210px; display:inline-block; height: 80px; margin:0 20px 0 0; padding:10px 0 0 60px; position: relative;
      .icon{.fc(@bll5); font-size: 32px;z-index: 1; .poa;left:5px; top:50%; .fixc("y");  width: 50px; height: 58px; line-height: 60px; text-align: center;}
      .name{.fc(@bll5); font-size: 16px; .ff("cn1"); z-index: 1; .por;
        .unit{font-size: 12px;}
      }
      .content{.fc(@bll5); margin:10px 0;
        .num{font-size: 24px; .por; font-weight: bold;.ff("en0"); .fc(@bll5); 
          .dt-scroll-digital{text-align: center;}
          .plus{.poa; left:101%; top:-5px; font-size: 12px; .fc(@bll5); font-weight: normal; .ff("arial");}
        }
      }
      // &:nth-child(1){.counter-item-re;}
      // &:nth-child(2){.counter-item-ye;}
      // &:nth-child(3){}
      &:last-child{margin:0;}
    }
  }
}


</style>
