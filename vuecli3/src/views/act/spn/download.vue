<template>
  <div class="download">
    <div class="top">
      <img src="@/common/imgs/act/spn/download-bg.jpg" alt="">
    </div>
    <div class="center">
      <img src="@/common/imgs/act/spn/form-bg.jpg" alt="">
      <div class="panel">
        <ul class="coupon">
          <li><img src="@/common/imgs/act/spn/coupon5.png" alt=""></li>
          <li><img src="@/common/imgs/act/spn/coupon6.png" alt=""></li>
        </ul>
        <ul class="btn-box">
          <li><van-button block class="btn" @click="regAndGetWelfare" :loading="btnLoading">下载注册 即获99元礼包</van-button></li>
        </ul>
      </div>
    </div>
    <div class="btm">
      <!-- <h3 v-if="retype === 'm'" @click="onDownload">下载app获更多新人通用券福利 ></h3> -->
      <p>深圳前海全棉时代电子商务有限公司<br/>粤ICP备13084779号  </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'download'
  }
</script>

<style lang="less" scoped>
  .download{
    width: 100%;
    height: 100%;
    min-height: 1206px;
    // background: -webkit-linear-gradient(to right, #85e6dd , #9adae7);
    background-color: #fcdd7e;
    position: relative;
    .center{
      position: relative;
      .panel{
        position: absolute;
        width: 100%;
        height: auto;
        padding: 60px 100px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        overflow: hidden;
        ul.coupon{
          display: flex;
          justify-content: space-between;
          padding: 30px 0;
          li{
            width: 48%;
          }
        }
        ul.btn-box{
          padding: 80px 0;
          li{
            .btn{
              border: 0;
              color: #fff;
              font-size: 32px;
              height: 86px;
              line-height: 86px;
              border-radius: 40px;
              background-color: #f95b51;
              // 背景颜色设置为渐变色
              // background: linear-gradient(left,#aacbb7,#84ba99);
              // background: -webkit-linear-gradient(left, #aacbb7,#84ba99);
              // 设置按钮的内外阴影
              // box-shadow: -3px -3px 10px #65a27b inset, 20px 20px 50px #cce3d5; 
              /deep/ .van-loading{
                color: #fff!important;
              }
              &:before{
                background-color: #fff;
                border-color: #fff;
              }
            }
          }
        }
      }
    }
    .btm{
      text-align: center;
      background-color: #fcdd7e;
      p{
        padding: 0 0 30px;
        color: #b18d1d;
        font-size: 24px;
        line-height: 34px;
      }
    }
  }
</style>
