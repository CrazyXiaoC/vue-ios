import axios from 'axios'

console.log('why', process.env.VUE_APP_BASE_API)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 3 * 1000, // request timeout
  headers: { 'Content-Type': 'application/json' } 
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
    //config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response) {
      console.log('why no response')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service