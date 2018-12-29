<template>
  <div class="act-menu" v-if="data">
    <swiper :options="actMenuSwiperOption">
      <!-- 注意无法给swiper-slide绑定click事件 -->
      <swiper-slide v-for="(item,index) in data" :key="index">
        <div class="item" :class="{active: item.active}" @click="goMenuItem(item,index)">
          <svg class="icon" aria-hidden="true" v-if="item.active">
            <use xlink:href="#icon-fixed"></use>
          </svg>
          {{item.title}}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'act-menu',
    props:{
      data:{
        type: Array,
        required: true
      },
    },
    data() {
      return {
        actMenuSwiperOption: { slidesPerView: 'auto', spaceBetween: 14,freeMode:true},
      }
    },
    methods: {
      goMenuItem(obj,index) {
        for(let item of this.data){
          item.active = false
        }
        obj.active = true
        this.$emit('goMenuItem', index)
      }
    },
    components:{
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less" scoped>
  .act-menu{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    z-index: 1000;
    background-color: #fff;
    border-bottom: 1px solid #d1d5d8;
    // overflow: hidden;
    .swiper-slide{
      width: auto;
      margin: 0!important;
      .item{
        color: #000;
        font-size: 26px;
        padding: 0 40px;
        text-align: center;
        position: relative;
        &.active{
          color: #b63438;
        }
        .icon{
          color: #b63438;
          font-size: 30px;
          position: absolute;
          top:50%;
          left: 6px;
          transform: translateY(-54%);
        }
      }
    }
  }
</style>
