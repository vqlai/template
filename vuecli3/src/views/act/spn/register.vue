<template>
  <div class="register">
    <div class="top">
      <img src="@/common/imgs/act/spn/register-bg.jpg" alt="">
    </div>
    <div class="center">
      <img src="@/common/imgs/act/spn/form-bg.jpg" alt="">
      <div class="form">
        <p>新会员福利，注册即获<span>99元红包礼</span></p>
        <ul class="coupon">
          <li><img src="@/common/imgs/act/spn/coupon3.png" alt=""></li>
          <li><img src="@/common/imgs/act/spn/coupon4.png" alt=""></li>
        </ul>
        <van-cell-group class="phone-box"> <van-field v-model="phone" placeholder="请输入手机号码" maxlength="11" class="phone" clearable/> </van-cell-group>
        <div class="msg-box">
          <van-cell-group class="code-box"> <van-field v-model="code" placeholder="请输入验证码" maxlength="4" class="code" clearable/> </van-cell-group>
          <van-button block class="btn msg-btn" @click="onMsgCode" :class="{active: codeBtnActive}">{{codeText}}</van-button>
        </div>
        <ul class="btn-box">
          <li><van-button block class="btn" @click="regAndGetWelfare" :loading="btnLoading">立即领取新人礼</van-button></li>
        </ul>
      </div>
    </div>
    <div class="btm">
      <h3 @click="onDownload">下载app获更多新人通用券福利 ></h3>
      <p>深圳前海全棉时代电子商务有限公司<br/>粤ICP备13084779号</p>
    </div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="2"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#404040'" @closeDialog="isDialog = false" :dialogWidth="'86%'">
      <div class="dialog">
        <div class="success" v-if="dialogType === 1">
          <h3>恭喜您获得全棉新人礼包！</h3>
          <p>赠品已到您的账户！</p>
          <div class="gift"><img src="@/common/imgs/act/spn/gift.png" alt=""></div>
          <van-button block class="btn" @click="goHome">点击立即使用 ></van-button>
        </div> 
        <div class="reged" v-if="dialogType === 2">
          <h3>提示</h3>
          <p>亲爱的，您已经是全棉时代老会员啦，<br/>快去邀请好友享受老会员福利吧！</p>
          <van-button block class="btn" @click="goSharePage">立即邀请</van-button>
        </div>
      </div>
    </a-dialog>
  </div>
</template>

