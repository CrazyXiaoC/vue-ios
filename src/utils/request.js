import axios from 'axios'

console.log('why', process.env.VUE_APP_BASE_API)

// create an axios instance
const service = axios.create({
  baseURL: 'http://172.20.10.2:8081/', // api 的 base_url
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 3 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token
    //   config.headers['Authorization'] = getToken()
    // }
    // default to application/json
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

export default service