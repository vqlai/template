<template>
  <div class="goods">
    <ul class="pd" :style="{background:goodsBg}">
      <li v-for="(item,index) in goodsList" :key="index"> 
        <div @click="openLink(item.prodUrl,1)" class="pd-item" :class="'pd-item'+goodsType">
          <div class="pic"><img v-lazy="filterImg(item.imgUrl)" alt=""></div>
          <div class="content" v-if="goodsType===1" :class="'content'+goodsType">
            <p class="price">
              <i>¥</i>
              <span v-if="item.activityPrice">
                <span v-html="item.activityPrice"></span>
                <del v-html="item.origPrice" v-if="item.origPrice"></del>
              </span>
              <span v-else>
                <span v-html="item.origPrice"></span>
              </span>
            </p>
            <!-- two-line-height -->
            <p class="title line-hidden" v-html="item.title"></p>
          </div>
          <div class="content" :class="'content'+goodsType" v-if="goodsType===2 || goodsType===3">
            <p class="title line-hidden" v-html="item.title"></p>
            <p class="price">
              <i>¥</i>
              <span v-if="item.activityPrice">{{item.activityPrice}}</span>
              <span v-else>{{item.origPrice}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import AppNative from '@/assets/js/native.js'
  import {browser,filterImgPath} from '@/assets/js/utils.js'
  export default {
    name:'goods',
    props:{
      // 1，2为一行两列，价格标题展示不同，3为一行三列
      goodsType: {
        type: Number,
        default: 1
      },
      goodsList:{
        type: Array,
        required: true
      },
      goodsBg:{
        type: String,
        default: '#fff'
      }
    },
    data: function() {
      return {
      }
    },
    filters:{
    },
    computed: {
    },
    // 过滤器
    // filters: {
    //   filterLink(value){
    //     return `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${value}`
    //   }
    // },
    methods: {
      // 注意v-lazy无法使用vue过滤器，只能通过方法进行
      filterImg(value){
        return filterImgPath(value) 
      },
      openLink(link,type) {
        if(this.retype === 'm'){
          location.href = link
        }else{
          // 安卓终端把#转%23
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          let params = {'type': type,'data': link}
          // type为1，2可以加title，但type为7不可以加，无法正确跳转
          if(type==1||type==2){
            params.title = ''
          }
          AppNative.sendAction('mobile',params)
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .goods{
    ul.pd{
      padding: 14px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li{
        padding: 14px;
        .pd-item{
          display: inline-block;
          // padding: 30px;
          background: #fff;
          border-radius: 10px;
          box-sizing: border-box;
          &.pd-item1{
            width: 333px;
          }
          &.pd-item2{
            width: 333px;
          }
          &.pd-item3{
            width: 212.66px;
          }
          &.pd-item4{
            width: 152.5px;
          }
          .content{
            padding: 0 10px 16px;
            &.content1{
              text-align: center;
              .price{
                padding: 10px 0;
              }
            }
            &.content2,&.content3{
              text-align: left;
              .title{
                padding-top: 10px;
              }
            }
            .price{
              padding-top: 10px;
              font-size: 28px;
              color: #ff4a37;
              i{
                font-style: normal;
              }
              del{
                display: inline-block;
                padding-left: 10px;
                color: #999;
                font-size: 20px; 
              }
            }
            .title{
              font-size: 26px;
              line-height: 36px;
              color: #333;
              // padding: 0 10px;
              // box-sizing: content-box;
              // min-height: 36px;
              // max-height: 72px;
            }
          }
        }
      }
    }
  }
  
</style>