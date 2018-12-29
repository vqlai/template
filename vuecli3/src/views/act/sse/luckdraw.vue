<template>
  <div class="luckdraw">
     <div class="panel">
        <div class="share-btn" @click="onBtnShare" v-if="retype === 'app'"><img src="@/common/imgs/act/sse/luckdraw/share-btn.png" alt=""></div>
        <div class="bg"><img src="@/common/imgs/act/sse/luckdraw/bg.jpg" alt=""></div>
        <lottery :beforeLottery="beforeLottery" :afterLottery="afterLottery" :lotteryBtn="lotterySquare.lotteryBtn" :prizesList="lotterySquare.prizesList" :prize="lotterySquare.prize">
          <p class="count"><span>{{drawCount}}次</span>抽奖机会</p>
        </lottery>
        <div class="btm">
          <van-button class="btn" @click="onRule">抽奖规则<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
          <van-button class="btn" @click="onPrize">查看我的奖品<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
        </div>
      </div>
      <div @click="openGoods('802-001300')"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-13.jpg" alt=""></div>
      <div @click="openGoods('802-000468')"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-14.jpg" alt=""></div>
      <div @click="openGoods('100-000024')"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-15.jpg" alt=""></div>
      <div @click="openGoods('802-003770')"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-16.jpg" alt=""></div>
      <div @click="openGoods('802-003769')"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-17.jpg" alt=""></div>
      <div @click="goMainActPage"><img src="https://res.purcotton.com/wap/activity/2018/12/06/home/p-18.jpg" alt=""></div>
      <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="3" :closeBtnBg="'transparent'" :closeBtnColor="'#fff'" 
      :showHeader="false" @closeDialog="isDialog = false" :dialogWidth="'88%'" :canCloseOverlay="canCloseOverlay" :dialogBg="'#2ecda4'">
      <div class="dialog">
        <div class="hdj" v-if="dialogType !== 2"><img src="@/common/imgs/act/sse/luckdraw/hdj.png" alt=""></div>
        <div class="rule" v-if="dialogType === 1">
          <div class="content">
            <p><span>1</span>抽奖活动时间：2018年12月6日10点-12月10日20点；</p>
            <p><span>2</span>抽奖活动期间新用户可以免费抽奖1次，老用户20积分可参与抽奖1次，每人每天最多可抽奖3次；</p>
            <p><span>3</span>抽中奖品将会在活动结束后7个工作日内发出，优惠券和积分将会在24小时内到账；</p>
            <p><span>4</span>若抽中实物奖品未填写地址，可及时联系客服提供信息，确认后可发放，否则视为放弃此权益；</p>
            <p><span>5</span>全棉时代在法律允许的范围内有权对此次活动进行解释。</p>
            <p v-if="retype === 'app' && isIos"><span>6</span>本活动由全棉时代官方商城举办，苹果公司不对本次抽奖或者活动承担责任</p> 
          </div>
        </div>
        <div class="prize-list" v-if="dialogType === 2">
          <h3>我的奖品</h3>
          <ul>
            <li>奖品名称</li>
            <li>中奖时间</li>
            <li>奖品内容</li>
          </ul>
          <div class="list" v-if="prizeList.length">
            <ol v-for="(item,index) in prizeList" :key="index">
              <li>{{item.prizeName}}</li>
              <li>{{item.prizeTime}}</li>
              <li v-if="item.prizeLevel === 1"><img src="@/common/imgs/act/sse/luckdraw/no-1.png" alt=""></li>
              <li v-if="item.prizeLevel === 2"><img src="@/common/imgs/act/sse/luckdraw/no-2.png" alt=""></li>
              <li v-if="item.prizeLevel === 3"><img src="@/common/imgs/act/sse/luckdraw/no-3.png" alt=""></li>
              <li v-if="item.prizeLevel === 4"><img src="@/common/imgs/act/sse/luckdraw/no-4.png" alt=""></li>
              <li v-if="item.prizeLevel === 5"><img src="@/common/imgs/act/sse/luckdraw/no-5.png" alt=""></li>
              <li v-if="item.prizeLevel === 6"><img src="@/common/imgs/act/sse/luckdraw/no-6.png" alt=""></li>
            </ol>
          </div>
          <div class="no-data" v-else>暂无奖品</div>
        </div>
        <div class="tip" v-if="dialogType === 3">
          <div class="tip-icon" v-if="tipType === 3"><img src="@/common/imgs/act/sse/luckdraw/no-point.png" alt=""></div>
          <div class="tip-icon" v-else><img src="@/common/imgs/act/sse/luckdraw/tip.png" alt=""></div>
          <p v-if="tipType === 1">本次抽奖将消耗您20积分哦！</p>
          <p v-if="tipType ===2">提交成功！<br/>奖品将于活动结束后7个工作日左右发出，<br/>请耐心等待~<br/></p>
          <p v-if="tipType === 3"> 啊哦~积分不足<br/> 您账户的积分不足20，<br/> 可参与每日签到赢积分哦！<br/> </p>
          <p v-if="tipType === 4"> 您还未登录，请登录后再操作哦！<br/> </p>
          <p v-if="tipType === 5"> 填写地址成功！<br/> </p>
          <van-button class="btn" v-if="tipType === 1" @click="onLuckDraw">好的</van-button>
          <van-button class="btn" v-if="tipType === 2 || tipType === 5" @click="isDialog = false">好的，我知道了</van-button>
          <van-button class="btn" v-if="tipType === 3" @click="onGetPoint">获取积分<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
          <van-button class="btn" v-if="tipType === 4" @click="doLogin">点击登录<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
        </div>
        <div class="prize" v-if="dialogType === 4">
          <div v-if="prizeType === 1"><img src="@/common/imgs/act/sse/luckdraw/prize1.jpg" alt=""></div>
          <div v-if="prizeType === 2"><img src="@/common/imgs/act/sse/luckdraw/prize2.jpg" alt=""></div>
          <div v-if="prizeType === 3"><img src="@/common/imgs/act/sse/luckdraw/prize3.jpg" alt=""></div>
          <div v-if="prizeType === 4"><img src="@/common/imgs/act/sse/luckdraw/prize4.jpg" alt=""></div>
          <div v-if="prizeType === 5"><img src="@/common/imgs/act/sse/luckdraw/prize5.jpg" alt=""></div>
          <div v-if="prizeType === 6"><img src="@/common/imgs/act/sse/luckdraw/prize6.jpg" alt=""></div>
          <div v-if="prizeType === 1 || prizeType === 2 || prizeType === 3" class="btm">
            <van-button class="btn" @click="openLocation">立即填写地址<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
          </div>
          <div v-if="prizeType === 4 || prizeType === 5 || prizeType === 6" class="btm btm2">
            <van-button class="btn" @click="seePrize">查看奖品<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
            <van-button class="btn" @click="oneMore">再来一次<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
          </div>
        </div>
        <div class="location" v-if="dialogType === 5">
          <p>请填写收货地址</p>
          <div class="form">
            <van-cell-group class="person"><van-field v-model="person" placeholder="请输入收货人" clearable/> </van-cell-group>
            <van-cell-group class="phone"> <van-field v-model="phone" placeholder="请输入手机号码" maxlength="11" clearable/></van-cell-group>
            <div class="area" @click="showAreaPopup = true">
              <van-cell-group :class="{'active': isAreaActive}"><van-field v-model="province" placeholder="省" readonly/></van-cell-group>
              <van-cell-group :class="{'active': isAreaActive}"><van-field v-model="city" placeholder="市" readonly/></van-cell-group>
              <van-cell-group :class="{'active': isAreaActive}"><van-field v-model="district" placeholder="区" readonly/></van-cell-group>
            </div>
            <van-cell-group class="address"> <van-field v-model="address" placeholder="请输入详细地址" type="textarea" rows="1" autosize clearable/> </van-cell-group>
            <p class="msg">*为保障正常收货，请如实填写收获信息哦！</p>
            <van-button class="btn" @click="onAdderss" :loading="btnLoading">立即提交<img src="@/common/imgs/act/sse/luckdraw/arrow.png" alt=""></van-button>
          </div>
        </div>
      </div>
    </a-dialog>
    <van-popup v-model="showAreaPopup" position="bottom" :overlay="showAreaPopup">
      <van-area :area-list="areaList" :columns-num="3" @cancel="showAreaPopup=false" @confirm="onAreaConfirm"/>
    </van-popup>
  </div>
