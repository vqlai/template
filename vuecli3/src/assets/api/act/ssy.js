import ax from '../ax.js'
// 新人邀请
// 当前活动编号
let actId = 18
// let actId = 10 // 测试环境测试用
let baseUrl = '/mall/activity'

// 获取用户邀请信息
export async function getInviteData(params) {
  // params.id = actId
  params = Object.assign({}, {id: actId}, params)
  return await ax({
    url: `${baseUrl}/inviteParameter.ihtml`,
    method: 'get',
    params: { ...params }
  })
}
// 获取短信验证码
export async function getMsgCode(params) {
  // params.id = actId
  return await ax({
    url: `${baseUrl}/sendRegisterSmsCode.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 邀请注册并领取福利
export async function inviteRegister(data) {
  data.id = actId
  return await ax({
    url: `${baseUrl}/inviteTypeRegister.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 外部/落地直接注册 无需id
export async function directRegister(data) {
  return await ax({
    url: `/mall/remarkRegister/activityMobileRegister.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 获取奖品列表
export async function getPrize(params) {
  params.id = actId
  return await ax({
    url: `${baseUrl}/inviteMyLuckDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 获取排行榜列表
export async function getRankList(params) {
  params.id = actId
  return await ax({
    url: `${baseUrl}/rankingList.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 0元领福利奖品
// export async function getNewerGift(params) {
//   // params.id = actId
//   return await ax({
//     url: `${baseUrl}/getGiftAtivityNewMembera.ihtml`,
//     method: 'get',
//     params: { ...params }
//   })
// }

// 获取app邀请码 getInviteCode
export async function getInviteCode(params) {
  return await ax({
    url: `${baseUrl}/getInviteCode.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 获取服务器当前时间
export async function getCurrentTime(params){
  return await ax({
    url: `/mall/commonarea/getCurrentTimeFromServer.ihtml`,
    method: 'get',
    params: { ...params }
  })
}


// 积分抽奖（只在app玩）
// 初始化
export async function initData(params){
  return await ax({
    url: `/mall/doubleElevenIntegralDraw/initData.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 抽奖
export async function luckyDraw(params){
  return await ax({
    url: `/mall/doubleElevenIntegralDraw/luckyDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 我的奖品
export async function getPrizeList(params){
  return await ax({
    url: `/mall/doubleElevenIntegralDraw/myLuckDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 收货地址
export async function addAddress(data){
  return await ax({
    url: `/mall/doubleElevenIntegralDraw/fillAddress.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 王俊凯助力点亮
// 点亮页初始化
export async function lightenInit(params){
  return await ax({
    url: `/mall/activityRoutine/getInitialization.ihtml`,
    method: 'get',
    params: { ...params }
  })
}
// 点亮步骤
export async function lightenStep(data){
  return await ax({
    url: `/mall/activityRoutine/clickComplete.ihtml`,
    method: 'post',
    data: {...data}
  })
}
// 点亮注册
export async function lightenRegister(data){
  return await ax({
    url: `/mall/activityRoutine/checkRegister.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 助力页初始化
export async function assistInit(params){
  return await ax({
    url: `/mall/activityRoutine/getHelpInitialization.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 助力页注册
export async function assistRegister(data){
  return await ax({
    url: `/mall/activityRoutine/helpRegister.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 下单抽奖 (只在app玩)
// 初始化
export async function orderDrawInit(params){
  return await ax({
    url: `/mall/activity/initData.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 抽奖
export async function orderDraw(params){
  return await ax({
    url: `/mall/activity/luckyDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 奖品列表
export async function orderDrawPrize(params){
  return await ax({
    url: `/mall/activity/myLuckDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 收货地址
export async function orderDrawAddress(data){
  return await ax({
    url: `/mall/activity/fillAddress.ihtml`,
    method: 'post',
    data: {...data}
  })
}