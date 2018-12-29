import axios from 'axios'
// import {router} from '../router/index.js'
import {Toast} from 'vant'
import {AXIOS_DEFAULT_CONFIG} from '@/assets/js/config.js'


let qs = require('qs')

// 创建axios实例
const ax = axios.create(AXIOS_DEFAULT_CONFIG)

// 请求拦截
ax.interceptors.request.use(config => {
  if (
     config.method === 'post' ||
     config.method === 'put' ||
     config.method === 'delete' ||
     config.method === 'patch'
   ) {
     config.data = qs.stringify(config.data)
   }
	// 处理请求前逻辑
	// if (window.sessionStorage.getItem('token')) {
  //   config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`
  // }
	return config
}, error => {
  Toast('请求异常，请稍后在试')
	return Promise.reject(error)
}) 

// 正常响应走response，抛出的异常走error
ax.interceptors.response.use( response => {
  return response
}, error => {
  Toast('响应异常，请稍后在试')
	return Promise.reject(error)
})

export default ax