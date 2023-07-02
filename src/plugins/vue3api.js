import { ref, reactive,toRefs,toRaw,h,computed,watch,shallowRef, getCurrentInstance,onMounted,onBeforeMount,onBeforeUnmount,onUnmounted,nextTick,defineEmits } from 'vue'
import { useRoute, useRouter ,onBeforeRouteUpdate } from "vue-router"
import { useStore, mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default function(app){
  //vue
  window.ref = ref
  window.reactive = reactive
  window.toRefs = toRefs
  window.toRaw = toRaw
  window.h = h
  window.computed = computed
  window.watch = watch
  window.shallowRef = shallowRef
  window.getCurrentInstance=getCurrentInstance
  window.getCtx=getCurrentInstance
  window.onMounted=onMounted
  window.onBeforeMount=onBeforeMount
  window.onBeforeUnmount=onBeforeUnmount
  window.onUnmounted=onUnmounted
  window.nextTick=nextTick 
  window.defineEmits=defineEmits 

  //router
  window.useRoute=useRoute
  window.useRouter=useRouter
  window.routeUpdate=onBeforeRouteUpdate
  
  //vuex
  window.useStore=useStore
  window.mapState=mapState
  window.mapGetters=mapGetters
  window.mapMutations=mapMutations
  window.mapActions=mapActions
  
}

