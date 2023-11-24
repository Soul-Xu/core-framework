import axios from "axios"

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理
    return data
  }],
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理
    return data
  }],
})

// 添加请求拦截器
axiosInstance.interceptors.request.use((config: any) => {
  // 在发送请求之前做些什么
  const cookie = localStorage.getItem("cookie")
  console.log("request-cookie-11111111111", cookie)
  console.log("request-11111111111", config)
  config.headers['Authorization'] = cookie
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers.withCredentials = true
  config.headers.crossDomain = true
  config.headers['Content-Type'] = 'application/json charset=utf-8'
  console.log("request", config)
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // if (typeof response.data === 'string') {
  //   response = {
  //     ...response,
  //     data: JSON.parse(response.data)
  //   }
  // }
  console.log("response", response)
  return response
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request)
  } else {
    // 发送请求时出了点问题
    console.log('Error', error.message)
  }
  console.log(error.config)
  console.log(error.toJSON())
  return Promise.reject(error)
})

export default axiosInstance