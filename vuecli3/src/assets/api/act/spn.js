import ax from '../ax.js'

// 新人邀请
// 当前活动编号
let actId = 19
let baseUrl = '/mall/activity'
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

// 获取用户邀请信息
export async function getInviteData(params) {
  params.id = actId
  return await ax({
    url: `${baseUrl}/inviteParameter.ihtml`,
    method: 'get',
    params: { ...params }
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

// 领取奖品
export async function getNewerGift(params) {
  // params.id = actId
  return await ax({
    url: `${baseUrl}/getGiftAtivityNewMembera.ihtml`,
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