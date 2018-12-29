<template>
  <div class="assist">
    <div class="fallstar"></div>
    <div><img src="@/common/imgs/act/ssy/bolster/a-01.jpg" alt=""></div>
    <div class="bolster">
      <div><img src="@/common/imgs/act/ssy/bolster/a-02.jpg" alt=""></div>
      <!-- <canvas id="canvas">当前环境不支持canvas</canvas> -->
      <div class="box"><img src="@/common/imgs/act/ssy/bolster/bolster.png" alt=""></div>
    </div>
    <div class="card">
      <div><img src="@/common/imgs/act/ssy/bolster/a-03.jpg" alt=""></div>
      <ul>
        <li><div><img src="@/common/imgs/act/ssy/bolster/card-a1.png" alt=""></div></li>
        <li><div @click="onCard"><img src="@/common/imgs/act/ssy/bolster/card-b1.png" alt=""></div><span class="finger" @click="onCard"><img src="@/common/imgs/act/ssy/bolster/finger.png" alt=""></span></li>
        <li><div @click="onCard"><img src="@/common/imgs/act/ssy/bolster/card-c1.png" alt=""></div></li>
        <li><div><img src="@/common/imgs/act/ssy/bolster/card-d1.png" alt=""></div></li>
      </ul>
    </div>
    <!-- <div @click="goLighten"><img src="@/common/imgs/act/ssy/bolster/a-04.jpg" alt=""></div> -->
    <div><img src="@/common/imgs/act/ssy/bolster/a-04.jpg" alt=""></div>
    <a-dialog :isShowDialog="isDialog" class="popup" :dialogType="1" :showCloseBtn="9" :closeBtnBg="'transparent'" :closeBtnColor="'#fff'"
              :dialogBg="'transparent'" :dialogRadius="'0'" :showHeader="false"  @closeDialog="isDialog = false" :dialogWidth="'80%'">
      <div class="dialog">
        <div class="fallstar"></div>
        <div class="register" v-if="dialogType === 1">
          <div><img src="@/common/imgs/act/ssy/bolster/a-dialog1.png" alt=""></div>
          <div class="form">
            <van-cell-group class="phone-in"> <van-field v-model="phone" placeholder="请输入手机号码" maxlength="11" clearable/> </van-cell-group>
            <div class="code-box">
              <van-cell-group class="code-in"> <van-field v-model="code" placeholder="请输入验证码" maxlength="4" clearable/> </van-cell-group>
              <van-button block class="code-btn" @click="onMsgCode" :class="{active: codeBtnActive}">{{codeText}}</van-button>
            </div>
          </div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="onRegister" :loading="btnLoading">验证身份</van-button></li>
          </ul>
        </div>
        <div class="success"  v-if="dialogType === 2">
          <div><img src="@/common/imgs/act/ssy/bolster/a-dialog2.png" alt=""></div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="goLighten">我也要玩</van-button></li>
          </ul>
        </div>
        <div class="repeat"  v-if="dialogType === 3">
          <div><img src="@/common/imgs/act/ssy/bolster/a-dialog3.png" alt=""></div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="goLighten">我也要玩</van-button></li>
          </ul>
        </div>
        <div class="unable"  v-if="dialogType === 4">
          <div><img src="@/common/imgs/act/ssy/bolster/a-dialog4.png" alt=""></div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="goHome">去看看</van-button></li>
          </ul>
        </div>
      </div>
    </a-dialog>
    <van-loading color="white" type="spinner" size="40px" v-if="pageLoading"/>
  </div>
</template>

