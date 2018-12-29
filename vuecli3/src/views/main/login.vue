<template>
  <div class="logReg">
    <div><img src="@/assets/imgs/main/logReg_bg.jpg" alt=""></div> 
    <div class="form">
      <!-- <van-tabs type="card">
        <van-tab v-for="(item,index) in items" :title="item" :key="index">
          内容 {{ item }}
        </van-tab>
      </van-tabs> -->
      <ul class="tabs">
        <li 
          v-for="(item,index) in tabs" 
          :class="[{active: item.isActive},item.css]" 
          :key="index" 
          v-html="item.content" 
          @click="switchTab(item)">
        </li>
      </ul>
      <!-- 登录 start -->
      <div v-show="tabs[0].isActive" class="login">
        <div v-show="loginType===1">
          <div class="input-box">
            <div class="phone"><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone"></div>
            <div class="password">
              <input type="text" placeholder="请输入密码" v-model="password" maxlength="50">
              <svg class="icon icon-eyes" aria-hidden="true">
                <use xlink:href="#icon-eyes"></use>
              </svg>
            </div>
            <div class="code">
              <input type="text" placeholder="请输入验证码" v-model="code" maxlength="4">'
              <span>换一张</span>
            </div>
          </div>
          <div class="login-btn"><a href="javscript:;">登 录</a></div>
          <div class="btm-btns">
            <a href="javascript:;" @click="loginType=2">使用短信验证码登录</a>
            <router-link tag="a" to="/findpwd">忘记密码?</router-link>
          </div>
        </div>
        <div v-show="loginType===2">
          <div class="input-box">
            <div class="phone"><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone"></div>
            <div class="code">
              <input type="text" maxlength="4" placeholder="请输入验证码" v-model="code">
              <a href="javascript:;" class="msgBtn">获取验证码</a>
            </div>
          </div>
          <div class="login-btn"><a href="javscript:;">登 录</a></div>
          <div class="btm-btns ct">
            <a href="javascript:;" @click="loginType=1">使用密码登录</a>
          </div>
        </div>
      </div>
      <!-- 登录 end -->
      <!-- 注册 start-->
      <div v-show="tabs[1].isActive" class="register">
        <div class="input-box">
          <div class="phone"><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone"></div>
          <div class="code">
            <input type="text" maxlength="4" placeholder="请输入验证码" v-model="code">
            <a href="javascript:;" class="msgBtn">获取验证码</a>
          </div>
        </div>
        <p class="protocal"><input type="checkbox"> 同意<a href="javascript:;">《全棉时代用户协议》</a></p>
        <div class="register-btn"><a href="javscript:;">注 册</a></div>
      </div>
      <!-- 注册 end-->
    </div>
    <ul class="other-login">
      <li>
        <a href="javascript:;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wechat"></use>
          </svg>
          <span>微信</span>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qq"></use>
          </svg>
          <span>QQ</span>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo"></use>
          </svg>
          <span>微博</span>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhifubao"></use>
          </svg>
          <span>支付宝</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  // import { Tab, Tabs } from 'vant';
  export default {
    name:'logReg',
    data() {
      return {
        tabs:[{css:'l',content:'登 录',type: 1,isActive: true},{css:'r',content:'注 册',type: 2,isActive: false}],
        phone: '',
        password: '',
        code: '',
        loginType: 1,
      }
    },
    methods: {
      switchTab(item) {
        this.tabs[0].isActive = false
        this.tabs[1].isActive = false
        item.isActive = true
        // console.log(item)
      }
    },
    components:{
      // 'van-tab': Tab,
      // 'van-tabs':Tabs
    }
  }
</script>

<style lang="less" scoped>
  .logReg{
    width: 100%;
    min-height: 100%;
    background: #fff;
    position: relative;
    .form{
      padding: 40px 32px;
      ul.tabs{
        display: flex;
        // border-radius: 30px;
        // overflow: hidden;
        li{
          flex: 1;
          height: 58px;
          line-height: 58px;
          text-align: center;
          font-size: 28px;
          color: #a3a3a3;
          border: 1px solid #a3a3a3;
          box-sizing: border-box;
          &.l{
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-right: 0;
          }
          &.r{
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            border-left: 0;
          }
          &.active{
            color: #fff;
            border: 1px solid #00a282;
            background: #00a282;
          }
        }
      }
      .input-box{
        >div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100px;
          padding-left: 20px;
          border-bottom: 1px solid #e4e4e4;
          >input{
            width: 100%;
            font-size: 30px;
            color: #7A7A7A;
          }
        }
        .password{
          input{
            width: 88%;
          }
          .icon-eyes{
            width: 12%;
            font-size: 46px;
            vertical-align: -14px;
          }
        }
        .code{
          input{
            width: 60%;
          }
          span{
            width: 40%;
            text-align: right;
            color: #7A7A7A;
            font-size: 30px;
          }
          a.msgBtn{
            font-size: 24px;
            color: #00a282;
            padding: 12px 40px;
            border: 1px solid #00a282;
            border-radius: 30px;
          }
        }
      }
      .login{
        padding: 20px 0;
        .login-btn{
          padding: 40px 0;
          a{
            display: block;
            text-align: center;
            height: 80px;
            line-height: 80px;
            color: #fff;
            border-radius: 40px;
            background-color: #00a282;
          }
        }
        .btm-btns{
          display: flex;
          justify-content: space-between;
          &.ct{
            justify-content: center;
          }
          a{
            font-size: 26px;
            color: #7a7a7a;
          }
        }
      }
      .register{
        padding: 20px 0;
        .protocal{
          padding-top: 40px;
          font-size: 30px;
          line-height: 30px;
          position: relative;
          text-indent: 40px;
          input{
            position: absolute;
            top: 40px;
            left: 0;
            width: 30px;
            height: 30px;
            // visibility: hidden;
            box-sizing: border-box;
          }
          a{
            color: #00a282;
          }
        }
        .register-btn{
          padding: 40px 0;
          a{
            display: block;
            text-align: center;
            height: 80px;
            line-height: 80px;
            color: #fff;
            border-radius: 40px;
            background-color: #00a282;
          }
        }
      }
    }
    ul.other-login{
      position: absolute;
      display: flex;
      padding: 0 20px;
      width: 100%;
      left: 0;
      bottom: 60px;
      z-index: 10;
      box-sizing: border-box;
      li{
        width:25%;
        text-align: center;
        a{
          display: block;
          color: #7a7a7a;
          font-size: 24px;
          border-right: 1px solid #eee;
          box-sizing: border-box;
          .icon{
            font-size: 34px;
            vertical-align: -8px;
          }
        }
        &:last-child a{
        border: 0; 
        }
      }
    }
  }
</style>
