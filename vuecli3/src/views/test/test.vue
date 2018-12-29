<template>
  <div class="test">
    <van-button type="default" @click="openGoodsDetail">openGoodsDetail</van-button>
    <van-button type="default" @click="openGoodsList">openGoodsList</van-button>
    <van-button type="default" @click="share">share</van-button>
    <van-button type="primary" @click="openLogin">openLogin</van-button>
    <van-button type="primary" @click="openRegister">openRegister</van-button>
    <van-button type="primary" @click="openOrderList">openOrderList</van-button>
    <van-button type="primary" @click="openWeb">openWeb</van-button>
    <van-button type="primary" @click="openCouponList">openCouponList</van-button>
    <van-button type="primary" @click="openScoreList">openScoreList</van-button>
    <van-button type="primary" @click="openShopCart">openShopCart</van-button>
    <van-button type="primary" @click="openAppStore">openAppStore</van-button>
    <van-button type="primary" @click="openLiveList">openLiveList</van-button>
    <van-button type="primary" @click="selectAddress">selectAddress</van-button>
    <van-button type="primary" @click="openNotificationSettings">openNotificationSettings</van-button>
    <van-button type="primary" @click="registerLogin">registerLogin</van-button>
    <van-button type="primary" @click="emit(234)">testClick</van-button>
    <van-button type="primary" @click="doTest1">doTest1</van-button>
    
    <p style="max-width:100px;"><span class="wobble animated infinite" style="display:block;text-align:center;">test</span></p>
    <ul class="swiper">
      <li>社区<br/>动态</li>
      <li>
        <swiper :options="swiperOption" ref="bannerSwiper">
            <swiper-slide>
              <div class="content">
                <div class="pic2"><img src="https://res.purcotton.com/images/memberPic/2018/1/13/1515853174814.jpg" alt=""></div>
                <div class="info">
                  <h4>木白巾</h4>
                  <p>#我的秘密花园#补种的小棉花</p>
                </div>
              </div>
            </swiper-slide> 
          </swiper>
      </li>
    </ul>
    <lottery-circle 
      @lotteryClick = "lotteryClick"
      @lotteryDone = "lotteryDone"
      :lottery-start = "0"
      :lottery-prizenum = "8"
      :lottery-prizeno = "1"
      :lottery-bg = "'https://venler.github.io/demo/vue-lottery/dist/turnplate-bg.png'"
      :content-bg = "'https://venler.github.io/demo/vue-lottery/dist/turntable.png'"
      :pointer-bg = "'https://venler.github.io/demo/vue-lottery/dist/pointer.png'"
      :lottery-width = "lotteryCircle.width">
    </lottery-circle>
    <lottery-square :beforeLottery="beforeLottery" :afterLottery="afterLottery" :lotteryBtn="lotterySquare.lotteryBtn" :prizesList="lotterySquare.prizesList" :prize="lotterySquare.prize"></lottery-square>
    <!-- <a-dialog :isShowDialog="true" :dialogType="1" :showCloseBtn="1" :showHeader="true" :headerBg="'red'">
      <div>123</div>
    </a-dialog> -->
    <!-- <a-dialog :isShowDialog="true" :dialogType="2" :dialogBg="'transparent'" :dialogWidth="'100%'" :dialogHeight="'100%'" :showCloseBtn="3" :showHeader="false">
      <ul class="dialog-tip">
        <li>
          <p>快邀请好友<span class="red">一起参与818千万会员盛典吧！</span> <br/>邀请<span class="green">最高可获清空购物车机会！</span></p>
        </li>
        <li><img src="@/assets/imgs/act/base/share_arrow.png" alt=""></li>
      </ul>
    </a-dialog> -->
    <!-- <a-dialog :isShowDialog="true" :dialogType="3" :showCloseBtn="3" :showHeader="false" :headerBg="'red'">
    </a-dialog> -->
    <tipDialog :openTipDialog="openTipDialog" @closeTipDialog="closeTipDialog"></tipDialog>
  </div>
</template>