<script>
  import {checkPhone,checkMsgCode} from '@/common/js/validation.js'
  import MsgCode from '@/common/js/msgCode.js'
  import aDialog from "@/components/a-dialog.vue"
  import {getMsgCode,assistInit,assistRegister} from '@/api/act/ssy.js'
  export default {
    name: 'assist',
    data(){
      return {
        phone: '',
        code: '',
        codeText: '获取验证码',
        btnLoading: false,
        isDialog: false,
        dialogType: 1, // 1为注册，2为老会员提示，3为点亮成功
        phone: '',
        code: '',
        codeText: '获取验证码',
        btnLoading: false,
        codeBtnActive: false,
        pageLoading: false,
        clickFlag: false
      }
    },
    created: function(){
      
    },
    mounted: function(){
      this.$nextTick(()=>{
      })
    },
    methods: {
      onCard() {
        // this.dialogType = 1
        // this.isDialog = true
        this._assistInit()
      },
      _assistInit(){
        if(!this.clickFlag){
          this.clickFlag = true
          let params = {
            inviter: this.$route.query.userName || '',
            openId: this.$route.query.openid || '',
            flag: this.$route.query.flag || ''
          }
          assistInit(params).then(res=>{
            // alert(res.data.success)
            // alert(res.data.code)
            // alert(res.data.data.onpenIDNot)
            // alert(res.data.data.inviterNumber)
            if(res.data.success){
              if(res.data.data.onpenIDNot){
                this.dialogType = 3
                this.isDialog = true
              }else{
                this.dialogType = 1
                this.isDialog = true
              }
              // else if(res.data.data.inviterNumber){
              //   this.dialogType = 1
              //   this.isDialog = true
              // }
            }else{
              if(res.data.code == 'inviterisNull'){
                this.$toast(res.data.msg)
              }else{
                this.$toast(res.data.msg)
              }
            }
          }).then(()=>{
            setTimeout(()=>{ this.clickFlag = false },2000)
          })
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
      onRegister(){
        if(this.checkForm(2)){
          this.btnLoading = true
          let params = {
            mobile: this.phone,
            smsCode: this.code,
            inviter: this.$route.query.userName || '',
            openId: this.$route.query.openid || '',
            flag: this.$route.query.flag || ''
          }
          assistRegister(params).then(res=>{
            if(res.data.success){
              if(this.sms){
                this.sms.stop()
              }
              this.phone = ''
              this.code = ''
              if(res.data.code == "oldMember"){
                this.dialogType = 4
                this.isDialog = true
              }else{
                this.dialogType = 2
                this.isDialog = true
                // this.$toast('注册成功')
              }
            }else{
              this.$toast(res.data.msg)
            }
          }).then(()=>{ setTimeout(()=>{ this.btnLoading = false },500) })
        }
      },
      goLighten(){
        this.$router.push('/ssy/lighten')
      },
      goHome(){
        location.href = "https://m.purcotton.com"
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
  .assist{
    width: 100%;
    height: auto;
    min-height: 1206px;
    position: relative;
    .fallstar{
      position: fixed;
      top: 100px;
      left: 20px;
      z-index: 12;
      width: 720px;
      height: 672px;
      background: url('../../../common/imgs/act/ssy/bolster/fallstar2.png') no-repeat;
      background-size: contain;
      -webkit-animation: fallStar 3s linear infinite;
      animation: fallStar 3s linear infinite;
    }
    .bolster{
      position: relative;
      &:before{
        content: ' ';
        position: fixed;
        top: 60px;
        left: 20px;
        z-index: 10;
        width: 721px;
        height: 595px;
        background: url('../../../common/imgs/act/ssy/bolster/star2.png') no-repeat;
        background-size: contain;
        animation: starFlick 2s ease-in-out infinite;
        -webkit-animation: starFlick 2s ease-in-out infinite;
      }
      .box{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
      }
      // #canvas{
      //   position: absolute;
      //   top: 50%;
      //   left: 50%;
      //   transform: translate(-50%,-50%);
      //   background: url('../../../common/imgs/act/ssy/bolster/bolster-bg.png') no-repeat;
      //   background-size: contain;
      //   &:after{
      //     content: ' ';
      //     position: absolute;
      //     top: 0;
      //     left: 0;
      //     bottom: 0;
      //     right: 0;
      //     z-index: 10;
      //     width: 200px;
      //     height: 200px;
      //     background: url('../../../common/imgs/act/ssy/bolster/bolster.png') no-repeat;
      //     background-size: contain;
      //   }
      // }
    }
    .card{
      position: relative;
      ul{
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        padding: 20px 10px;
        li{
          flex: 1;
          padding: 0 10px;
          >div{
            border: 4px solid #73e8e3;
            border-radius: 10px;
            padding: 6px;
            position: relative;
            box-shadow: -4px -4px 20px rgba(114,143,177,.2), 4px 4px 20px rgba(114,143,177,.2); 
            // animation: borderFlick 2s ease-in-out infinite;
            // -webkit-animation: borderFlick 2s ease-in-out infinite;
          }
          &:nth-child(2){
            position: relative;
            .finger{
              position: absolute;
              left: 38%;
              top: 38%;
              width: 90px;
              height: 109px;
              z-index: 16;
              animation: finger 3s linear infinite;
              -webkit-animation: finger 3s linear infinite;
            }
          }
        }
      }
    }
    .popup{
      top: 45%;
      .dialog{
        position: relative;
        padding-bottom: 40px;
        &:before{
          content: ' ';
          position: fixed;
          top: -60px;
          left: -20px;
          z-index: -12;
          width: 636px;
          height: 463px;
          background: url('../../../common/imgs/act/ssy/bolster/star1.png') no-repeat;
          background-size: contain;
          animation: starFlick 2s ease-in-out infinite;
          -webkit-animation: starFlick 2s ease-in-out infinite;
        }
        .fallstar{
          position: fixed;
          top: -100px;
          left: 40px;
          z-index: -10;
          width: 618px;
          height: 444px;
          background: url('../../../common/imgs/act/ssy/bolster/fallstar1.png') no-repeat;
          background-size: contain;
          -webkit-animation: fallStar 3s linear infinite;
          animation: fallStar 3s linear infinite;
        }
        .register{
          position: relative;
          .form{
            position: absolute;
            top: 58%;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: auto;
            padding: 0 60px;
            box-sizing: border-box;
            .phone-in{
              position: relative;
              border-bottom: 1px solid #a7fff4;
              &:before{
                content: ' ';
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                width: 23px;
                height: 38px;
                background: url('../../../common/imgs/act/ssy/bolster/phone.png') no-repeat;
                background-size: 100%;
              }
            }
            .code-box{
              display: flex;
              justify-content: space-between;
              margin: 60px 0 0 0;
              position: relative;
              border-bottom: 1px solid #a7fff4;
              &:before{
                content: ' ';
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                width: 30px;
                height: 34px;
                background: url('../../../common/imgs/act/ssy/bolster/code.png') no-repeat;
                background-size: 100%;
              }
              .code-in{
                width: 50%;
              }
              .code-btn{ 
                width: 46%;
                height: 68px;
                line-height: 68px;
                color: #1f2176;
                font-size: 30px;
                border-radius: 60px;
                border-color: #6effed;
                background-color: #6effed;
                box-sizing: border-box;
                &:before{
                  border-color: #fff;
                  background-color: #fff;
                }
                &.active{
                  border-color: #b0b9b7;
                  background-color: #b0b9b7;
                  color: #fff;
                }
              }
            }
            .van-cell-group{
              .van-field{
                padding: 28px 26px 28px 50px;
                color: #fff;
                /deep/ input{
                  font-size: 28px;
                  // 修改input placeholder的默认颜色
                  &::-webkit-input-placeholder{
                    color: #8a97fd;
                  }
                  &::-moz-placeholder{
                    color: #8a97fd;
                  }
                }
                /deep/ .van-icon-clear{
                  font-size: 30px;
                  color: #fff;
                }
              }
            }
          }
          ul.btn-box{
            bottom: -38px;
          }
        }
        ul.btn-box{
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          li{
            .btn{
              border: 0;
              color: #fff;
              font-size: 32px;
              width: 300px;
              height: 88px;
              line-height: 88px;
              border-radius: 60px;
              background-color: #e14c34;
              // 背景颜色设置为渐变色
              // background: linear-gradient(left,#aacbb7,#84ba99);
              // background: -webkit-linear-gradient(left, #aacbb7,#84ba99);
              // 设置按钮的内外阴影
              box-shadow: -5px -5px 10px #f38371 inset, 5px 5px 10px #f38371 inset; 
              &:before{
                border-color: #fff;
                background-color: #fff;
              }
              /deep/ .van-loading{
                color: #fff!important;
              }
            }
          }
        }
      }
    }
    @keyframes flipRight {
      0% {
        transform: rotateY(0);
        opacity: 1;
      }
      100% {
        transform: rotateY(180deg);
        opacity: 0;
      }
    }
    @-webkit-keyframes flipRight {
      0% {
        transform: rotateY(0);
        opacity: 1;
      }
      100% {
        transform: rotateY(180deg);
        opacity: 0;
      }
    }
    @keyframes starFlick {
      from {
        opacity: 1;
      }
      to {
         opacity: 0;
      }
    }
    @-webkit-keyframes starFlick {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes fallStar {
      0% {
        -webkit-transform: translate(0, 0);
      }
      100% {
        -webkit-transform:translate(-750px, 750px);
      }
    }
    @keyframes fallStar {
      0% {
        -webkit-transform: translate(0, 0);
      }
      100% {
        -webkit-transform:translate(-750px, 750px);
      }
    }
    @-webkit-keyframes borderFlick {
      0% {
        box-shadow: -4px -4px 20px rgba(114,143,177,.2), 4px 4px 20px rgba(114,143,177,.2); 
      }
      100% {
        box-shadow: -4px -4px 20px rgba(114,143,177,1), 4px 4px 20px rgba(114,143,177,1); 
      }
    }
    @keyframes borderFlick {
      0% {
        box-shadow: -4px -4px 20px rgba(114,143,177,.2), 4px 4px 20px rgba(114,143,177,.2); 
      }
      100% {
        box-shadow: -4px -4px 20px rgba(114,143,177,1), 4px 4px 20px rgba(114,143,177,1); 
      }
    }
    @keyframes finger { 
      0% { transform: scale(1); opacity: 0.8; }
      50%{  transform: scale(1.2);  opacity: 0; }
      100% { transform: scale(1);opacity: 0.8;}
    }
    @-webkit-keyframes finger { 
      0% { transform: scale(1); opacity: 0.8; }
      50%{  transform: scale(1.2);  opacity: 0; }
      100% { transform: scale(1);opacity: 0.8;}
    }        
  }
</style>
