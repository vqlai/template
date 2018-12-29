/**
 * 项目参数配置
 **/

// 当前宿主平台 兼容多平台应该通过一些特定函数来取得（app, m）
// export const HOST_PLATFORM = 'm' || location.hostname.split('.')[0]
export function getHostPlatform (type){
  if(process.env.ENV_TYPE === 'dev'){
    return type || 'm'
  }else if(process.env.ENV_TYPE === 'prod'){
    // 测试为m-test,app-test mp-test 正式为m app mp
    // let hostname = location.hostname.split('.')[0] 
    // hostname.indexOf('m') !== -1
    let hostName = location.hostname.split('.')[0]
    if(hostName.startsWith('m')){
      return 'm'
    }else if(hostName.startsWith('app')){
      return 'app'
    }else if(hostName.startsWith('mp')){
      return 'mp'
    }else{
      console.log('未匹配到项目运行环境')
    }
  }
}

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  // baseURL: process.env.BASE_API, // 线上使用
  // baseURL: '/mall/activityExtensionH5Controller', // 线上使用
  // baseURL: process.env.ENV_TYPE === 'dev' ? '/api' : '', // 开发使用代理,注意后台有没有基础路径
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api', // 开发使用代理,注意后台有没有基础路径
  timeout: 20000, // 请求超时时间
  // maxContentLength: 2000,
  headers: {}
}

