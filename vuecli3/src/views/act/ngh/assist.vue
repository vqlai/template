<template>
  <div class="assist">
    <div><img src="@/assets/imgs/act/ngh/v2/assist1.jpg" alt=""></div>
    <div class="content">
      <p class="tip">您的好友<span>{{inviterPhone}}</span>向您发起助力请求，</p>
      <h3 class="title">赶紧帮Ta助力吧!</h3>
      <div class="progress">
        <van-progress :percentage="progressVal * 33" :show-pivot="false" color="#f64c4c"/>
        <span class="sign1"></span>
        <span class="sign2"></span>
        <span class="sign3"></span>
        <span class="sign4"></span>
      </div>
       <!-- v-if="progressVal < 3" -->
      <van-button block class="btn" type="primary" @click="onAssist" :loading="btnLoading1">帮TA提额</van-button>
      <!-- <van-button block class="btn unable" type="primary" v-else>助力已达上限</van-button> -->
      <van-button block class="btn" type="primary" plain v-if="isNgPerson" @click="goLogin">加入全棉时代内购会</van-button>
    </div>
    <div><img src="@/assets/imgs/act/ngh/v2/assist2.jpg" alt=""></div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="dialogType === 2 ? 3 : 1"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#7a7a7a'" @closeDialog="isDialog = false" :dialogWidth="'84%'">
      <div class="dialog">
        <div class="end" v-if="dialogType === 1">
          <p> 抱歉，内购会已结束！ </p>
          <van-button block class="btn" @click="onExit">退出</van-button>
        </div>
        <div class="wx" v-if="dialogType === 2">
          <p>抱歉，请在微信内参与活动哦~</p>
        </div>
        <div class="register" v-if="dialogType === 3">
          <h3 class="title">登录帐号</h3>
          <p>登录成功后才能帮Ta助力哦！</p>
          <ul>
            <li><van-cell-group><van-field v-model="phone" placeholder="请输入手机号" maxlength="11" clearable @blur="onBlur"/></van-cell-group></li>
            <li>
              <van-cell-group class="no-border"> <van-field v-model="smsCode" placeholder="请输入短信验证码" maxlength="4" clearable @blur="onBlur"/></van-cell-group>
              <div class="code-btn" @click="onMsgCode">{{codeText}}</div>
            </li>
          </ul>
          <van-button block class="btn" @click="onLogin" :loading="btnLoading2">登录</van-button>
        </div>
        <div class="repeat" v-if="dialogType === 4">
          <p>您已为TA助力，请勿重复操作</p>
          <van-button block class="btn" @click="isDialog = false">我知道了</van-button>
        </div>
        <div class="success" v-if="dialogType === 5">
          <p>恭喜您助力成功<br/>您获得全棉时代年终员工内购会资格!</p>
          <ul>
            <li><van-button block class="btn" @click="isDialog = false">取消</van-button></li>
            <li><van-button block class="btn" @click="goLogin">参与内购</van-button></li>
          </ul>
        </div>
        <div class="msg" v-if="dialogType === 6">
          <p v-html="msgText"></p>
          <van-button block class="btn" @click="isDialog = false">我知道了</van-button>
        </div>
        <div class="end" v-if="dialogType === 7">
          <p>抱歉，活动已结束</p>
          <van-button block class="btn" @click="onExit">退出</van-button>
        </div>
        <!-- <div class="us" v-if="dialogType === 8">
          <p>抱歉，员工不可以帮员工提额哦~</p>
          <van-button block class="btn" @click="isDialog = false">我知道了</van-button>
        </div>
        <div class="done" v-if="dialogType === 9">
          <p>抱歉，您已经帮其他员工提额过，<br/>不能继续参与提额。!</p>
          <van-button block class="btn" @click="isDialog = false">我知道了</van-button>
        </div> -->
      </div>
    </a-dialog>
    <van-loading color="#31d0b5" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import { Progress } from 'vant'
  import aDialog from "@/components/a-dialog.vue"
  import {initAssist, doAssist, getAssistMsgCode, assistRegister, loginOut} from '@/assets/api/act/ngh.js' 
  import {checkPhone,checkMsgCode} from '@/assets/js/validation.js'
  import MsgCode from '@/assets/js/msgCode.js'
  import {isweixin} from '@/assets/js/utils.js' 
  export default {
    name: 'assist',
    data(){
      return {
        isDialog : false,
        dialogType: 1,
        phone: '',
        smsCode: '',
        codeText: '获取验证码',
        progressVal: 0,
        isNgPerson: false,
        vanLoading: false,
        msgText: '',
        btnLoading1: false,
        btnLoading2: false,
        inviterPhone: ''
      }
    },
    created: function () {
      this.inviterPhone = this.$route.query.phone
      this._initAssist({inviter: this.$route.query.inviter})
    },
    methods: {
      onBlur(){
        setTimeout(function(){ 
          document.body.scrollTop = document.body.scrollHeight
        },300)
      },
      goLogin(){
        // this.$router.push({ path: '/ngh/login'})  // 要通过微信跳转
        location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
      },
      onExit(){
        loginOut().then(()=>{
          // location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
          typeof WeixinJSBridge === 'undefined' ? window.close() : WeixinJSBridge.call('closeWindow') 
        })
      },
      onAssist(){
        this.btnLoading1 = true
        doAssist({inviter: this.$route.query.inviter}).then(res=>{
          if(res.data.success){
            if(res.data.code == 'success'){
              this._initAssist({inviter: this.$route.query.inviter})
              this.dialogType = 5
              this.isDialog = true
            }
          }else{
            if(res.data.code == 'notLogin'){
              this.phone = ''
              this.smsCode = ''
              this.dialogType = 3
              this.isDialog = true
            }else if(res.data.code == 'stateLimit' 
              || res.data.code == 'purchaseInviter'
              || res.data.code == 'purchaseInviter'
              || res.data.code == 'purchaseInviterOther'
              || res.data.code == 'sameType'){
              this.dialogType = 6
              this.msgText = res.data.msg
              this.isDialog = true
            }else if(res.data.code == 'dateEnd'){
              this.dialogType = 7
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
        }).then(()=>{
          this.btnLoading1 = false
        })
      },
      onMsgCode() {
        if(this.checkPhoneNumber()){
          let params = {
            mobile: this.phone
          }
          this.sms = new MsgCode(this)
          if(this.sms.isRun()){
            return
          }
          getAssistMsgCode(params).then(res => {
            if(res.data.success){
              // this.isActive= true
              this.sms.start(120)
              this.$toast('发送成功')
            }else{
              if(res.data.data == 'error'){
                this.$toast('发送失败，请重试')
              }else if(res.data.data == 'notMobileNo'){
                this.$toast('手机号码为空')
              }else if(res.data.data == 'notMobileNo'){
                this.$toast('手机号码为空')
              }else if(res.data.data == 'notRightMobile'){
                this.$toast('手机号格式不对')
              }else if(res.data.data == 'limit'){
                this.$toast('短信发送间隔小于120s')
              }else if(res.data.data == 'max'){
                this.$toast('短信发送次数达到上限')
              }else{
                this.$toast('网络错误，请稍后再试~')
              }
            }
          })
        }
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
        }else if(this.smsCode == ""){
          this.$toast('请输入短信验证码')
          isOk = false
        }else if(!checkMsgCode(this.smsCode)){
          this.$toast('请正确输入短信验证码')
          isOk = false
        }
        return isOk
      },
      onLogin(){
        if(this.checkForm()){
          this.btnLoading2 = true
          assistRegister({mobile: this.phone, smsCode: this.smsCode}).then(res=>{
            if(res.data.success){
              this._initAssist({inviter: this.$route.query.inviter})
              this.$toast('登录成功')
              this.isDialog = false
            }else{
              this.$toast(res.data.msg)
            }
          }).then(()=>{
            this.btnLoading2 = false
          })
        }
      },
      _initAssist(params){
        this.vanLoading = true
        initAssist(params).then(res=>{
          // console.log(res)
          if(res.data.success){
            if(res.data.code == 'dateEnd'){
              this.dialogType = 7
              this.isDialog = true
            }else{
              this.progressVal = res.data.data.state
              this.isNgPerson = res.data.data.externalStaff
            }
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
        }).then(()=>{
          this.vanLoading = false
        })
      }
    },
    components:{
      'van-progress': Progress,
      aDialog,
    }
  }
</script>

<style lang="less" scoped>
  .assist{
    width: 100%;
    height: auto;
    min-height: 100%;
    // background-color: #f8f1e6;
    background-color: #FAF0E7;
    .top{
      position: relative;
    }
    .content{
      position: relative; 
      width: 94%;
      padding: 40px 30px;
      background-color: #fff;
      margin: -200px auto 0; // margin为负时需结合position：relative;使用
      border-radius: 20px;
      box-sizing: border-box;
      text-align: center;
      &:before{
        content: ' ';
        position: absolute;
        top: -70px;
        left: -70px;
        z-index: 10;
        width: 148px;
        height: 146px;
        background: url('../../../assets/imgs/act/ngh/v2/golden.png') no-repeat;
        background-size: contain;
      }
      .tip{
        font-size: 28px;
        color: #222;
        line-height: 46px;
        span{
          color: #09b9a3;
        }
      }
      .title{
        font-size: 36px;
        color: #222;
        line-height: 56px;
      }
      .progress{
        position: relative;
        padding: 26px 20px;
        margin-top: 40px;
        background-color: #eee;
        border-radius: 30px;
        .van-progress{
          height: 10px;
          background-color: #fcc9c9;
        }
        span{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          &.sign1{
            left: 20px;
            width: 30px;
            height: 30px;
            border-radius: 30px;
            background-color: #f64c4c;
            &:after{
              content: '0';
              position: absolute;
              top: 60px;
              left: 50%;
              z-index: 10;
              transform: translateX(-50%);
              color: #333;
              font-size: 28px;
            }
          }
          &.sign2{
            left: 30%;
            width: 45px;
            height: 44px;
            background: url('../../../assets/imgs/act/ngh/v2/percent1.png') no-repeat;
            background-size: contain;
            &:after{
              content: '1000';
              position: absolute;
              top: 70px;
              left: 50%;
              z-index: 10;
              transform: translateX(-50%);
              color: #333;
              font-size: 28px;
            }
          }
          &.sign3{
            left: 60%;
            width: 55px;
            height: 43px;
            background: url('../../../assets/imgs/act/ngh/v2/percent2.png') no-repeat;
            background-size: contain;
            &:after{
              content: '2000';
              position: absolute;
              top: 70px;
              left: 50%;
              z-index: 10;
              transform: translateX(-50%);
              color: #333;
              font-size: 28px;
            }
          }
          &.sign4{
            right: -10px;
            width: 89px;
            height: 68px;
            background: url('../../../assets/imgs/act/ngh/v2/percent3.png') no-repeat;
            background-size: contain;
            &:after{
              content: '3000';
              position: absolute;
              top: 80px;
              left: 50%;
              z-index: 10;
              transform: translateX(-50%);
              color: #f64c4c;
              font-size: 28px;
            }
          }
        }
      }
      .btn{
        margin-top: 30px;
        height: 92px;
        font-size: 32px;
        color: #09b9a3;
        background-color: #fff;
        border: 1px solid #09b9a3;
        border-radius: 10px;
        &:first-of-type{
          margin-top: 90px;
          background-color: #f64c4c;
          border: 1px solid #f64c4c;
          color: #fff;
          &.unable{
            background-color: #fcc9c9;
            border: 1px solid #fcc9c9;
          }
          &:before{
            background-color: rgba(255, 255, 255, .8);
            border-color: rgba(255, 255, 255, .8);
          }
          /deep/ .van-loading{
            color: #fff!important;
          }
        }
        &:last-of-type{
          &:before{
            background-color: rgba(9, 185, 163, .3);
            border-color: rgba(9, 185, 163, .3);
          }
        }
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      .msg,.wx,.us,.done,.end,.repeat,.success{
        p{
          padding: 90px 0 60px;
          font-size: 28px;
          line-height: 42px;
          color: #222;
          padding-bottom: 70px;
        }
      }
      .wx{
        p{
          padding: 60px 0;
        }
      }
      .success{
        ul{
          display: flex;
          li{
            flex: 1;
            &:first-child{
              .van-button{
                color: #7a7a7a;
              }
            }
          }
        }
      }
      .register{
        position: relative;
        h3.title{
          position: absolute;
          top: 30px;
          left: 30px;
          font-size: 32px;
        }
        p{
          padding-top: 90px;
          font-size: 28px;
          line-height: 42px;
          color: #222;
        }
        ul{
          padding: 30px;
          li{
            .van-cell-group{
              background-color: #fff;
              border-radius: 10px;
              border: 1px solid #bdbdbd;
              box-sizing: border-box;
              &.no-border{
                border: none;
              }
              .van-field{
                padding: 26px 20px 26px;
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
                  right: 2px;
                  font-size: 28px;
                  color: #31a083;
                }
              }
            }
            &:last-child{
              display: flex;
              align-items: center;
              position: relative;
              margin-top: 30px;
              border: 1px solid #bdbdbd;
              background-color: #fff;
              border-radius: 10px;
              box-sizing: border-box;
              .van-cell-group{
                flex: 1;
              }
              .code-btn{
                // padding: 16px 20px;
                width: 220px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 26px;
                color: #31a083;
                border-left: 1px solid #bdbdbd;
              }
            }
          }
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
        /deep/ .van-loading{
          color: #31a083!important;
        }
      }
    }
  }
</style>
