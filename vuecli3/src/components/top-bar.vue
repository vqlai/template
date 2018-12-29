<template>
  <van-nav-bar :title="title" :left-text="leftText" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
    <van-icon name="search" slot="right" v-if="rightType === 1"/>
    <van-icon name="share" slot="right" v-if="rightType === 2"/>
  </van-nav-bar>
</template>

<script>
  import { Icon, NavBar } from 'vant'
  export default {
    name: 'top-bar',
    props:{
      title: {
        type: String,
        default: ''
      },
      leftText: {
        type: String,
        default: ''
      },
      rightType:{
        type: Number,
        default: 0
      }
    },
    methods: {
      onClickLeft() {
        this.$emit('topBarLeftClick')
      },
      onClickRight() {
        // this.$toast('按钮');
        this.$emit('topBarRightClick',this.rightType)
      }
    },
    components:{
      'van-icon': Icon,
      'van-nav-bar': NavBar
    }
  }
</script>

<style lang="less" scoped>
  .van-nav-bar{
   
    width: 100%;
    height: 80px;
    line-height: 80px;
    /deep/ .van-nav-bar__left{
      left: 0;
      padding: 0 30px 0 10px;
      bottom: unset;
      .van-icon{
        color: #333;
        font-size: 36px;
      }
    }
    /deep/ .van-nav-bar__right{
      right: 0;
      padding: 0 20px 0 10px;
      // font-size: 32px;
      .van-icon{
        color: #333;
        font-size: 36px;
      }
    }
    /deep/ .van-nav-bar__title{
      font-size: 36px;
    }
  }
</style>
