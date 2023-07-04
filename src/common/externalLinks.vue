<script setup>
const route = useRoute();
const router = useRouter();
const store = useStore();
const inited=ref(false)
const nav=[
  {label:"Document",path:"http://lite.techui.net/docs"},
  {label:"Gtihub",path:"https://github.com/ayin86/techui-vue3-lite"},
  {label:"Premium",path:"http://techui.net/docs/"},
]

const langs=[
  {label:"简中",value:"cn"},
  {label:"繁中",value:"hk"},
  {label:"English",value:"en"},
]

const goToLink=(item)=>{
  window.open(item.path);
}

const changLang=(item)=>{
  store.state.lang=item.value
  if(item.value=='cn'){
    router.push("/dashboardA-cn");
  }else if(item.value=='hk'){
    router.push("/dashboardA-hk");
  }else if(item.value=='en'){
    router.push("/dashboardA-en");
  }
}

onMounted(() => {
  inited.value=true
})

</script>
<template>
  <div :class="`external-wrap ${inited&&'inited'}`" >
    <div class="link-wrap">
      <div class="item" @click="goToLink(item)" v-for="item in nav">
      {{ item.label }}
      </div>
    </div>
    <div class="lang-switch" >
      <div :class="`item ${store.state.lang==item.value?'active':''}`" @click="changLang(item)" v-for="(item,index) in langs">{{item.label}}</div>
    </div>
  </div>
</template>
<style lang="less">
.external-wrap{.poa; left:40px; top:0; display:flex;  z-index: 20;
  .link-wrap{ display:flex;
    .item{padding:10px; .fc(@bld6); .por; cursor: pointer; .ani;
      &:hover{.fc(@cbl5);}
    }
  }
  .lang-switch{  display:flex; .por; margin:0 0 0 10px;padding:0 0 0 10px;
    &:before{content:""; .bdl(@bld6); .poa; left:0; top:10px; bottom:10px;}
    .item{padding:10px; .fc(@bld6); .por; cursor: pointer; .ani;
      &:before{.poa; top:0; left:50%; .bdr(0 0 10px 10px); .fixc("x"); width: 0%; opacity: 0; .ani; content:" "; height:5px; .bgc(@cbl6);}
      &:hover{.fc(@cbl5);}
      &.active{.fc(@cbl3);
        &:before{ opacity: 1;}
      }
    }
  }
  &.inited{
    .active{
      &:before{width: 90%;}
    }
  }
}
</style>