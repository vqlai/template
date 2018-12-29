<template>
  <van-popup 
    v-model="isShowDialog" 
    :close-on-click-overlay="canCloseOverlay" 
    :lock-scroll="true"
    :overlay="true"
    class="tip-dialog"
    :class="{onDownload:tipDialogType === 2}"> 
    <span 
      v-if="showCloseBtn"
      class="close-btn" 
      @click="closeTipDialog">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
    </span>
    <div class="login" v-if="tipDialogType === 1">
      <h3>您还未登录哦~</h3>
      <p>未登录状态无法给您发券<br/>请登录后再领取哦~</p>
      <div v-if="retype === 'm'"><span @click="onLogin">点击登录 ></span></div>
    </div>
    <div class="download" v-if="tipDialogType === 2">
      <div class="pic"><img src="@/assets/imgs/main/app-download.png" alt=""></div>
      <p>您好，由于您的APP版本偏低，将影响您在官方App的购物体验，建议您移步到微信官方商城或更新APP版本哦！谢谢您的谅解！</p>
      <!-- <p v-if="dialogType===2">【全棉社区】提供全棉生活方式指南，好看！<br>【全棉直播】和主播嗨聊全棉生活，好玩！<br>【体验升级】商品搜索更快捷，好用！<br>【安全系数】新增登录验证码，安全！</p> -->
      <div class="download-btn-box">
        <van-button type="primary" block class="download-btn" @click="onDownloadApp">立即下载 >>></van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
  import { Popup } from 'vant'
  import AppNative from '@/assets/js/native.js'
  import {doLogReg} from '@/assets/js/utils.js'
  export default {
    name: 'download-dialog',
    props:{
      isShowDialog:{ // 是否显示弹窗
        type: Boolean,
        default: false
      },
      tipDialogType:{
        type: Number,
        default: 1
      },
      canCloseOverlay:{ // 弹窗遮罩点击是否可以关闭弹窗
        type: Boolean,
        default: false
      }, 
      showCloseBtn:{
        type: Boolean,
        default: true
      }
    },
    methods: {
      closeTipDialog(){
        this.$emit('closeTipDialog')
      },
      onDownloadApp() {
        AppNative.openAppStore()
        // location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.smile.purcotton' 
      },
      onLogin(){
        doLogReg(location.href,1)
      },
    },
    components:{
      'VanPopup': Popup
    }
  }
</script>

<style lang="less" scoped>
  .tip-dialog{
    width: 80%;
    height: auto;
    min-height: 260px;
    overflow: visible;
    background-color: #fff;
    border-radius: 20px;
    &.onDownload{
      top: 56%;
      .close-btn{
        top: -260px;
      }
    }
    .close-btn{
      position: absolute;
      top: -70px;
      right: -30px;
      z-index: 2010;
      font-size: 46px;
      padding: 4px;
      color: #666;
      background-color: #fff;
      border-radius: 100%;
    }
    .download{
      .pic{
        position: absolute;
        top: -260px;
        left: 0;
        z-index: 1;
      }
      p{
        padding: 30px 20px; 
        font-size: 30px;
        line-height: 50px;
        background: #fff;
      }
      .download-btn-box{
        display: flex;
        justify-content: center;
        border-radius: 40px;
        .download-btn{
          padding: 26px 0;
          width: auto;
          height: auto;
          min-width: 100%;
          display: inline-block;
          font-size: 38px;
          line-height: 38px;
          font-weight: bold;
          color: #fff;
          border: 1px solid #03baa4;
          background-color: #03baa4;
          border-radius: 0;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-sizing: border-box;
          // box-shadow: inset 0px 10px 10px #03b39c,0px 10px 10px #6aa597;
        }
      }
    }
    .login{
      padding: 30px 0;
      text-align: center;
      h3{
        color: #18c396;
        font-size: 32px;
        padding: 30px 0;
      }
      p{
        font-size: 32px;
        line-height: 46px;
      }
      span{
        display: block;
        color: #ef5385;
        padding: 20px 0;
        font-size: 32px;
      }
    }
  }
</style>
