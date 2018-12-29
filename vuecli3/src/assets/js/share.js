import wx from 'weixin-js-sdk'

// 注意微信端鉴权失败无法分享，分享的链接不是在配置的域内无法分享
// 注意app内的微信分享，安卓需要对#号url加密，ios可不用

// 将json对象字符串转为json对象
function evil(str){
  // 一个变量指向Function，防止有些前端编译工具报错
  let Fn = Function 
  return new Fn('return ' + str)()
}

// 弹窗名必须为isShareDialog
export default function wxShare(wxConfigStr,option,vm) {
  let wxConfig = typeof wxConfigStr === 'string' ? evil(wxConfigStr.split("(")[1].split(")")[0]) : {...wxConfigStr}
  wx.config({
    debug: false,
    appId: wxConfig.appId, //appId
    timestamp: wxConfig.timestamp, //时间戳
    nonceStr: wxConfig.nonceStr, //加密需要字符串(自己定义的) 
    signature: wxConfig.signature, //sha1加密后字符串
    jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
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
        vm.isShareDialog = false
        vm.isDialog = false
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
        vm.isShareDialog = false
        vm.isDialog = false
      },
      cancel: () => {
        // console.log('分享到朋友失败')
      }
    })
  })
  //分享到QQ
  wx.onMenuShareQQ({
    title: option.title, // 分享标题
    desc: option.desc, // 分享描述
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      vm.isShareDialog = false
      vm.isDialog = false
    },
    cancel: function () {
    // 用户取消分享后执行的回调函数
    }
  })

  wx.onMenuShareQZone({
    title: option.title, // 分享标题
    desc: option.desc, // 分享描述
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      vm.isShareDialog = false
      vm.isDialog = false
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
  wx.error((res) => {
    // this.$toast("微信验证失败")
    console.log('微信验证失败')
  })
}