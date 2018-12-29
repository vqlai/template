<template>
  <div class="cpgoods" :class="{onwap: retype == 'm'}">
    <goods :goodsList="goodsList" :goodsType="1" :goodsBg="'#f8f8f8'" v-if="goodsList.length"></goods>
    <div v-else class="nodata">{{nodata}}</div>
    <van-loading color="black" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  import {getGoodsByCategory} from '@/assets/api/main/all.js'
  import goods from '@/components/goods.vue'
  // import {getHostPlatform} from '@/common/js/config.js'
  export default {
    name: 'cpgoods',
    data: function() {
      return {
        // retype: getHostPlatform(),
        goodsList: [],
        vanLoading: false,
        nodata: ''
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this._loadData()
      }
    },
    created: function(){
      this._loadData()
    },
    mounted: function(){
      this.$nextTick(()=>{
        // this.vanLoading = false
      })
    },
    destroyed() {},
    methods: {
      _loadData(){
        if(this.retype === 'm'){
          // let categoryId = this.$route.query.id;
          let categoryId = this.$route.params.id;
          if(categoryId){
            this._getGoodsByCategory({id:categoryId})
          }else{
            this.nodata = '暂无数据'
          }
        }else{
          // app
          // console.log(location.href)
          // console.log(location.pathname)
          // console.log(this.$route.params.id)
          // let arr = location.pathname.split('/') arr[2] 
          this._getGoodsByCategory({id: this.$route.params.id})
        }
      },
      _getGoodsByCategory(params) {
        this.vanLoading = true
        getGoodsByCategory(params).then(res=>{
          // console.log(res)
          if(res.status === 200){
            this.goodsList = res.data
          }else{
            this.$toast('获取服务器数据失败')
          }
          if(!this.goodsList.length){
            this.nodata = '暂无数据'
          }
          this.vanLoading = false
        })
      },
    },
    components:{
      goods
    }
  }
</script>

<style lang="less" scoped>
  .cpgoods{
    width: 100%;
    min-height: 100%;
    background: #f8f8f8;
    &.onwap{
      padding-bottom: 100px;
    }
  }
</style>
