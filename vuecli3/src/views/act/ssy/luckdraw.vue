<template>
  <div class="luckdraw">
    <div class="panel">
      <div class="bg"><img src="@/common/imgs/act/ssy/luckdraw/bg.png" alt=""></div>
      <lottery-square :beforeLottery="beforeLottery" :afterLottery="afterLottery" :lotteryBtn="lotterySquare.lotteryBtn" :prizesList="lotterySquare.prizesList" :prize="lotterySquare.prize">
        <p class="count">抽奖次数：{{drawCount}}次</p>
        <!-- <div class="mask"></div> -->
      </lottery-square>
      <ul class="btns">
        <li @click="onRule"><img src="@/common/imgs/act/ssy/luckdraw/rule-btn.png" alt=""></li>
        <li @click="onPrizeList"><img src="@/common/imgs/act/ssy/luckdraw/prize-btn.png" alt=""></li>
      </ul>
    </div>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="dialogType === 5 ? 4 : 3"
      :closeBtnBg="'#1db7a0'" :showHeader="false" :closeBtnColor="'#fff'" @closeDialog="isDialog=false" :dialogWidth="'84%'"
      :dialogBg="dialogType === 5 ? '#fff':'transparent'">
      <div class="dialog">
        <div class="rule" v-if="dialogType === 1">
          <div><img src="@/common/imgs/act/ssy/luckdraw/rule.png" alt=""></div>
          <div class="box">
            <div class="content">
              <p><span>1.</span>抽奖活动时间：2018.10.29-11.10；</p>
              <p><span>2.</span>预热期间新用户可以免费抽奖1次，老用户20积分可参与抽奖1次，每人每天最多可抽奖3次；</p>
              <p><span>3.</span>抽中奖品将会在活动结束后7个工作日内发出，优惠券和积分将会在24小时内到账；</p>			
              <p><span>4.</span>若抽中实物奖品未填写地址，可及时联系客服提供信息，确认后可发放，否则视为放弃次权益；</p>
              <p><span>5.</span>全棉时代在法律允许的范围内有权对此次活动进行解释。</p>	
            </div>					
            <van-button class="btn" @click="isDialog = false">我知道了</van-button>
          </div>
        </div>
        <div class="prize-list" v-if="dialogType === 2">
          <div><img src="@/common/imgs/act/ssy/luckdraw/prize-list.png" alt=""></div>
          <div class="box">
            <div class="header"><div class="l">奖品名称</div><div class="r">奖品内容</div></div>
            <ul class="content"  v-if="prizeList.length">
              <!-- <li><div class="l">奖品名称</div><div class="r">奖品内容</div></li> -->
              <li v-for="(item,index) in prizeList" :key="index"><div class="l">{{ item.prizeTypeName | prizeName }}</div><div class="r">{{item.prizeName}}</div></li>
            </ul>				
            <div v-else class="no-data">暂无数据</div>
            <van-button class="btn" @click="isDialog = false">我知道了</van-button>
          </div>
        </div>
        <div class="prize" v-if="dialogType === 3">
          <div><img src="@/common/imgs/act/ssy/luckdraw/prize.png" alt=""></div>
          <div class="box">
            <p class="title">哇，恭喜您抽中{{prizeCnType}}等奖！</p>
            <div class="pic1" v-if="prizeType === 1"><img src="@/common/imgs/act/ssy/luckdraw/prize1.png" alt=""></div>
            <div class="pic2" v-if="prizeType === 2"><img src="@/common/imgs/act/ssy/luckdraw/prize2.png" alt=""></div>
            <div class="pic3" v-if="prizeType === 3"><img src="@/common/imgs/act/ssy/luckdraw/prize3.png" alt=""></div>
            <div class="pic4" v-if="prizeType === 4"><img src="@/common/imgs/act/ssy/luckdraw/prize4.png" alt=""></div>
            <div class="pic5" v-if="prizeType === 5"><img src="@/common/imgs/act/ssy/luckdraw/prize5.png" alt=""></div>
            <div class="pic6" v-if="prizeType === 6"><img src="@/common/imgs/act/ssy/luckdraw/prize6.png" alt=""></div>
            <ul>
              <li>
                <van-button class="btn" @click="openGoods" v-if="prizeType === 1 || prizeType === 2 || prizeType === 4">查看商品</van-button>
                <van-button class="btn" @click="openAddress"  v-else-if="prizeType === 3">填写地址</van-button>
                <van-button class="btn" @click="openCoupon" v-else>立即查看</van-button>
              </li>
              <li><van-button class="btn" @click="isDialog = false">再来一次</van-button></li>
            </ul>
          </div>
        </div>
        <div class="address" v-if="dialogType === 4">
          <div><img src="@/common/imgs/act/ssy/luckdraw/address.png" alt=""></div>
          <div class="form">
            <van-cell-group class="person"><van-field v-model="person" placeholder="请输入收货人" clearable/> </van-cell-group>
            <van-cell-group class="phone"> <van-field v-model="phone" placeholder="请输入手机号码" maxlength="11" clearable/> </van-cell-group>
            <van-cell-group class="address"> <van-field v-model="address" placeholder="请输入收货地址" type="textarea" rows="1" autosize clearable/> </van-cell-group>
            <p class="tip-text">*为保障您正常收货，请如实填写收货信息哦~ </p>
            <van-button class="btn" @click="onAdderss" :loading="btnLoading">立即提交</van-button>
          </div>
        </div>
        <div class="tip" v-if="dialogType === 5">
          <div class="login" v-if="tipType === 1">
            <div class="top">
              <div class="pic"><img src="@/common/imgs/act/ssy/luckdraw/cartoon.png" alt=""></div>
              <!-- <p>亲爱的，您还未注册哟！</p>  -->
              <p>亲爱的，您还未登录哟！</p> 
            </div>
            <div class="btm">
              <p>新会员注册享免费抽奖1次！</p>
              <!-- <van-button class="btn" @click="isDialog = false">立即注册</van-button> -->
              <!-- <van-button class="btn" @click="openLogin">立即登录</van-button> -->
              <van-button class="btn" @click="isDialog = false">我知道了</van-button>
            </div>
          </div>
          <div class="point" v-if="tipType === 2">
            <div class="pic"><img src="@/common/imgs/act/ssy/luckdraw/point.png" alt=""></div>
            <p>本次抽奖将消耗您20积分哦！</p>
            <van-button class="btn" @click="onLuckDraw">知道了</van-button>
          </div>
          <div class="less" v-if="tipType === 3">
            <div class="top">
              <div class="pic"><img src="@/common/imgs/act/ssy/luckdraw/less.png" alt=""></div>
              <p>积分不足</p> 
            </div>
            <div class="btm">
              <p>您账户的积分不足20，<br/>可邀请好友下载全棉时代APP，<br/><span>最高可获得1000积分哦！</span></p>
              <van-button class="btn" @click="isDialog = false">立即邀请</van-button>
            </div>
          </div>
          <div class="text" v-if="tipType === 4">
            <div class="pic"><img src="@/common/imgs/act/ssy/luckdraw/cartoon.png" alt=""></div>
            <p>{{tipText}}</p>
          </div>
        </div>
      </div>
    </a-dialog>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import LotterySquare from '@/plugins/lottery-square/lottery.vue'
  import aDialog from "@/components/a-dialog"
  import {checkPhone} from '@/common/js/validation.js'
  import {initData,luckyDraw,getPrizeList,addAddress} from '@/api/act/ssy.js'
  import AppNative from '@/common/js/native.js'
  import {browser,getOldAppParams} from '@/common/js/utils.js' 
  import { Dialog } from 'vant'
  export default {
    name: 'luckdraw',
    data() {
      return {
        isDialog: false,
        dialogType: 5,
        prizeType: 2,
        tipType: 4,
        prizeCount: 1,
        drawCount: 0,
        person: '',
        phone: '',
        address: '',
        token: '',
        prizeId: '',
        prizeNo: 0,
        prizeList: null,
        vanLoading: false,
        btnLoading: false,
        clickFlag: false,
        tipText: '123',
        lotterySquare: {
          prize: 1,
          prizesList:[
            require('@/common/imgs/act/ssy/luckdraw/no1.png'),
            require('@/common/imgs/act/ssy/luckdraw/no5.png'),
            require('@/common/imgs/act/ssy/luckdraw/no3.png'),
            require('@/common/imgs/act/ssy/luckdraw/no6.png'),
            require('@/common/imgs/act/ssy/luckdraw/no4.png'),
            require('@/common/imgs/act/ssy/luckdraw/no6.png'),
            require('@/common/imgs/act/ssy/luckdraw/no5.png'),
            require('@/common/imgs/act/ssy/luckdraw/no2.png'),
          ],
          lotteryBtn:{
            img : require('@/common/imgs/act/ssy/luckdraw/lottery-btn.png')
          }
        },
      }
    },
    computed: {
      prizeCnType: function(){
        return this.prizeType === 1 ? '一' : this.prizeType === 2 ? '二' : this.prizeType === 3 ? '三' : 
              this.prizeType === 4 ? '四' : this.prizeType === 5 ? '五' : '六'
      }
    },
    filters: {
      prizeName: function(value){
        return value === 1 ? '实物' : value === 2 ? '优惠券' : value === 3  ? '抵用券' : '积分'
      }
    },
    created: function(){
      // if(this.retype === 'app'){
      //   let obj = getOldAppParams()
      //   this.token = obj.token || this.$route.query.token
      //   this.uuid = obj.uuid || this.$route.query.uuid
      // }
      let obj = getOldAppParams()
      this.token = obj.token || this.$route.query.token
      this._initData({token: this.token})
    },
    methods: {
      beforeLottery(resolve,reject){
        if(!this.clickFlag){
          this.dialogType = 5
          this.tipType = 2
          this.isDialog = true
          this.resolve = resolve
        }
        // if(!this.clickFlag){
        //   Dialog.alert({
        //     message: '本次抽奖将消耗您20积分哦！'
        //   }).then(() => {
        //     this.clickFlag = true
        //     luckyDraw({token: 'ebb9df20c1bf6c145d287c292bf12512de34bc70ab9781ec4e04de89bc90ebdc7013dbef8621ea54289cf3df6ce70deb'}).then(res=>{
        //       if(res.data.success){
        //         this.drawCount = res.data.data.canDrawCount
        //         let arr = [0,7,2,4,1,5]
        //         this.lotterySquare.prize = arr[res.data.data.prizeLevel-1]
        //         this.prizeNo = res.data.data.prizeLevel
        //         this.prizeId = res.data.data.prizeId
        //         this.lotterySquare.lock = true
        //         resolve()
        //       }else{
        //         if(res.data.code == 'notLogin'){
        //           this.dialogType = 5
        //           this.tipType = 1
        //           this.isDialog = true
        //         }else if(res.data.code == 'notEnoughIntegral'){
        //           this.dialogType = 5
        //           this.tipType = 3
        //           this.isDialog = true
        //         }else{
        //           this.$toast(res.data.msg)
        //         }
        //         if(this.drawCount){
        //           this.lotterySquare.lock = false
        //         }
        //       }
        //     }).then(()=>{
        //       setTimeout(()=>{
        //         this.clickFlag = false
        //       }, 5000)
        //     })
        //   })
        // }
      },
      onLuckDraw(){
        this.clickFlag = true
        this.isDialog = false
        // if(!this.clickFlag){
          // Dialog.alert({
          //   message: '本次抽奖将消耗您20积分哦！'
          // }).then(() => {
            // this.clickFlag = true
            luckyDraw({token: this.token}).then(res=>{
              if(res.data.success){
                this.drawCount = res.data.data.canDrawCount
                let arr = [0,7,2,4,1,5]
                this.lotterySquare.prize = arr[res.data.data.prizeLevel-1]
                this.prizeNo = res.data.data.prizeLevel
                this.prizeId = res.data.data.prizeId
                this.lotterySquare.lock = true
                this.resolve()
              }else{
                if(res.data.code == 'notLogin'){
                  this.dialogType = 5
                  this.tipType = 1
                  this.isDialog = true
                }else if(res.data.code == 'notEnoughIntegral'){
                  this.dialogType = 5
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
              // setTimeout(()=>{
              //   this.clickFlag = false
              // }, 8000)
            })
          // })
        // }
      },
      afterLottery(){
        if(this.drawCount){
          this.lotterySquare.lock = false
        }
        this.dialogType = 3
        this.prizeType = this.prizeNo
        this.isDialog = true
      },
      openGoods(){
        let goodsId = this.prizeType === 1 ? '800-007525' : this.prizeType === 2 ? '802-003680' : '800-001127'
        AppNative.sendAction("mobile",{type: 1,data: goodsId})
      },
      openAddress(){
        this.person = ''
        this.phone = ''
        this.address = ''
        this.dialogType = 4
        this.isDialog = true
      },
      // 测试看是否可用
      openCoupon(){
        AppNative.openCouponList()
      },
      openLogin(){
        AppNative.openLogin()
      },
      onRule(){
        this.dialogType = 1
        this.isDialog = true
      },
      onPrizeList(){
        getPrizeList({token: this.token}).then(res=>{
          // console.log(res)
          if(res.data.success){
            this.prizeList = res.data.data
            this.dialogType = 2
            this.isDialog = true
          }else{
            if(res.data.code == 'notLogin'){
              this.dialogType = 5
              this.tipType = 1
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }
        })
      },
      onAdderss(){
        if(this.checkAddress()){
          this.btnLoading = true
          let params = {
            token: this.token,
            prizeId: this.prizeId,
            userName: this.person,
            mobile: this.phone,
            address: this.address,
          }
          addAddress(params).then(res=>{
            if(res.data.success){
              // console.log(res)
              this.dialogType = 5
              this.tipType = 4
              this.tipText = res.data.msg
              this.isDialog = true
            }else{
              this.$toast(res.data.msg)
            }
          }).then(()=>{
            this.btnLoading = false
          })
        }
      },
      _initData(params){
        initData(params).then(res=>{
          // console.log(res)
          if(res.data.success){
            this.drawCount = res.data.data.canDrawCount
            if(res.data.code == 'notLogin'){
              this.dialogType = 5
              this.tipType = 1
              this.isDialog = true
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
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
        }else if(!this.address){
          this.$toast('请输入详细地址')
          isOk = false
        }
        return isOk
      },
    },
    components:{
      LotterySquare,
      aDialog,
      Dialog
    }
  }
</script>

<style lang="less" scoped>
  .luckdraw{
    width: 100%;
    // height: auto;
    height: 100%;
    min-height: 1206px;
    background-color: #39b5a0;
    .panel{
      position: relative;
      padding: 60px 10px;
      background-color: #39b5a0;
      .lottery{
        position: absolute;
        top: 380px;
        left: 50%;
        transform: translateX(-50%);
        width: 670px;
        height: 700px;
        border-radius: 10px;
        background-color: #f88879;
        box-shadow: 2px 2px 5px #faaea4,inset 2px 2px 5px #faaea4;
        /deep/ ul{
          padding: 10px;
          .row{
            .active{
              &:before{
                background-color: rgba(255,237,181,0.5);
              }
            }
          }
        }
      }
      .count{
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      ul.btns{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 76px;
        width: 660px;
        display: flex;
        justify-content: center;
        li{
          padding: 0 30px;
        }
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      .rule{
        .box{
          position: absolute;
          top: 180px;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 10;
          .content{
            max-height: 400px;
            max-width: 96%;
            overflow-y: scroll;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #ec4948;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #fabeb6;
            }
            p{
              padding: 0 20px 0 60px;
              text-align: left;
              color: #3b3b3b;
              font-size: 28px;
              line-height: 46px;
              letter-spacing: 2px;
              box-sizing: border-box;
              position: relative;
              span{
                position: absolute;
                top: 0;
                left: 30px;
              }
            }
          }
          .btn{
            margin-top: 50px;
          }
        }
      }
      .prize-list{
        .box{
          position: absolute;
          top: 150px;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 10;
          .header{
            display: flex;
            padding: 30px 0;
            margin: 0 60px 0 60px;
            border-bottom: 1px solid #737373;
            align-items: center;
            font-size: 30px;
            color: #3b3b3b;
            .l{
              width: 180px;
            }
            .r{
              flex: 1;
            }
          }
          ul.content{
            height: 362px;
            max-height: 362px;
            max-width: 96%;
            overflow-y: scroll;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #ec4948;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #fabeb6;
            }
            li{
              display: flex;
              padding: 30px 0;
              margin: 0 30px 0 60px;
              border-bottom: 1px solid #737373;
              align-items: center;
              font-size: 30px;
              color: #3b3b3b;
              .l{
                width: 180px;
              }
              .r{
                flex: 1;
              }
            }
          }
          .no-data{
            padding: 150px 0;
            font-size: 30px;
            color: #3b3b3b;
          }
          .btn{
            margin-top: 34px;
          }
        }
      }
      .prize{
        .box{
          position: absolute;
          top: 200px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          .title{
            font-size: 36px;
            color: #fff;
            padding-bottom: 60px;
          }
          .pic1,.pic4{
            padding: 0 160px;
          }
          .pic2{
            padding: 0 180px;
          }
          .pic3{
            padding: 0 210px;
          }
          .pic5,.pic6{
            padding: 0 140px;
          }
          ul{
            display: flex;
            padding-top: 40px;
            li{
              flex: 1;
              text-align: center;
              &:last-child{
                .btn{
                  background-color: #f93b3b;
                }
              }
            }
          }
        }
      }
      .address{
        .form{
          position: absolute;
          top: 140px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          .van-cell-group{
            position: relative;
            margin: 36px 40px 0 80px;
            border-radius: 40px;
            border: 1px solid #dddddd;
            background-color: #f8f8f8;
            &.person{
              &:before{
                position: absolute;
                content: ' ';
                top: 10px;
                left: -50px;
                width: 32px;
                height: 33px;
                background: url('../../../common/imgs/act/ssy/luckdraw/person.png') no-repeat;
                background-size: contain;
              }
            }
            &.phone{
              &:before{
                position: absolute;
                content: ' ';
                top: 10px;
                left: -46px;
                width: 24px;
                height: 34px;
                background: url('../../../common/imgs/act/ssy/luckdraw/phone.png') no-repeat;
                background-size: contain;
              }
            }
            &.address{
              &:before{
                position: absolute;
                content: ' ';
                top: 10px;
                left: -46px;
                width: 27px;
                height: 33px;
                background: url('../../../common/imgs/act/ssy/luckdraw/location.png') no-repeat;
                background-size: contain;
              }
            }
            .van-field{
              padding: 16px 26px;
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
                color: #1db7a0;
              }
              /deep/ textarea{
                font-size: 28px;
                &::-webkit-input-placeholder{
                  color: #999;
                }
                &::-moz-placeholder{
                  color: #999;
                }
              }
            }
          }
        }
        .tip-text{
          padding: 40px 0 60px;
          font-size: 24px;
          color: #fff;
          letter-spacing: 2px;
        }
        .btn{
          background-color: #fff;
          color: #39b5a0;
        }
      }
      .tip{
        background-color: #fff;
        .login{
          position: relative;
          .top{
            background-color: #f6f6f6;
            padding: 160px 0 30px;
            p{
              font-size: 30px;
              color: #424343;
            }
            .pic{
              position: fixed;
              top: -150px;
              padding: 0 220px;
            }
          }
          .btm{
            padding: 30px 0;
            p{
              font-size: 30px;
              color: #d40800;
              letter-spacing: 3px;
              padding: 0 0 30px;
            }
          }
        }
        .point{
          padding: 120px 0 30px;
          .pic{
            position: fixed;
            top: -120px;
            padding: 0 150px;
          }
          p{
            padding: 10px 0 30px;
            font-size: 30px;
            color: #424343;
          }
        }
        .less{
          position: relative;
          .top{
            background-color: #f6f6f6;
            padding: 220px 0 30px;
            p{
              font-size: 30px;
              color: #424343;
            }
            .pic{
              position: fixed;
              top: -60px;
              padding: 0 160px;
            }
          }
          .btm{
            padding: 30px 0;
            p{
              padding: 0 0 30px;
              font-size: 28px;
              line-height: 38px;
              color: #424343;
              span{
                color: #d40800;
              }
            }
          }
        }
        .text{
          padding: 160px 0 60px;
          .pic{
            position: fixed;
            top: -150px;
            padding: 0 220px;
          }
          p{
            padding: 30px 0 0;
            font-size: 30px;
            color: #424343;
          }
        }
      }
      .btn{
        width: 240px;
        height: 68px;
        font-size: 32px;
        letter-spacing: 2px;
        color: #fff;
        border: 0;
        border-radius: 40px;
        background-color: #1db7a0;
        &:before{
          border-color: #fff;
          background-color: #fff;
        }
        /deep/ .van-loading{
          color: #1db7a0!important;
        }
      }
    }
  }
</style>
<!--<style>
  .van-dialog .van-dialog__message{
    padding: 100px 0 40px;
    font-size: 30px;
    color: #424343;
  }
</style>-->


