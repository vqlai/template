<template>
  <div class="venue topBar">
    <div class="top-bar-panel">
      <top-bar :title="topBarTitle" @topBarLeftClick="topBarLeftClick" @topBarRightClick="topBarRightClick"></top-bar>
    </div>
    <div>
      <!-- @change="onChange" -->
      <van-tabs v-if="tabList.length > 1" v-model="tabActive" :line-width="0">
        <van-tab v-for="(item,index) in tabList" :key="index">
          <div slot="title" @click="onTabClick(item)">
            {{item.tabName}}
          </div>
        </van-tab>
      </van-tabs>
      <!-- @touchmove.stop="listTouchMove"  @touchstart.stop="listTouchStart" -->
      <!-- prevent不能加prevent 会影响内部元素的事件，如click -->
      <div @touchmove="listTouchEnd" ref="vanList">
        <van-list
          v-model="loading" 
          :loading="loading"
          :finished="finished"
          @load="onLoad"
          :loading-text="loadingText"
          finished-text="没有更多数据了~"
          :offset="10"
          :immediate-check="false"
          :class="{off: tabList.length < 2}">
          <!-- v-if="item.skuStatus === 1" -->
          <van-cell v-for="(item,index) in goodList" :key="index">
            <div class="good">
              <div class="on" @click.stop.prevent="onGood(item.prodUrl)">
                <!-- <div><img v-lazy="filterImg('https://res.purcotton.com/images/commodity/002002009/80000000/002000000778/F98509BC45477C9FBD38EC98D8BD1D02.jpg_357x357.jpg')" alt=""></div> -->
                <div><img v-lazy="item.prodImgUrl" alt=""></div>
                <!-- prodName -->
                <div class="title"><p class="two-line-hidden">{{item.prodTitle}}</p></div>
                <p class="price line-hidden"><span>¥ {{item.prodActPrice.toFixed(2)}}</span> <del>¥ {{item.prodPrice.toFixed(2)}}</del> </p>
                <svg class="icon" aria-hidden="true" @click.stop.prevent="onShopCar(item.prodNo)" v-if="item.skuStatus === 1">
                  <use xlink:href="#icon-shopcar"></use>
                </svg>
              </div>
              <div class="off" v-if="item.skuStatus === 0"><img src="@/assets/imgs/act/ngh/off.png" alt=""></div>
            </div>
          </van-cell>
          <p v-if="goodList.length === 0" class="no-data2">{{noData}}</p>
        </van-list>
      </div>
    </div>
    <backTop :isShowTop="isShowTop"></backTop>
    <van-loading color="#31d0b5" type="spinner" size="40px" v-if="vanLoading"/>
    <a-dialog :isShowDialog="isDialog" :dialogType="1" :showCloseBtn="3"
      :closeBtnBg="'#fff'" :showHeader="false" :closeBtnColor="'#7a7a7a'" :dialogWidth="'84%'" @closeDialog="isDialog=false">
      <div class="dialog">
        <div class="msg" v-if="dialogType === 1">
          <p>抱歉，员工内购会活动已经结束！<br/>若您购物车依然有未支付的商品，<br/>将会恢复原价！</p>
          <van-button block class="btn" @click="onExit">退出</van-button>
        </div>
        <div class="wx" v-if="dialogType === 2">
          <p>抱歉，请在微信内参与活动哦~</p>
        </div>
      </div>
    </a-dialog>
  </div>
</template>

