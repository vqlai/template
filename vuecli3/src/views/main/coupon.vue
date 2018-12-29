<template>
  <div class="coupon" :class="{onwap: retype == 'm'}">
    <div v-if="resData">
      <div class="c-ad">
        <img :src="couponJson.ad.picPath" alt=""/>
      </div>
      <div class="c-ad2">
        <swiper :options="bannerSwiperOption" v-if="couponJson.coupon.length">
          <swiper-slide v-for="(item, index) in couponJson.coupon" :key="index">
            <div @click="drawSwiperCoupon(item.type)"><img :src="item.picPath" alt=""></div>
            <!-- <img :src="item.picPath" alt=""> -->
          </swiper-slide> 
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- <div class="rule-btn" @click="ruleDialog= true">使用规则</div> -->
        <van-button type="default" @click="ruleDialog= true" class="rule-btn">使用规则</van-button>
      </div>
      <div class="c-list">
        <h3 class="title">指定单品领劵，享立减优惠</h3>
        <div class="content">
          <ul v-if="resData.sigleComCouponList.length">
            <li v-for="(item,index) in resData.sigleComCouponList" :key="index">
              <a class="l" href="javascript:;" @click="openLink(item.prodUrl,1)">
                <div class="pic">
                  <img :src="item.imgUrl" alt="">
                </div>
                <div class="content">
                  <h3>{{item.title}}</h3>
                  <p class="curprice">券后价：<b>{{item.activityPrice}}</b>元</p>
                  <p class="preprice">原价：<b>{{item.origPrice}}</b>元</p>
                </div>
              </a>
              <div class="r">
                <p class="price"><span class="symbol">¥</span>{{item.couponValue}}</p>
                <p class="title line-hidden">商品直降券</p>
                <a href="javascript:;" class="btn" v-if="item.buttonState == 0" @click="onDrawCoupon(item)">点我领劵</a>
                <a href="javascript:;" @click="openLink(item.prodUrl,1)" class="btn on" v-else-if="item.buttonState == 2">去使用</a>
                <a href="javascript:;" class="btn off" v-else>领完了</a>
              </div>
            </li>
          </ul>
          <div v-else class="nodata">暂无单品优惠券</div>
        </div>
      </div>
      <div class="c-list">
        <h3 class="title">指定品类领劵，享立减优惠</h3>
        <div class="content">
          <ul v-if="resData.categoryComCouponList.length">
            <li v-for="item in resData.categoryComCouponList" :key="item.id">
              <!-- :to="{ name: 'cpgoods', query: { categoryId: item.id }}" -->
              <a class="l" href="javascript:;" @click="openCategoryLink(item.id,7)">
                <div class="pic">
                  <img :src="item.categoryImgUrl" alt="">
                </div>
                <div class="content">
                  <h3>{{item.categoryName}}</h3>
                  <p class="contentprice">{{item.couponName}}</p>
                </div>
              </a>
              <div class="r">
                <p class="price"><span class="symbol">¥</span>{{item.couponValue}}</p>
                <p class="title line-hidden">满{{item.couponLimit}}元可用</p>
                <!-- <a href="javascript:;" class="btn">点我领劵</a> -->
                <a href="javascript:;" class="btn" v-if="item.buttonState == 0" @click="onDrawCoupon(item)">点我领劵</a>
                <a href="javascript:;" class="btn on" @click="openCategoryLink(item.id,7)" v-else-if="item.buttonState == 2">去使用</a>
                <!-- <a href="javascript:;" class="btn on" v-else-if="item.buttonState == 2">去使用</a> -->
                <a href="javascript:;" class="btn off" v-else>领完了</a>
              </div>
            </li>
          </ul>
          <div v-else class="nodata">暂无品类优惠券</div>
        </div>
      </div>
      <div class="c-btm">
        <p>锁定每日超值抵扣券<br/>全棉每天给你不一样的惊喜</p>
      </div>
    </div>
    <van-popup v-model="ruleDialog" class="rule-dialog">
      <h3>使用规则</h3>
      <p>
        1、本券可在全国3000多家百果园门店通用；<br>
        2、本券不兑换现金、不设找赎；<br>
        3、本券消费每单限使用1张，不可与其他优惠券、折扣券等叠加使用；<br>
        4、本券不参与特价商品活动，不与门店打折或满减活动重叠使用；<br>
        5、本券使用有效期：2018.5.28-2018.7.31。<br>
        6、本券具有唯一性，兑换成功后不能退换，未使用过期自动作废；<br>
        7、如有疑问，请致电百果园服务热线400-181-1212。<br><br>
        使用方法：<br>
        在任意一家百果园门店买单时，出示券的券码即可使用，由收银员核销；
      </p>
    </van-popup>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import dataJson from '@/assets/js/data.js'
  import {getCouponData,drawCoupon,drawSwiperCoupon} from '@/assets/api/main/all.js'
  import {doLogReg} from '@/assets/js/utils.js'
  import { mapState,mapMutations } from 'vuex'
  import { Dialog } from 'vant'
  import AppNative from '@/assets/js/native.js'
  import {getOldAppParams} from '@/assets/js/utils.js'
  import {browser} from '@/assets/js/utils.js'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Popup } from 'vant'
  // let vm = null // 保存vue实例，用于this无法指向vue实例的方法中
  export default {
    name: 'coupon',
    data: function() {
      return {
        couponJson: {...dataJson.couponData},
        resData: null,
        vanLoading: false,
        token: '',
        bannerSwiperOption: { autoplay : { delay: 3000,disableOnInteraction: false }, pagination: { el: '.swiper-pagination' },
        // loop : true ,
          // on:{
          //   // 无法给复制的swiper绑定vue事件，只能通过swiper事件绑定
          //   click: function(){
          //     console.log(this)
          //     vm.drawSwiperCoupon(this.realIndex+1)
          //   }
          // }
        },
        ruleDialog: false
      }
    },
    computed:{
      ...mapState([
        'couponList'
      ])
    },
    created: function(){
      // vm = this
      if(this.retype === 'app'){
        // app
        let obj = getOldAppParams()
        this.token = obj.token
        this._getCouponData({token: this.token})
        // 没必要保存到localStorage，因为安卓没开启不能用，而且用native方法打开的页面native会在路径加上token
        // localStorage.setItem('appToken',this.token) 
      }else{
        // m
        this._getCouponData()
      }
    },
    mounted: function(){
      this.$nextTick(()=>{
        // this.vanLoading = false
      })
    },
    destroyed() {},
    // filters:{
    //   filterLink(value){
    //     return `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${value}`
    //   }
    // },
    methods: {
      ...mapMutations({
        setCouponList: 'SET_COUPON_LIST'
      }),
      // 1为根据料号打开商品详情页，7为根据链接直接打开网页
      // type为7时不能传title
      openLink(link,type){
        if(link){
          if(this.retype==='m'){
            location.href = link
          }else{
            let params = {'type': type,'data': link}
            // type为1，2可以加title，但type为7不可以加，无法正确跳转
            if(type==1||type==2){
              params.title = ''
            }
            AppNative.sendAction('mobile',params)
          }
        }
      },
      openCategoryLink(catId,type){
        // console.log(`${location.origin}/cpgoods/${catId}`)
        if(this.retype==='m'){
          // 对象路由如果为path则params会被忽略，只能使用query,如果为name，则只能使用params
          // 这里不使用query传参，主要是因为app端的native方法要打开完整的url，所以不使用。
          // this.$router.push({path: `/cpgoods/${catId}`}) // 动态路由传参第二种方式
          this.$router.push(`/cpgoods/${catId}`) // 字符串动态路由传参，刷新页面参数不会消失，可以通过params获取，缺点只能传一个参数
          // this.$router.push({path: `/cpgoods`，query:{id:catId}}) //  路径的路由,带查询参数，可以传多个，刷新页面参数不会消失
          // this.$router.push({name: `/cpgoods`, params:{id: catId}}) // 命名的路由，params中的参数不会出现在url中，所以一旦刷新页面参数消失
        }else{
          // AppNative.sendAction('mobile',{'type': type,'data': `${location.origin}/cpgoods/${catId}/`})
          let url = `${location.origin}/#/cpgoods/${catId}`
          if(browser.versions.android){
            url = url.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': type,'data': url})
        }
      },
      onDrawCoupon(item){
        if(this.retype === 'm'){
          this._drawCoupon({couponNo: item.couponNo},item)
        }else if(this.retype === 'app'){
          if(this.token){
            this._drawCoupon({token: this.token,couponNo: item.couponNo},item)
          }else{
            this.$toast('您还未登录，请登录后再领劵~')
          }
        }
      },
      _drawCoupon(params,item){
        drawCoupon(params).then(res=>{
          if(res.data.success){
            item.buttonState = 2
            this.$toast('领取成功')
          }else{
            if(res.data.data == 'noLogin'){
              if(this.retype == 'm'){
                Dialog.confirm({
                  title: '提示',
                  message: '您还未登录，请登录后再领劵~'
                }).then(() => {
                  // on confirm
                  doLogReg(location.href,1)
                }).catch(() => {
                  // on cancel
                })
              }else{
                this.$toast('您还未登录，请登录后再领劵~')
              }
            }else{
              this.$toast(res.data.data)
            }
          }
        })
      },
      drawSwiperCoupon(type){
        // console.log(type)
        let msg = ''
        if(type == 1){
          msg = '确认兑换百果园58-8元优惠券吗？'
        }else{
          msg = '确认兑换百果园100-15元优惠券吗？'
        }
        Dialog.confirm({
          // title: '提示',
          // className: 'van-dialog-own',
          message: msg
        }).then(() => {
          // on confirm
          // doLogReg(location.href,1)
          if(this.retype === 'm'){
            this._drawSwiperCoupon({type: type})
          }else{
            if(this.token){
              this._drawSwiperCoupon({type: type,token:this.token})
            }else{
              this.$toast('您还未登录，请登录后再领劵~')
            }
          }
        }).catch(() => {
          // on cancel
        })
      },
      _drawSwiperCoupon(params){
        drawSwiperCoupon(params).then(res=>{
          if(res.data.code == "ok"){
            let msg = ''
            if(type==1){
              msg = '您已成功兑换百果园满58-8元优惠券，券码已通过短信发至您的手机号码中，请注意查收~'
              
            }
            if(type ==2){
              msg = '您已成功兑换百果园满100-15元优惠券，券码已通过短信发至您的手机号码中，请注意查收~'
            }
            Dialog.alert({
              // className: 'van-dialog-own',
              message: msg,
              confirmButtonText: '知道了'
            }).then(() => {
              // on confirm
            })
          }else if(res.data.code == "error"){
            if(res.data.nottolog == false){
              if(this.retype == 'm'){
                Dialog.confirm({
                  title: '提示',
                  message: '您还未登录，请登录后再领劵~'
                }).then(() => {
                  // on confirm
                  doLogReg(location.href,1)
                }).catch(() => {
                  // on cancel
                })
              }else{
                this.$toast('您还未登录，请登录后再领劵~')
              }
            }else{
              this.$toast({
                type:'html',
                message: `<p style='color:#fcff00; font-size:16px;padding: 10px;'>${res.data.message}</p>`
              })
            }
          }else{
            this.$toast('领取失败，请稍后再试！')
          }
        })
      },
      _getCouponData(params) {
        this.vanLoading = true
        if(this.couponList.length === 0){
          getCouponData(params).then(res=>{
            // console.log(res)
            if(res.status === 200){
              this.resData = res.data
              this.setCouponList(res.data)
              // this.singleCoupon = res.data.sigleComCouponList
              // this.categoryCoupon = res.data.categoryComCouponList
            }
            this.vanLoading = false
          })
        }else{
          this.resData = this.couponList
          this.vanLoading = false
        }
      }
    },
    components:{
      swiper,
      swiperSlide,
      'van-popup': Popup 
    }
  }
</script>

<style lang="less" scoped>
  .coupon{
    width: 100%;
    min-height: 100%;
    background: #f8f8f8;
    &.onwap{
      padding-bottom: 80px;
    }
    .c-ad{
      min-height: 280px;
    }
    .c-ad2{
      padding: 15px 30px;
      min-height: 200px;
      text-align: center;
      .rule-btn{
        width: 160px;
        margin-top: 15px;
        font-size: 22px;
        color: #666;
        border: 1px solid #666;
        border-radius: 40px;
      }
    }
    .c-list{
      // padding: 15px 0;
      >.title{
        padding: 15px 0;
        font-size: 28px;
        font-weight: 500;
        color: #666;
        text-align: center;
        position: relative;
        &::before{
          content: ' ';
          position: absolute;
          top: 22px;
          left: 0;
          width: 180px;
          height: 1px;
          background: #dcdcdc;
          // transform: scaleY(0.5);
        }
        &::after{
          content: ' ';
          position: absolute;
          top: 22px;
          right: 0;
          width: 180px;
          height: 1px;
          background: #dcdcdc;
          // transform: scaleY(0.5);
        }
      }
      .content{
        padding: 0 30px;
        ul{
          border-radius: 20px;
          li{
            padding: 15px 0;
            display: flex;
            min-height: 200px;
            border-radius: 20px;
            box-sizing: content-box;
            overflow: hidden;
            .l{
              width: 480px;
              background: #fff;
              display: flex;
              .pic{
                padding: 10px;
                width: 180px;
                border-radius: 20px;
              }
              .content{
                flex: 1;
                padding: 32px 6px;
                position: relative;
                &:after{
                  content: ' ';
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 14px;
                  height: 100%;
                  overflow: hidden;
                  background: url('../../assets/imgs/main/cpshape.png');
                }
                >h3{
                  width: 260px;
                  height: 60px;
                  font-size: 26px;
                  line-height: 30px;
                  color: #333;
                  font-weight: 600;
                  overflow: hidden;
                }
                p.curprice{
                  padding-top: 10px;
                  font-size: 20px;
                  color: #ff4a37;
                  b{
                    font-size: 28px;
                  }
                }
                p.preprice{
                  font-size: 20px;
                  color: #666;
                  padding-top:12px;
                }
                p.contentprice{
                  font-size: 30px;
                  padding-top: 20px;
                  color: #ff4a37;
                }
              }
            }
            .r{
              flex: 1;
              padding: 30px 10px;
              text-align: center;
              color: #333;
              background: #eeecec;
              overflow: hidden;
              .price{
                font-size: 48px;
                font-weight: 600;
                .symbol{
                  font-size: 30px;
                  font-weight: normal;
                  position: relative;
                  top: -6px;
                  left: -4px;
                }
              }
              .title{
                padding: 12px 0;
                font-size: 22px;
              }
              >a.btn{
                display: block;
                padding: 10px 0;
                color: #fff;
                font-size: 24px;
                border-radius: 8px;
                background: #ff4a37;
                border: 1px solid #ff4a37;
                margin: 0 20px;
                box-sizing: border-box;
                &.off{
                  background: #a4a4a4;
                  border: 1px solid #a4a4a4;
                }
                &.on{
                  background-color: #eeecec;
                  color: #ff4a37;
                  border: 1px solid #ff4a37;
                }
              }
            }
          }
        }
      } 
      .nodata{
        font-size: 22px;
      }
    }
    .c-btm{
      padding: 40px;
      font-size: 24px;
      line-height: 42px;
      color: #999;
      text-align: center;
    }
    a{
      display: block;
    }
    .rule-dialog{
      width: 90%;
      padding: 30px 0;
      h3{
        text-align: center;
        font-size: 36px;
      }
      p{
        padding: 20px;
        font-size: 28px;
        line-height: 46px;
      }
    }
  }
</style>