<template>
  <div class="home">
    <div v-if="homeData">
      <div class="top">
        <div><img src="@/assets/imgs/act/ngh/v2/home1.jpg" alt=""></div>
        <div class="content">
          <div class="info">
            <div class="avator" v-if="homeData.imgs"><img :src="filterImg(homeData.imgs)" alt=""></div>
            <div class="avator" v-else><img src="@/assets/imgs/act/ngh/v2/avator.png" alt=""></div>
            <ul>
              <li>{{homeData.mobileN}}<span v-if="homeData.identity">员工</span><span v-else>非员工</span></li>
              <li>剩余额度：<span class="ed">{{homeData.userPrice}}</span>元 <span class="ed-btn" v-if="homeData.identity" @click="onUpEd">提额</span></li>
            </ul>
            <span class="exit" @click="onExit">退出</span>
          </div>
          <div class="count-down">
            <!-- <p class="title" v-if="actStatus === 1">黄冈仓活动倒计时</p> -->
            <!-- <p class="title" v-if="actStatus === 2">黄冈仓活动倒计时</p> -->
            <p class="title" v-if="actStatus < 3">
              <span v-if="actStatus === 1">活动开始</span>
              <span v-if="actStatus === 2">活动结束</span>
              <br/>倒计时
            </p>
            <killtime :currentTime="homeData.currentTime" :startTime="homeData.startTime" :endTime="homeData.endTime" :tipText="''" :tipTextEnd="''" 
              :endText="'活动已结束啦~'" :dayTxt="':'" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''" 
              v-on:start_callback="countDownS_cb(2)" v-on:end_callback="countDownE_cb(2)">
            </killtime>
          </div>
          <p class="shop-car"><span @click="goShopCar">查看购物车（<i>{{homeData.cartSize}}</i>）</span></p>
        </div>
      </div>
      <!-- <top-bar :title="topBarTitle"></top-bar> -->
      <!-- :text="homeData.notice" -->
      <!-- <van-notice-bar :scrollable="true" :speed="30" :delay="3">
        {{homeData.notice}}
      </van-notice-bar> -->
      <div class="notice" id="notice">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-notice"></use>
        </svg>
        <Marquee :content="homeData.notice" :speed="30"></Marquee>
        <!-- <div class="marquee" id="marquee"><p>{{homeData.notice}}</p></div> -->
        <!-- <marquee scrollamount="2" behavior="scroll">{{homeData.notice}}</marquee> -->
      </div>
      <ul class="venue">
        <li @click="onVenue(item)" v-for="(item,index) in typeList" :key="index"><img :src="item.img" alt=""></li>
      </ul>
      <div><img src="@/assets/imgs/act/ngh/v2/home2.jpg" alt=""></div>
      <div><img src="@/assets/imgs/act/ngh/v2/home3.jpg" alt=""></div>
      <div @click="backTop"><img src="@/assets/imgs/act/ngh/v2/home4.jpg" alt=""></div>
    </div>
    <van-loading color="#31d0b5" type="spinner" size="40px" v-if="vanLoading"/>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="dialogType === 2 ? 3 : 1"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#7a7a7a'" :dialogWidth="'84%'" @closeDialog="isDialog=false">
      <div class="dialog">
        <div class="msg" v-if="dialogType === 1">
          <p>抱歉，员工内购会活动已经结束！<br/>若您购物车依然有未支付的商品，<br/>将会恢复原价！</p>
          <van-button block class="btn" @click="goHome">退出</van-button>
        </div>
        <div class="wx" v-if="dialogType === 2">
          <p>抱歉，请在微信内参与活动哦~</p>
        </div>
        <div class="limit" v-if="dialogType === 3">
          <h3></h3>
          <p>提额已达上限，<br/>继续分享不能再获得增额和好友入场名额哦~</p>
          <ul>
            <li><van-button block class="btn" @click="isDialog = false">取消</van-button></li>
            <li><van-button block class="btn" @click="onContinue">继续</van-button></li>
          </ul>
        </div>
        <div class="wx" v-if="dialogType === 4">
          <p>抱歉，请登录后在参与活动哦~</p>
          <van-button block class="btn" @click="goLogin">去登录</van-button>
        </div>
      </div>
    </a-dialog>
    <a-dialog :isShowDialog="isShareDialog" :dialogType="2" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" 
              :showCloseBtn="3" :showHeader="false"  @closeDialog="isShareDialog = false" class="share-dialog">
      <div class="tip"><img src="@/assets/imgs/act/ngh/v2/share-tip.png" alt=""></div>
    </a-dialog>
  </div>
