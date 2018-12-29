<template>
  <div class="notpage">
    <div class="pic"><img src="@/assets/imgs/main/404.gif" alt=""></div>
    <div class="content">哎哟，您找的东西不在这，到别处看看吧！</div>
    <div class="btn">
      <!-- <router-link tag="a" to="/home">返回首页</router-link> -->
      <a href="https://m.purcotton.com">返回首页</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notpage'
  }
</script>

<style lang="less" scoped>
  .notpage{
    text-align: center;
    padding: 260px 200px;
    .content{
      font-size: 30px;
      line-height: 42px;
      padding: 40px 0;
    }
    .btn{
      a{
        color: #019e97;
      }
    }
  }
</style>
