<template>
  <div class="code">
    <div><img src="@/common/imgs/act/ssy/code/pic1.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/code/pic2.jpg" alt=""></div>
    <div class="panel">
      <div><img src="@/common/imgs/act/ssy/code/pic3.jpg" alt=""></div>
      <div class="box">
        <h3>您的专属邀请码：{{inviteCode}}</h3>
        <p>已成功邀请好友<span>{{inviteNum}}</span>个，获得<span>{{invitePoint}}</span>积分</p>
      </div>
    </div>
    <div><img src="@/common/imgs/act/ssy/code/pic4.jpg" alt=""></div>
    <van-button block class="btn" @click="onShare">立即邀请 ></van-button>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="10"
      :closeBtnBg="'transparent'" :closeBtnColor="'#fff'" :showHeader="false" @closeDialog="isDialog = false" :dialogWidth="'84%'">
      <div class="dialog">
        <div class="login">
          <p>您还未登录<br/>请登录后再操作哦~</p>
          <van-button class="btn" @click="onLogin" v-if="retype === 'm'">点击登录</van-button>
          <van-button class="btn" @click="isDialog=false" v-if="retype === 'app'">我知道了</van-button>
          <!-- <van-button class="btn" @click="onLogin">立即登录</van-button> -->
        </div>
      </div>
    </a-dialog>
    <a-dialog :isShowDialog="isShareDialog" :dialogType="2" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" 
              :showCloseBtn="3" :showHeader="false"  @closeDialog="isShareDialog = false">
      <ul class="wx-tip">
        <li>
          <p>邀请好友<span class="red">一起来APP玩儿吧！</span> <br/>您最高<span class="green">可获得1000积分，积分可抵现！</span></p>
        </li>
        <li><img src="@/common/imgs/act/base/share_arrow.png" alt=""></li>
      </ul>
    </a-dialog>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import {getInviteCode} from '@/api/act/ssy.js'
  import {isweixin,doLogReg,getOldAppParams,browser} from '@/common/js/utils.js' 
  import AppNative from '@/common/js/native.js'
  import {wxShare} from "@/common/js/wxShare.js"
  import aDialog from "@/components/a-dialog"
  export default {
    name: 'vcode',
    data() {
      return {
        token: '',
        wxConfigStr: '',
        inviteCode: 'xxxx',
        inviteNum: 0,
        invitePoint: 0,
        isDialog: false,
        isShareDialog: false,
        vanLoading: false,
      }
    },
    created: function(){
      if(this.retype == 'm'){
        this._getInviteCode({resendUrl: location.href.split('#')[0]})
      }else if(this.retype=='app'){
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        if(this.token){
          this._getInviteCode({ token: this.token })
        }else{
          // AppNative.openLogin()
          // this.$toast('您还未登录，请登录后再操作哦~')
          this.isDialog = true
        }
      }
    },
    methods: {
      onShare(){
        let wxOption = {
          title:"[你的好友@你]来全棉时代app玩，好货限时低价秒杀~",     //标题
          desc:"还有40元新人专享礼包等你拿！",  //描述
          imgUrl: require('@/common/imgs/act/ssy/code/share-icon.jpg')
        }
        // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#
        if(this.retype === 'm'){
          if(isweixin()){
            if(this.inviteCode){
              wxOption.link = `${location.origin}/wap/h5/2018/11/11/index.html#/ssy/download?code=${this.inviteCode}`
              this.isShareDialog = true
              wxShare(this.wxConfigStr, wxOption, this)
            }else{
              this.isDialog = true
            }
          }else{
            this.$toast('分享失败，请在微信内打开哦~')
          }
        }else if(this.retype === 'app'){
          if(this.token){
            // 分享的链接iOS需要转移，安卓不需要 安卓无法识别#号，ios无法识别&
            wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html%23/ssy/download%3fcode%3d${this.inviteCode}`
            AppNative.share(wxOption.link, wxOption.title, wxOption.desc, wxOption.imgUrl)
          }else{
            this.isDialog = true
            // AppNative.openLogin()
            // this.$toast('您还未登录，请登录后再操作哦~')
          }
        }
      },
      onLogin(){
        if(this.retype === 'm'){
          doLogReg(location.href,1)
        }else if(this.retype === 'app'){
          AppNative.openLogin()
        }
      },
      _getInviteCode(params) {
        this.vanLoading = true
        getInviteCode(params).then(res=>{
          if(res.data.success){
            this.inviteCode = res.data.data.inviteCode
            this.inviteNum = res.data.data.inviteNumber
            this.invitePoint = res.data.data.integral
            this.wxConfigStr = res.data.data.setWeixinConfig
          }else{
            if(res.data.code == "notlogin"){
              this.isDialog = true
              // this.$toast('您还未登录，请登录后再操作哦~')
            }else{
              this.$toast(res.data.msg)
            }
          }
        }).then(()=>{ this.vanLoading = false})
      }
    },
    components:{
      aDialog
    }
  }
</script>

<style lang="less" scoped>
  .code{
    width: 100%;
    height: auto;
    min-height: 1206px;
    background-color: #d0f4f0;
    .panel{
      position: relative;
      .box{
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        text-align: center;
        h3{
          font-size: 34px;
          color: #222;
        }
        p{
          font-size: 24px;
          line-height: 48px;
          color: #222;
          span{
            display: inline-block;
            color: #fe6b4f;
            padding: 0 4px;
          }
        }
      }
    }
    .btn{
      background-color: #ff8f8f;
      color: #fff;
      border: 0;
      font-size: 30px;
      height: 88px;
      &:before{
        border-color: #fff;
        background-color: #fff;
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      .login{
        padding: 60px 0;
        text-align: center;
        p{
          padding-bottom: 30px;
          font-size: 30px;
          line-height: 48px;
          color: #222;
        }
      }
      .btn{
        width: 300px;
        height: 72px;
        font-size: 30px;
        color: #fff;
        border: 0;
        border-radius: 40px;
        background-color: #ff8f8f;
        &:before{
          border-color: #fff;
          background-color: #fff;
        }
      }
    }
    ul.wx-tip{
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
  }
</style>
