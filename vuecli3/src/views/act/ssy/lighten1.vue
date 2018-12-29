<template>
  <div class="lighten">
    <div><img src="@/common/imgs/act/ssy/bolster/l-01.jpg" alt=""></div>
    <div class="a1 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-02.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-03.jpg" alt=""></div>
    <div class="bolster" id="canvasBox">
      <div><img src="@/common/imgs/act/ssy/bolster/l-04.jpg" alt=""></div>
      <!-- <canvas id="canvas">当前环境不支持canvas</canvas> -->
      <canvas id="canvas2">当前环境不支持canvas</canvas>
      <!-- <div class="box">
        <div style="position:relative;">
          <div><img src="@/common/imgs/act/ssy/bolster/bolster.png" alt=""></div>
        </div>
      </div> -->
    </div>
    <div class="a2 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div class="card">
      <div><img src="@/common/imgs/act/ssy/bolster/l-05.jpg" alt=""></div>
      <ul>
        <li>
          <div v-show="cardList[0].step === 1" @click="onCard(cardList[0].type,cardList[0].step)" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a1.png" alt=""></div>
          <div v-show="cardList[0].step === 2" @click="onCard(cardList[0].type,cardList[0].step)" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a2.png" alt=""><van-button class="btn">立即注册</van-button></div>
          <div v-show="cardList[0].step === 3" @click="onCard(cardList[0].type,cardList[0].step)" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a3.png" alt=""><van-button class="btn">已完成</van-button></div>
          <div v-show="cardList[0].step === 4" @click="onCard(cardList[0].type,cardList[0].step)" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a4.png" alt=""><van-button class="btn">已完成</van-button></div>
        </li>
        <li>
          <div v-show="cardList[1].step === 1" @click="onCard(cardList[1].type,cardList[1].step)" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b1.png" alt=""></div>
          <div v-show="cardList[1].step === 2" @click="onCard(cardList[1].type,cardList[1].step)" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b2.png" alt=""><van-button class="btn">立即注册</van-button></div>
          <div v-show="cardList[1].step === 3" @click="onCard(cardList[1].type,cardList[1].step)" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b3.png" alt=""><van-button class="btn">已完成</van-button></div>
          <div v-show="cardList[1].step === 4" @click="onCard(cardList[1].type,cardList[1].step)" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b4.png" alt=""><van-button class="btn">已完成</van-button></div>
        </li>
        <li>
          <div v-show="cardList[2].step === 1" @click="onCard(cardList[2].type,cardList[2].step)" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c1.png" alt=""></div>
          <div v-show="cardList[2].step === 2" @click="onCard(cardList[2].type,cardList[2].step)" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c2.png" alt=""><van-button class="btn">立即注册</van-button></div>
          <div v-show="cardList[2].step === 3" @click="onCard(cardList[2].type,cardList[2].step)" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c3.png" alt=""><van-button class="btn">已完成</van-button></div>
          <div v-show="cardList[2].step === 4" @click="onCard(cardList[2].type,cardList[2].step)" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c4.png" alt=""><van-button class="btn">已完成</van-button></div>
        </li>
        <li>
          <div v-show="cardList[3].step === 1" @click="onCard(cardList[3].type,cardList[3].step)" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d1.png" alt=""></div>
          <div v-show="cardList[3].step === 2" @click="onCard(cardList[3].type,cardList[3].step)" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d2.png" alt=""><van-button class="btn">立即注册</van-button></div>
          <div v-show="cardList[3].step === 3" @click="onCard(cardList[3].type,cardList[3].step)" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d3.png" alt=""><van-button class="btn">已完成</van-button></div>
          <div v-show="cardList[3].step === 4" @click="onCard(cardList[3].type,cardList[3].step)" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d4.png" alt=""><van-button class="btn">已完成</van-button></div>
        </li>
      </ul>
    </div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-06.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-07.jpg" alt=""></div>
    <div class="a3 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-08.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-09.jpg" alt=""></div>
    <div @click="goHome"><img src="@/common/imgs/act/ssy/bolster/l-10.jpg" alt=""></div>
    <div class="a4 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="9" :closeBtnBg="'transparent'" :closeBtnColor="'#fff'"
              :dialogBg="'transparent'" :dialogRadius="'0'" :showHeader="false"  @closeDialog="isDialog = false" :dialogWidth="'80%'">
      <div class="dialog">
        <div class="fallstar"></div>
        <div class="register" v-if="dialogType === 1">
          <div><img src="@/common/imgs/act/ssy/bolster/l-dialog1.png" alt=""></div>
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
        <div class="old"  v-if="dialogType === 2">
          <div><img src="@/common/imgs/act/ssy/bolster/l-dialog2.png" alt=""></div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="goHome">去首页</van-button></li>
          </ul>
        </div>
        <div class="success"  v-if="dialogType === 3">
          <div><img src="@/common/imgs/act/ssy/bolster/l-dialog3.png" alt=""></div>
          <ul class="btn-box">
            <li><van-button block class="btn" @click="isDialog=false">知道了</van-button></li>
          </ul>
        </div>
      </div>
    </a-dialog>
    <van-loading color="white" type="spinner" size="40px" v-if="pageLoading"/>
  </div>
