import axios from "axios"
import {
  showMessage
} from "./status" // 引入状态码文件
import {
  message
} from "ant-design-vue"
import router from "@/router/index.js"
import {snake2camel, camel2snake} from './util';
// import { useRouter } from "vue-router/dist/vue-router.js"
// 设置接口超时时间
axios.defaults.timeout = 60000

// let router = useRouter()
// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL =
  import.meta.env.VITE_BASE_API
// import.meta.env.VITE_API_DOMAIN;

//http request 拦截器
axios.interceptors.request.use(
  req => {
    let token = localStorage.getItem("user:token")
    if (token) {
      req.headers = {
        "Content-Type": "application/json;charset=UTF-8", // 传参方式json
        "Authorization": token // 这里自定义配置，这里传的是token
      }
    } else {
      req.headers = {
        "Content-Type": "application/json;charset=UTF-8" // 传参方式json
      }
    }
    if (req.params) {
      req.params = camel2snake(req.params)
    }
    if (req.data) {
      req.data = camel2snake(req.data)
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
//     (response) => {
//     if (response.status == 200) {
//         return Promise.resolve(response);
//     } else {
//         return Promise.reject(response);
//     }
// }
  response => {
    // return response
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response && response.data) {
      response.data = snake2camel(response.data)
    }
    return Promise.resolve(response.data)
  },
  error => {
    const {
      response
    } = error
    if (response) {
      console.log("in response = ", response)
      if (response.status === 401) {
        console.log("router = ", router)
        router.push({
          path: "/login",
          query: {
            back: router.currentRoute.value.fullPath
          }
        })
        // Dialog.confirm({
        //   message:
        //     "请登录后在进行操作"
        // })
        //   .then(() => {
        //
        //   })
        //   .catch(() => {
        //     // on cancel
        //   })
        localStorage.removeItem("user")
        localStorage.removeItem("user:token")
        return Promise.reject(response.data)
      }
      if (response.data.msg) {
        message.error(response.data.msg)
        return Promise.reject(response.data)
      } else {
        message.error(showMessage(response.status))
        return Promise.reject(response.data)
      }
      // if (response.data.msg)
      // return Promise.resolve(response.data.msg);
    } else {
      console.log("err", error)
      message.error("网络连接异常,请稍后再试!")
      return Promise.reject()
    }

  }
)

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}