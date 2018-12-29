<template>
  <div class="login">
    <div><img src="@/assets/imgs/act/ngh/v2/login1.jpg" alt=""></div>
    <div class="wrap">
      <div class="kf" @click="onKf"><img src="@/assets/imgs/act/ngh/v2/kf.png" alt=""><p>联系客服</p></div>
      <div class="content">
        <!-- <h3 v-if="loginType === 1">密码登录</h3> -->
        <!-- <h3 v-if="loginType === 2">短信验证码登录</h3> -->
        <h3>用户登录</h3>
        <div class="form">
          <ul>
            <li class="phone">
              <van-cell-group> <van-field v-model="phone" placeholder="请输入手机号" maxlength="11" clearable/> </van-cell-group>
            </li>
            <li v-if="loginType === 1" class="password">
              <van-cell-group> <van-field v-model="password" type="password" placeholder="请输入密码" clearable/> </van-cell-group>
            </li>
            <li v-if="loginType === 2" class="sms-code">
              <van-cell-group class="no-border"> <van-field v-model="smsCode" placeholder="请输入短信验证码" maxlength="4" clearable/></van-cell-group>
              <div class="code-btn" @click="onMsgCode">{{codeText}}</div>
            </li>
            <li class="img-code">
              <van-cell-group class="no-border"> <van-field v-model="imgCode" placeholder="请输入图形验证码" maxlength="4" clearable/> </van-cell-group>
              <div class="img"><img :src="imgCodePath" alt=""></div>
              <div class="img-btn" @click="onImgCodePath">换一个</div>
            </li>
          </ul>
          <van-button block class="btn" type="primary" @click="onLogin" :loading="btnLoading" v-if="!btnStatus">进入会场</van-button>
          <van-button block class="btn unable" type="primary" v-else>您的账号被锁定，请咨询在线客服</van-button>
          <div v-if="loginType === 1" class="switch-btn switch1">
            <div @click="switchLogin(2)">使用短信验证码登录</div>
            <div class="forget-btn" @click="onForgetPwd">忘记密码？</div>
          </div>
          <div v-if="loginType === 2" @click="switchLogin(1)" class="switch-btn">使用帐号密码登录</div>
        </div>
      </div>
    </div>
    <div class="rule">
      <img src="@/assets/imgs/act/ngh/v2/login2.jpg" alt="">
    </div>
    <div><img src="@/assets/imgs/act/ngh/v2/login3.jpg" alt=""></div>
    <div @click="backTop"><img src="@/assets/imgs/act/ngh/v2/login4.jpg" alt=""></div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="dialogType === 3 ? 3 : 1"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#7a7a7a'" @closeDialog="isDialog=false" :dialogWidth="'84%'">
      <div class="dialog">
        <div class="msg" v-if="dialogType === 1">
          <p>抱歉，您尚未取得内购资格！ </p>
          <!-- <van-button block class="btn" @click="isDialog = false">我知道了</van-button> -->
          <van-button block class="btn" @click="onExit">退出</van-button>
        </div>
        <div class="end" v-if="dialogType === 2">
          <p> 抱歉，本期内购会已结束！ </p>
          <van-button block class="btn" @click="onExit">退出</van-button>
        </div>
        <div class="wx" v-if="dialogType === 3">
          <p>抱歉，请在微信内参与活动哦~</p>
        </div>
        <div class="ng" v-if="dialogType === 4">
          <p>抱歉，此活动仅向全棉时代公司员工开放，<br/>您是非公司员工，无法享受内购活动哦！</p>
          <ul>
            <li><van-button block class="btn" @click="isDialog = false">取消</van-button></li>
            <li><van-button block class="btn" @click="onGoView">去官网</van-button></li>
          </ul>
          <!-- <p>抱歉，您尚未取得内购资格！</p> -->
          <!-- <van-button block class="btn" @click="onExit">退出</van-button> -->
        </div>
      </div>
    </a-dialog>
  </div>
</template>

