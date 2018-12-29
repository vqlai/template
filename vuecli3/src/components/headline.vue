<template>
  <div class="headline">
    <div class="header">
      <span class="title">{{title}}</span>
      <span v-if="tip" class="tip">{{tip}}</span>
      <!-- <div class="more-btn" v-if="moreLink" @click="openLink(moreLink)">查看更多</div> -->
      <van-button class="more-btn" v-if="moreLink" @click="openLink(moreLink)">查看更多</van-button>
    </div>
    <ul class="tag" v-if="subheadList.length">
      <li v-for="(item,index) in subheadList" :key="index">
        <div class="tag-item" @click="openLink(item.categaryLink)">{{item.categaryName}}</div>
      </li>
    </ul>
    <div class="ad" v-if="adPath">
      <div @click="openLink(adLink)">
        <img v-lazy="filterImg(adPath)" alt=""> 
      </div>
    </div>
  </div>
</template>

<script>
  import AppNative from '@/assets/js/native.js'
  import {filterImgPath} from '@/assets/js/utils.js'
  export default {
    name: 'headline',
    props:{
      title:{
        type: String,
        required: true
      },
      tip:{
        type: String,
        default: ''
      },
      moreLink:{
        type: String,
        default: ''
      },
      subheadList:{
        type: Array,
        default: function () {
          return []
        }
      },
      adPath:{
        type: String,
        default: ''
      },
      adLink:{
        type: String,
        default: ''
      },
      clickType:{
        type: Number,
        default: 2
      }
    },
    data: function() {
      return {
      }
    },
    methods: {
      // 注意v-lazy无法使用vue过滤器，只能通过方法进行
      filterImg(value){
        return filterImgPath(value)
      },
      openLink(link) {
        if(link){
          if(this.retype === 'm'){
            // let url = `https://m.purcotton.com/mall/commodity/getCommodityDetail.ihtml?prodNo=${item.link}`
            location.href = link
          }else{
            if(this.clickType == 100){
              AppNative.openLiveList()
            }else{
              let params = {'type': this.clickType,'data': link}
              // type为1，2可以加title，但type为7不可以加，无法正确跳转
              if(this.clickType === 1 || this.clickType === 2){
                params.title = ''
              }
              AppNative.sendAction('mobile',params)
            }
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .headline{
    padding-bottom: 20px;
    >.header{
      padding: 10px 30px 10px;
      color: #333;
      position: relative;
      span.title{
        display: inline-block;
        font-size: 32px;
        line-height: 32px;
        text-indent: 18px;
        font-weight: bold;
        position: relative;
        &:before{
          content: ' ';
          width: 8px;
          height: 32px;
          position: absolute;
          top: -2px;
          left: 0;
          z-index: 1;
          background-color:#00ac97;
        }
      }
      span.tip{
        position: absolute;
        top: 18px;
        left: 200px;
        font-size: 20px;
        color: #999;
      }
      .more-btn{
        position: absolute;
        top: 4px;
        right: 20px;
        // display: inline-block;
        // width: 130px;  
        // height: 40px;
        // line-height: 30px;
        // padding: 10px 20px;
        text-align: center;
        font-size: 22px;
        line-height: 22px;
        color: #999;
        border-radius: 26px;
        border: 1px solid #999;
        box-sizing: border-box;
      }
    }
    ul.tag{
      display: flex;
      flex-wrap: wrap;
      padding: 10px 10px;
      li{
        width: 20%;
        margin: 10px 0;
        text-align: center;
        .tag-item{
          // display: block;
          color: #333;
          font-size: 24px;
          border-right: 1px solid #333;
        }
        // &:nth-child(5n) .tag-item{
        //   border: 0;
        // }
        &:last-child .tag-item{
          border: 0;
        }
      }
    }
    .ad{
      padding: 10px 30px;
      box-sizing: border-box;
      // a{
      //   display: block;
      // }
    }
  }
</style>