</template>

<script>
  import {Icon,NoticeBar } from 'vant'
  import killtime from '@/components/killtime.vue'
  // import TopBar from '@/components/top-bar.vue'
  import aDialog from "@/components/a-dialog.vue"
  import {isweixin} from '@/assets/js/utils.js' 
  import {getHomeData, loginOut, getWxConfig} from '@/assets/api/act/ngh.js'
  import {filterImgPath} from '@/assets/js/utils.js'
  // import { mapState,mapMutations } from 'vuex'
  import share from "@/assets/js/share"
  import Marquee from '@/plugins/marquee/marquee.vue'
  export default {
    name: 'home',
    data() {
      return {
        // currentTime: parseInt(new Date().getTime()/1000),
        // startTime: parseInt(new Date().getTime()/1000)-1000,
        // endTime: 1638545600,
        // topBarTitle: this.$route.meta.title,
        vanLoading: false,
        isDialog: false,
        dialogType: 1, // 1为结束 2为微信提示 3额度提示
        homeData: null,
        typeList: [],
        actStatus: 1, // 1未开始 2进行中 3已结束
        isShareDialog: false,
        wxConfig: null
      }
    },
    // computed:{
    //   ...mapState([
    //     'ngHomeData'
    //   ]),
    // },
    created: function(){
      this._getHomeData({})
      // Promise.all([this._getHomeData({}),this._getWxConfig({resendUrl: location.href.split('#')[0]})])
    },
    mounted: function(){
      this.$nextTick(()=>{
        // console.log(this.$route.meta.title)
        // WeixinJSBridge.call('hideOptionMenu') 
        // WeixinJSBridge.call('hideToolbar')
        // location.hostname.split('.')[0] === 'm'
        if(!isweixin() && this.retype === 'm'){
          this.dialogType = 2
          this.isDialog = true
        }
        // console.log(this.$refs)
        // console.log(this.$refs.marquee)
        // setTimeout(()=>{
        //   var scrollWidth = $('#affiche').width();
        //   var textWidth = $('.affiche_text').width();
        //   var i = scrollWidth;
        //   setInterval(function() {
        //       i--;
        //       if(i < -textWidth ) {
        //           i = scrollWidth;
        //       }
        //       $('.affiche_text').animate({'left': i+'px'}, 20);
        //   }, 20)
        // },1000)
      })
    },
    methods: {
      // ...mapMutations({
      //   setNgHomeData: 'SET_NG_HOME_DATA'
      // }),
      // 注意:src无法使用vue过滤器，只能通过方法进行
      filterImg(value){
        return value.includes('http') ? value : `https://res.purcotton.com/${value}`
      },
      countDownS_cb(a){
        // console.log('callBack--'+a+'--开始倒计时结束回调');
      },
      countDownE_cb(a){
        // console.log('callBack--'+a+'--活动剩余倒计时结束回调');
        // setTimeout(()=>{
        //   window.location.reload()
        // },10000)
      },
      onExit(){
        // window.close() // 微信内置浏览器无法使用
        loginOut().then(()=>{
          // location.href = 'https://m.purcotton.com/'
          location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
          // typeof WeixinJSBridge === 'undefined' ? window.close() : WeixinJSBridge.call('closeWindow') 
        })
      },
      goHome(){
        loginOut().then(()=>{ location.href = 'https://m.purcotton.com/' })
      },
      onVenue(item){
        this.$router.push({ path: '/ngh/venue', query: { title: item.name, venueId: item.venueId, tabId: item.tabList[0].tabId }})
      },
      onContinue(){
        this.isDialog = false
        share(this.wxConfig, this.wxOption, this)
        this.isShareDialog = true // 打开分享提示弹窗
      },
      onUpEd(){
        this._getWxConfig({resendUrl: location.href.split('#')[0]})
      },
      goLogin(){
        location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
      },
      backTop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      goShopCar(){
        location.href = 'https://m.purcotton.com/mall/cart/viewMayCart.ihtml'
      },
      _getHomeData(params){
        this.vanLoading = true
        // if(Object.keys(this.ngHomeData).length === 0){ 
          getHomeData(params).then(res=>{
            // console.log(res)
            if(res.data.success){
              this.homeData = {...res.data.data}
              // this.typeList = [...res.data.data.list.slice(0,3), res.data.data.list[4], res.data.data.list[3]]
              this.typeList = [...res.data.data.list]
              // this.setNgHomeData(res.data.data)
              if(this.homeData.currentTime < this.homeData.startTime){
                this.actStatus = 1 // 活动未开始
              }else if(this.homeData.startTime <= this.homeData.currentTime && this.homeData.currentTime <= this.homeData.endTime){
                this.homeData.startTime = this.homeData.currentTime
                this.actStatus = 2 // 进行中
              }else if(this.homeData.currentTime > this.homeData.endTime){
                this.dialogType = 1
                this.isDialog = true
                this.actStatus = 3 // 已结束
              }
            }else{
              if(res.data.code == '001'){
                this.dialogType = 4
                this.isDialog = true
              }else{
                this.$toast(res.data.msg)
              }
            }
          }).then(()=>{
            this.vanLoading = false
          })
        // }else{
        //   this.homeData = {...this.ngHomeData}
        //   this.vanLoading = false
        // }
      },
      _getWxConfig(params){
        getWxConfig(params).then(res=>{
          // console.log(res)
          if(res.data.success){
            this.wxOption = {
              title: "助力全棉时代内购会，获1000元购买额度！",     // 标题
              desc: "全棉时代员工内购会火热抢购中！助力成功后你也可以获得1000元购买额度哦~点我抢购买资格>",  // 描述
              imgUrl: require('@/assets/imgs/act/ngh/v2/share.jpg'),
              link: `https://m.purcotton.com/wap/h5/2018/12/26/ngh/index.html#/ngh/assist?inviter=${this.homeData.loginName}&phone=${this.homeData.mobileN}`
            }
            this.wxConfig = res.data.data
            if(res.data.code == '002'){
              this.dialogType = 3
              this.isDialog = true
            }else{
              share(this.wxConfig, this.wxOption, this)
              this.isShareDialog = true // 打开分享提示弹窗
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      }
    },
    components:{
      Icon,
      // TopBar,
      killtime,
      'van-notice-bar': NoticeBar,
      aDialog,
      Marquee,
    }
  }
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
    height: auto;
    min-height: 100%;
    // background-color: #f8f1e6;
    background-color: #FAF0E7;
    .top{
      position: relative;
      .content{
        width: 96%;
        min-height: 360px;
        // background: -webkit-linear-gradient(to right, #290D5C , #744CB2);
        // background: url('../../../assets/imgs/act/ngh/countdown-bg.jpg') no-repeat;
        // background-size: 100%;
        background-color: rgba(255, 255, 255, .6);
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
        .info{
          position: relative;
          display: flex;
          padding: 20px;
          &:after{
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 1px;
            width: 90%;
            background-color: #ddd;
          }
          .avator{
            width: 126px;
            height: 126px;
            border-radius: 100%;
            background-color: #fff;
            overflow: hidden;
          }
          ul{
            flex: 1;
            padding: 0 0 0 30px;
            li{
              padding-top: 20px;
              &:first-child{
                font-size: 32px;
                font-weight: bold;
                span{
                  display: inline-block;
                  padding: 6px 16px;
                  margin-left: 10px;
                  color: #666;
                  font-size: 24px;
                  line-height: 26px;
                  font-weight: 100;
                  border: 1px solid #ddd;
                  border-radius: 20px;
                }
              }
              &:last-child{
                font-size: 26px;
                line-height: 28px;
                color: #999;
                .ed{
                  color: #c8995e;
                }
                .ed-btn{
                  display: inline-block;
                  padding: 6px 30px;
                  margin-left: 10px;
                  background-color: #31a083;
                  color: #fff;
                  border-radius: 20px;
                }
              }
            }
          }
          .exit{
            height: 36px;
            line-height: 36px;
            font-size: 26px;
            color: #222;
            align-items: flex-start;
          }
        }
        .count-down{
          height: auto;
          padding: 26px 40px;
          text-align: center;
          display: flex;
          p.title{
            width: 130px;
            padding: 12px 6px;
            font-size: 24px;
            line-height: 34px;
            color: #c8995e;
            border: 1px solid #c8995e;
            border-radius: 20px;
            box-sizing: border-box;
          }
          /deep/ .killTime{
            flex: 1;
            font-size: 64px;
            color: #3b3a3a;
            // text-align: center;
            justify-items: center;
            padding-left: 30px;
            i{
              margin-left: 16px;
              font-style: normal;
              position: relative;
              top: -4px;
            }
            .day{
              position: relative;
              &:before{
                position: absolute;
                content: '天';
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 22px;
              }
            }
            .hour{
              position: relative;
              &:before{
                position: absolute;
                content: '时';
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 22px;
              }
            }
            .minute{
              position: relative;
              &:before{
                position: absolute;
                content: '分';
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 22px;
              }
            }
            .second{
              position: relative;
              &:before{
                position: absolute;
                content: '秒';
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 22px;
              }
            }
          }
        }
        .shop-car{
          font-size: 28px;
          line-height: 40px;
          text-align: center;
          color: #00ac97;
          i{
            font-style: normal;
          }
        }
      }
    }
    // .van-notice-bar{
    //   font-size: 26px;
    //   line-height: 40px;
    //   padding: 20px 30px 20px 60px;
    //   color: #333;
    //   background-color: #fff;
    //   position: relative;
    //   /deep/ .van-notice-bar__wrap{
    //     height: 40px;
    //     .van-notice-bar__content{
    //       opacity: 1;
    //       display: block;
    //     }
    //   }
    //   &:before{
    //     content: '';
    //     position: absolute;
    //     top: 25px;
    //     left: 20px;
    //     width: 33px;
    //     height: 24px;
    //     background  : url('../../../assets/imgs/act/ngh/notice.png') no-repeat;
    //     background-size: contain;
    //   }
    // }
    .notice{
      position: relative;
      width: 100%;
      height: 60px;
      // padding: 10px 30px 10px 60px;
      margin-top: 30px;
      overflow: hidden;
      box-sizing: border-box;
      // background-color: #fff;
      border: 1px solid #c89a60;
      border-radius: 10px;
      .icon{
        position: absolute;
        top: 10px;
        left: 12px;
        font-size: 32px;
        line-height: 36px;
        color: #c89a60; 
        z-index: 10;
      }
      .marquee{
        position: absolute;
        top: 10px;
        left: 60px;
        width: 100%;
        height: 32px;
        font-size: 28px;
        line-height: 32px;
        overflow: hidden;
      }
      marquee{
        font-size: 28px;
        line-height: 32px;
      }
    }
    ul.venue{
      padding:30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width: 48%;
        margin: 20px 4px;
        text-align: center;
        color: #fff;
        min-height: 120px;
        // background-color: blue;
        box-shadow: 2px 2px 12px #999;
        border-radius: 8px;
      }
    }
    .logo{
      padding: 60px 160px;
    }
    .dialog{
      position: relative;
      text-align: center;
      .msg,.wx,.limit{
        p{
          font-size: 30px;
          line-height: 46px;
          color: #222;
          text-align: center;
          padding: 90px 0 60px;
        }
        ul{
          display: flex;
          li{
            flex: 1;
            .btn{
              border-left: 0;
            }
          }
        }
      }
      .wx{
        p{
          padding: 60px 0;
        }
      }
      .btn{
        width: 100%;
        height: 80px;
        font-size: 32px;
        color: #31a083;
        border-top: 1px solid #eee;
        background-color: #fff;
        &:before{
          background-color: rgba(0, 0, 0, .1);
          border-color: rgba(0, 0, 0, .1);
        }
      }
    }
    .share-dialog{
      .tip{
        margin-top: -80px;
        padding: 0 20px;
      }
      /deep/ .btn{
        color: #00ac97 !important;
        border: 1px solid #00ac97 !important;
        letter-spacing: 4px;
      }
    }
  }
</style>
