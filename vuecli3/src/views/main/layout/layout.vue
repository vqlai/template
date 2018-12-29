<template>
 <!-- :style="{paddingTop: isMenu ? 120+'px': 0 }" -->
  <div class="layout" :class="{onwap: isMenu && isDownload}">
    <!-- :key="routerKey"  -->
    <div class="download" v-if="isDownload" :class="{absolu: isAbsolute}" @click="onDownload">
      <svg class="icon icon-close" aria-hidden="true" @click.stop="isDownload=false">
        <use xlink:href="#icon-close"></use>
      </svg>
      <div class="download-bg"><img :src="'https://res.purcotton.com/base/images/webHint.jpg' | filterImg" alt=""></div>
      <!-- <div class="content" @click="onRegister">
        <div class="logo"><img src="@/common/imgs/main/cotton.png" alt=""></div>
        <p>注册全棉时代会员<br/>新人50元现金礼免费领</p>
      </div>
      <a class="download-btn" href="//a.app.qq.com/o/simple.jsp?pkgname=com.smile.purcotton">立即下载</a> -->
    </div>
    <!-- <transition name="fade"> -->
    <!-- <router-view /> -->
    <search-box v-if="canSearch"></search-box>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive  v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <router-view v-else/>
    <!-- </transition> -->
    <!-- <ul class="nav" v-if="isMenu">
      <li v-for="(item,index) in nav" :key="index">
        <a :href="item.link" :class="{active:item.isActive}">  -->
          <!-- [item.css,{active: item.isActive}] -->
          <!-- <svg class="icon" :class="item.css" aria-hidden="true">
            <use :xlink:href="'#'+item.css"></use>
          </svg>
          <p>{{item.title}}</p>
        </a>
      </li>
    </ul> -->
    <van-tabbar v-model="navActive" v-show="isMenu" class="nav">
      <van-tabbar-item v-for="(item,index) in nav" :key="index" :url="item.link">
        <svg class="icon" :class="item.css" aria-hidden="true">
          <use :xlink:href="'#'+item.css"></use>
        </svg>
        <div class="title">{{item.title}}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant'
  import {doLogReg,downloadApp,filterImgPath} from '@/assets/js/utils.js'
  import SearchBox from '@/components/search-box.vue'
  export default {
    name: 'layout',
    data: function() {
      return {
        // nav:[
        //   {link:'/home',title: '首页',css:'icon-home'},
        //   {link:'/coupon',title: '分类',css:'icon-type'},
        //   {link:'/login',title: '发现',css:'icon-discover'},
        //   {link:'/cpgoods',title: '购物车',css:'icon-shopcar'},
        //   {link:'/topic',title: '我的',css:'icon-user'},
        // ],
        nav:[
          {link:'/',title: '首页',css:'icon-home',isActive: true},
          {link:`${location.origin}/mall/main/getTopCatForApp.ihtml?oprtCatNo=001`,title: '分类',css:'icon-type',isActive: false},
          {link:`${location.origin}/wap/activity/2017/10/13/index.html`,title: '发现',css:'icon-discover',isActive: false},
          {link:`${location.origin}/mall/cart/viewMayCart.ihtml`,title: '购物车',css:'icon-shopcar',isActive: false},
          {link:`${location.origin}/mobile/mall/memberInfo/memberMsg.ihtml`,title: '我的',css:'icon-user',isActive: false},
        ],
        navActive: 0,
        isMenu: false, // 根据router控制菜单的显示隐藏
        isDownload: false, // 应该做成vuex的状态
        isAbsolute: false,
        canSearch: false
      }
    },
    filters:{
      filterImg(value){
        return filterImgPath(value) 
      }
    },
    created: function(){
      this.handleMenuDownload()
    },
    mounted: function(){
      this.$nextTick(()=>{
      })
    },
    watch:{
      // this.$route和to都能获取到当前路由信息对象
      '$route' (to, from) {
        this.handleMenuDownload()
      }
    },
    computed: {
      // routerKey() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      // }
    },
    methods:{
      handleMenuDownload(){
        if(this.retype === 'm'){
          this.isMenu = this.$route.meta.menu ? true : false
          this.isDownload = this.$route.meta.download ? true : false
          this.canSearch = this.$route.meta.canSearch ? true : false
          // 设置download的定位方式
          if(this.$route.meta.downloadType){
            this.isAbsolute = true
          }
        }else{
          this.isMenu = false
          this.isDownload = false
        }
      },
      onDownload(){
        downloadApp()
      },
      onRegister(){
        doLogReg('',2)
      }
    },
    components:{
      'van-tabbar': Tabbar,
      'van-tabbar-item': TabbarItem,
      SearchBox
    }
  }