<script>
  import {Button} from 'vant'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import AppNative from '@/assets/js/native.js'
  // state/getters在computed导入  mutations/actions在methods里导入 使用对象展开符导入
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import LotteryCircle from '@/plugins/lottery-circle/lottery.vue'
  import LotterySquare from '@/plugins/lottery-square/lottery.vue'
  import aDialog from "@/components/a-dialog.vue";
  import tipDialog from "@/components/tip-dialog.vue";
  import {browser} from '@/assets/js/utils.js';
  import isApp from '@/assets/js/app.js'
  export default {
    name: 'test',
    data() {
      return {
        swiperOption: { autoplay : { delay: 3000 },direction : 'vertical', pagination: { el: '.swiper-pagination' } },
        lotteryCircle: {
          width:['85%','35%']
        },
        lotterySquare: {
          prize: 4,
          prizesList:[
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize4.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize2.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize1.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize3.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize5.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize6.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize7.png",
            "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-prize8.png",
          ],
          lotteryBtn:{
            img : "https://raw.githubusercontent.com/jlianphoto/iver/master/src/img/lottery/icon-lottery-btn.png"
          }
        },
        openTipDialog: true
      }
    },
    created: function(){
      this.$on('testClick',(params)=>{
        console.log(params)
      })
      console.log(this.$children)
    },
    mounted(){
      this.$nextTick(()=>{
        // this.$toast('测试')
        // this.bannerSwiper.slideTo(3, 1000, false)
        // native测试
        // 经测试调用native无需引人mui
        // console.log(mui)
        console.log(AppNative)
        // vuex测试
        this.setPhone('13631620310')
        console.log(this.$store.state.userPhone)
        this.updateUser('123')
        console.log(this.userPhone)
        console.log(this.userPhonenext)
        this.$store.commit('SET_USER_NAME','cisco')
        console.log(this.$store.state.userName)
        this.$store.dispatch('updateUser2','vqlai')
        console.log(this.$store.state.userName)
        import('@/assets/imgs/act/ssy/share-icon.jpg').then(res=>{
          console.log(res)
        })
        console.log(require('@/assets/imgs/act/ssy/share-icon.jpg'))
        let app = isApp()
        if(app){
          console.log(app)
          purcottonApp.callback = function(name,data){
            if(name == "getShareAction"){
              // do somrthing
              console.log(data)
              alert(data)
            }
          }
        }
      })
    },
    computed:{
      // 在mapState，mapGetters获取状态可以直接使用this获取即可，无需使用this.$store.state
      ...mapState([
        'userPhone',
        'userName'
      ]),
      ...mapGetters([
        'userPhonenext',
        'userNamenext'
      ]),
    },
    methods: {
      // 在mapMutations，mapActions获取状态可以直接使用this获取即可，无需使用this.$store.state
      ...mapMutations({
        setPhone:'SET_USER_PHONE',
        setName: 'SET_USER_NAME'
      }),
      ...mapActions([
        'updateUser'
      ]),
      test(){
        console.log(123)
      },
      emit(params){
        this.$emit('testClick',params)
      },
      test1(){
        return new Promise(resolve=>{
          setTimeout(()=>{
            console.log('test1')
            resolve(1)
          },1000)
        })
      },
      async doTest1(){
        let a = await this.test1()
        console.log(a)
      },
      
      lotteryClick(){},
      lotteryDone(){},
      beforeLottery(resolve,reject){
        /*
        * send ajax to get result and pass to child component
        **/ 
        // get result : this.prize
        setTimeout(()=>{
          this.prize = 1;
          resolve();
        },10)

      },
      afterLottery(){
        console.log("draw"+ this.lotterySquare.prize)
      },
      openGoodsDetail(){
        AppNative.openGoodsDetail('800-002751-01')
      },
      openGoodsList(){
        AppNative.openGoodsList('2')
      },
      share() {
        let url = 'https://m.purcotton.com/wap/h5/2018/11/11/index.html%23/ssy/share'
        let title = '618大促狂欢！'
        let desc = '邀请5位新朋友注册即可获得50元券一张 可与大促5折商品叠加哦~'
        // 注意区分es6的import和assetsjs的require的加载方式，一个是异步一个是同步
        // let img = require('@/assets/imgs/act/ssy/share-icon.jpg')
        // AppNative.share(url,title,desc,img)
        import('@/assets/imgs/act/ssy/share-icon.jpg').then(res=>{ AppNative.share(url, title, desc, res) })
        
      },
      openNotificationSettings(){
        AppNative.openNotificationSettings()
      },
      openLogin() {
        AppNative.openLogin()
      },
      openRegister(){
        AppNative.openRegister()
      },
      openOrderList(){
        AppNative.openOrderList()
      },
      openWeb(){
        AppNative.openWeb('https://m.purcotton.com/wap/h5/2018/06/11/index.html#/activity/soe/share','test',true)
      },
      openCouponList(){
        AppNative.openCouponList()
      },
      openScoreList(){
        AppNative.openScoreList()
      },
      openShopCart(){
        AppNative.openShopCart()
      },
      openAppStore(){
        AppNative.openAppStore()
      },
      openLiveList(){
        AppNative.openLiveList()
      },
      registerLogin(){
        let app = isApp()
        if(app){
          // 注册方法给app调用回传数据
          purcottonApp.callback = function(name,data){
            if(name == "registerLogin"){
              // do somrthing
              console.log(data)
              alert(data)
            }
          }
          // 调用app方法，传递数据给app
          app('registerLogin', {"token":"209203990312931231","username":"loooooooook"})
        }else{
          this.$toast('当前不支持登录注册')
        }
      },
      selectAddress(){
        let params = {name:"张三",phone:"130xxxxxxxx",province:"广东省",city:"深圳市",area:"龙华新区",detail:"布龙路稳健工业园"}
        AppNative.selectAddress(params)
      },
      closeTipDialog(){
        this.openTipDialog = false
      }
    },
    components:{
      'van-button': Button,
      swiper,
      swiperSlide,
      LotteryCircle,
      LotterySquare,
      aDialog,
      tipDialog
    }
  }
</script>

<style lang="less" scoped>
  .test{
    p.test{
      color: red;
    }
    .pic{
      padding: 20px 40px;
    }
    .swiper{
      height: 100px;
      padding: 20px 0;
      background: #fff;
      display: flex;
      justify-content: center;
      // align-items: center;
      li:first-child{
        width: 16%;
        line-height: 50px;
        text-align: center;
        color: #00ac97;
        border-right: 1px solid #00ac97;
      }
      li:last-child{
        flex: 1;
        overflow: hidden;
        .content{
          display: flex;
          height: 100%;
          // align-items: center;
          padding-left: 20px;
          .pic2{
            width: 100px;
            border-radius: 100%;
            overflow: hidden;
          }
          .info{
            padding-left: 20px;
            h4{
              font-size: 38px;
              font-weight: 600;
            }
            p{
              font-size: 30px;
              line-height: 50px;
              color: #8f8f94;
            }
          }
        }
      }
    }
    ul.dialog-tip{
      display: flex;
      justify-content: space-between;
      padding: 30px 10px;
      li:first-child{
        flex: 1;
        color: #fff;
        font-size: 26px;
        line-height: 46px;
        letter-spacing: 6px;
        padding-top: 20px;
        .red{
          color: #f63d50;
        }
        .green{
          color: #42b3a2;
        }
      }
      li:last-child{
        width: 10%;
      }
    }
  }
  
</style>
