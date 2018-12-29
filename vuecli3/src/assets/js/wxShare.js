import wx from 'weixin-js-sdk'
// import {getWxConfig} from '@/api/activity/expand.js'

// 注意微信端鉴权失败无法分享，分享的链接不是在配置的域内无法分享
// 注意app内的微信分享，安卓需要对#号url加密，ios可不用

// 将json对象字符串转为json对象
function evil(str){
  // 一个变量指向Function，防止有些前端编译工具报错
  let Fn = Function 
  return new Fn('return ' + str)()
}

// export function wxConfig(config){
//   return new Promise((resolve, reject)=>{
//     if(
//       !sessionStorage.getItem('wxAppid') && 
//       !sessionStorage.getItem('wxTimestamp') && 
//       !sessionStorage.getItem('wxNonceStr') && 
//       !sessionStorage.getItem('wxSignature')
//     ){
//       getWxConfig({resendUrl: location.href.split('#')[0]}).then(res=>{
//         if(res.data.success){
//           let result = res.data.data
//           let wxConfig = evil(result.split("(")[1].split(")")[0])
//           sessionStorage.setItem('wxAppid',wxConfig.appId)
//           sessionStorage.setItem('wxTimestamp',wxConfig.timestamp)
//           sessionStorage.setItem('wxNonceStr',wxConfig.nonceStr)
//           sessionStorage.setItem('wxSignature',wxConfig.signature)
//           resolve(true)
//         }else{
//           reject(false) 
//         }
//       })
//     }else{
//       resolve(true)
//     }
//   })
// }

export function wxShare(wxConfigStr,option,vm) {
  // wx.config({
  //   debug: false,
  //   appId: sessionStorage.getItem('wxAppid'),     //appId
  //   timestamp: sessionStorage.getItem('wxTimestamp'),      //时间戳
  //   nonceStr: sessionStorage.getItem('wxNonceStr'),    //加密需要字符串(自己定义的)        
  //   signature: sessionStorage.getItem('wxSignature'),  //sha1加密后字符串
  //   jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage']
  // })
  let wxConfig = null
  if(typeof wxConfigStr == 'string'){   
    wxConfig = evil(wxConfigStr.split("(")[1].split(")")[0])
  }else{
    wxConfig = {...wxConfigStr}
  }
  wx.config({
    debug: false,
    appId: wxConfig.appId, //appId
    timestamp: wxConfig.timestamp, //时间戳
    nonceStr: wxConfig.nonceStr, //加密需要字符串(自己定义的)
    signature: wxConfig.signature, //sha1加密后字符串
    jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage']
  })
  wx.ready( () => {
    //分享到朋友圈"
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success: () => {
        // console.log('分享到朋友圈成功')
        vm.actAlert = false
      },
      cancel: () => {
        // console.log('分享到朋友圈失败')
      }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success: () => {
        // console.log('分享到朋友成功')
        vm.actAlert = false
      },
      cancel: () => {
        // console.log('分享到朋友失败')
      }
    })
  })
  wx.error((res) => {
    // this.$toast("微信验证失败")
    console.log('微信验证失败')
  })
}