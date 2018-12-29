<template>
  <div class="viptq" v-once>
    <div class="panel">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="tq-icon"><img src="@/common/imgs/htm/viptq-icon1.png" alt=""></div>
          <div class="content"><img src="@/common/imgs/htm/viptq-content1.png" alt=""></div>
          <div class="caption">
            <span>说明</span>
            <p>
              1.会员专享价仅以会员结算时默认使用。<br/>
              2.会员专享价可与其他促销优惠叠加使用。
            </p>
          </div>
        </swiper-slide> 
        <swiper-slide>
          <div class="tq-icon"><img src="@/common/imgs/htm/viptq-icon2.png" alt=""></div>
          <div class="content"><img src="@/common/imgs/htm/viptq-content2.png" alt=""></div>
          <div class="caption">
            <span>说明</span>
            <p>
              1.会员将默认享受专属客服服务。<br/>
              2.专属服务不断升级完善。
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="tq-icon"><img src="@/common/imgs/htm/viptq-icon3.png" alt=""></div>
          <div class="content"><img src="@/common/imgs/htm/viptq-content3.png" alt=""></div>
          <div class="caption">
            <span>说明</span>
            <p>
              1.注册之日起每一年为1个会员周期。<br/>
              2.满足升级条件次日开始，每1个会员周期结束时进行保级条件判断，满足则延续一年，否则降一级别。
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="tq-icon"><img src="@/common/imgs/htm/viptq-icon4.png" alt=""></div>
          <div class="content"><img src="@/common/imgs/htm/viptq-content4.png" alt=""></div>
          <div class="caption">
            <span>说明</span>
            <p>
              1.消费积分仅针对在全棉时代专卖店及管网、APP等的订单。
            </p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination tq-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'viptq',
    data() {
      return {
        // autoplay : { delay: 3000,disableOnInteraction: false }, 
        // swiperOption: {pagination: { el: '.swiper-pagination' },},
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          }
        },
        swiperList: [1,2,3,4]
      }
    },
    components:{
      swiper,
      swiperSlide,
    }
  }
</script>

<style lang="less" scoped>
  .viptq{
    width: 100%;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background: url('../../common/imgs/htm/viptq-bg.jpg') #fff no-repeat;
    background-size: 100%;
    .panel{
      min-height: 300px;
      width: 92%;
      margin: 150px auto 0;
      padding: 30px 0;
      background-color: #fff;
      border-radius: 20px;
      position: relative;
      box-sizing: border-box;
      .swiper-container{
        padding-top: 60px;
        .swiper-slide{
          .tq-icon{
            padding: 0 260px 30px;
          }
          .content{
            margin: 0 30px;
          }
        }
      }
      .caption{
        padding: 30px 46px;
        span{
          display: inline-block;
          padding: 10px 0;
          font-size: 28px;
          color: #999;
          position: relative;
          &:before{
            position: absolute;
            top: 20px;
            right: -40px;
            content: ' ';
            width: 30px;
            height: 1px;
            background-color: #eee;
          }
        }
        p{
          font-size: 25px;
          line-height: 42px;
          color: #555;
        }
      }
    }
  }
</style>
