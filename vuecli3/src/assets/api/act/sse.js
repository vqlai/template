import ax from '../ax.js'

// 积分抽奖（只在app玩）
// 初始化
export async function initData(params){
  return await ax({
    url: `/mall/doubleTwelveIntegralDraw/initData.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 抽奖
export async function luckyDraw(params){
  return await ax({
    url: `/mall/doubleTwelveIntegralDraw/luckyDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 我的奖品
export async function getPrizeList(params){
  return await ax({
    url: `/mall/doubleTwelveIntegralDraw/myLuckDraw.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 收货地址
export async function addAddress(data){
  return await ax({
    url: `/mall/doubleTwelveIntegralDraw/fillAddress.ihtml`,
    method: 'post',
    data: {...data}
  })
}