</template>

// 注意ref无法用在vant弹窗
<script>
  import areaJson from '@/common/js/area.js'
  import {initData, luckyDraw, getPrizeList, addAddress} from '@/api/act/sse.js'
  import lottery from './lottery.vue'
  import aDialog from "@/components/a-dialog"
  import {Popup, Area} from 'vant'
  import AppNative from '@/common/js/native.js'
  import {isweixin, doLogReg, browser, getOldAppParams} from '@/common/js/utils.js' 
  import {checkPhone} from '@/common/js/validation.js'
  import share from "@/common/js/share"
  export default {
    name: 'luckdraw',
    data() {
      return {
        clickFlag: false,
        drawCount: 0,
        // resolve: null,
        lotterySquare: {
          prize: 5,
          prizesList:[
            require('@/common/imgs/act/sse/luckdraw/no1.png'),
            require('@/common/imgs/act/sse/luckdraw/no2.png'),
            require('@/common/imgs/act/sse/luckdraw/no3.png'),
            require('@/common/imgs/act/sse/luckdraw/no6.png'),
            require('@/common/imgs/act/sse/luckdraw/no5.png'),
            require('@/common/imgs/act/sse/luckdraw/no4.png'),
          ],
          lotteryBtn:{
            img : require('@/common/imgs/act/sse/luckdraw/lottery-btn.png')
          }
        },
        isDialog: false,
        dialogType: 2, // 1为规则 2为我的奖品 3为提示 4位中奖 5位填写地址
        tipType: 3,
        // tipText: '本次抽奖将消耗您20积分哦！',
        prizeType: 2,
        isIos: false,
        person: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        btnLoading: false,
        areaList: areaJson,
        isAreaActive: true, // 区域是否激活
        showAreaPopup: false,
        canCloseOverlay: true, // 是否点击Mask关闭弹窗
        prizeList: [],
        wxOption: {
          title: "限时抢！100元神券全场通用！",     // 标题
          desc: "100%中奖，王俊凯台历、棉花书籍、幼儿畅销绘本，奖品多多等你来抽哦~",  // 描述
          imgUrl: require('@/common/imgs/act/sse/luckdraw/share-icon.jpg'),
          link: `https://m.purcotton.com/wap/h5/2018/12/12/sse/index.html#/sse/luckdraw`,
        },
      }
    },
    created: function(){
      if(this.retype === 'm'){
        this._initData({resendUrl: location.href.split('#')[0]})
      }else if(this.retype === 'app'){
        this.isIos = browser.versions.ios
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        // this.token = '3447d4122b970baf42544a5c6b62f11b10f2d61cabcb7be10d2f1ab8dfdf74fd7013dbef8621ea54289cf3df6ce70deb'
        this._initData({token: this.token})
      }
    },
    methods: {
      beforeLottery(resolve,reject){
        // resolve()
        if(!this.clickFlag){
          this.dialogType = 3
          this.tipType = 1
          this.isDialog = true
          this.canCloseOverlay = true
          this.resolve = resolve
        }
      },
      onLuckDraw(){
        this.clickFlag = true
        this.isDialog = false
        luckyDraw({token: this.token}).then(res=>{
          if(res.data.success){
            let {canDrawCount} = res.data.data
            this.drawCount = canDrawCount
            let arr = [0,1,2,5,4,3]
            this.lotterySquare.prize = arr[res.data.data.prizeLevel - 1]
            this.prizeNo = res.data.data.prizeLevel
            this.prizeId = res.data.data.prizeId
            this.lotterySquare.lock = true
            this.resolve()
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.tipType = 4
              this.isDialog = true
            }else if(res.data.code == 'notEnoughIntegral'){
              this.dialogType = 3
              this.tipType = 3
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
            if(this.drawCount){
              this.lotterySquare.lock = false
            }
          }
        }).then(()=>{
          this.clickFlag = false
        })
      },
      afterLottery(){
        if(this.drawCount){
          this.lotterySquare.lock = false
        }
        this.dialogType = 4
        this.prizeType = this.prizeNo
        // this.canCloseOverlay = this.prizeNo < 4 ? false : true
        if(this.prizeNo < 4){
          this.canCloseOverlay = false
          this.person = ''
          this.phone = ''
          this.province = ''
          this.city = ''
          this.district = ''
          this.address = ''
          // document.getElementById('vanArea').reset()
          // this.$refs.vanArea.reset()
        }
        this.isDialog = true
      },
      goMainActPage(){
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com/wap/activity/2018/12/01/m_preheat.html'
        }else if(this.retype === 'app'){
          let link = 'https://app.purcotton.com/app/activity/2018/12/01/a_preheat.html'
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      },
      openGoods(id){
        if(this.retype === 'm'){
          location.href = `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${id}`
        }else if(this.retype === 'app'){
          let params = {'type': 1,'data': id}
          // type为1，2可以加title，但type为7不可以加，否则无法正确跳转
          // if(type === 1 || type === 2){
          //   params.title = ''
          // }
          AppNative.sendAction('mobile',params)
        }
      },
      _initData(params){
        initData(params).then(res=>{
          if(res.data.success){
            let {canDrawCount: drawCount, weixinConfig} = res.data.data
            this.drawCount = drawCount
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.tipType = 4
              this.isDialog = true
            }
            if(this.retype === 'm'){
              if(isweixin()){
                share(weixinConfig, this.wxOption, this)
              }else{
                this.$toast('请在微信内打开哦~')
              }
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      onRule(){
        this.dialogType = 1
        this.isDialog = true
      },
      onPrize(){
        getPrizeList({token: this.token}).then(res =>{
          if(res.data.success){
            this.prizeList = [...res.data.data]
            // console.log(this.prizeList)
            this.dialogType = 2
            this.isDialog = true
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 3
              this.tipType = 4
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
        })
      },
      openLocation(){
        this.canCloseOverlay = false
        this.dialogType = 5
        this.isDialog = true
      },
      seePrize(){
        this.canCloseOverlay = true
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com/mobile/mall/myCoupons/queryCoupones.ihtml'
        }else if(this.retype === 'app'){
          AppNative.openCouponList()
        }
      },
      onGetPoint(){
        if(this.retype === 'm'){
          location.href = 'https://m.purcotton.com/wap/activity/2018/12/01/m_preheat.html'
        }else if(this.retype === 'app'){
          AppNative.sendAction('mobile',{'type': 7,'data': 'https://app.purcotton.com/app/sign/a_ZOeP.html?v=201809291150'})
        }
      },
      oneMore(){
        this.canCloseOverlay = true
        this.isDialog = false
      },
      doLogin(){
        this.isDialog = false
        if(this.retype === 'm'){
          doLogReg(1)
        }else if(this.retype === 'app'){
          AppNative.openLogin()
        }
      },
      onAreaConfirm(list){
        if(list[0].code < 0){
          this.$toast(`请${list[0].name }`)
          return
        }
        if(list[1].code < 0){
          this.$toast(`请${list[1].name }`)
          return
        }
        if(list[2].code < 0){
          this.$toast(`请${list[2].name }`)
          return
        }
        this.province = list[0].name
        this.city = list[1].name
        this.district = list[2].name
        this.showAreaPopup = false
        // this.isAreaActive = false
      },
      onAdderss(){
        if(this.checkAddress()){
          this.btnLoading = true
          let params = {
            token: this.token,
            prizeId: this.prizeId,
            userName: this.person,
            mobile: this.phone,
            address: `${this.province == this.city ? this.city+this.district+this.address : this.province+this.city+this.district+this.address}`,
          }
          addAddress(params).then(res=>{
            if(res.data.success){
              this.dialogType = 3
              this.tipType = 5
              this.isDialog = true
              this.canCloseOverlay = true
            }else{
              this.$toast(res.data.msg)
            }
          }).then(()=>{
            this.btnLoading = false
          })
        }
      },
      onBtnShare(){
        let link = this.wxOption.link.replace('#','%23')
        AppNative.share(link, this.wxOption.title, this.wxOption.desc, this.wxOption.imgUrl)
      },
      checkAddress(){
        let isOk = true
        if(!this.person){
          this.$toast('请输入收货人')
          isOk = false
        }else if(!this.phone){
          this.$toast('请输入手机号码')
          isOk = false
        }else if(!checkPhone(this.phone)){
          this.$toast('请输入有效手机号码')
          isOk = false
        }else if(!this.province){
          this.$toast('请选择省市区')
          isOk = false
        }else if(!this.address){
          this.$toast('请输入详细地址')
          isOk = false
        }
        return isOk
      },
    },
    components:{
      lottery,
      aDialog,
      'van-popup': Popup,
      'van-area': Area,
    }
  }
</script>

<style lang="less" scoped>
  .luckdraw{
    width: 100%;
    // height: auto;
    height: 100%;
    min-height: 1206px;
    background-color: #f4d6a9;
    .panel{
      position: relative;
      .share-btn{
        position: absolute;
        top: 210px;
        right: 30px;
        width: 100px;
        height: 100px;
      }
      .lottery{
        position: absolute;
        top: 420px;
        left: 50%;
        transform: translateX(-50%);
        width: 620px;
        height: auto;
        // border-radius: 10px;
        // background-color: #f88879;
        // box-shadow: 2px 2px 5px #faaea4,inset 2px 2px 5px #faaea4;
        /deep/ ul{
          padding: 10px;
          li.row{
            >div{
              margin: 5px;
              // border-radius: 10px;
              // background-color: #63d9b0;
              background: url('../../../common/imgs/act/sse/luckdraw/prize-bg.png') no-repeat;
              background-size: contain;
              box-sizing: border-box;
              img{
                position: relative;
                z-index: 1000;
                margin: 0 auto;
                box-sizing: border-box;
              }
            }
            &:last-child{
              >div{
                margin: 0;
                border-radius: 0;
                background: none;
              }
            }
            .active{
              &:before{
                // background-color: rgba(255,237,181,0.8);
                background: url('../../../common/imgs/act/sse/luckdraw/prize-bg-active.png') no-repeat;
                background-size: contain;
              }
            }
          }
        }
        .count{
          position: absolute;
          z-index: 1000;
          left: 50%;
          bottom: 40px;
          color: #fff;
          font-size: 24px;
          transform: translateX(-50%);
          span{
            color: #fff25f;
          }
        }
      }
      .btm{
        position: absolute;
        bottom: 120px;
        width: 100%;
        text-align: center;
        display: flex;
        padding: 0 80px;
        box-sizing: border-box;
        justify-content: space-between;
        .btn{
          width: 46%;
        }
      }
    }
    .btn{
      padding: 0;
      height: 70px;
      line-break: 70px;
      font-size: 30px;
      color: #2ec39b;
      border-radius: 20px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.2),inset 5px 10px 16px rgba(200,243,232,.8),inset -5px -10px 16px rgba(200,243,232,.8);
      &:before{
        border-color: #3fb288;
        background-color: #3fb288;
      }
      /deep/ .van-loading{
        color: #1db7a0!important;
      }
      img{
        padding: 8px 0 0 10px;
        display: inline-block;
        width: 18px;
        height: 24px;
      }
    }
    .dialog{
      position: relative;
      padding: 30px 30px 60px;
      .hdj{
        position: fixed;
        top: -100px;
      }
      .rule{
        padding-top: 40px;
        .content{
          color: #fff;
          font-size: 28px;
          line-height: 46px;
          p{
            position: relative;
            padding-left: 40px;
            span{
              position: absolute;
              top: 8px;
              left: 0;
              font-size: 28px;
              color: #2eab89;
              background-color: #fff;
              width: 28px;
              height: 28px;
              line-height: 30px;
              text-align: center;
              border-radius: 100%;
            }
          }
        }
      }
      .prize-list{
        h3{
          text-align: center;
          color: #fff;
        }
        ul{
          display: flex;
          margin-top: 30px;
          padding: 30px 0;
          // background: linear-gradient(#5ed1a8,#98edd5);
          border-radius: 20px;
          box-shadow: 2px 2px 20px rgba(0,0,0,0.1), -2px -2px 20px rgba(0,0,0,.1),inset 0px -2px 20px rgba(255,255,255,1);
          li{
            flex: 1;
            color: #fff;
            font-size: 28px;
            padding-left: 20px;
          }
        }
        .list{
          max-height: 560px;
          margin-top: 30px;
          border: 1px solid #fff;
          border-radius: 20px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          ol{
            display: flex;
            align-items: stretch;
            height: 120px;
            li{
              flex: 1;
              padding: 30px 0 0 20px;
              border-right: 1px solid #fff;
              border-bottom: 1px solid #fff;
              box-sizing: border-box;
              align-self: stretch;
              color: #fff;
              font-size: 26px;
              line-height: 32px;
              &:last-child{
                padding: 0;
                border-right: none;
              }
            }
            &:last-child{
              li{
                border-bottom: none;
              }
            }
          }
        }
        .no-data{
          padding-top: 30px;
          text-align: center;
          font-size: 32px;
          color: #fff;
        }
      }
      .tip{
        padding-top: 40px;
        text-align: center;
        .tip-icon{
          padding: 0 150px;
        }
        p{
          padding: 30px 0;
          text-align: center;
          color: #fff;
          font-size: 30px;
          line-height: 38px;
        }
        .btn{
          width: 80%;
        }
      }
      .prize{
        padding-top: 40px;
        .btm{
          padding: 30px 0 0;
          display: flex;
          justify-content: center;
          .btn{
            width: 56%;
          }
          &.btm2{
            padding: 30px 30px 0;
            justify-content: space-between;
            .btn{
              width: 45%;
            }
          }
        }
      }
      .location{
        padding-top: 40px;
        text-align: center;
        p{
          color: #fff;
          font-size: 30px;
        }
        .form{
          // padding: 0 10px;
          .area{
            display: flex;
            justify-content: space-between;
            .van-cell-group{
              width: 32%;
              .van-field{
                padding: 20px 30px 20px 20px;
              }
            }
          }
          .van-cell-group{
            position: relative;
            margin: 30px 0 0 0;
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0 12px 30px rgba(0,0,0,0.2),inset 5px 10px 16px rgba(200,243,232,.8),inset -5px -10px 16px rgba(200,243,232,.8);
            &.active{
              &::before{
                content: ' ';
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                width: 17px;
                height: 15px;
                background: url('../../../common/imgs/act/sse/luckdraw/arrow-bottom.png') no-repeat;
                background-size: contain;
              }
            }
            .van-field{
              padding: 20px 26px;
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
                color: #2ecda4;
              }
              /deep/ textarea{
                font-size: 28px;
                // min-height: 30px!important;
                &::-webkit-input-placeholder{
                  color: #999;
                }
                &::-moz-placeholder{
                  color: #999;
                }
              }
            }
          }
          .msg{
            padding: 30px 0;
            font-size: 24px;
            color: #fff;
            letter-spacing: 2px;
          }
          .btn{
            width: 100%;
          }
        }
      }
    }
  }
</style>
