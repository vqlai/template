import ax from '../ax.js'
// let qs = require('qs')
let baseUrl = '/index/indexDataMgt'
import {getHostPlatform} from '@/assets/js/config.js'
// 传参方式: post方式用 data: {...params} ，get方式用 params: {...params}
// 获取首页数据
export async function getHomeData(params) {
  return await ax({
    url: `${baseUrl}/indexData.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 获取优惠卷列表数据
export async function getCouponData(data){
  return await ax({
    url: `${baseUrl}/couponCenterData.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 领取优惠卷
export async function drawCoupon(data){
  return await ax({
    url: `${baseUrl}/getCoupons.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 获取指定优惠卷品类的商品
export async function getGoodsByCategory(data){
  return await ax({
    url: `${baseUrl}/couponCommodityDetail.ihtml`,
    method: 'post',
    data: {...data}
  })
}

// 获取版本号
export async function getSysVersion(params){
  return await ax({
    url: `${baseUrl}/getVersion.ihtml`,
    method: 'get',
    params: {...params}
  })
}

//传到后台uuid，和版本号
export async function savePhoneInfo(params){
  return await ax({
    url: `/aso/savePhoneInfo.ihtml`,
    method: 'get',
    params: {...params}
  })
}

// 领取轮播优惠卷
export async function drawSwiperCoupon(data){
  let retype = getHostPlatform()
  return await ax({
    url:  retype == 'm' ? `/mall/orchard/exchange.ihtml` : '/app/mall/orchard/exchange.ihtml',
    method: 'post',
    data: {...data}
  })
}