<script>
  import aDialog from "@/components/a-dialog.vue"
  import {checkPhone,checkPassword,checkMsgCode,checkImgCode} from '@/assets/js/validation.js'
  // getImgCodePath
  import {getMsgCode,pwdLogin,smsLogin,openKf,loginOut} from '@/assets/api/act/ngh.js'
  import MsgCode from '@/assets/js/msgCode.js'
  import {isweixin} from '@/assets/js/utils.js' 
  export default {
    name: 'login',
    data() {
      return {
        phone: '',
        password: '',
        smsCode: '',
        imgCode: '',
        codeText: '获取短信验证码',
        btnLoading: false,
        isDialog: false,
        dialogType: 1, // 1为没资格,2为已结束，3为微信打开提示
        loginType: 1, // 1为密码登录，2为短信登录
        imgCodePath: `${location.origin}/ValiCode.ihtml?${new Date().getTime()}`,
        btnStatus: false
      }
    },
    created: function(){},
    mounted: function(){
      this.$nextTick(()=>{
        if(!isweixin() && location.hostname.split('.')[0] === 'm'){
          this.dialogType = 3
          this.isDialog = true
        }
      })
    },
    methods: {
      onExit(){
        // window.close() // 微信内置浏览器无法使用
        // WeixinJSBridge.call('closeWindow')
        loginOut().then(()=>{
          // location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
          location.href = 'https://m.purcotton.com/'
          // typeof WeixinJSBridge === 'undefined' ? window.close() : WeixinJSBridge.call('closeWindow') 
        })
      },
      onLogin(){
        if(this.checkForm()){
          if(this.loginType === 1){
            let params = {
              openId: this.$route.query.openId || '',
              loginName: this.phone,
              loginPassword: this.password,
              imgCode: this.imgCode
            }
            pwdLogin(params).then(res => {
              this.doLogin(res)
            })
          }else if(this.loginType === 2){
            let params = {
              openId: this.$route.query.openId || '',
              mobile: this.phone,
              smsCode: this.smsCode,
              imgCode: this.imgCode
            }
            smsLogin(params).then(res => {
              this.doLogin(res)
            })
          }
        }
      },
      doLogin(res){
        if(res.data.success){
          if(res.data.data.currentTime > res.data.data.endTime){  // 内购已结束
            this.dialogType = 2
            this.isDialog = true
          }else{
            if(res.data.data.isNgPerson){ // 内购成员去主会场
              this.$router.push({ path: '/ngh/home'})
              // this.$router.replace({ path: '/ngh/home'})
            }else{ // 非内购成员弹窗提示非内购 没资格
              this.dialogType = 1
              this.isDialog = true
            }
          }
        }else{
          if(res.data.code == "activeError"){
            this.$toast('内购会活动未开启~')
          }else if(res.data.code == 'lockmenber'){ // 连续5次输入错误，帐号锁定
            this.btnStatus = true
            this.$toast(res.data.msg)
          }else if(res.data.code == 'activeError'){ // 内购已结束
            this.dialogType = 2
            this.isDialog = true
          }else{
            this.$toast(res.data.msg)
          }
        }
      },
      onGoView(){
        location.href = 'https://m.purcotton.com'
      },
      onMsgCode(){
        if(this.checkPhoneNumber()){
          let params = {
            mobilePhone: this.phone,
            purpose: 'loginformobile'
          }
          this.sms = new MsgCode(this)
          if(this.sms.isRun()){
            return
          }
          getMsgCode(params).then(res => {
            if(res.data.success){
              // this.isActive= true
              this.sms.start(120)
              this.$toast('发送成功')
            }else{
              this.$toast(res.data.msg)
            }
          })
        }
      },
      backTop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      onKf(){
        openKf().then(res=>{
          if(res.status === 200){
            location.href = res.data
          }else{
            this.$toast(res.statusText)
          }
        })
      },
      onImgCodePath(){
        this.imgCodePath = `${location.origin}/ValiCode.ihtml?${new Date().getTime()}`
      },
      onForgetPwd(){
        location.href = `https://m.purcotton.com/wap/login/index.html#/FogetPassword?callbackUrl=${'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'}`
      },
      switchLogin(type){
        this.phone = ''
        this.password = ''
        this.smsCode = ''
        this.imgCode = ''
        this.loginType = type
      },
      checkPhoneNumber(){
        let isOk= true
        if(this.phone == ""){
          this.$toast('请输入手机号')
          isOk = false
        } else if(!checkPhone(this.phone)){
          this.$toast('请正确输入手机号')
          isOk = false
        }
        return isOk
      },
      checkForm(){
        let isOk= true
        if(this.phone == ""){
          this.$toast('请输入手机号')
          isOk = false
        } else if(!checkPhone(this.phone)){
          this.$toast('请正确输入手机号')
          isOk = false
        }else if(this.loginType === 1){
          if(this.password == ""){
            this.$toast('请输入密码')
            isOk = false
          }else if(!checkPassword(this.password)){
            this.$toast('请正确输入密码')
            isOk = false
          }else if(this.imgCode == ""){
            this.$toast('请输入图形验证码')
            isOk = false
          }else if(!checkImgCode(this.imgCode)){
            this.$toast('请正确输入图形验证码')
            isOk = false
          }
        }else if(this.loginType === 2){
          if(this.smsCode == ""){
            this.$toast('请输入短信验证码')
            isOk = false
          }else if(!checkMsgCode(this.smsCode)){
            this.$toast('请正确输入短信验证码')
            isOk = false
          }else if(this.imgCode == ""){
            this.$toast('请输入图形验证码')
            isOk = false
          }else if(!checkImgCode(this.imgCode)){
            this.$toast('请正确输入图形验证码')
            isOk = false
          }
        }
        return isOk
      },
    },
    components: {
      aDialog
    }
  }
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: auto;
    min-height: 1206px;
    background-color: #FAF0E7; 
    // background: linear-gradient(#34b6a1, #209d89);
    position: relative;
    z-index: 1;
    .wrap{
      width: 100%;
      height: auto;
      margin-top: -200px;
      position: relative;
      z-index: 10;
      .kf{
        position: absolute;
        top: 0px;
        right: 40px;
        z-index: 10;
        height: 120px;
        width: 120px;
        -webkit-animation: shake 2s infinite;
        p{
          font-size: 24px;
          text-align: center;
          color: #00ac97;
          margin-top: -10px;
        }
      }
      &:before{
        content: ' ';
        position: absolute;
        top: -80px;
        left: -60px;
        width: 148px;
        height: 146px;
        z-index: 10;
        background: url('../../../assets/imgs/act/ngh/v2/golden.png') no-repeat;
        background-size: contain;
      }
      &:after{
        content: ' ';
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        width: 440px;
        height: 85px;
        z-index: 10;
        background: url('../../../assets/imgs/act/ngh/v2/logo.png') no-repeat;
        background-size: contain;
      }
      .content{
        width: 90%;
        min-height: 300px;
        margin: 30px auto 0;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        h3{
          padding-top: 90px;
          color: #c8995e;
          font-size: 32px;
          text-align: center;
        }
        .form{
          padding: 0 30px 30px;
          ul{
            border-radius: 10px;
            // border: 1px solid #eee;
            overflow: hidden;
            li{
              margin-top: 30px;
              .van-cell-group{
                background-color: #fff;
                border-radius: 10px;
                border: 1px solid #eee;
                box-sizing: border-box;
                &.no-border{
                  border: none;
                }
                .van-field{
                  padding: 26px 32px 26px 80px;
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
                    color: #31a083;
                    right: 2px;
                  }
                }
              }
              &.phone{
                position: relative;
                &:before{
                  content: ' ';
                  position: absolute;
                  top: 50%;
                  left: 26px;
                  transform: translateY(-50%);
                  z-index: 100;
                  width: 40px;
                  height: 40px;
                  background: url('../../../assets/imgs/act/ngh/v2/icon-account.png') no-repeat;
                  background-size: contain;
                }
              }
              &.password{
                position: relative;
                &:before{
                  content: ' ';
                  position: absolute;
                  top: 50%;
                  left: 22px;
                  transform: translateY(-50%);
                  z-index: 100;
                  width: 40px;
                  height: 40px;
                  background: url('../../../assets/imgs/act/ngh/v2/icon-password.png') no-repeat;
                  background-size: contain;
                }
              }
              &.sms-code{
                display: flex;
                align-items: center;
                background-color: #fff;
                border-radius: 10px;
                position: relative;
                border: 1px solid #eee;
                box-sizing: border-box;
                .van-cell-group{
                  flex: 1;
                }
                .code-btn{
                  // padding: 16px 20px;
                  width: 240px;
                  height: 60px;
                  line-height: 60px;
                  text-align: center;
                  font-size: 26px;
                  color: #31a083;
                  border-left: 1px solid #eee;
                }
                &:before{
                  content: ' ';
                  position: absolute;
                  top: 50%;
                  // left: 28px;
                  left: 20px;
                  transform: translateY(-50%);
                  z-index: 100;
                  // width: 26px;
                  // height: 36px;
                  // background: url('../../../assets/imgs/act/ngh/icon-smscode.png') no-repeat;
                  width: 40px;
                  height: 40px;
                  background: url('../../../assets/imgs/act/ngh/v2/icon-password.png') no-repeat;
                  background-size: contain;
                }
              }
              &.img-code{
                position: relative;
                display: flex;
                align-items: center;
                border-radius: 10px;
                border: 1px solid #eee;
                box-sizing: border-box;
                .van-cell-group{
                  flex: 1;
                }
                .img{
                  width: 140px;
                  margin: 0 10px;
                }
                .img-btn{
                  // align-self: stretch;
                  padding: 25px 4px;
                  color: #999;
                  font-size: 24px;
                }
                &:before{
                  content: ' ';
                  position: absolute;
                  top: 50%;
                  left: 22px;
                  transform: translateY(-50%);
                  z-index: 100;
                  width: 40px;
                  height: 40px;
                  background: url('../../../assets/imgs/act/ngh/v2/icon-imgcode.png') no-repeat;
                  background-size: contain;
                }
              }
            }
          }
          .btn{
            margin-top: 30px;
            height: 80px;
            font-size: 28px;
            border-radius: 10px;
            background-color: #00ac97;
            border-color: #00ac97;
            &:before{
              background-color: #fff;
              border-color: #fff;
            }
            &.unable{
              background-color: #fcc9c9;
              border-color: #fcc9c9;
            }
          }
          .switch-btn{
            text-align: center;
            padding-top: 30px;
            color: #222;
            font-size: 26px;
            &.switch1{
              display: flex;
              justify-content: space-between;
            }
            .forget-btn{
              color: #999;
            }
          }
        }
      }
    }
    .rule{
    }
    .dialog{
      position: relative;
      text-align: center;
      .msg,.end,.wx,.ng{
        p{
          padding: 90px 0 60px;
          font-size: 30px;
          line-height: 46px;
          color: #222;
          text-align: center;
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
    @-webkit-keyframes shake {
      0%{transform: rotate(0deg)}
      10%{transform: rotate(6deg)}
      20%{transform: rotate(-6deg)}
      30%{transform: rotate(4deg)}
      40%{transform: rotate(-4deg)}
      50%{transform: rotate(2deg)}
      60%{transform: rotate(-2deg)}
      70%{transform: rotate(0deg)}
      100%{transform: rotate(0deg)}
    }
    @keyframes shake {
      0%{transform: rotate(0deg)}
      10%{transform: rotate(6deg)}
      20%{transform: rotate(-6deg)}
      30%{transform: rotate(4deg)}
      40%{transform: rotate(-4deg)}
      50%{transform: rotate(2deg)}
      60%{transform: rotate(-2deg)}
      70%{transform: rotate(0deg)}
      100%{transform: rotate(0deg)}
    }
  }
</style>