</template>

<script>
  import AppNative from '@/common/js/native.js'
  import {checkPhone,checkMsgCode} from '@/common/js/validation.js'
  import MsgCode from '@/common/js/msgCode.js'
  import aDialog from "@/components/a-dialog.vue"
  import isApp from '@/common/js/app.js'
  import {getMsgCode,lightenInit,lightenStep,lightenRegister} from '@/api/act/ssy.js'
  import {isweixin,doLogReg,getOldAppParams,browser} from '@/common/js/utils.js'
  import share from "@/common/js/share"
  export default {
    name: 'lighten',
    data(){
      return {
        canvans: null,
        ctx: null,
        img: null,
        requestAnimationFrame: null,
        cardList:[
          {type: 1,step: 1,isAnimate: false},
          {type: 2,step: 1,isAnimate: false},
          {type: 3,step: 1,isAnimate: false},
          {type: 4,step: 1,isAnimate: false},
        ],
        phone: '',
        code: '',
        codeText: '获取验证码',
        btnLoading: false,
        codeBtnActive: false,
        isDialog: false,
        dialogType: 1, // 1为注册，2为老会员提示，3为点亮成功
        inviter: '', // wap端用
        token: '', // app端用
        wxConfigStr: '',
        pageLoading: false,
        waveY_max: 200 * 0.5,
      }
    },
    created: function(){
      this._lightenInit()
    },
    mounted: function(){
      this.$nextTick(()=>{
        // this.init()
         //获取canvas容器
        this.canvans = document.getElementById('canvas2')
        //创建一个画布
        this.ctx = this.canvans.getContext('2d')
        let img = new Image()
        img.onload = ()=>{
          img.onload = null
          // setTimeout(()=>{
            this.canvans.width = document.getElementById('canvasBox').offsetWidth
            this.canvans.height = document.getElementById('canvasBox').offsetHeight
            // this.ctx.clearRect(this.canvans.width*0.25, this.canvans.height*0.1, this.canvans.width, this.canvans.height)
            this.ctx.beginPath()
            // this.ctx.globalCompositeOperation = 'source-over'
            // this.ctx.moveTo(this.canvans.width*0.25,this.canvans.height*0.1)
            // this.ctx.lineTo(this.canvans.width*0.25,this.canvans.height*0.9)
            // this.ctx.lineTo(this.canvans.width*0.77,this.canvans.height*0.9)
            // this.ctx.lineTo(this.canvans.width*0.77,this.canvans.height*0.1)
            this.ctx.rect(this.canvans.width*0.21,this.canvans.height*0.1,this.canvans.width*0.54,this.canvans.height*0.84)
            this.ctx.strokeStyle = 'transparent'
            this.ctx.stroke()
            // this.ctx.fill()
            // this.ctx.globalCompositeOperation = 'source-in'
            this.ctx.drawImage(img, this.canvans.width*0.21, this.canvans.height*0.1,this.canvans.width*0.54,this.canvans.height*0.84)
            this.ctx.closePath()
            // this.ctx.beginPath()
            // this.ctx.bezierCurveTo(this.canvans.width*0.24, this.canvans.height*0.15, 118, 100, this.canvans.width*0.23, this.canvans.height*0.89);
            // this.ctx.bezierCurveTo(this.canvans.width*0.23, this.canvans.height*0.89, 180, 192, this.canvans.width*0.72, this.canvans.height*0.9);
            // this.ctx.bezierCurveTo(this.canvans.width*0.75, this.canvans.height*0.9, 243, 140, this.canvans.width*0.72, this.canvans.height*0.14);
            // this.ctx.bezierCurveTo(this.canvans.width*0.72, this.canvans.height*0.15, 200, 60, this.canvans.width*0.24, this.canvans.height*0.15);
            // // this.ctx.moveTo(0,0)
            // // this.ctx.lineTo(0,200)
            // // this.ctx.lineTo(200,200)
            // // this.ctx.lineTo(200,0)
            // this.ctx.strokeStyle = 'red'
            // this.ctx.stroke()
            // // this.ctx.fill()
            // this.ctx.closePath()
          // },100)
          this.init()
        }
        img.src = require('@/common/imgs/act/ssy/bolster/bolster.png')
      })
    },
    methods:{
      init(){
        //获取canvas容器
        // this.canvans = document.getElementById('canvas')
        //创建一个画布
        // this.ctx = this.canvans.getContext('2d')
        //创建新的图片对象
        this.img = new Image()
        this.img.src = require('@/common/imgs/act/ssy/bolster/wave.png');
        // this.canvans.width = 200
        // this.canvans.height = 200
        // this.ctx.beginPath();
        // this.ctx.bezierCurveTo(7, 10, 30, 40, 8, 185);
        // this.ctx.bezierCurveTo(4, 196, 60, 158, 190, 192);
        // this.ctx.bezierCurveTo(198, 194, 170, 120, 190, 7);
        // this.ctx.bezierCurveTo(196, 7, 100, 30, 7, 7);
        // // this.ctx.moveTo(0,0);
        // // this.ctx.lineTo(0,200);
        // // this.ctx.lineTo(200,200);
        // // this.ctx.lineTo(200,0);
        // this.ctx.closePath();
        // this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.bezierCurveTo(this.canvans.width*0.24, this.canvans.height*0.15, 118, 100, this.canvans.width*0.23, this.canvans.height*0.89);
        this.ctx.bezierCurveTo(this.canvans.width*0.23, this.canvans.height*0.89, 180, 192, this.canvans.width*0.72, this.canvans.height*0.9);
        this.ctx.bezierCurveTo(this.canvans.width*0.75, this.canvans.height*0.9, 243, 140, this.canvans.width*0.72, this.canvans.height*0.14);
        this.ctx.bezierCurveTo(this.canvans.width*0.72, this.canvans.height*0.15, 200, 60, this.canvans.width*0.24, this.canvans.height*0.15);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.fill();
        this.ctx.closePath();
        //浏览器加载图片完毕后再绘制图片
        this.img.onload = ()=>{
            /*
            * 将图像左侧的"Goo"部分(即以坐标(0,0)为左上角坐标、宽度为332px、高度为190px的部分图像)
            * 绘制到canvas中以坐标(10,10)为左上角、宽度为332px、高度为190px的矩形区域
            *
            * canvas绘制图像的目标区域的宽度和高度与截取的部分图像尺寸保持一致，
            * 就表示不进行缩放，以原始尺寸截取部分图像
            */        
          this.img.onload = null
          var waveX = this.canvans.width*0.21
          // setInterval(()=>{
          //   this.ctx.clearRect(0,0,this.canvans.width,this.canvans.height);
          //   // this.ctx.drawImage(this.img, this.canvans.width*0.21, this.canvans.height*0.1)
          //   waveX += 0.5
          //   this.ctx.drawImage(this.img, waveX, this.canvans.height*0.2)
          //   console.log(waveX)
          // },300)
          // this.ctx.drawImage(this.img, waveX, this.canvans.height*0.2)
          // this.animate()
        }
        //指定图片的URL
        // this.img.src = require('@/common/imgs/act/ssy/test/wave.png');
      },
      animate(){
	      var waveX = 0;
        var waveY = 0;
        var waveX_min = -203;
        // var waveY_max = 200 * 0.7;
        var requestAnimationFrame = 
            window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 2000); };
            let _this = this
        function loop () {
          // _this.ctx.clearRect(0, 0, 200, 200);
          // if (!needAnimate) return;
          if (waveY < _this.waveY_max) waveY += 1.5;
          if (waveX < waveX_min) waveX = 0; else waveX -= 3;
          
          // _this.ctx.beginPath();
          // _this.ctx.arc(200/2, 200/2, 200/2, 0, Math.PI*2, true);
          _this.ctx.beginPath();
          // _this.ctx.globalCompositeOperation = 'source-over';
          // _this.ctx.bezierCurveTo(0, 0,48, 50, 0, 200);
          // _this.ctx.bezierCurveTo(0, 200,60, 165, 200, 200);
          // _this.ctx.bezierCurveTo(200, 200,170, 90, 200, 0);
          // _this.ctx.bezierCurveTo(200, 0,80, 40, 0, 0);
            // _this.ctx.bezierCurveTo(7, 10, 38, 60, 8, 185);
            // _this.ctx.bezierCurveTo(4, 196, 60, 158, 190, 192);
            // _this.ctx.bezierCurveTo(198, 194, 162, 120, 190, 7);
            // _this.ctx.bezierCurveTo(196, 7, 100, 30, 7, 7);
            _this.ctx.bezierCurveTo(_this.canvans.width*0.24, _this.canvans.height*0.15, 118, 100, _this.canvans.width*0.23, _this.canvans.height*0.89);
            _this.ctx.bezierCurveTo(_this.canvans.width*0.23, _this.canvans.height*0.89, 180, 192, _this.canvans.width*0.72, _this.canvans.height*0.9);
            _this.ctx.bezierCurveTo(_this.canvans.width*0.75, _this.canvans.height*0.9, 243, 140, _this.canvans.width*0.72, _this.canvans.height*0.14);
            _this.ctx.bezierCurveTo(_this.canvans.width*0.72, _this.canvans.height*0.15, 200, 60, _this.canvans.width*0.24, _this.canvans.height*0.15);
          // this.ctx.moveTo(0,0);
          // this.ctx.lineTo(0,200);
          // this.ctx.lineTo(200,200);
          // this.ctx.lineTo(200,0);
          _this.ctx.closePath();
          _this.ctx.stroke();
          _this.ctx.clip();
          // _this.ctx.closePath();
          // _this.ctx.fill();

          // _this.ctx.globalCompositeOperation = 'source-in';
          // _this.ctx.drawImage(_this.img, waveX, 200 - waveY);
          _this.ctx.drawImage(_this.img, _this.canvans.width*0.21, _this.canvans.height*0.1);
          _this.ctx.closePath();
          requestAnimationFrame(loop);
        }
        loop();
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
          if(!this.btnLoading){
            this.btnLoading = true
          }
          let params = {
            mobile: this.phone,
            smsCode: this.code
          }
          lightenRegister(params).then(res=>{
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
                  // this.dialogType = 2
                  this.isDialog = false
                  this.$toast('注册成功')
                  // 新增注册成功直接登录app的功能
                  let app = isApp()
                  if(app){
                    // 注册方法给app调用回传数据
                    // purcottonApp.callback = function(name,data){
                    //   if(name == "registerLogin"){
                    //     // do somrthing
                    //     console.log(data)
                    //     alert(data)
                    //   }
                    // }
                    // 调用app方法，传递数据给app
                    app('registerLogin', {"token": res.data.data.sessionToken,"username": res.data.data.userName})
                  }
                  // else{
                    // this.$toast('当前不支持登录注册')
                  // }
                }
            }else{
              this.$toast(res.data.msg)
            }
          }).then(()=>{ setTimeout(()=>{ this.btnLoading = false },500) })
        }
      },
      _lightenInit(){
        this.pageLoading = true
        lightenInit().then(res=>{
          console.log(res)
          if(res.data.success){
            this.cardList[0].step = +res.data.data.registerStep
            this.cardList[1].step = +res.data.data.inviteOneStep
            this.cardList[2].step = +res.data.data.inviteTwoStep
            this.cardList[3].step = +res.data.data.orderSuccessStep
            this.wxConfigStr = res.data.data.setWeixinConfig
          }else{
            this.$toast(res.data.msg)
          }
        }).then(()=>{this.pageLoading = false})
      },
      goHome(){
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com/wap/activity/2018/10/26/m_ys.html'
        }else{
          let link = `https://app.purcotton.com/app/activity/2018/10/26/a_ys.html`
          AppNative.sendAction('mobile',{'type': 7,'data': link})
          // AppNative.openWeb(link,'',false)
        }
      },
      onCard(type,step){
        if(step<4){
          this.cardList[type-1].isAnimate = true
          setTimeout(()=>{
            this.cardList[type-1].isAnimate = false
            this.cardList[type-1].step += 1
            // this.waveY_max = 200 * 0.9
          },1000)
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
  .lighten{
    width: 100%;
    height: auto;
    .animation{
      position: absolute;
      top: 20px;
      left: 0;
      z-index: 10;
      &.a2{
        top: 1200px;
      }
      &.a3{
        top: 2300px;
      }
      &.a4{
        top: 3780px;
        width: 100%;
        height: 220px;
        overflow: hidden;
      }
      .star{
        position: absolute;
        top: 0px;
        left: 20px;
        z-index: 11;
        width: 721px;
        height: 595px;
        background: url('../../../common/imgs/act/ssy/bolster/star2.png') no-repeat;
        background-size: contain;
        animation: starFlick 2s ease-in-out infinite;
        -webkit-animation: starFlick 2s ease-in-out infinite;
      }
      .fallstar{
        position: absolute;
        top: 0px;
        left: 20px;
        z-index: 12;
        width: 720px;
        height: 672px;
        background: url('../../../common/imgs/act/ssy/bolster/fallstar2.png') no-repeat;
        background-size: contain;
        -webkit-animation: fallStar 3s linear infinite;
        animation: fallStar 3s linear infinite;
      }
    }
    .bolster{
      position: relative;
      #canvas{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%,-50%);
        // background: url('../../../common/imgs/act/ssy/bolster/bolster.gif') no-repeat;
        background: url('../../../common/imgs/act/ssy/bolster/bolster.png') no-repeat;
        background-size: contain;
        // &:after{
        //   content: ' ';
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   bottom: 0;
        //   right: 0;
        //   z-index: 10;
        //   width: 200px;
        //   height: 200px;
        //   background: url('../../../common/imgs/act/ssy/bolster/bolster.png') no-repeat;
        //   background-size: contain;
        // }
      }
      #canvas2{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
      }
    }
    .card{
      position: relative;
      ul{
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        padding: 20px 10px;
        z-index: 100;
        li{
          flex: 1;
          padding: 0 10px;
          >div{
            border: 4px solid #73e8e3;
            border-radius: 10px;
            padding: 6px;
            position: relative;
            &.on{
              animation: flipRight 1s linear 1;
              -webkit-animation: flipRight 1s linear 1;
            }
            .btn{
              position: absolute;
              bottom: -20px;
              left: 50%;
              width: 130px;
              height: 48px;
              line-height: 48px;
              transform: translateX(-50%);
              background-color: #e14d35;
              border-color: #e14d35;
              color: #fff;
              font-size: 22px;
              border-radius: 40px;
              padding: 0;
              &:before{
                border-color: #fff;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
    .van-popup{
      top: 45%;
      .dialog{
        position: relative;
        &:before{
          content: ' ';
          position: fixed;
          top: -60px;
          left: -20px;
          z-index: 10;
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
          z-index: 12;
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
                &:before{
                  border-color: #fff;
                  background-color: #fff;
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
        }
        ul.btn-box{
          position: fixed;
          bottom: -50px;
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
              text-indent: 10px;
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
  }
</style>
