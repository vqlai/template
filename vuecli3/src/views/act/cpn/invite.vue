<template>
  <div class="invite">
    <div><img src="@/assets/imgs/act/cpn/invite-01.jpg" alt=""></div>
    <div style="position:relative;">
      <img src="@/assets/imgs/act/cpn/invite-02.jpg" alt="">
      <p class="invite-num">您已成功邀请<span> 5 </span>人</p>
    </div>
    <div style="position:relative;">
      <img src="@/assets/imgs/act/cpn/invite-03.jpg" alt="">
      <ul class="btns">
        <li><van-button block class="btn" @click="onShare">立即邀请</van-button></li>
        <li><van-button block class="btn" @click="onPrize">查看我的奖品</van-button></li>
      </ul>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'invite',
    data(){
      return {

      }
    },
    created: function () {
      
    },
    mounted: function () {
      
    },
    destroyed: function () {
      
    },
    methods:{
      onShare(){},
      onPrize(){},
    }
  }
</script>

<style lang="less" scoped>
.invite{
  width: 100%;
  height: 100%;
  min-height: 1206px;
  // background: -webkit-linear-gradient(to right, #85e6dd , #9adae7);
  background-color: #fff2dc;
  position: relative;
  .invite-num{
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  ul.btns{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 60px;
    box-sizing: border-box;
    li{
      flex: 1;
      margin: 0 15px;
      .btn{
        height: 80px;
        font-size: 30px;
        color: #fff;
        border-radius: 40px;
        border: 0;
        // background-color: #15b588;
        background: -webkit-linear-gradient(to top, #41d2a3 , #15b588);
        &:before{
          background-color: #fff;
          border-color: #fff;
        }
      }
    }
  }
}
</style>
