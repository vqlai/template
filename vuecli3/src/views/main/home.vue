<template>
  <div class="home" :class="{onwap: retype == 'm',ondialog: isAdDialog}">
    <transition name="fade"> 
      <div v-if="resData">
        <!-- banner开始 -->
        <div class="banner">
          <!-- ref="bannerSwiper" @someSwiperEvent="bannerSwiperFn"  -->
          <swiper :options="bannerSwiperOption" v-if="resData.bannerList.length">
            <swiper-slide v-for="(item, index) in resData.bannerList" :key="index">
              <div @click="openLink(item.bannerUrl,7)"><img :src="item.imgUrl" alt=""></div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <!-- banner结束 -->
        <!-- 公告开始 -->
        <div class="notice" v-if="isShowNotice">
          <h3>公告内容</h3>
          <p>亲爱的棉粉，由于大促活动期间订单量大，仓库会按照拍下付款的先后顺序安排发货，如果收到包裹后有部分商品未收到，不要着急因为是不同仓库发货订单会进行拆分，请耐心等待，保证所有的商品都会陆续收到，不便之处敬请谅解，希望您购物愉快。</p>
        </div>
        <!-- 公告结束 -->
        <!-- 菜单开始 -->
        <ul class="menu">
          <li v-for="(item, index) in homeJson.menu" :key="index">
            <div class="menu-item" @click="openLinkPlus(item.url,item.linkCode,item.linkType)">
              <img :src="item.imgPath" alt="">
              <p>{{item.title}}</p>
            </div>
          </li>
        </ul>
        <!-- 菜单结束 -->
        <!-- 活动商品开始 -->
        <div class="activity">
          <div class="store">
            <div class="store-box" @click="openLink('https://app.purcotton.com/app/H5/map/shopList.html',7)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-store"></use>
              </svg>
              <span>附近门店：全棉时代门店一览</span>
            </div>
          </div>
          <swiper :options="activitySwiperOption" v-if="resData.activityList.length">
            <swiper-slide v-for="(item,index) in resData.activityList" :key="index">
              <div class="act-panel">
                <div class="act-box" @click="openLink(item.prodUrl,1)">
                  <div class="l">
                    <div class="pic"><img :src="item.imgUrl" alt=""> </div>
                    <ol class="info">
                      <li><i>¥</i><span>{{item.activityPrice}}</span></li>
                      <li><del><i>¥</i>{{item.origPrice}}</del></li>
                    </ol>
                  </div>
                  <div class="r">
                    <h3 class="line-hidden">{{item.title}}</h3>
                    <p>每周一优惠，九点准时开抢</p>
                    <div class="gift-pic">
                      <div class="title"><span>下单即赠</span><br/>{{item.giftProdTitle}}</div>
                      <div><img :src="item.giftImgUrl" alt=""></div>
                    </div>
                  </div>
                </div> 
              </div>
            </swiper-slide> 
            <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
          </swiper>
        </div>
        <!-- 活动商品结束 -->
        <!-- 福利专场开始 -->
        <div class="floor welfare">
          <headline 
            :title="homeJson.welfare.headline.title"
            :tip="homeJson.welfare.headline.tip"
            :moreLink="homeJson.welfare.headline.moreLink">
          </headline>
          <div class="content">
            <div class="l">
              <div @click="openCouponPage(homeJson.welfare.giftList[0].mUrl,homeJson.welfare.giftList[0].appUrl,7)">
                <img :src="homeJson.welfare.giftList[0].imgPath" alt="">
              </div>
            </div>
            <div class="r">
              <div class="item">
                <div @click="openLinkPlus(homeJson.welfare.giftList[1].mUrl,homeJson.welfare.giftList[1].appUrl,7)">
                  <img :src="homeJson.welfare.giftList[1].imgPath" alt="">
                </div>
              </div>
              <div class="item">
                <!-- <div @click="openLinkPlus(homeJson.welfare.giftList[2].mUrl,homeJson.welfare.giftList[2].appUrl,7)"> -->
                <div @click="openCouponPage(homeJson.welfare.giftList[2].mUrl,homeJson.welfare.giftList[2].appUrl,7)">
                  <img :src="homeJson.welfare.giftList[2].imgPath" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 福利专场结束 -->
        <!-- 新品好物人气推荐开始 -->
        <div  class="top-goods" v-if="resData.upCommodityList.length">
          <div class="floor" v-for="item in resData.upCommodityList" :key="item.modelType">
            <headline 
              :title="item.modelType == 1?'人气推荐':item.modelType == 2?'新品好物':'热卖推荐'">
            </headline>
            <goods :goodsList="item.modelCommodityList" :goodsType="item.modelType == 1?2:3" goodsBg="#f8f8f8"></goods>
          </div>
        </div>
        <!-- 新品好物人气推荐结束 -->
        <!-- 公告开始 -->
        <div class="ad">
          <div @click="openLinkPlus(homeJson.ad.mUrl,homeJson.ad.appUrl,homeJson.ad.type)">
            <img :src="homeJson.ad.picPath" alt="">
          </div>
        </div>
        <!-- 公告结束 -->
        <!-- 活动氛围开始 -->
        <div class="atmosphere"></div>
        <!-- 活动氛围结束 -->
        <!-- 社区精选开始 -->
        <div class="floor area-choice" v-if="retype === 'app'">
          <headline 
            :title="homeJson.areaChoice.headline.title"
            :tip="homeJson.areaChoice.headline.tip"
            :moreLink="homeJson.areaChoice.headline.moreLink"
            :clickType="7">
          </headline>
          <div class="swiper-wrapper">
            <swiper :options="areaInfoSwiperOption">
              <swiper-slide v-for="(item,index) in resData.communityList.sqdtinfoText" :key="index">
                <div class="content" @click="openLink(item.sqdt_pdata,7)">
                  <div class="pic2"><img :src="item.sqdt_pimg" alt=""></div>
                  <div class="info">
                    <h4 class="line-hidden">{{item.sqdt_pname}}</h4>
                    <p class="line-hidden">{{item.sqdt_ptit}}</p>
                  </div>
                  <div class="arrow">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-arrow"></use>
                    </svg>
                  </div>
                </div>
              </swiper-slide> 
            </swiper>
          </div>
         <div class="area-article-swiper">
            <swiper :options="areaSwiperOption">
              <swiper-slide v-for="(item,index) in resData.communityList.sqjxinfoText" :key="index">
                <div class="area-article-panel">
                  <div class="area-article-item" @click="openLink(item.sqjx_pdata,7)">
                    <div class="pic"><img :src="item.sqjx_pimg" alt=""></div>
                    <div class="area-article-content">
                      <h4 class="title two-line-hidden">{{item.sqjx_ptit}}</h4>
                      <p class="desc multi-line-hidden">{{item.sqjx_pcon}}</p>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
           </div>
        </div>
        <!-- 社区精选结束 -->
        <!-- 趣味直播开始 -->
        <div class="floor live" v-if="retype === 'app'">
          <headline 
            :title="homeJson.live.headline.title"
            :tip="homeJson.live.headline.tip"
            :moreLink="'live'"
            :clickType="100">
          </headline>
          <div class="swiper-wrapper">
            <swiper :options="liveSwiperOption">
              <swiper-slide v-for="(item,index) in homeJson.live.liveList" :key="index">
                <div class="live-item" @click="openLink('live',100)">
                  <div class="pic">
                    <img data-v-03ce29f4="" :src="item.picPath" alt="">
                  </div>
                  <h4 class="title line-hidden">{{item.title}}</h4>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <!-- 趣味直播结束 -->
        <!-- 品牌咨询开始 -->
        <div class="floor brand-news">
          <headline 
            :title="homeJson.brandNews.headline.title"
            :tip="homeJson.brandNews.headline.tip"
            :moreLink="retype === 'm' ? homeJson.brandNews.headline.moreLink : homeJson.brandNews.headline.appMoreLink"
            :clickType="7">
          </headline>
          <div class="swiper-wrapper">
            <swiper :options="brandSwiperOption">
              <swiper-slide v-for="(item,index) in homeJson.brandNews.newsList" :key="index">
                <div class="brand-news-item" @click="openLinkPlus(item.mUrl,item.appUrl,7)">
                  <div class="pic">
                    <img data-v-03ce29f4="" :src="item.picPath" alt="">
                  </div>
                  <h4 class="title line-hidden">{{item.title}}</h4>
                  <p class="desc line-hidden">{{item.desc}}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <!-- 品牌咨询结束 -->
        <!-- 专区开始 -->
        <div  class="btm-goods" v-if="resData.downCommodityList.length">
          <div class="floor" v-for="(item,index) in resData.downCommodityList" :key="index">
            <headline 
              :title="item.areaName"
              :tip="''"
              :moreLink="item.checkMoreLink"
              :subheadList="item.categaryLinkList"
              :adPath="item.advertImg"
              :adLink="item.advertLink">
            </headline>
            <goods :goodsList="item.modelCommodityList" :goodsType="1" goodsBg="#f8f8f8"></goods>
          </div>
        </div>
        <!-- 专区结束 -->
      </div>
    </transition>
    <transition name="fade">
      <a-dialog :isShowDialog="isAdDialog" :dialogType="1" :showCloseBtn="1" :showHeader="false" @closeDialog="closeAdDialog">
        <div @click="openLinkPlus(homeJson.dialogAd.mUrl,homeJson.dialogAd.appUrl,homeJson.dialogAd.type)"><img :src="homeJson.dialogAd.picPath" alt=""></div>
      </a-dialog> 
    </transition>
    <transition name="fade">
      <tipDialog :isShowDialog="isTipDialog" @closeTipDialog="closeTipDialog" :tipDialogType="2"></tipDialog>
    </transition>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
    <backTop :isShowTop="isShowTop"></backTop>
  </div>
