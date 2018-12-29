import ax from '../ax.js'
// 内购会
// 获取图片验证码链接路径
// export async function getImgCodePath(params){
//   return await ax({
//     url: `/ValiCode.ihtml`,
//     method: 'get',
//     params: { ...params },
//     responseType: 'arraybuffer'
//   })
// }
// 获取短信验证码
export async function getMsgCode(params) {
  return await ax({
    url: `/mobile/mall/member/sendmobileCode.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 密码登录
export async function pwdLogin(data) {
  return await ax({
    url: `/mobile/mall/memberLogin/NGHlogin.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 短信登录
export async function smsLogin(data) {
  return await ax({
    url: `/mobile/mall/memberLogin/NGHloginOFmobile.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 打开客服
export async function openKf(data) {
  return await ax({
    url: `/mall/ccs/getEncryptRquestUrl.ihtml`,
    method: 'post',
    data: {...data} 
  })
}

// 退出登录
export async function loginOut(data) {
  return await ax({
    url: '/mobile/mall/memberLogin/toLogOutSession.ihtml',
    method: 'post',
    data: {...data}
  })
}

// 获取主会场数据
export async function getHomeData(params){
  return await ax({
    url: '/mall/internalPurchaseActivity/mainProductInfo.ihtml',
    method: 'get',
    params: { ...params }
  })
}

// 获取微信分享配置
export async function getWxConfig(params) {
  return await ax({
    url: '/mall/internalPurchaseActivity/wxconfig.ihtml',
    method: 'get',
    params: { ...params }
  })
}

// 获取分会场数据
export async function getVenueData(params){
  return await ax({
    url: `/mall/internalPurchaseActivity/subProductInfo.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 加入购物车
export async function addShopCar(data) {
  return await ax({
    url: '/mall/cart/add_cart.ihtml',
    method: 'post',
    data: {...data}
  })
}

// 助力初始化
export async function initAssist(params){
  return await ax({
    url: `/mall/internalPurchaseActivity/purchaseInitialization.ihtml`,
    method: 'get',
    params: {...params}
  })
}

// 助力
export async function doAssist(data){
  return await ax({
    url: `/mall/internalPurchaseActivity/purchaseAssistance.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 获取助力注册短信验证码
export async function getAssistMsgCode(params){
  return await ax({
    url: `/mall/activity/sendSmsCode.ihtml`,
    method: 'get',
    params: {...params}
  })
}

// 助力注册
export async function assistRegister(data){
  return await ax({
    url: `/mall/internalPurchaseActivity/purchaseRegister.ihtml`,
    method: 'post',
    data: {...data}
  })
}