</script>

<style scoped lang="less">
  .layout{
    // max-width: 750px;
    // min-width: 300px;
    width: 100%;
    padding: 0;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    &.onwap{
      // padding-top: 117.1875px;
      padding-top: 100px;
    }
    .download{
      width: 100%;
      // height: 100px;
      // padding: 10px 0 10px 76px;
      position: fixed;
      left:0;
      top:0;
      transform: translateZ(0); // 解决ios fixed定位，当页面发生跳转，再退回时，fixed区域消失
      z-index:1200;
      box-sizing: border-box;
      // overflow: hidden;
      // background: url('https://res.purcotton.com/base/images/webHint.jpg?v=1532999567000') #00ac96 no-repeat center;
      // background-size: 100%;
      &.absolu{
        position: absolute;
      }
      .icon-close{
        position: absolute;
        top: 50%;
        left: -10px;
        color: #fff;
        font-size: 56px;
        padding: 20px;
        transform: translateY(-50%);
      }
      .download-bg{
        // img{
        //   height: 100px;
        // }
      }
      // .content{
      //   width: 100%;
      //   box-sizing: border-box;
      //   display: flex;
      //   align-items: center;
      //   .logo{
      //     width: 80px;
      //   }
      //   p{
      //     flex: 1;
      //     padding-left: 20px;
      //     font-size: 28px;
      //     line-height: 32px;
      //     color: #fff;
      //   }
      // }
      // a.download-btn{
      //   position: absolute;
      //   top: 50%;
      //   right: 40px;
      //   z-index: 100;
      //   transform: translateY(-50%);
      //   background: #fff;
      //   color: #03ad88;
      //   font-size: 30px;
      //   padding: 16px 20px;
      //   border-radius: 10px;
      // }
    }
    // .nav{
    //   position: fixed;
    //   left: 0;
    //   bottom: 0;
    //   z-index: 1300;
    //   transform: translateZ(0); // 解决ios fixed定位，当页面发生跳转，再退回时，fixed区域消失
    //   backface-visibility: hidden;
    //   background: #fff;
    //   width: 100%;
    //   height: 100px;
    //   display: flex;
    //   border-top: 1px solid #d1d5d8;
    //   box-sizing: border-box;
    //   li{
    //     flex: 1;
    //     text-align: center;
    //     a{
    //       display: block;
    //       padding: 10px 0;
    //       box-sizing: border-box;
    //       height: 100%;
    //       color: #232323;
    //       &.active,&.router-link-active{
    //         color: #03ad88;
    //       }
    //       .icon{
    //         font-size: 40px;
    //       }
    //       p{
    //         font-size: 22px;
    //         font-weight: 500;
    //         padding-top: 4px;
    //       }
    //     }
    //   }
    // }
    .nav{
      height: 100px;
      color: #232323;
      text-align: center;
      border-top: 1px solid #d1d5d8;
      box-sizing: border-box;
      .van-tabbar-item--active{
        color: #03ad88;
      }
      .icon{
        font-size: 40px;
      }
      .title{
        padding-top: 2px;
        font-size: 22px;
        font-weight: 500;
      }
    }
  }
</style>