<template>
  <div class="vue">
    <!-- import加载图片 -->
    <img v-lazy="img" alt="">
    <!-- 事件代理 -->
    <ul @click="listClick" style="display:flex; color: #fff;">
      <li v-for="(item,index) in 10" :key="index" :data-item="item" style="flex: 1">{{item}}</li>
    </ul>
    <van-button type="primary" @click="emit(234)" style="margin:30px auto 0;">testClick</van-button>
  </div>
</template>

<script>
  // state/getters在computed导入  mutations/actions在methods里导入 使用对象展开符导入
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import Vue from 'vue';
  export default {
    name: 'vue',
    data(){
      return {
        img: null
      }
    },
    created: function(){
      // 加载图片
      // this.img = require('@/assets/imgs/act/sse/luckdraw/no-1.png')
      import('@/assets/imgs/act/sse/luckdraw/no-1.png').then(res => {
        console.log(res)
        this.img = res
      })
      this.$on('pcClick',(params)=>{
        console.log(params)
      })
    },
    // render: h => h('<p>213123</p>') ,
    render(h){ 
      return h('<p>213123</p>') 
    },
    mounted(){
      this.$nextTick(()=>{
        // VUEX
        this.setPhone('17727989230')
        console.log(this.userPhone)
        this.$store.commit('SET_USER_NAME', 'cisco')
        console.log(this.$store.state.userName)
        console.log(this.userPhonenext)
        console.log(this.$store.getters.userNamenext)
        this.updateUser('vqlai')
        console.log(this.userName)
        this.$store.dispatch('updateUser2','ciscolai')
        console.log(this.$store.state.userName)
        this.$store.dispatch('updateUser2','vqlai')
        console.log(this.$store.state.userName)

        // 全局api和配置，调用Vue静态方法和属性
        Vue.nextTick(function () {
          // DOM 更新了
          console.log(Vue)
          console.log(new Vue())
          console.log(Vue.version)
          console.log(Vue.config)
          Vue.set(this.img)
        })

        // this是Vue实例，vm === this
        console.log(this)
        console.log(this.$data)
        console.log(this.$el)
      })
    },
    computed: {
      ...mapState([
        'userPhone',
        'userName',
      ]),
      ...mapGetters([
        'userPhonenext',
        'userNamenext',
      ])
    },
    methods: {
      // 在mapMutations，mapActions获取状态可以直接使用this获取即可，无需使用this.$store.state
      ...mapMutations({
        setPhone: 'SET_USER_PHONE',
        setName: 'SET_USER_NAME',
      }),
      ...mapActions([
        'updateUser',
      ]),
      // 事件代理
      listClick(e){
        console.log(e.target)
        console.log(e.target.dataset)
        console.log(e.target.dataset.item)
      },
      emit(params){
        this.$emit('pcClick',params)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
