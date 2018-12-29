<template>
  <div class="lighten">
    <div class="share-btn" @click="onBtnShare" v-if="retype === 'app'"><img src="@/common/imgs/act/ssy/bolster/share-btn.png" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-01.jpg" alt=""></div>
    <div class="a1 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-02.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-03.jpg" alt=""></div>
    <div class="bolster">
      <div><img src="@/common/imgs/act/ssy/bolster/l-04.jpg" alt=""></div>
      <canvas id="canvas">当前环境不支持canvas</canvas>
    </div>
    <div class="a2 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div class="card">
      <div><img src="@/common/imgs/act/ssy/bolster/l-05.jpg" alt=""></div>
      <ul>
        <li>
          <div v-show="cardList[0].step === 1" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a1.png" alt=""></div>
          <div v-show="cardList[0].step === 2" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a2.png" alt=""><van-button class="btn">立即注册</van-button></div>
          <div v-show="cardList[0].step === 3" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a3.png" alt=""><van-button class="btn">去点亮</van-button></div>
          <div v-show="cardList[0].step === 4" :class="{on: cardList[0].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-a4.png" alt=""><van-button class="btn">已完成</van-button></div>
          <section class="card-btn" @click="onCard(cardList[0].type,cardList[0].step)"></section>
          <span v-if="bolsterStatus === 0 || cardList[0].step === 3" class="finger"><img src="@/common/imgs/act/ssy/bolster/finger.png" alt=""></span>
        </li>
        <li>
          <div v-show="cardList[1].step === 1" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b1.png" alt=""></div>
          <div v-show="cardList[1].step === 2" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b2.png" alt=""><van-button class="btn" @click="onInvite">立即邀请</van-button></div>
          <div v-show="cardList[1].step === 3" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b3.png" alt=""><van-button class="btn">去点亮</van-button></div>
          <div v-show="cardList[1].step === 4" :class="{on: cardList[1].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-b4.png" alt=""><van-button class="btn">已完成</van-button></div>
          <section class="card-btn" @click="onCard(cardList[1].type,cardList[1].step)"></section>
          <span v-if="cardList[1].step === 3" class="finger"><img src="@/common/imgs/act/ssy/bolster/finger.png" alt=""></span>
        </li>
        <li>
          <div v-show="cardList[2].step === 1" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c1.png" alt=""></div>
          <div v-show="cardList[2].step === 2" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c2.png" alt=""><van-button class="btn" @click="onInvite">立即邀请</van-button></div>
          <div v-show="cardList[2].step === 3" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c3.png" alt=""><van-button class="btn">去点亮</van-button></div>
          <div v-show="cardList[2].step === 4" :class="{on: cardList[2].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-c4.png" alt=""><van-button class="btn">已完成</van-button></div>
          <section class="card-btn" @click="onCard(cardList[2].type,cardList[2].step)"></section>
          <span v-if="cardList[2].step === 3" class="finger"><img src="@/common/imgs/act/ssy/bolster/finger.png" alt=""></span>
        </li>
        <li>
          <div v-show="cardList[3].step === 1" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d1.png" alt=""></div>
          <div v-show="cardList[3].step === 2" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d2.png" alt=""><van-button class="btn" @click="goHome">立即下单</van-button></div>
          <div v-show="cardList[3].step === 3" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d3.png" alt=""><van-button class="btn">去点亮</van-button></div>
          <div v-show="cardList[3].step === 4" :class="{on: cardList[3].isAnimate}"><img src="@/common/imgs/act/ssy/bolster/card-d4.png" alt=""><van-button class="btn">已完成</van-button></div>
          <section class="card-btn" @click="onCard(cardList[3].type,cardList[3].step)"></section>
          <span v-if="cardList[3].step === 3" class="finger"><img src="@/common/imgs/act/ssy/bolster/finger.png" alt=""></span>
        </li>
      </ul>
    </div>
    <!-- <div><img src="@/common/imgs/act/ssy/bolster/l-06.jpg" alt=""></div> -->
    <div><img src="@/common/imgs/act/ssy/bolster/l-07.jpg" alt=""></div>
    <div class="a3 animation">
      <div class="star"></div>
      <div class="fallstar"></div>
    </div>
    <div @click="gomrj" style="position:relative;z-index:1000;"><img src="@/common/imgs/act/ssy/bolster/l-08.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/bolster/l-09.jpg" alt=""></div>
    <div class="btm">
      <img src="@/common/imgs/act/ssy/bolster/l-10.jpg" alt="">
      <div class="a4"  @click="goHome">
        <div class="star"></div>
        <div class="fallstar"></div>
      </div>
    </div>

    <a-dialog :isShowDialog="isDialog" class="popup1" :dialogType="1" :showCloseBtn="9" :closeBtnBg="'transparent'" :closeBtnColor="'#fff'"
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
    <a-dialog :isShowDialog="isShareDialog" class="popup2" :dialogType="3" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" 
              :showCloseBtn="3" :showHeader="false"  @closeDialog="isShareDialog = false">
              <div class="wx-tip" @click="isShareDialog = false"><img src="@/common/imgs/act/ssy/bolster/wx-tip.png" alt=""></div>
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
        token: '',
        inviter: '',
        clickFlag: false,
        isShareDialog: false,
        bolsterStatus: 0,
        runWave: 0,
        // isShareBtn: true
      }
    },
    created: function(){
      if(this.retype === 'app'){
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        // alert(location.href)
        // alert(this.token)
      }
      this._lightenInit()
    },
    mounted: function(){
      setTimeout(()=>{
      },300)
    },
    methods:{
      init(){
        //获取canvas容器
        this.canvans = document.getElementById('canvas')
        //创建一个画布
        this.ctx = this.canvans.getContext('2d')
        //创建新的图片对象
        this.img = new Image();  
        this.img2 = new Image();  
        this.canvans.width = 200;
        this.canvans.height = 200;
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
          this.animate()
          // this.img2.onload = ()=>{     
          //   this.img2.onload = null
          //   this.animate()
          // }
        }
        //指定图片的URL
        this.img.src = require('@/common/imgs/act/ssy/bolster/wave.png');
        // this.img2.src = require('@/common/imgs/act/ssy/bolster/wave.png');
      },
      animate(){
	      var waveX = 0;
        var waveY = 0;
        var waveX_min = -203;
        // let arr = [300, 380 , 430, 480, 800]
        let arr = [300, 180 , 230, 280, 800]
        // let arr = [0, 80 , 130, 180, 0]
        // this.bolsterStatus = 1
        if(this.bolsterStatus == 0){
          this.ctx.clearRect(0, 0, 200, 200);
          this.ctx.globalCompositeOperation = 'source-over';
          this.ctx.beginPath();
          this.ctx.bezierCurveTo(7, 10, 36, 60, 7, 188);
          this.ctx.bezierCurveTo(2, 198, 86, 156, 190, 192);
          this.ctx.bezierCurveTo(199, 190, 162, 110, 192, 7);
          this.ctx.bezierCurveTo(196, 7, 100, 40, 7, 7);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.globalCompositeOperation = 'source-in';
          this.ctx.drawImage(this.img, 0, 0)
          return
        }else if(this.bolsterStatus == 4){
          return
        }
        // var waveY_max = 200 * 0.7;
        // this.bolsterStatus
        var waveY_max = arr[this.bolsterStatus]
        var requestAnimationFrame = 
            window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000/60); };
        let _this = this
        function loop () {
          _this.ctx.clearRect(0, 0, 200, 200);
          // if (!needAnimate) return;
          if (waveY < waveY_max) waveY += 3;
          if (waveX < waveX_min) waveX = 0; else waveX -= 3;
          
          _this.ctx.globalCompositeOperation = 'source-over';
          // _this.ctx.beginPath();
          // _this.ctx.arc(200/2, 200/2, 200/2, 0, Math.PI*2, true);
          _this.ctx.beginPath();
          // _this.ctx.bezierCurveTo(0, 0,48, 50, 0, 200);
          // _this.ctx.bezierCurveTo(0, 200,60, 165, 200, 200);
          // _this.ctx.bezierCurveTo(200, 200,170, 90, 200, 0);
          // _this.ctx.bezierCurveTo(200, 0,80, 40, 0, 0);
          _this.ctx.bezierCurveTo(7, 10, 36, 60, 7, 188);
          _this.ctx.bezierCurveTo(2, 198, 80, 156, 190, 192);
          _this.ctx.bezierCurveTo(198, 196, 160, 110, 193, 6);
          _this.ctx.bezierCurveTo(196, 7, 100, 40, 7, 7);
          // this.ctx.moveTo(0,0);
          // this.ctx.lineTo(0,200);
          // this.ctx.lineTo(200,200);
          // this.ctx.lineTo(200,0);
          _this.ctx.closePath();
          _this.ctx.stroke();
          // _this.ctx.clip();
          // _this.ctx.closePath();
          _this.ctx.fill();

          _this.ctx.globalCompositeOperation = 'source-in';
          // _this.ctx.drawImage(_this.img, waveX, 200 - waveY);
          _this.ctx.drawImage(_this.img, waveX, -waveY);
          
          requestAnimationFrame(loop);
        }
        loop();
      },
      // closeShareDialog(){
      //   this.isShareBtn = true
      //   this.isShareDialog = false
      // },
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
                  this.cardList[0].isAnimate = true
                  setTimeout(()=>{
                    this.cardList[0].isAnimate = false
                    this.cardList[0].step += 2
                    this._lightenInit()
                  },1000)
                  // this.$toast('注册成功')
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
        lightenInit({ resendUrl: location.href.split('#')[0] ,token: this.token}).then(res=>{
          // console.log(res)
          if(res.data.success){
            this.bolsterStatus = 0
            this.cardList[0].step = +res.data.data.registerStep
            this.cardList[1].step = +res.data.data.inviteOneStep
            this.cardList[2].step = +res.data.data.inviteTwoStep
            this.cardList[3].step = +res.data.data.orderSuccessStep
            for(let item of this.cardList){
              if(item.step == 4){
                this.bolsterStatus += 1
              }
            }
            // console.log(this.cardList)
            if(
              +res.data.data.registerStep == 4 &&
              +res.data.data.inviteOneStep == 4 &&
              +res.data.data.inviteTwoStep == 4 &&
              +res.data.data.orderSuccessStep == 4 ) {
              this.dialogType = 3
              this.isDialog = true
            }
            // console.log(this.bolsterStatus)
            this.wxConfigStr = res.data.data.setWeixinConfig
            let wxOption = {
              title: "王俊凯人像抱枕限时发放中！",     // 标题
              desc: "快来帮我一起点亮获得王俊凯的抱枕吧，还有新人福利限时免费领！快来玩吧~",  // 描述
              imgUrl: require('@/common/imgs/act/ssy/bolster/share-icon.jpg')
            }
            if(this.retype === 'm'){
              if(isweixin()){
                wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html#/ssy/lighten`
                // this.isShareBtn = false
                // this.isShareDialog = true // 打开分享提示弹窗
                share(this.wxConfigStr, wxOption, this)
              }else{
                this.$toast('请在微信内打开哦~')
              }
            }
          }else{
            this.$toast(res.data.msg)
          }
        }).then(()=>{
          if(this.runWave === 0){
            this.runWave = 1
            this.init()
          }else if(this.runWave === 2){
            this.runWave = 1
            this.animate()
          }
          this.pageLoading = false
        })
      },
      gomrj(){
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com/wap/activity/2018/11/02/m_yrmrj.html'
        }else{
          let link = `https://app.purcotton.com/app/activity/2018/11/02/a_yrmrj.html`
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      goHome(){
        if(this.retype === 'm'){
          // location.href = 'https://m.purcotton.com/wap/activity/2018/10/26/m_ys.html'
          if(parseInt(new Date().getTime()/1000) > new Date('2018-11-10 22:00').getTime()/1000){
            location.href = 'https://m.purcotton.com/wap/activity/2018/11/02/m_zs.html'
          }else{
            location.href = 'https://m.purcotton.com/wap/activity/2018/11/02/m_yr.html'
          }
        }else{
          // let link = `https://app.purcotton.com/app/activity/2018/10/26/a_ys.html`
          let link = ''
          if(parseInt(new Date().getTime()/1000) > new Date('2018-11-10 22:00').getTime()/1000){
            link = 'https://app.purcotton.com/app/activity/2018/11/02/a_zs.html'
          }else{
            link = `https://app.purcotton.com/app/activity/2018/11/02/a_yr.html`
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
          // AppNative.openWeb(link,'',false)
        }
      },
      onCard(type,step){
        if(step<4){
          if(!this.clickFlag){
            this.clickFlag = true
            // let params = {step: type,token: this.token}
            lightenStep({step: type,token: this.token}).then(res=>{
              // console.log(res)
              // alert(res.data.code)
              if(res.data.success){
                if(res.data.code == 'oldMember'){
                  this.dialogType = 2
                  this.isDialog = true
                }else{
                  this.inviter = res.data.data.userName
                  if(type === 1){
                    this.cardList[type-1].isAnimate = true
                    setTimeout(()=>{
                      this.cardList[type-1].isAnimate = false
                      this.cardList[type-1].step += 1
                      if(step === 3){ 
                        this.runWave = 2
                        // this.bolsterStatus += 1
                        // setTimeout(()=>{
                        //   this.animate()
                        // },100)
                      }
                      this._lightenInit()
                    },1000)
                  }else if(type === 2 || type ===3){
                    if(step === 1 || step === 3){
                      this.cardList[type-1].isAnimate = true
                      setTimeout(()=>{
                        this.cardList[type-1].isAnimate = false
                        this.cardList[type-1].step += 1
                        if(step === 3){ 
                          this.runWave = 2
                          // this.bolsterStatus += 1
                          // setTimeout(()=>{
                          //   this.animate()
                          // },100)
                        }
                        this._lightenInit() 
                      },1000)
                    }else{
                      // this.$toast('去分享')
                      this.onInvite()
                    }
                  }else {
                    if(step === 1 || step === 3){
                      this.cardList[type-1].isAnimate = true
                      setTimeout(()=>{
                        this.cardList[type-1].isAnimate = false
                        this.cardList[type-1].step += 1
                        if(step === 3){ 
                          this.runWave = 2
                          // setTimeout(()=>{
                          //   this.animate()
                          // },100)
                        }
                        this._lightenInit() 
                      },1000)
                    }else{
                      // this.$toast('去购物')
                      this.goHome()
                    }
                  }
                }
              }else{
                if(res.data.code == 'notLogin'){
                  this.phone = ''
                  this.code = ''
                  this.dialogType = 1
                  this.isDialog = true
                }else{
                  this.$toast(res.data.msg)
                }
              }
            }).then(()=>{
              setTimeout(()=>{
                this.clickFlag = false
              },2000)
            })
          }
          // this.cardList[type-1].isAnimate = true
          // setTimeout(()=>{
          //   this.cardList[type-1].isAnimate = false
          //   this.cardList[type-1].step += 1
          //   this.waveY_max = 200 * 0.9
          // },1000)
        }
      },
      onBtnShare(){
        let wxOption = {
          title: "王俊凯人像抱枕限时发放中！",     // 标题
          desc: "快来帮我一起点亮获得王俊凯的抱枕吧，还有新人福利限时免费领！快来玩吧~",  // 描述
          imgUrl: require('@/common/imgs/act/ssy/bolster/share-icon.jpg')
        }
        if(this.retype === 'm'){
          if(isweixin()){
            wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html#/ssy/lighten`
            // this.isShareBtn = false
            this.isShareDialog = true // 打开分享提示弹窗
            share(this.wxConfigStr, wxOption, this)
          }else{
            this.$toast('分享失败，请在微信内打开')
          }
        }else if(this.retype === 'app'){
          wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html%23/ssy/lighten`
          AppNative.share(wxOption.link, wxOption.title, wxOption.desc, wxOption.imgUrl)
        }
      },
      onInvite(){
        let wxOption = {
          title: "王俊凯人像抱枕限时发放中！",     // 标题
          desc: "快来帮我一起点亮获得王俊凯的抱枕吧，还有新人福利限时免费领！快来玩吧~",  // 描述
          imgUrl: require('@/common/imgs/act/ssy/bolster/share-icon.jpg')
        }
        if(this.retype === 'm'){
          if(isweixin()){
            if(this.inviter){
              // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#
              // wxOption.link = `${location.origin}/wap/h5/2018/11/11/index.html#/ssy/assist?inviterId=${this.inviter}`
              // let url = `${location.origin}/wap/h5/2018/11/11/index.html#/ssy/assist`
              wxOption.link = `https://m.purcotton.com/mall/activityRoutine/wxActivity.ihtml?actName=3&userName=${this.inviter}&flag=wap`
              // this.isShareBtn = false
              this.isShareDialog = true // 打开分享提示弹窗
              share(this.wxConfigStr, wxOption, this)
            }else{
              // 未登陆不能分享
              this.dialogType = 1
              this.isDialog = true
            }
          }else{
            this.$toast('分享失败，请在微信内打开')
          }
        }else if(this.retype === 'app'){
          if(this.token){
            // app分享链接为空则不能分享出去
            // 微信端无需担心#问题，app端，安卓不能识别#需用%23，ios可以识别#但无法识别&
            // wxOption.link = `https://m.purcotton.com/wap/h5/2018/11/11/index.html%23/ssy/assist%3finviterId%3d${this.token}%26type%3dapp`
            // let url = `${location.origin}/wap/h5/2018/11/11/index.html#/ssy/assist`
            let key = 3
            wxOption.link = `https://m.purcotton.com/mall/activityRoutine/wxActivity.ihtml%3factName%3d${key}%26userName%3d${this.token}%26flag%3dapp`
            AppNative.share(wxOption.link, wxOption.title, wxOption.desc, wxOption.imgUrl)
          }else{
            // AppNative.openLogin()
            // 未登陆提示登陆
            this.dialogType = 1
            this.isDialog = true
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
  .lighten{
    width: 100%;
    height: auto;
    -webkit-overflow-scrolling: touch;
    .share-btn{
      position: absolute;
      top: 30px;
      right: 30px;
      z-index: 1000;
      width: 100px;
      height: 100px;
    }
    .animation{
      position: absolute;
      top: 20px;
      left: 0;
      // z-index: 10;
      &.a2{
        top: 1200px;
      }
      &.a3{
        top: 2300px;
      }
      &.a4{
        // top: 3780px;
        bottom: 0px;
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
    .btm{
      position: relative;
      .a4{
        position: absolute;
        top: 0px;
        width: 100%;
        height: 230px;
        overflow: hidden;
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
    }
    .bolster{
      position: relative;
      #canvas{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 100;
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
    }
    .card{
      position: relative;
      ul{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        padding: 20px 10px;
        li{
          flex: 1;
          padding: 0 10px;
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
          .card-btn{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 20;
          }
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
    .popup1{
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
              // /deep/ .van-loading__circular{
              //   color: #fff!important;
              // }
            }
          }
        }
      }
    }
    .popup2{
      .wx-tip{
        padding: 100px 150px 0;
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