<script>
  import { List, Cell, Tab, Tabs } from 'vant'
  import TopBar from '@/components/top-bar.vue'
  import {filterImgPath} from '@/assets/js/utils.js'
  import backTop from '@/components/back-top.vue'
  import {isweixin} from '@/assets/js/utils.js' 
  import aDialog from "@/components/a-dialog.vue"
  import {getVenueData,loginOut,addShopCar} from '@/assets/api/act/ngh.js'
  export default {
    name: 'venue',
    data() {
      return {
        topBarTitle: '',
        goodList: [],
        tabList: [],
        tabActive: 0,
        loading: false,
        finished: false,
        vanLoading: false,
        isShowTop: false,
        isDialog: false,
        dialogType: 1, // 1为结束 2为微信打开提示
        venueData: null,
        venueId: '',
        tabId: '',
        currentPage: 1,
        pageSize: 10,
        totalPage: 1,
        hasNextPage: false,
        noData:'',
        cacheList: [],
        loadingText:'加载中~',
        touchMoveCount: false,
        shopCarFlag: false,
      }
    },
    created: function(){
      this.topBarTitle = this.$route.query.title
      this.venueId = this.$route.query.venueId
      this.tabId = this.$route.query.tabId
      // 通过tabClick来防止vant列表自动触发onload事件
      this.tabClick = true 
      this.loadingText = ' '
      // document.title = this.$route.query.title
      this._getVenueData({venueId: this.venueId, tabId: this.tabId, page: this.currentPage, size: this.pageSize})
    },
    mounted: function(){
      this.$nextTick(()=>{
        if(!isweixin() && this.retype === 'm'){
          this.dialogType = 2
          this.isDialog = true
        }else{
          // 绑定滚动事件
          // 存在的问题，在mounted里通过document添加的事件，每次进入页面都会累加一个事件
          document.addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    watch:{
      $route(to,from){
        // 通过watch路由的变化来加载列表数据
        // console.log(to.path)
        // debugger
        this.goodList = []
        this.finished = false
        this.loading = false
        this.currentPage = 1
        this.tabId = this.$route.query.tabId
        this._getVenueData({venueId: this.venueId, tabId: this.tabId, page: this.currentPage, size: this.pageSize})
      }
    },
    methods: {
      // listTouchStart(){
      // },
      // 列表底部自动切换到下个tab列表
      listTouchEnd(){
        if(this.goodList.length < 5){ return; }
        let top = document.documentElement.scrollTop || document.body.scrollTop
        if((top > this.$refs.vanList.attributes[0].ownerElement.offsetHeight-window.innerHeight) && this.finished){
          if(this.touchMoveCount){
            this.tabClick = true
            this.loadingText = ' '
            let i = this.tabList.findIndex((item,index)=>{
              return item.tabId == this.$route.query.tabId
            })
            if(i < this.tabList.length-1){
              this.tabId = this.tabList[++i].tabId
              this.$router.replace({ path: '/ngh/venue', query: { title: this.topBarTitle, venueId: this.venueId, tabId: this.tabId }})
            }
            this.touchMoveCount = false
          }else{
            this.touchMoveCount = true
          }
        }
      },
      // 返回按钮
      topBarLeftClick() {
        history.go(-1)
        // this.$toast('返回')
      },
      topBarRightClick(type){
        this.$toast(type)
      },
      filterImg(value){
        return filterImgPath(value) 
      },
      // onChange(index, title) {
      //   console.log(index)
      // },
      onTabClick(item){
        this.tabClick = true
        this.loadingText = ' '
        // document.getElementById('vanList').scrollTop = 0
        // console.log(item)
        // this.goodList = []
        // this.currentPage = 1
        this.tabId = item.tabId
        // this.finished = false
        // this.loading = false
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        // this.$route.query.tabId = this.tabId
        // console.log(location)
        // 不能使用keep-alive，因为获取不到query参数
        // 通过watch路由的变化来加载列表数据
        this.$router.replace({ path: '/ngh/venue', query: { title: this.topBarTitle, venueId: this.venueId, tabId: this.tabId }})
        // this._getVenueData({venueId: this.venueId,tabId: this.tabId, page: this.currentPage,size: this.pageSize})
        // this.onLoad()
      },
      onExit(){
        loginOut().then(()=>{
          location.href = 'https://m.purcotton.com/mobile/mall/memberLogin/NGHcheckLogin.ihtml'
          // window.close() // 微信内置浏览器无法使用
          // typeof WeixinJSBridge === 'undefined' ? window.close() : WeixinJSBridge.call('closeWindow') 
        })
      },
      // 返回顶部按钮
      onScroll(){
        let scrollSize = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollSize >= window.innerHeight / 2) {
          this.isShowTop = true
        }else{
          this.isShowTop = false
        }
      },
      onLoad(){
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.goodList.push(this.goodList.length + 1);
        //   }
        //   this.loading = false;
        //   if (this.goodList.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 500);
        // tabClick 用来防止vant列表自动触发onload事件
        if(this.tabClick){ return }
        this.currentPage += 1
        // debugger
        this._getVenueData({venueId: this.venueId, tabId: this.tabId, page: this.currentPage, size: this.pageSize})
      },
      onShopCar(id){
        if(!this.shopCarFlag){
          this.shopCarFlag = true
          addShopCar({prodNo: id, num: 1}).then(res=>{
            if(res.data == 'success'){
              this.$toast({message: '成功加入购物车~', duration: 1000})
            }else{
              this.$toast({message: res.data, duration: 1000})
            }
          }).then(()=>{
            this.shopCarFlag =  false
          })
        }
      },
      _getVenueData(params){
        this.vanLoading = true
        getVenueData(params).then(res=>{
          // console.log(res)
          // this.venueData = []
          if(res.data.success){
            this.venueData = res.data.data
            // this.goodList.concat(res.data.data.list)
            if(JSON.stringify(res.data.data) == "{}"){
              this.noData = '暂无数据'
              this.loading = false
              this.finished = false
              this.vanLoading = false
              return
            }
            // Array.prototype.push.apply(this.goodList, res.data.data.list)
            this.goodList = [...this.goodList, ...res.data.data.list]
            this.tabList = res.data.data.tabs
            // for(let i=0; i<this.tabList.length; i++){
            //   if(this.tabList[i].tabId == this.tabId){
            //     this.tabActive = i
            //   }
            // }
            this.tabList.forEach((val, index)=>{
              if(val.tabId === this.tabId){
                this.tabActive = index
                // this.cacheList[index] = this.cacheList[index] ? [...this.cacheList[index], ...res.data.data.list] : [...res.data.data.list]
              }
            })
            // console.log(this.cacheList)
            // this.currentPage = ++res.data.data.currentPage
            // this.pageSize = res.data.data.size
            this.hasNextPage = res.data.data.hasNextPage
            this.totalPage = res.data.data.totalPage
            if(!res.data.data.hasNextPage) { this.finished = true }
            // this.finished =  res.data.data.hasNextPage ? false : true
            this.noData = ''
            if(this.goodList.length === 0){
              this.noData = '暂无数据'
            }
            if(res.data.data.currentTime > res.data.data.endTime){
              this.dialogType = 1
              this.isDialog = true
            }
          }
        }).then(res=>{
          this.loading = false
          this.vanLoading = false
          this.tabClick = false
          this.loadingText = '加载中~'
        })
      },
      onGood(url){
        location.href = url
      }
    },
    destroyed: function () {
      // 解决mounted添加的事件被累加
      document.removeEventListener('scroll', this.onScroll, false)
    },
    components:{
      TopBar,
      'van-list': List,
      'van-cell': Cell,
      'van-tab': Tab,
      'van-tabs': Tabs,
      backTop,
      aDialog,
    }
  }
</script>

<style lang="less" scoped>
  .venue{
    width: 100%;
    height: auto;
    // min-height: 1206px;
    background-color: #eee;
    &.topBar{
      padding-top: 80px;
    }
    .top-bar-panel{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
    }
    .van-tabs{
      // padding-top: 80px;
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding-top: 80px;
      height: auto;
      // box-sizing: border-box;
      background-color: #222;
      /deep/ .van-tabs__wrap{
        height: 100%;
        height: 80px;
        // margin-top: 1px;
        background-color: #fff;
        // border-top: 1px solid #eee;
        // border-bottom: 1px solid #eee;
        overflow: auto;
        // &:after{
        //   border: 0;
        // }
        .van-tabs__nav--line{
          padding-bottom: 0;
        }
        .van-tabs__line{
          background-color:#34b09b;
        }
        .van-tab{
          font-size: 28px;
          height: 80px;
          line-height: 80px;
          color: #333;
          flex-basis: 32%!important;
          box-sizing: border-box;
          // &:active{
          //   background-color: rgb(255, 255, 255);
          // }
          &.van-tab--active{
            color: #34b09b;
            // border-bottom: 1px solid #34b09b;
            position: relative;
            &:after{
              content: ' ';
              position: absolute;
              bottom: 1px;
              left: 0;
              height: 1px;
              width: 100%;
              background-color: #34b09b;
            }
          }
        }
      }
    }
    .van-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 90px 30px 20px;
      // min-height: 1000px;
      &.off{
        padding-top: 20px;
      }
      .van-cell{
        width: 48%;
        padding: 20px 0;
        min-height: 200px;
        position: relative;
        &::after{
          content: ' ';
          border: 0;
        }
        .good{
          position: relative;
          .on{
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .title{
              padding: 20px;
              p{
                font-size: 28px;
                line-height: 32px;
                height: 60px;
                color: #555;
              } 
            }
            .price{
              padding: 0 20px 20px;
              text-align: left;
              span{
                font-size: 32px;
                line-height: 36px;
                color: #f64c4c;
              }
              del{
                color: #a4a4a4;
                font-size: 22px;
                margin-left: 10px;
              }
            }
            .icon{
              position: absolute;
              right: 20px;
              bottom: 20px;
              z-index: 10;
              font-size: 36px;
              // color: #34b09b;
              color: #21b69d;
              padding: 0 10px;
            }
            /deep/ .van-loading {
              position: absolute;
              left: unset;
              top: unset;
              transform: translate(0,0);
              right: 30px;
              bottom: 20px;
              z-index: 10;
            }
          }
          .off{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            // background-color: blue;
            border-radius: 10px;
            overflow: hidden;
            // background: url('../../../assets/imgs/act/ngh/off.png') no-repeat;
            // background-size: contain;
            img{
              padding: 104px 80px;
              background-color: rgba(0, 0, 0,.3);
              box-sizing: border-box;
            }
          }
        }
      }
      /deep/ .van-list__loading{
        width: 100%;
        background: transparent;
        .van-list__loading-text{
          font-size: 28px;
        }
      }
      /deep/ .van-list__finished-text{
        width: 100%;
        font-size: 28px;
        // padding-top: 30px;
      }
      // .no-data{
      //   width: 100%;
      //   text-align: center;
      //   padding: 20px 0;
      //   color: #999;
      //   font-size: 28px;
      // }
      .no-data2{
        width: 100%;
        text-align: center;
        padding-top: 66%;
        color: #999;
        font-size: 28px;
      }
    }
    .dialog{
      position: relative;
      text-align: center;
      .msg,.wx{
        p{
          font-size: 30px;
          line-height: 46px;
          color: #222;
          text-align: center;
          padding: 90px 0 60px;
        }
      }
      .wx{
        p{
          padding: 60px 0;
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
      }
    }
  }
</style>
