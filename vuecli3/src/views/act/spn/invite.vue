<template>
  <div class="invite">
    <div class="top">
      <img src="@/common/imgs/act/spn/invite-bg.jpg" alt="">
      <van-button class="btn rule-btn" @click="onRule">邀请规则</van-button>
    </div>
    <div class="center">
      <img src="@/common/imgs/act/spn/form-bg.jpg" alt="">
      <div class="content">
        <ul>
          <li>
            <p>- 成功邀请 <span>3</span> 位 -</p>
            <div><img src="@/common/imgs/act/spn/coupon1.png" alt=""></div>
          </li>
          <li>
            <p>- 成功邀请 <span>5</span> 位 -</p>
            <div><img src="@/common/imgs/act/spn/coupon2.png" alt=""></div>
          </li>
        </ul>
        <p>您已成功邀请 <span>{{invitedNum}}</span> 人</p>
        <van-button block class="btn" @click="onShare">立即邀请</van-button>
        <van-button block class="btn" @click="onPrize">查看我的奖品</van-button>
      </div>
    </div>
    <!-- <div class="btm">
      <h3 v-if="retype === 'm'" @click="onDownload">下载app获更多新人通用券福利 ></h3>
      <p>深圳前海全棉时代电子商务有限公司<br/>粤ICP备13084779号  </p>
    </div> -->
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="2"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#404040'" @closeDialog="isDialog = false">
      <div class="dialog">
        <div class="prize" v-if="dialogType === 1">
          <h3>奖品列表</h3> 
          <ul v-if="prizeCount">
            <li><img src="@/common/imgs/act/spn/coupon1.png" alt="" onclick="return false"></li>
            <li v-if="prizeCount ==2 "><img src="@/common/imgs/act/spn/coupon2.png" alt="" onclick="return false"></li>
          </ul>
          <p v-else>暂无奖品</p>
        </div>
        <div class="rule" v-if="dialogType === 2">
          <h3>邀请规则</h3> 
          <div class="content"> 
            <p><span>1、</span>活动时间：<br/>2018.12.01-2018.12.31</p> 
            <p><span>2、</span>邀请好友注册满3人可获10元无门槛现金券，满5人可再获40元优惠券一张</p> 
            <p><span>3、</span>本活动全棉时代在法律允许的范围内有权作出解释</p> 
            <p v-if="retype === 'app' && isIos"><span>4、</span>本活动由全棉时代官方商城举办，苹果公司不对本次抽奖或者活动承担责任</p> 
          </div>
          <van-button block class="btn" @click="isDialog = false">我知道了</van-button>
        </div>
        <div class="login" v-if="dialogType === 3">
          <h3>提示</h3> 
          <p>您还未登录<br/>请登录后再操作哦~</p>
          <van-button block class="btn" @click="onLogin" v-if="retype === 'm'">点击登录</van-button>
          <van-button block class="btn" @click="isDialog=false" v-if="retype === 'app'">知道了</van-button>
        </div>
      </div>
    </a-dialog>
    <a-dialog :isShowDialog="isShareDialog" :dialogType="2" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" :showCloseBtn="3" :showHeader="false"  @closeDialog="isShareDialog = false">
      <ul class="dialog-tip">
        <li>
          <p>一起<span class="red">来全棉享品质生活吧，</span> <br/>注册<span class="green">立享99元新人红包礼！</span></p>
        </li>
        <li><img src="@/common/imgs/act/base/share_arrow.png" alt=""></li>
      </ul>
    </a-dialog>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  // filterImgPath
  import {isweixin,doLogReg,getOldAppParams,browser,downloadApp} from '@/common/js/utils.js'
  import aDialog from "@/components/a-dialog"
  import share from "@/common/js/share"
  import AppNative from '@/common/js/native.js'
  import {getInviteData, getPrize} from '@/api/act/spn.js'
  export default {
    name: 'invite',
    data() {
      return {
        isDialog: false,
        dialogType: 1, // 1为奖品列表，2为规则 3为登录
        isShareDialog: false,
        invitedNum: 0, // 邀请数
        prizeCount: 0, //礼品数
        inviter: '', // wap端用
        token: '', // app端用
        wxConfigStr: '',
        vanLoading: false,
        isIos: false,
      }
    },
    created: function(){
      if(this.retype === 'm'){
        // 传当前URL获取后台微信接口配置
        this._getInviteData({ resendUrl: location.href.split('#')[0] })
      }else if(this.retype === 'app'){
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        this._getInviteData({ token: this.token })
        this.isIos = browser.versions.ios
        // if(this.token){
        //   this._getInviteData({ token: this.token })
        // }else{
          // AppNative.openLogin()
        // }
      }
    },
    methods: {
      // filterImg(value){
      //   return filterImgPath(value) 
      // },
      // closeDialog(){
      //   this.isDialog = false
      // },
      // closeShareDialog(){
      //   this.isShareDialog = false
      // },
      onRule(){
        this.dialogType = 2
        this.isDialog = true
      },
      onLogin(){
        doLogReg(location.href,1)
      },
      onDownload(){
        downloadApp()
      },
      onShare(){
        let wxOption = {
          title: "注册即送99元红包礼，优享天然好棉！",     // 标题
          desc: "亲爱的朋友，快来全棉过健康品质生活吧，新人注册福利多多哦",  // 描述
          imgUrl: require('@/common/imgs/act/spn/share.jpg')
        }
        if(this.retype === 'm'){
          if(isweixin()){
            if(this.inviter){
              // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#
              wxOption.link = `${location.origin}/wap/h5/2018/11/30/spn/index.html#/spn/register?inviterId=${this.inviter}`
              this.isShareDialog = true // 打开分享提示弹窗
              share(this.wxConfigStr, wxOption, this)
            }else{
              // 未登陆不能分享
              this.dialogType = 3
              this.isDialog = true
            }
          }else{
            this.$toast('分享失败，请在微信内打开')
          }
        }else if(this.retype === 'app'){
          if(this.token){
            // app分享链接为空则不能分享出去
            // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#但无法识别&
            wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/30/spn/index.html%23/spn/register%3finviterId%3d${this.token}%26type%3dapp`
            AppNative.share(wxOption.link, wxOption.title, wxOption.desc, wxOption.imgUrl)
          }else{
            // AppNative.openLogin()
            // 未登陆提示登陆
            this.dialogType = 3
            this.isDialog = true
          }
        }
      },
      onPrize(){
        if(this.retype === 'm'){
          if(this.inviter){
            this._getPrize({})
          }else{
            this.dialogType = 3
            this.isDialog = true
          }
        }else if(this.retype === 'app'){
          if(this.token){
            this._getPrize({token: this.token})
          }else{
            // AppNative.openLogin()
            this.dialogType = 3
            this.isDialog = true
          }
        }
      },
      _getPrize(params){
        getPrize(params).then(res=>{
          if(res.data.success){
            this.prizeCount = res.data.data.length
            this.dialogType = 1
            this.isDialog = true
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
        })
      },
      _getInviteData(params){
        this.vanLoading = true
        getInviteData(params).then(res=>{
          if(res.data.success){
            this.invitedNum = res.data.data.inviteSuccessCt
            this.inviter = res.data.data.inviter
            this.wxConfigStr = res.data.data.setWeixinConfig
            // wxShare(this.wxConfigStr, this.wxOption, this) // 因为没有登录不能分享,分享需要分享者id
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
          this.vanLoading = false
        })
      },
      // getErrorTip(rt){
      //   if(rt == 'notId'){
      //     this.$toast('活动id为空')
      //   }else if(rt == 'idNotRelateInfo'){
      //     this.$toast('此id没有创建活动')
      //   }else if(rt == 'notBegin'){
      //     this.$toast('活动未开始')
      //   }else if(rt == 'notTime'){
      //     this.$toast('活动未开启')
      //   }else if(rt == 'end'){
      //     this.$toast('活动已结束')
      //   }else if(rt == 'notlogin'){
      //     this.dialogType = 3
      //     this.isDialog = true
      //   }else{
      //     this.$toast('响应异常，请重试')
      //   }
      // }
    },
    components:{
      aDialog,
    }
  }
</script>

<style lang="less" scoped>
  .invite{
    width: 100%;
    // height: auto;
    height: 100%;
    min-height: 1206px;
    // background: -webkit-linear-gradient(to right, #85e6dd , #9adae7);
    background-color: #fcdd7e;
    position: relative;
    .top{
      position: relative;
      .rule-btn{
        position: absolute;
        top: 30px;
        right: 30px;
        color: #007fac;
        font-size: 28px;
        border: none;
        border-radius: 10px;
        background-color: rgba(174,228,247,.7)
      }
    }
    .center{
      position: relative;
      .content{
        position: absolute;
        width: 100%;
        height: auto;
        padding: 60px 100px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        box-sizing: border-box;
        ul{
          display: flex;
          justify-content: space-between;
          li{
            width: 48%;
            p{
              padding: 30px 0;
              color: #b18d1d;
              font-size: 30px;
              span{
                color: #fa5d50;
              }
            }
          }
        }
        >p{
          padding: 30px 0 0;
          color: #333;
          font-size: 40px;
          span{
            color: #fb5b51;
            font-size: 60px;
            position: relative;
            top: 4px;
          }
        }
        >.btn{
          margin-top: 30px;
          height: 80px;
          font-size: 30px;
          color: #fff;
          border-radius: 40px;
          background-color: #fb5b51;
          &:last-child{
            background-color: #62b88f;
          }
        }
      }
    }
    .btm{
      text-align: center;
      h3{
        padding: 10px 0 30px;
        color: #fb5b51;
        font-size: 32px;
      }
      p{
        padding: 0 0 30px;
        color: #b18d1d;
        font-size: 24px;
        line-height: 34px;
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      padding-top: 30px;
      h3{
        padding-top: 60px;
        font-size: 32px;
        color: #b18d1d;
        position: relative;
        &:before{
          content: ' ';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 51px;
          height: 35px;
          background: url('../../../common/imgs/act/spn/icon.png') no-repeat;
          background-size: 100%;
        }
      }
      .prize{
        ul{
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          padding: 40px 80px;
          li{
            padding: 20px 0;
            // flex: 1;
            margin: 0 20px;
            // width: 46%;
            // padding: 20px 0;
          }
        }
        p{
          padding: 60px 0;
          font-size: 32px;
          color: #666;
        }
      }
      .rule{
        .content{
          padding: 30px 20px;
          p{
            position: relative;
            padding: 5px 0 5px 50px;
            font-size: 30px;
            line-height: 48px;
            text-align: left;
            color: #333;
            span{
              position: absolute;
              left: 0;
              top: 5px;
            }
          }
        }
        .btn{
          color: #222;
          border-top: 1px solid #eee;
        }
      }
      .login{
        text-align: center;
        p{
          padding: 30px 0;
          font-size: 30px;
          line-height: 48px;
          color: #222;
        }
        .btn{
          color: #222;
          border-top: 1px solid #eee;
        }
      }
      .btn{
        height: 100px;
        font-size: 32px;
        color: #fff;
        border: 0;
        background-color: #fff;
      }
    }
    ul.dialog-tip{
      display: flex;
      justify-content: space-between;
      padding: 30px 10px;
      li:first-child{
        flex: 1;
        color: #fff;
        font-size: 30px;
        line-height: 56px;
        letter-spacing: 4px;
        .red{
          color: #f63d50;
        }
        .green{
          color: #42b3a2;
        }
      }
      li:last-child{
        width: 12%;
      }
    }
    // 按钮通用样式
    .btn{
      border: 0;
      &:before{
        background-color: #fff;
        border-color: #fff;
      }
    }
  }
</style>
