<template>
  <div class="welfare">
    <div><img src="@/common/imgs/act/ssy/welfare-bg01.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/welfare-bg02.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/welfare-bg03.jpg" alt=""></div>
    <div @click="onGoods(1,'1000011059-000')"><img src="@/common/imgs/act/ssy/welfare-bg04.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/welfare-bg05.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/welfare-bg06.jpg" alt=""></div>
    <div class="form">
      <van-cell-group class="phone-in"> <van-field v-model="phone" placeholder="请输入手机号码" maxlength="11" clearable/> </van-cell-group>
      <div class="code-box">
        <van-cell-group class="code-in"> <van-field v-model="code" placeholder="请输入验证码" maxlength="4" clearable/> </van-cell-group>
        <van-button block class="code-btn" @click="onMsgCode" :class="{active: codeBtnActive}">{{codeText}}</van-button>
      </div>
      <ul class="btn-box">
        <li><van-button block class="btn" @click="regAndGetWelfare" :loading="btnLoading">立即领取</van-button></li>
      </ul>
    </div>
    <div @click="onRule"><img src="@/common/imgs/act/ssy/welfare-bg07.jpg" alt=""></div>
    <!-- <div><img src="@/common/imgs/act/ssy/welfare-bg08.jpg" alt=""></div> -->
    <!-- <div class="panel">
      <div class="kill"> -->
        <!-- v-model="tabActive" sticky  -->
        <!-- <van-tabs v-model="killGoodsActive" :swipe-threshold="3" type="card"> -->
          <!-- :disabled="item.disabled" -->
          <!-- <van-tab v-for="(item, index) in killGoods" :key="index">
            <div slot="title" class="time-box" :class="{'end': item.disabled}"> -->
              <!-- <h3 v-if="item.active">今日秒杀</h3> -->
              <!-- <h3 v-if="item.start <= currentTime && currentTime <= item.end">今日秒杀</h3>
              <h3 v-else>{{item.date}}</h3>
              <killtime :currentTime="currentTime" :startTime="item.start" :endTime="item.end" :tipText="'距开始'" :tipTextEnd="'距结束'" 
                :endText="'已结束'" :dayTxt="'天'" :hourTxt="'时'" :minutesTxt="'分'" :secondsTxt="'秒'" 
                v-on:start_callback="countDownS_cb" v-on:end_callback="countDownE_cb" v-if="item.active">
              </killtime>
              <p v-else-if="item.disabled">已结束</p>
              <p v-else>{{item.time}}</p>
            </div>
            <ul class="kill-goods" @click="onGoods(1,item.id)">
              <li><img v-lazy="item.imgPath" alt=""></li>
              <li> -->
                <!-- <killtime :currentTime="currentTime" :startTime="item.start" :endTime="item.end" :tipText="'距开始'" :tipTextEnd="'距结束'" 
                  :endText="'结束啦~'" :dayTxt="'天'" :hourTxt="'时'" :minutesTxt="'分'" :secondsTxt="'秒'" 
                  v-on:start_callback="countDownS_cb(2)" v-on:end_callback="countDownE_cb(2)">
                </killtime> -->
                <!-- <div class="sign"><div>单品包邮</div><div>限量50份</div></div>
                <div class="name line-hidden">{{item.name}}</div>
                <div class="price"><span>￥{{item.curPrice}}</span><del>￥{{item.prePrice}}</del> </div> -->
                <!-- !killTimeEnd ||  -->
                <!-- <div class="btn" v-if="currentTime < item.start">未开始</div> 
                <div class="btn" v-else-if="currentTime >= item.start && currentTime <= item.end">立即秒杀</div> 
                <div class="btn" :class="{end: item.disabled}" v-else>已结束</div>
              </li>
            </ul>
          </van-tab>
          
        </van-tabs>
      </div>
    </div> -->
    <div @click="goLighten"><img src="@/common/imgs/act/ssy/welfare-bg09.jpg" alt=""></div>
    <div @click="onWelfare"><img src="@/common/imgs/act/ssy/welfare-bg10.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/welfare-bg11.jpg" alt=""></div>
    <div @click="goSharePage"><img src="@/common/imgs/act/ssy/welfare-bg12.jpg" alt=""></div>
    <div @click="onGoods(1,'802-003680')"><img src="@/common/imgs/act/ssy/welfare-bg12-01.jpg" alt=""></div>
    <div @click="goCodePage"><img src="@/common/imgs/act/ssy/welfare-bg13.jpg" alt=""></div>
    <div @click="goHome"><img src="@/common/imgs/act/ssy/welfare-bg14.jpg" alt=""></div>
    <div @click="gotop"><img src="@/common/imgs/act/ssy/welfare-bg15.jpg" alt=""></div>
    <!-- <div v-if="retype==='m'" @click="onDownload"><img src="@/common/imgs/act/ssy/download.jpg" alt=""></div> -->
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="2" :closeBtnBg="'#fff'" :closeBtnColor="'#505050'"
              :showHeader="false"  @closeDialog="isDialog = false" :dialogWidth="'84%'">
      <div class="dialog">
        <div class="rule" v-if="dialogType === 1">
          <h3>领取规则</h3>
          <div class="content">
            <p><span>1.</span>新人指在2018.10.29-11.12新注册成为全棉时代官网新会员的用户；</p>
            <p><span>2.</span>官网新会员注册即送满200减20元优惠券1张、纯棉柔巾10元抵用券1张；新人首单确认收货之后再送满200减10元优惠券1张；</p>
            <p><span>3.</span>新人注册送券有效期为2018年10月29日-11月12日；</p>
            <p><span>4.</span>注册成功后，新人优惠券会自动到账；</p>
            <p><span>5.</span>全棉时代在法律范围内享有对本活动的最终解释权归。</p>
          </div>
          <van-button block class="btn" @click="isDialog = false">知道了</van-button>
        </div>
        <div class="success" v-if="dialogType === 2">
          <h3> 恭喜您<br/>您注册成功 </h3>
          <p>优惠券已放入您的账户，<br/>快让它们有用武之地吧！</p>
          <van-button block class="btn" @click="goHome">立即进入活动首页 >>></van-button>
        </div>
        <div class="repeat" v-if="dialogType === 3">
          <h3>亲爱的<br/>您已经是全棉时代的会员啦</h3>
          <p>快去邀请好友加入，<br/>享受更多会员福利吧！</p>
          <van-button block class="btn" @click="goSharePage">立即邀请 >>></van-button>
        </div>
        <div class="code" v-if="dialogType === 4">
          <div class="pic"><img src="@/common/imgs/act/ssy/wxcode.png" alt=""></div>
          <p>扫我关注微信公众号<br/>双11五折优惠提前享</p>
        </div>
      </div>
    </a-dialog>
    <van-loading color="white" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import AppNative from '@/common/js/native.js'
  import {checkPhone,checkMsgCode} from '@/common/js/validation.js'
  import MsgCode from '@/common/js/msgCode.js'
  import {getMsgCode,directRegister,getCurrentTime} from '@/api/act/ssy.js'
  import aDialog from "@/components/a-dialog.vue"
  // getOldAppParams
  import {doLogReg,browser,downloadApp} from '@/common/js/utils.js' 
  import { Tab, Tabs } from 'vant'
  import killtime from '@/components/killtime.vue'
  import isApp from '@/common/js/app.js'
  export default {
    name: 'welfare',
    data() {
      return {
        phone: '',
        code: '',
        codeText: '获取验证码',
        btnLoading: false,
        isDialog: false,
        dialogType: 1, // 1为注册成功，2为重复注册提示去邀请
        vanLoading: false,
        codeBtnActive: false,
        currentTime: parseInt(new Date().getTime()/1000),
        killGoodsActive: 0,
        killGoods:[
          {index: 0,active: false,disabled: false,date:'10月29日',start: 1540778400,end: 1540785600,time:'10点-12点',id: '2100014457-000',name:'婴儿湿巾80片*3包',curPrice:'59.00',prePrice:'118.00',imgPath:'https://res.purcotton.com/images/commodity/002002016/80000000/002000001566/4E085AB3F7493147A8A218B72B86412B.jpg_357x357.jpg'},
          {index: 1,active: false,disabled: false,date:'10月30日',start: 1540864800,end: 1540872000,time:'10点-12点',id: '2000081501-066',name:'婴儿高支纱夹涤棉连体服',curPrice:'169.00',prePrice:'338.00',imgPath:'https://res.purcotton.com/images/commodity/002006009/80000000/002000001152/10000001_00000695/DACD71E15CCD51AF913DB82872FFCA54.jpg_357x357.jpg'},
          {index: 2,active: false,disabled: false,date:'10月31日',start: 1540951200,end: 1540958400,time:'10点-12点',id: '2000083401-059',name:'婴儿厚款长袖连体服',curPrice:'169.00',prePrice:'338.00',imgPath:'https://res.purcotton.com/images/commodity/002006009/80000000/002000001198/10000001_00000695/3E84E2289E5392FCC1C14E152DA1A6D7.jpg_357x357.jpg'},
          {index: 3,active: false,disabled: false,date:'11月1日',start: 1541037600,end: 1541044800,time:'10点-12点',id: '800-006043',name:'婴幼儿针织复合便携包',curPrice:'134.00',prePrice:'268.00',imgPath:'https://res.purcotton.com/images/commodity/002002020/80000000/002000000241/7BAA3EEFAFFDA7B53DFA38C8E20A9598.jpg_357x357.jpg'},
          {index: 4,active: false,disabled: false,date:'11月2日',start: 1541124000,end: 1541131200,time:'10点-12点',id: '802-003626',name:'婴儿纯棉柔巾10盒装',curPrice:'74.00',prePrice:'148.00',imgPath:'https://res.purcotton.com/images/commodity/002002009/80000000/002000002149/8F37D0A76C4CA81822FE677B9F2A552B.jpg_357x357.jpg'},
          {index: 5,active: false,disabled: false,date:'11月3日',start: 1541210400,end: 1541217600,time:'10点-12点',id: '800-007523-M',name:'女士针织圆筒收腹带',curPrice:'79.00',prePrice:'158.00',imgPath:'https://res.purcotton.com/images/commodity/004003004/80000000/004000000436/10000001_00000695/A198C54D7C2268EA0F7D04BDDECCFB82.jpg_357x357.jpg'},
          {index: 6,active: false,disabled: false,date:'11月4日',start: 1541296800,end: 1541304000,time:'10点-12点',id: '4200014461-000',name:'带压痕化妆棉100片',curPrice:'20.90',prePrice:'41.80',imgPath:'https://res.purcotton.com/images/commodity/004001001/80000000/004000000863/44BB7C0BAE92455E5DA5AF7843C33166.jpg_357x357.jpg'},
          {index: 7,active: false,disabled: false,date:'11月5日',start: 1541383200,end: 1541390400,time:'10点-12点',id: '4100122201-160',name:'女士夹骨线套头衫',curPrice:'199.00',prePrice:'398.00',imgPath:'https://res.purcotton.com/images/commodity/004014009/80000000/004000000781/10000001_00000695/8E4C9D14EE208D8805666561FE506FC2.jpg_357x357.jpg'},
          {index: 8,active: false,disabled: false,date:'11月6日',start: 1541469600,end: 1541476800,time:'10点-12点',id: '2100010938-000',name:'kitty加大版婴儿纯棉柔巾6袋',curPrice:'59.00',prePrice:'118.00',imgPath:'https://res.purcotton.com/images/commodity/002002009/80000000/002000000937/230BEFFD6301942D230D1523F7CB4ABD.jpg_357x357.jpg'},
          {index: 9,active: false,disabled: false,date:'11月7日',start: 1541556000,end: 1541563200,time:'10点-12点',id: '800-006572-066',name:'婴幼儿纱布隔尿裤2条装',curPrice:'119.00',prePrice:'238.00',imgPath:'https://res.purcotton.com/images/commodity/002002004/80000000/002000000572/10000001_00000034/11512FDAEA67061C04D4D72ECBCDF8B6.jpg_357x357.jpg'},
          {index: 10,active: false,disabled: false,date:'11月8日',start: 1541642400,end: 1541649600,time:'10点-12点',id: '800-002037-01',name:'精梳纱布婴儿尿布8片',curPrice:'74.00',prePrice:'148.00',imgPath:'https://res.purcotton.com/images/commodity/002002011/80000000/102000000706/78D56880ABD86B9752128AFCFBCF8058.jpg_357x357.jpg'},
          {index: 11,active: false,disabled: false,date:'11月9日',start: 1541728800,end: 1541736000,time:'10点-12点',id: '804-000080',name:'纯棉厨房柔巾2卷/袋x4袋',curPrice:'156.00',prePrice:'312.00',imgPath:'https://res.purcotton.com/images/commodity/106001002/80000000/106000000132/7A657C70402B6225F145F7A12B83789D.jpg_357x357.jpg'},
          {index: 12,active: false,disabled: false,date:'11月10日',start: 1541815200,end: 1541822400,time:'10点-12点',id: '804-000181',name:'纯水清洁湿巾x10包',curPrice:'50.00',prePrice:'100.00',imgPath:'https://res.purcotton.com/images/commodity/001003011/80000000/001000000856/1EB0A819F1A4644A8A750089168DFB92.jpg_357x357.jpg'},
        ],
      }
    },
    created:function(){
      // this._getCurrentTime()
      // 直接注册无需token参数
      // if(this.retype === 'app'){
      //   let obj = getOldAppParams()
      //   this.token = obj.token || this.$route.query.token
      //   this.uuid = obj.uuid || this.$route.query.uuid
      // }
    },
    mounted: function(){
      this.$nextTick(()=>{})
    },
    methods: {
      // 秒杀start
      countDownS_cb(){
        console.log('callBack--开始倒计时结束回调');
        // setTimeout(()=>{
        //   window.location.reload()
        // },100)
        this._getCurrentTime()
      },
      countDownE_cb(){
        console.log('callBack--活动剩余倒计时结束回调');
        this._getCurrentTime()
        // window.location.reload()
        // setTimeout(()=>{
          // window.location.reload()
          
        // },1000)
      },
      _getCurrentTime(){
        this.vanLoading = true
        getCurrentTime().then(res=>{
          this.currentTime = parseInt(res.data/1000) || parseInt(new Date().getTime()/1000)
          // this.currentTime = parseInt(new Date().getTime()/1000) + 3*24*60*60+165050
          // console.log(this.currentTime)
          for(let [index,item] of this.killGoods.entries()){
            // 判断每个阶段的开始结束的范围 (第一次结束前一天触发倒计时)
            if( item.end - 24*60*60 <= this.currentTime && this.currentTime <= item.end){
              // tab激活从0开始
              this.killGoodsActive = index
              // 绑定当前tab是否显示秒杀时间
              item.active = true
              // 在活动时间内，将活动时间置为当前时间
              if(this.currentTime >= item.start){
                item.start = this.currentTime
              }
              // 将超过秒杀点的置灰
              for(let i=0;i<index;i++){
                this.killGoods[i].active = false
                this.killGoods[i].disabled = true
              }
              // console.log(this.killGoods)
              break
            }else{
              // 时间超过了则全部置灰
              if(this.currentTime > this.killGoods[this.killGoods.length-1].end){
                this.killGoodsActive = 0
                // this.killTimeEnd = true
                for(let i=0;i<this.killGoods.length;i++){
                  this.killGoods[i].disabled = true
                }
              }
              
            }
          }
          this.vanLoading = false
        })
      },
      onGoods(type,goodsId){
        if(this.retype === "m"){
          location.href = `${location.origin}/mall/commodity/getCommodityDetail.ihtml?prodNo=${goodsId}`
        }else{
          let params = {'type': type,'data': goodsId}
          // type为1，2可以加title，但type为7不可以加，否则无法正确跳转
          if(type === 1 || type === 2){
            params.title = ''
          }
          AppNative.sendAction('mobile',params)
        }
      },
      onRule(){
        this.dialogType = 1
        this.isDialog = true
      },
      onWelfare(){
        this.dialogType = 4
        this.isDialog = true
      },
      // 秒杀end
      onDownload(){
        downloadApp()
        // location.href = 'https://lnk0.com/JBVJ1c?td_subid={td_subid}'
      },
      wgDownload(){
        location.href = 'https://lnk0.com/JBVJ1c?td_subid={td_subid}'
      },
      // wgDownload(){
      //   location.href = 'https://lnk0.com/JBVJ1c?td_subid={td_subid}'
      // },
      goCodePage(){
        this.isDialog = false // 先关闭弹窗在跳转，否则会报vue警告
        if(this.retype === 'm'){
          this.$router.push('/ssy/code')
        }else{
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/code`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
          // AppNative.openWeb(link,'',false)
        }
      },
      goSharePage(){
        this.isDialog = false // 先关闭弹窗在跳转，否则会报vue警告
        if(this.retype === 'm'){
          this.$router.push('/ssy/invite')
        }else{
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/invite`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
          // AppNative.openWeb(link,'',false)
        }
      },
      goLighten(){
        if(this.retype === 'm'){
          this.$router.push('/ssy/lighten')
        }else{
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/lighten`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
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
        }else if(this.retype === 'app'){
          // let link = `https://app.purcotton.com/app/activity/2018/10/26/a_ys.html`
          let link = ''
          if(parseInt(new Date().getTime()/1000) > new Date('2018-11-10 22:00').getTime()/1000){
            link = 'https://app.purcotton.com/app/activity/2018/11/02/a_zs.html'
          }else{
            link = `https://app.purcotton.com/app/activity/2018/11/02/a_yr.html`
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      gotop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
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
              activityRemark: 'inSsyRegister',
              mobile: this.phone,
              smsCode:  this.code,
              // inviter: this.inviterId,
              // flag: this.type
            }
            directRegister(params).then(res=>{
              if(res.data.success){
                if(this.sms){
                  this.sms.stop()
                }
                this.phone = ''
                this.code = ''
                // if(res.data.code == "oldMember"){
                //   this.dialogType = 3
                //   this.isDialog = true
                // }else{
                  this.dialogType = 2
                  this.isDialog = true
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
                  }else{
                    // this.$toast('当前不支持登录注册')
                  }
                // }
              }else{
                // this.getErrorTip(res.data.data)
                if(res.data.code == "oldMember"){
                  this.dialogType = 3
                  this.isDialog = true
                }else{
                  this.$toast(res.data.msg)
                }
              }
            }).then(()=>{ setTimeout(()=>{ this.btnLoading = false },500) })
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
      'van-tab': Tab,
      'van-tabs': Tabs,
      killtime
    }
  }
</script>

<style lang="less" scoped>
  .welfare{
    width: 100%;
    height: auto;
    min-height: 1206px;
    // background-color: #fff7f2;
    position: relative;
    .form{
      padding: 30px 40px 0;
      background-color: #d0f4f0;
      .phone-in{
        position: relative;
        border-radius: 60px;
        border: 1px solid #dddddd;
        background-color: #f8f8f8;
      }
      .code-box{
        display: flex;
        justify-content: space-between;
        margin: 30px 0 0 0;
        position: relative;
        .code-in{
          width: 50%;
          border: 1px solid #dddddd;
          border-radius: 60px;
          background-color: #f8f8f8;
        }
        .code-btn{ 
          width: 46%;
          height: 88px;
          line-height: 88px;
          color: #fff;
          font-size: 30px;
          border-radius: 60px;
          border-color: #68c9bd;
          background-color: #68c9bd;
          box-sizing: border-box;
          &:before{
            border-color: #fff;
            background-color: #fff;
          }
          &.active{
            border-color: #b0b9b7;
            background-color: #b0b9b7;
          }
        }
      }
      .van-cell-group{
        .van-field{
          padding: 28.5px 26px;
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
            font-size: 30px;
            color: #68c9bd;
          }
        }
      }
      ul.btn-box{
        padding: 30px 0;
        li{
          .btn{
            border: 0;
            color: #fff;
            font-size: 30px;
            height: 88px;
            line-height: 88px;
            border-radius: 40px;
            background-color: #68c9bd;
            // 背景颜色设置为渐变色
            // background: linear-gradient(left,#aacbb7,#84ba99);
            // background: -webkit-linear-gradient(left, #aacbb7,#84ba99);
            // 设置按钮的内外阴影
            // box-shadow: -3px -3px 10px #65a27b inset, 20px 20px 50px #cce3d5; 
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
    .panel{
      width: 100%;
      // height: 450px;
      padding: 20px 20px 60px;
      box-sizing: border-box;
      background-color: #fc8c8c;
      .kill{
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        /deep/ .killTime{
          position: relative;
          left: -10%;
          width: 120%;
          font-size: 24px;
          line-height: 24px;
          -webkit-transform : scale(0.88);
          span{
            display: inline-block;
          }
          i{
            font-style: normal;
          }
        }
        /deep/ .van-tabs{
          padding: 100px 0 0;
          .van-tabs__wrap{
            height: 100px;
            .van-tabs__nav{
              margin: 0;
              border: 0;
              height: 100%;
              .van-tab{
                padding: 0;
                flex: 0 0 38%;
                overflow: hidden;
                border: 0;
                .time-box{
                  position: relative;
                  padding: 20px 0;
                  font-size: 28px;
                  line-height: 28px;
                  background-color: #ffd8d0;
                  box-sizing: border-box;
                  &::after{
                    content: ' ';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 60px;
                    background-color: #f4b6aa;
                  }
                  &.end{
                    background-color: #dcdddd;
                    // background-color: #dcdddd!important;
                    h3{ color: #3e3a39; }
                    p{ color: #3e3a39; }
                  }
                  h3{
                    font-size: 28px;
                    line-height: 36px;
                    color: #3e3a39;
                  }
                  p{
                    font-size: 22px;
                    line-height: 28px;
                    color: #3e3a39;
                  }

                }
                &.van-tab--active{
                  position: relative;
                  border-bottom:  6px solid #a70606;
                  .time-box{
                    background-color: #d60606;
                    &:after{
                      width: 0;
                    }
                    &.end{
                      // background-color: #dcdddd;
                      h3{ color: #fff; }
                      p{ color: #fff; }
                    }
                  }
                  // &:after{
                  //   content: ' ';
                  //   position: absolute;
                  //   bottom: -6px;
                  //   left: 0;
                  //   z-index: 20;
                  //   width: 100%;
                  //   height: 12px;
                  //   background-color: #a70606;
                  //   // background: url('../../../common/imgs/act/ssy/tab-active.png') no-repeat;
                  //   // background-size: 100%;
                  // }
                  h3{color: #fff;}
                  p{color: #fff;}
                }
                &.van-tab--disabled{
                  color: #c9c9c9;
                  background-color: #eee;
                }
              }
            }
          }
        }
        ul.kill-goods{
          display: flex;
          box-sizing: border-box;
          li:first-child{
            width: 260px;
            align-self: center;
          }  
          li:last-child{
            flex: 1;
            padding: 30px 0 30px 20px;
            .name{
              width: 400px;
              font-size: 32px;
              height: 40px;
              line-height: 40px;
              color: #222;
            }
            .sign{
              display: flex;
              padding-bottom: 20px;
              >div{
                width: auto;
                padding: 6px 10px;
                margin-right: 20px;
                font-size: 26px;
                color: #29b8a8;
                border-radius: 40px;
                border: 1px solid #29b8a8;
              }
            }
            .price{
              padding: 20px 0 20px 120px;
              position: relative;
              span{
                color: #d60606;
                font-size: 36px;
              }
              del{
                color: #999;
                font-size: 22px;
              }
              &:before{
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                content: '秒杀价';
                font-size: 24px;
                background-color: #29b8a8;
                color: #fff;
                padding: 10px 20px;
                border-radius: 30px;
              }
            }
            .btn{
              display: inline-block;
              padding: 14px 36px;
              font-size: 28px;
              background-color: #d60606;
              color: #fff;
              border-radius: 10px;
              &.end{
                background-color: #999;
              }
            }
          }
        }
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      .rule{
        h3{
          padding: 40px 0;
          font-size: 36px;
          color: #57b9ad;
        }
        .content{
          padding: 0 50px 40px 70px;
          text-align: left;
          p{
            font-size: 28px;
            line-height: 38px;
            color: #222;
            position: relative;
            span{
              position: absolute;
              left: -26px;
            }
          }
        }
      }
      .success, .repeat{
        h3{
          padding-top: 90px;
          font-size: 36px;
          color: #57b9ad;
          line-height: 48px;
          position: relative;
          &:before{
            content: ' ';
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            width: 51px;
            height: 35px;
            background: url('../../../common/imgs/act/ssy/icon.png') no-repeat;
            background-size: contain;
          }
        }
        p{
          padding: 40px 0;
          font-size: 28px;
          line-height: 38px;
          text-align: center;
          color: #666;
        }
      }
      .code{
        .pic{
          padding: 60px 120px;
        }
        p{
          padding-bottom: 60px;
          font-size: 36px;
          line-height: 48px;
          color: #57b9ad;
        }
      }
      .btn{
        height: 90px;
        font-size: 32px;
        border: 0;
        color: #57b9ad;
        background-color: #fff;
        border-top: 1px solid #eee;
        &:before{
          border-color: #fff;
          background-color: #fff;
        }
      }
    }
  }
</style>