</template>

<script>
  import dataJson from '@/assets/js/data.js'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import goods from '@/components/goods.vue'
  import headline from '@/components/headline.vue'
  import tipDialog from '@/components/tip-dialog.vue'
  import aDialog from '@/components/a-dialog.vue'
  import backTop from '@/components/back-top.vue'
  import {getHomeData,savePhoneInfo} from '@/assets/api/main/all.js'
  import { mapState,mapMutations } from 'vuex'
  import AppNative from '@/assets/js/native.js'
  import {browser,getOldAppParams} from '@/assets/js/utils.js'
  // import Cookies from 'js-cookie'
 
  export default {
    name: 'home',
    data: function() {
      return {
        bannerSwiperOption: { autoplay : { delay: 3000,disableOnInteraction: false }, pagination: { el: '.swiper-pagination' },},
        activitySwiperOption: {navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }},
        brandSwiperOption:{ slidesPerView: 1.5, spaceBetween: 10 },
        liveSwiperOption:{ slidesPerView: 2.5, spaceBetween: 10 },
        areaSwiperOption:{ slidesPerView: 'auto', spaceBetween: 14 },
        areaInfoSwiperOption:  { autoplay : { delay: 3000 },direction : 'vertical' },
        homeJson: {...dataJson.homeData},
        resData: null,
        isShowTop: false,
        vanLoading: false,
        isAdDialog: false,
        isTipDialog: false,
        isShowNotice: false
      }
    },
    computed:{
      ...mapState([
        'homeResData'
      ]),
      // bannerSwiper() {
      //   return this.$refs.bannerSwiper.swiper
      // },
    },
    watch:{
    },
    created: function (){
      this._getHomeResData()
    },
    mounted: function (){
      this.$nextTick(()=>{
        // console.log(process.env.BASE_API)
        // this.bannerSwiper.slideTo(3, 1000, false)
        if(this.retype == 'm'){
          // this.openAdDialog() // 弹广告
        }else if(this.retype == 'app'){
          if(browser.versions.ios && !browser.versions.purcottonIosVersion){
            this.isTipDialog = true
          }else if(browser.versions.android && !browser.versions.purcottonAndroidVersion){
            this.isTipDialog = true
          }else{
            // this.openAdDialog() // 弹广告
          }
          this.saveInfo()
        }
        // 绑定滚动事件
        window.addEventListener('scroll', this.onScroll)
      })
    },
    destroyed() {},
    // filters:{
    //   filterLink(value){
    //     // filters内无法获取this实例
    //     return `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${value}`
    //   }
    // },
    methods: {
      ...mapMutations({
        setHomeResData: 'SET_HOME_RES_DATA'
      }),
      // 1为根据料号打开商品详情页，7为根据链接直接打开网页
      // type为7时不能传title
      openLink(link,type){
        if(link){
          if(this.retype === 'm'){
            location.href = link
          }else{
            // type为100则打开直播
            if(type == 100){
              AppNative.openLiveList()
            }else{
              // 安卓终端把#转%23
              if(browser.versions.android){
                link = link.replace('#', '%23')
              }
              AppNative.sendAction('mobile',{'type': type,'data': link})
            }
          }
        }
      },
      // 因appurl是前端写死
      openLinkPlus(murl,appurl,type){
        if(this.retype === 'm'){
          location.href = murl
        }else{
          // 安卓终端把#转%23
          if(browser.versions.android){
            appurl = appurl.replace('#', '%23')
          }
          let params = {'type': type,'data': appurl}
          // type为1，2可以加title，但type为7不可以加，因无法正确跳转
          if(type == 1 || type == 2){
            params.title = ''
          }
          AppNative.sendAction('mobile',params)
        }
      },
      // 打开优惠卷页面
      openCouponPage(mUrl,appUrl,type){
        if(this.retype === 'm'){
          this.$router.push(mUrl)
        }else{
          // let url = `${location.origin}${appUrl}`
          this.openLink(appUrl, type)
        }
      },
      // 日常广告，每三小时弹一次
      openAdDialog(){
        // let adTime = Cookies.get('adTime')
        // if(adTime){
        //   let current = new Date().getTime()
        //   if(current-adTime > 3*60*60*1000){
        //     Cookies.set('adTime', current, { expires: 7 })
        //     this.isAdDialog = true
        //   }
        // }else{
        //   Cookies.set('adTime', new Date().getTime(), { expires: 7 })
        //   this.isAdDialog = true
        // }
      },
      closeAdDialog(){
        this.isAdDialog = false
      },
      // app版本低弹窗
      openTipDialog(){},
      closeTipDialog(){
        this.isTipDialog = false
      },
      // 滚动条滚动事件处理
      onScroll(){
        let scrollSize = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollSize >= window.innerHeight/2) {
          this.isShowTop = true
        }else{
          this.isShowTop = false
        }
      },
      saveInfo(){
        // 把广告信息传到后台 只在app内并且ios系统执行
        if(browser.versions.ios){
          let obj = getOldAppParams()
          let uuid = obj.uuid || this.$route.query.uuid
          let idfa = obj.idfa || this.$route.query.idfa
          let params = {
            appVersion: navigator.appVersion,
            uuid: uuid || UUID,
            idfa: idfa || IDFA
          }
          savePhoneInfo(params).then(res=>{
            // console.log(res)
          })
        }
      },
      _getHomeResData(params){
        this.vanLoading = true
        if(Object.keys(this.homeResData).length==0){ // 判断state的数据是否有,有则获取缓存数据
          getHomeData(params).then((res)=>{
            if(res.status === 200){
              this.resData = res.data  
              this.setHomeResData(res.data) // 存储在vuex中
            }else{
              this.$toast('网络异常，请稍后再试~')
            }
            this.vanLoading = false
          })
        }else{
          this.resData = this.homeResData
          this.vanLoading = false
        }
      },
      // bannerSwiperFn(){}
    },
    components:{
      swiper,
      swiperSlide,
      headline,
      goods,
      backTop,
      aDialog,
      tipDialog
    }
  }
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    &.onwap{
      padding-bottom: 80px;
    }
    &.ondialog{
      width: 100%;
      max-height: 100%;
      overflow: hidden;
    }
    .banner{
      width: 100%;
      height: 380px;
      background: #DADADA;
      // overflow: hidden;
      position: relative;
      .swiper-container{
        a{
          display: block;
        }
      }
    }
    .notice{
      padding: 30px;
      h3{
        text-align: center;
        font-size: 32px;
        line-height: 68px;
        color: #009380;
      }
      p{
        text-indent: 50px;
        font-size: 26px;
        line-height: 48px;
      }
    }
    ul.menu{
      display: flex;
      flex-wrap: wrap;
      padding: 20px 30px 26px;
      li{
        width: 25%;
        font-size: 26px;
        text-align: center;
        box-sizing: border-box;
        .menu-item{
          display: block;
          color: #333333;
          img{
            display: inline-block;
            width: 98px;
            height: 98px;
            padding-bottom: 10px;
          }
          p{
            padding-bottom: 10px;
          }
        }
      }
    }
    .activity{
      padding: 10px 0 30px;
      .store{
        background-color: #F8F8F8;
        padding: 0 30px; 
        .store-box{
          display: block;
          font-size: 28px;
          color: #333;
          padding: 20px;
          svg{
            width: 46px;
            height: 46px;
            color: #00ac97;
            vertical-align: -.4em;
            padding-right: 20px;
            border-right: 1px solid #00ac97;
          }
          span{
            display: inline-block;
            padding: 0 20px;
            line-height: 0;
          }
        }
      }
      .swiper-container{
        .swiper-slide{
          .act-panel{
            padding: 0 40px;
            >.act-box{
              display: flex;
              padding: 40px 0;
              margin-top: 30px;
              background: #F8F8F8;
              .l{
                width: 280px;
                padding: 10px 20px;
                position: relative;
                ol.info{
                  position: absolute;
                  top: 40px;
                  left: 40px;
                  width: 126px;
                  height: 126px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  border-radius: 100%;
                  background: rgba(162,169,105,.8);
                  li{
                    padding: 5px 0;
                    &:first-child{
                      color: #fff;
                      font-size: 30px;
                      font-weight: 600;
                    }
                    &:last-child{
                      color: #fff;
                      font-size: 22px;
                    }
                    i{
                      font-style: normal;
                    }
                  }
                }
              }
              .r{
                flex: 1;
                padding: 10px 20px;
                h3{
                  width: 350px;
                  height: 42px;
                  font-size: 32px;
                  font-weight: 500;
                  letter-spacing: 2px;
                  line-height: 42px;
                  color: #333;
                }
                p{
                  padding: 12px 0 20px;
                  font-size: 22px;
                  color: #999;
                }
                .gift-pic{
                  padding: 10px 20px;
                  border: 1px solid #e4e4e4;
                  border-radius: 12px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .title{
                    font-size: 24px;
                    line-height: 38px;
                    color: #333;
                    span{
                      color: #dc3929;
                    }
                  }
                  img{
                    width: auto;
                    height: 100px;
                  }
                }
              }
            }
          }
        }
        .swiper-button-black{
          opacity: .5;
          outline: none;
        }
        .swiper-button-disabled{
          opacity: .2;
        }
      }
    }
    .atmosphere{
      
    }
    .floor{
      padding: 20px 0;
      >.content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px 30px;
        a{
          display: block;
        }
      }
    }
    .welfare{
      .content{
        .l{
          width: 300px;
        }
        .r{
          padding-left: 24px;
          flex:1;
          display: flex; 
          flex-direction: column;
          justify-content:space-between;
        }
      }
    }
    .brand-news{
      .swiper-wrapper{
        padding: 20px 0 20px 30px;
        overflow: hidden;
        box-sizing: border-box;
        .swiper-container{
          // 配置已设置，无需再设宽度
          .swiper-slide {
            .brand-news-item{
              display: block;
              .pic{
                min-height: 220px;
                border-radius: 10px;
                overflow: hidden;
              }
              h4.title{
                padding: 26px 0 16px;
                text-align: left;
                font-size: 24px;
                color: #000;
              }
              p.desc{
                font-size: 22px;
                text-align: left;
                color: #999;
              }
            }
          }
        }
      }
    }
    .area-choice{
      .swiper-wrapper{
        height: 140px;
        margin: 20px 0;
        padding: 20px 30px;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        background-color: rgb(248, 248, 248);
        overflow: hidden;
        .content{
          display: flex;
          height: 100%;
          .pic2{
            width: 100px;
            height: 100px;
            border-radius: 100%;
            overflow: hidden;
          }
          .info{
            padding-left: 20px;
            width: 76%;
            h4{
              font-size: 32px;
              line-height: 48px;
              color: #333;
            }
            p{
              font-size: 30px;
              line-height: 50px;
              color: #8f8f94;
            }
          }
          .arrow{
            flex: 1;
            align-self: center;
            .icon{
              font-size: 50px;
              color: #333;
            }
          }
        }
      }
      .area-article-swiper{
        padding: 20px 0 20px 30px;
        box-sizing: border-box;
        overflow: hidden;
        .swiper-container{
          // 配置已设置，无需再设宽度
          .swiper-slide {
            width: 80%;
            .area-article-panel{
              padding: 30px 20px;
              border: 1px solid #e5e5e5;
              box-sizing: border-box;
              border-radius: 8px;
              .area-article-item{
                display: flex;
                justify-content: space-between;
                .pic{
                  width: 200px;
                }
                .area-article-content{
                  flex: 1;
                  padding-left: 24px;
                  .title{
                    color: #393939;
                    font-size: 28px;
                    line-height: 38px;
                    height: 76px;
                  }
                  .desc{
                    padding-top: 10px;
                    color: #999;
                    font-size: 24px;
                    line-height: 36px;
                    height: 108px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .live{
      .swiper-wrapper{
        padding: 20px 0 20px 30px;
        box-sizing: border-box;
        overflow: hidden;
        .swiper-slide {
          .live-item{
            display: block;
            .pic{
              min-height: 200px;
              border-radius: 10px;
              overflow: hidden;
            }
            h4.title{
              padding: 20px 0 0;
              font-size: 24px;
              color: #333;
            }
          }
        }
      }
    }
    .ad{
      width: 750px;
      padding-bottom: 40px;
      a{
        display: block;
      }
    }
  }
</style>