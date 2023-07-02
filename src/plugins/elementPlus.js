import ElementPlus from 'element-plus';
import {ElMessage,ElMessageBox,ElLoading,ElNotification} from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css';

const showMessage=(msg, cls, ms)=>{
  !ms ? ms = 2000 : '';
  ElMessage({
    message: msg,
    showClose: true,
    center: true,
    duration: ms,
    type: cls //success/warning/info/error
  });
}

export default function(app){
  app.use(ElementPlus);
  window.ElMessage=ElMessage
  window.ElMessageBox=ElMessageBox
  window.showMessage=showMessage
  window.ElLoading=ElLoading
  window.ElNotification=ElNotification
}