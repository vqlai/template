<template>
  <div class="layout" :style="{backgroundColor: pageBg}">
    <!-- :key="routerKey"  -->
    <keep-alive  v-if="$route.meta.keepAlive">
      <!-- <transition name="fade"> -->
        <router-view />
      <!-- </transition> -->
    </keep-alive>
    <router-view v-else/>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data: function() {
      return {
        pageBg: 'transparent', // 默认背景透明 
      }
    },
    created: function(){
      this.pageBg = this.$route.meta.bg
    },
    watch: {
      '$route' (to, from) {
        this.pageBg = this.$route.meta.bg
      }
    },
    computed: {
      // routerKey() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      // }
    },
  }
</script>

<style scoped lang="less">
  .layout{
    // max-width: 750px;
    // min-width: 300px;
    width: 100%;
    height: 100%;
    min-height: 100%;
    // background: transparent;
  }
</style>