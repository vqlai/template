<template>
  <div class="download">
    <div><img src="@/common/imgs/act/ssy/code/pic1.jpg" alt=""></div>
    <div><img src="@/common/imgs/act/ssy/code/pic5.jpg" alt=""></div>
    <div class="panel">
      <div><img src="@/common/imgs/act/ssy/code/pic6.jpg" alt=""></div>
      <ul class="box">
        <li>您的专属邀请码：</li>
        <li><input type="text" v-model="code" readonly></li>
      </ul>
    </div>
    <div><img src="@/common/imgs/act/ssy/code/pic7.jpg" alt=""></div>
    <van-button block class="btn" @click="downloadApp">接受邀请，下载APP ></van-button>
  </div>
</template>

<script>
  export default {
    name: 'download',
    data() {
      return {
        code: this.$route.query.code || ''
      }
    },
    methods: {
      downloadApp() {
        location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.smile.purcotton'  
      }
    },
  }
</script>

<style lang="less" scoped>
  .download{
    width: 100%;
    height: auto;
    min-height: 1206px;
    background-color: #d0f4f0;
    .panel{
      position: relative;
      ul.box{
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        li:first-child{
          flex: 1.6;
          font-size: 34px;
          color: #222;
          text-align: right;
        }
        li:last-child{
          flex: 1;
          input{
            text-align: left;
            font-size: 32px;
            color: #222;
          }
        }
      }
    }
    .btn{
      background-color: #ff8f8f;
      color: #fff;
      border: 0;
      font-size: 30px;
      height: 88px;
      &:before{
        border-color: #fff;
        background-color: #fff;
      }
    }
  }
</style>
