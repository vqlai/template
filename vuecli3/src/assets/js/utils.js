 import {getHostPlatform} from '@/assets/js/config'
 import AppNative from '@/assets/js/native.js'
// import { PassThrough } from 'stream';
//  import wx from 'weixin-js-sdk'

// 检测移动端的设备信息
export let browser = {
  versions: function () {
    let u = navigator.userAgent, app = navigator.appVersion;
    //移动终端浏览器版本信息
    return {     
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        ios8: !!u.match(/OS [8]_\d[_\d]* like Mac OS X/), //ios8终端  支持不太好，容易闪退，提醒使用微信商城
        purcotton: !!u.match(/PurCotton/),//是否全棉App 2.1.1版本开始添加此参数
        purcottonAndroidVersion: !!u.match(/PurCotton\/[3-9].[9].[2]/),//是否全棉android版本
        // purcottonIosVersion: !!u.match(/PurCotton\/[3-9].[5-9]/),//是否全棉App IOS版本
        purcottonIosVersion: !!u.match(/PurCotton\/[3-9].[9].[2]/),//是否全棉App IOS版本
        purcottonLiveVersion: !!u.match(/PurCotton\/[3-9].[6-9]/),//全棉App3.6版本
     }
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
} 

// 获取老版本的app在IOS安卓在url拼接token等参数
export function getOldAppParams(){
  let params = {}
  if(location.href.indexOf('?') != -1 && location.href.indexOf('#') != -1){
    let arr = location.href.slice(location.href.indexOf('?')+1,location.href.indexOf('#')).split('&')
    for(let item of arr){
      let temp = item.split('=')
      if(temp[0] == 'token' || temp[0] == 'uuid' || temp[0] == 'idfa'){
        params[temp[0]] = temp[1]
      }
    }
  }
  return params
}

// type:1为login，2为register
export function doLogReg(type, path = location.href){
  // let path = url || location.href
  // let { href, protocol, host, pathname, search, hash } = window.location
  // 解决微信分享后打开页面因微信添加的参数导致登录后无法跳转回指定页面
  if(path.includes('?from')){
    path = `${path.split('?')[0]}%23${path.split('#')[1]}`
  }else{
    path = path.replace('#', '%23')
  }
  if(type==1){
    // location.href = `${location.origin}/mobile/mall/memberLogin/toLogin.ihtml?urlPath=${path}`
    location.href = `${location.origin}/wap/login/index.html#/login?urlPath=${path}`
  }else{
    // location.href = `${location.origin}/mobile/mall/member/toRegister.ihtml?urlPath=${path}`
    location.href = `${location.origin}/wap/login/index.html#/Regester?urlPath=${path}`
  }
}

// 判断是否微信客户端
export function isweixin() {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// 下载app
export function downloadApp(){
  location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.smile.purcotton'  
}

// 打开移动端、app、小程序的网页
export function openUrl(url,type,title){
  let retype = getHostPlatform()
  if(retype === 'm'){
    location.href = url
  }else if(retype === 'app'){
    // 安卓终端把#转%23
    if(browser.versions.android){
      url = url.replace('#', '%23')
    }
    let params = {'type': type,'data': url}
    // type为1，2可以加title，但type为7不可以加，无法正确跳转
    if(type == 1 || type == 2){
      params.title = ''
    }
    AppNative.sendAction('mobile', params)
  }else if(retype === 'mp'){
    // wx.miniProgram.navigateTo({url:`../goods_detail/goods_detail?id=${url}`})
    wx.miniProgram.navigateTo({url: url})
  }else{
    console.log('未匹配到项目运行环境')
  }
}

// 将料号转为url
export function prodNoToUrl(prodNo){
  let retype = getHostPlatform()
  let url = ''
  if(retype === 'm'){
    url = `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${prodNo}`
  }else if(retype === 'app'){
    url = prodNo
  }else if(retype === 'mp'){
    url = `../goods_detail/goods_detail?id=${prodNo}`
  }else{
    console.log('未匹配到项目运行环境')
  }
  return url
}

// 图片添加版本号，消除缓存
export function filterImgPath(path){
  return `${path}?v=${new Date().getTime()}`
}

// 废弃，获取app的token  废弃，直接用vue-router获取即可
export function getAppToken(){
  let token = location.href.slice(location.href.indexOf('=')+1,location.href.indexOf('&'))
  // 去除uuid
  let arr = location.href.split('?')
  let arr2 = arr[1].split('=')
  if(arr2[0]=='uuid'){
    token = null
  }
  return token
}

// 废弃，因为安卓ios老版本都会将参数插入到#号前面
export function getIosAppParams(){
  let params = {}
  let arr = location.href.slice(location.href.indexOf('?')+1,location.href.indexOf('#')).split('&')
  for(let item of arr){
    let temp = item.split('=')
    if(temp[0] == 'token' || temp[0] == 'uuid'){
      params[temp[0]] = temp[1]
    }
  }
  return params
}