<template>
  <div class="invite">
    <div class="top">
      <img src="@/common/imgs/act/ssy/invite-bg1.jpg" alt="">
      <ul>
        <li @click="onRank">邀请排行榜</li>
        <li @click="onRule">邀请规则</li>
      </ul>
    </div>
    <div><img src="@/common/imgs/act/ssy/invite-bg2.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/invite-bg3.jpg" alt=""></div>
    <div class="btm">
      <p>您已成功邀请 <span>{{invitedNum}}</span> 人</p>
      <ul class="btn-box">
        <li><van-button block class="btn" @click="onInvite">立即邀请 ></van-button></li>
        <li><van-button block class="btn" @click="onPrize">我的奖品 ></van-button></li>
      </ul> 
      <van-button block class="btn" @click="onInviteDownload">邀请好友来APP玩，再获1000积分 ></van-button>
    </div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="10" :closeBtnBg="'transparent'" :closeBtnColor="'#fff'" 
      :showHeader="dialogType === 3 ? false : true" :headerTitle="dialogType === 1?'奖品列表':dialogType === 2?'活动规则':''" 
      :headerBg="'#68c9bd'" @closeDialog="isDialog = false" :dialogWidth="'84%'">
      <div class="dialog">
        <div class="prize" v-if="dialogType === 1">
          <ul v-if="prizeCount">
            <li><img src="@/common/imgs/act/ssy/coupon1.png" alt="" onclick="return false"></li>
            <li v-if="prizeCount === 2"><img src="@/common/imgs/act/ssy/coupon2.png" alt="" onclick="return false"></li>
          </ul>
          <p v-else>暂无奖品</p>
        </div>
        <div class="rule" v-if="dialogType === 2">
          <div class="content">
            <p> 1、邀请有礼活动时间：2018.10.29-2018.11.12；</p>
            <p> 2、老用户邀请3位好友注册及可获赠满399元减30元优惠券1张，邀请5位好友注册即可再获赠满599减50元优惠券1张；</p>
            <p> 3、获得女士舒心包的用户需满足邀请到的新注册有效用户20名以上且下单的人数需满3人以上。其中，所邀请的新会员下单人数最多的用户可获得奖品；</p>
            <p> 4、舒心包以券的形式发放，券面金额391元，下单直接抵用，奖品将于活动结束之后7天内发放，邮费自理；</p>
            <p> 5、用户邀请的好友人数可在页面实时更新；</p>
            <p> 6、若有用户通过不公平公正手段刷取注册量等，全棉时代有权撤销对应用户的赠品和权益；</p>
            <p> 7、全棉时代在法律范围内享有对本活动的最终解释权。</p>
          </div>
          <van-button class="btn" @click="isDialog = false">知道了</van-button>
        </div>
        <div class="login" v-if="dialogType === 3">
          <p>您还未登录<br/>请登录后再操作哦~</p>
          <van-button class="btn" @click="onLogin" v-if="retype === 'm'">点击登录</van-button>
          <van-button class="btn" @click="isDialog=false" v-if="retype === 'app'">我知道了</van-button>
          <!-- <van-button class="btn" @click="onLogin">点击登录</van-button> -->
        </div>
      </div>
    </a-dialog>
    <a-dialog :isShowDialog="isShareDialog" :dialogType="2" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" 
              :showCloseBtn="3" :showHeader="false"  @closeDialog="isShareDialog = false">
      <ul class="wx-tip">
        <li>
          <p>快邀请好友<span class="red">加入全棉会员，</span> <br/>赢取<span class="green">390元女士舒心大礼包！</span></p>
        </li>
        <li><img src="@/common/imgs/act/base/share_arrow.png" alt=""></li>
      </ul>
    </a-dialog>
    <van-loading color="white" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  // filterImgPath downloadApp
  import {isweixin,doLogReg,getOldAppParams,browser} from '@/common/js/utils.js'
  import aDialog from "@/components/a-dialog"
  import share from "@/common/js/share"
  import AppNative from '@/common/js/native.js'
  import {getInviteData, getPrize} from '@/api/act/ssy.js'
  export default {
    name: 'invite',
    data() {
      return {
        isDialog: false,
        dialogType: 1, // 1为奖品列表，2为规则 3为登录
        isShareDialog: false,
        invitedNum: 0, // 邀请数
        prizeCount: 0, // 礼品数
        inviter: '', // wap端用
        token: '', // app端用
        wxConfigStr: '',
        vanLoading: false,
      }
    },
    created: function(){
      if(this.retype == 'm'){
        // 传当前URL获取后台微信接口配置
        this._getInviteData({ resendUrl: location.href.split('#')[0] })
      }else if(this.retype == 'app'){
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        this._getInviteData({ token: this.token })
        // if(this.token){
        //   this._getInviteData({ token: this.token })
        // }else{
        //  AppNative.openLogin()
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
      onRank(){
        if(this.retype === 'm'){
          this.$router.push('/ssy/rank')
        }else{
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/rank`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      onRule(){
        this.dialogType = 2
        this.isDialog = true
      },
      onLogin(){
        if(this.retype === 'm'){
          doLogReg(location.href,1)
        }else if(this.retype === 'app'){
          AppNative.openLogin()
        }
      },
      // onDownload(){
      //   downloadApp()
      // },
      onInvite(){
        let wxOption = {
          title: "快来参加全棉时代11.11购物狂欢节吧，一起嗨翻天！",     // 标题
          desc: "新人专享【11.11新人福利40元哦】，话不多说，一试便知~~",  // 描述
          imgUrl: require('@/common/imgs/act/ssy/share-icon.jpg')
        }
        if(this.retype === 'm'){
          if(isweixin()){
            if(this.inviter){
              // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#
              wxOption.link = `${location.origin}/wap/h5/2018/11/11/index.html#/ssy/share?inviterId=${this.inviter}`
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
            wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html%23/ssy/share%3finviterId%3d${this.token}%26type%3dapp`
            AppNative.share(wxOption.link, wxOption.title, wxOption.desc, wxOption.imgUrl)
          }else{
            // AppNative.openLogin()
            // 未登陆提示登陆
            this.dialogType = 3
            this.isDialog = true
          }
        }
      },
      onInviteDownload(){
        if(this.retype === 'm'){
          this.$router.push('/ssy/code')
        }else if(this.retype === 'app'){
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/code`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      onPrize(){
        if(this.retype === 'm'){
          // if(this.inviter){
          //   this._getPrize({})
          // }else{
          //   this.dialogType = 3
          //   this.isDialog = true
          // }
          this._getPrize({})
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
            // this.getErrorTip(res.data.data)
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
    },
    components:{
      aDialog,
    }
  }
</script>

<style lang="less" scoped>
  .invite{
    width: 100%;
    height: auto;
    min-height: 1206px;
    // background: -webkit-linear-gradient(to right, #85e6dd , #9adae7);
    background-color: #d0f4f0;
    position: relative;
    .top{
      position: relative;
      ul{
        position: absolute;
        top: 20px;
        right: 0px;
        li{
          color: #fff;
          font-size: 28px;
          padding: 18px 22px;
          border-top-left-radius: 40px;
          border-bottom-left-radius: 40px;
          text-align: center;
          &:first-child{
            background-color: #68c9bd;
          }
          &:last-child{
            margin-top: 20px;
            background-color: #68c9bd;
          }
        }
      }
    }
    .btm{
      text-align: center;
      p{
        font-size: 32px;
        color: #000;
        letter-spacing: 2px;
        span{
          position: relative;
          top: 6px;
          font-size: 58px;

        }
      }
      ul.btn-box{
        display: flex;
        justify-content: space-between;
        padding: 24px 80px;
        // background: -webkit-linear-gradient(to right, #85e7dd , #97dce6);
        li{
          width: 44%;
          .btn{
            border: 0;
            color: #fff;
            font-size: 28px;
            height: 70px;
            line-height: 70px;
            border-radius: 40px;
            background-color: #68c9bd;
            &:before{
              border-color: #fff;
              background-color: #fff;
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
    }
    .dialog{
      position: relative;
      text-align: center;
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
          font-size: 28px;
          color: #666;
        }
      }
      .rule{
        padding: 30px 0;
        .content{
          height: 420px;
          padding: 0 30px;
          overflow-y: scroll;
          p{
            font-size: 26px;
            line-height: 42px;
            text-align: left;
            color: #333;
          }
        }
        .btn{
          margin-top: 30px;
        }
      }
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
