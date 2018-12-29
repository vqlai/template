<template>
  <transition name="fade">
    <div class="back-top" v-show="isShowTop" @click="goTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-backtop"></use>
      </svg>
      <div>顶部</div> 
    </div>
    </transition>
</template>

<script>
  export default {
    name: 'back-top',
    props:{
      isShowTop:{
        type: Boolean,
        default: false
      }
    },
    methods: {
      goTop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop  = 0
        // this.isShowTop = false
      }
    },
  }
</script>

<style lang="less" scoped>
  .back-top{
    position: fixed;
    bottom: 180px;
    right: 40px;
    z-index: 1000;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    border-radius: 100%;
    color: #999b9d;
    border: 1px solid #999b9d;
    background-color: rgba(255,255,255,.4);
    .icon{
      font-size: 30px;
      padding-bottom: 5px;
    }
  }
</style>