<script>
  // 分享后的邀请注册
  import AppNative from '@/common/js/native.js'
  import {checkPhone,checkMsgCode} from '@/common/js/validation.js'
  import MsgCode from '@/common/js/msgCode.js'
  import {getMsgCode,inviteRegister} from '@/api/act/spn.js'
  import aDialog from "@/components/a-dialog.vue"
  // getOldAppParams doLogReg 
  import {downloadApp,browser} from '@/common/js/utils.js' 
  export default {
    name: 'register', 
    data() {
      return {
        phone: '',
        code: '',
        codeText: '获取验证码',
        btnLoading: false,
        inviterId: this.$route.query.inviterId || '', // 注册领福利用
        type: this.$route.query.type || 'wap', // 注册领福利用
        isDialog: false,
        codeBtnActive: false,
        dialogType: 1, // 1注册成功 2为注册老会员
      }
    },
    created:function(){
    },
    mounted: function(){
      this.$nextTick(()=>{
      })
    },
    methods: {
      // wgDownload(){
      //   location.href = 'https://lnk0.com/JBVJ1c?td_subid={td_subid}'
      // },
      onDownload(){
        downloadApp()
      },
      goSharePage(){
        if(this.retype === 'm'){
          this.$router.push('/spn/invite')
        }else{
          let link = `${location.origin}/app/h5/2018/11/30/spn/index.html#/spn/invite`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      goHome(){
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com'
        }else if(this.retype === 'app'){
          let link = `https://app.purcotton.com`
          AppNative.sendAction('mobile',{'type': 7,'data': link})
          // AppNative.openWeb(link,'',false)
        }
      },
      onMsgCode(){
        if(this.checkForm(1)){
          let params = {
            mobile: this.phone
          }
          this.sms = new MsgCode(this)
          if(this.sms.isRun()){
            return
          }
          getMsgCode(params).then(res => {
            if(res.data.success){
              this.codeBtnActive= true
              this.sms.start(120)
              this.$toast('发送成功')
            }else{
              this.getMsgTip(res.data.data)
            }
          })
        }
      },
      regAndGetWelfare(){
        if(this.checkForm(2)){
          if(!this.btnLoading){
            this.btnLoading = true
            let params = {
              mobile: this.phone,
              smsCode:  this.code,
              inviter: this.inviterId,
              flag: this.type
            }
            inviteRegister(params).then(res=>{
              if(res.data.success){
                if(this.sms){
                  this.sms.stop()
                }
                this.phone = ''
                this.code = ''
                if(res.data.code == "oldMember"){
                  this.dialogType = 2
                  this.isDialog = true
                }else{
                  this.dialogType = 1
                  this.isDialog = true
                }
              }else{
                this.$toast(res.data.msg)
              }
            }).then(()=>{
              setTimeout(()=>{
                this.btnLoading = false
              },500)
            })
          }
        }
      },
      checkForm(type){
         let isOk = true
        // type为1则为短信码验证，为2则为注册验证 
        if(this.phone == ""){
          this.$toast('请输入手机号码')
          isOk = false
        } else if(!checkPhone(this.phone)){
          this.$toast('请输入有效手机号码')
          isOk = false
        }else if(type === 2){
          if(this.code == ""){
            this.$toast('请输入验证码')
            isOk = false
          }else if(!checkMsgCode(this.code)){
            this.$toast('请输入有效验证码')
            isOk = false
          }
        }
        return isOk
      },
      getMsgTip(rt){
        if(rt == "error" || rt == "false"){
          this.$toast('服务器错误，请重试')
        }if(rt == "noMobileNo" || rt == "mobileisNull"){
          this.$toast('手机号码为空')
        }else if(rt == "notRightMobile"){
          this.$toast('手机格式错误') 
        }else if(rt == "limit"){
          this.$toast('短信发送间隔小于120s') 
        }else if(rt == "max"){
          this.$toast('短信发送次数达到上限') 
        }else if(rt == "smsCodeNull"){
          this.$toast('短信验证码为空') 
        }else if(rt == "smsCodeExpired"){
          this.$toast('短信验证码已经失效，请重新发送') 
        }else if(rt == "smsCodeExpiredAndMax"){
          this.$toast('短信验证码已经失效并且达到发送次数上限请明天再重试')
        }else if(rt == "notRightSmsCode"){
          this.$toast('短信验证码不对，请重新输入')
        }else{
          this.$toast('服务器异常，请重试')
        }
      }
    },
    components:{
      aDialog,
    }
  }
</script>

<style lang="less" scoped>
  .register{
    width: 100%;
    height: 100%;
    min-height: 1206px;
    // background: -webkit-linear-gradient(to right, #85e6dd , #9adae7);
    background-color: #fcdd7e;
    position: relative;
    .center{
      position: relative;
      .form{
        position: absolute;
        width: 100%;
        height: auto;
        padding: 60px 100px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        overflow: hidden;
        p{
          font-size: 28px;
          color: #b18d1d;
          text-align: center;
          position: relative;
          text-indent: 50px;
          span{
            color: #fb5b51;
          }
          &:before{
            content: ' ';
            position: absolute;
            top: -6px;
            left: 0px;
            width: 51px;
            height: 35px;
            background: url('../../../common/imgs/act/spn/icon.png') no-repeat;
            background-size: contain;
          }
        }
        ul.coupon{
          display: flex;
          justify-content: space-between;
          padding: 30px 0;
          li{
            width: 48%;
          }
        }
        .phone-box{
          border: 1px solid #dddddd;
          border-radius: 40px;
          position: relative;
          background-color: #fff;
          .phone{
            padding: 18px 20px;
            /deep/ input{
              font-size: 28px;
              // 修改input placeholder的默认颜色
              &::-webkit-input-placeholder{
                color: #999;
              }
              &::-moz-placeholder{
                color: #999;
              }
            }
            /deep/ .van-icon-clear{
              font-size: 28px;
              color: #b0b9b7;
            }
          }
        }
        .msg-box{
          display: flex;
          justify-content: space-between;
          margin: 20px 0 0 0;
          position: relative;
          .code-box{
            width: 50%;
            border: 1px solid #dddddd;
            border-radius: 40px;
            background-color: #fff;
            .code{
              padding: 18px 20px;
              /deep/ input{
                font-size: 28px;
                // 修改input placeholder的默认颜色
                &::-webkit-input-placeholder{
                  color: #999;
                }
                &::-moz-placeholder{
                  color: #999;
                }
              }
              /deep/ .van-icon-clear{
                font-size: 28px;
                color: #b0b9b7;
              }
            }
          }
          .msg-btn{ 
            width: 46%;
            border-radius: 40px;
            // padding: 22px 0;
            // height: auto;
            height: 72px;
            line-height: 72px;
            color: #fff;
            font-size: 28px;
            line-height: 28px;
            // border-radius: 40px;
            border-color: #17a8db;
            background-color: #17a8db;
            box-sizing: border-box;
            &.active{
              border-color: #b0b9b7;
              background-color: #b0b9b7;
            }
          }
        }
        ul.btn-box{
          padding: 20px 0;
          li{
            .btn{
              border: 0;
              color: #fff;
              font-size: 32px;
              height: 72px;
              line-height: 72px;
              border-radius: 40px;
              background-color: #f95b51;
              // 背景颜色设置为渐变色
              // background: linear-gradient(left,#aacbb7,#84ba99);
              // background: -webkit-linear-gradient(left, #aacbb7,#84ba99);
              // 设置按钮的内外阴影
              // box-shadow: -3px -3px 10px #65a27b inset, 20px 20px 50px #cce3d5; 
              /deep/ .van-loading{
                color: #fff!important;
              }
            }
          }
        }
      }
    }
    .btm{
      text-align: center;
      background-color: #fcdd7e;
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
        padding-top: 42px;
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
      .success{
        p{
          padding-top: 10px;
          font-size: 28px;
          color: #666;
        }
        .gift{
          padding: 20px 60px;
        }
        .btn{
          color: #fb5b51;
          border-top: 1px solid #eee;
        }
      }
      .reged{
        p{
          padding: 30px 0;
          font-size: 28px;
          line-height: 38px;
        }
        .btn{
          color: #fb5b51;
          border-top: 1px solid #eee;
        }
      }
      .btn{
        height: 100px;
        font-size: 32px;
        border: 0;
        background-color: #fff;
      }
    }
    .btn{
      border: 0;
      &:before{
        background-color: #fff;
        border-color: #fff;
      }
    }
  }
</style>
