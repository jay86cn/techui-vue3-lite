import "@/assets/less/main.less";
import axios from 'axios'
// import {AyinColor} from "ayin-color"

export default function(app){
  window.axios=axios
  // app.use(AyinColor)

  // const comps=[ ];
  // comps.forEach((com,a) => {
  //   let cona=com.name?com.name:com.__name
  //   app.component(cona,com);
  // });
}

