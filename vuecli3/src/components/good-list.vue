<template>
  <!-- 子组件内使用了v-model导致子组件会修改props属性值，vue是单向绑定，所以会报错，通过watch解决 -->
  <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
    loading-text="正在加载中...">
    <van-cell v-for="item in list" :key="item">
      <div class="good" @click="onGood">
        <div><img src="https://res.purcotton.com/images/commodity/002002009/80000000/002000000778/F98509BC45477C9FBD38EC98D8BD1D02.jpg_357x357.jpg" alt=""></div>
        <p class="price line-hidden">¥ 258.4</p>
        <div class="title"><p class="two-line-hidden">婴幼儿针织夹棉抱被婴幼儿针织夹棉抱被婴幼儿针织夹棉抱被</p></div>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
  import { List, Cell } from 'vant'
  export default {
    name: 'good-list',
    props:{
      list:{
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: false
      },
      finished: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // list: [],
        // loading: this.loading2,
        // finished: this.finished2
      }
    },
    watch: {
      // loading: function(newVal){
      //   // this.loading = newVal
      //   this.$emit('update:loading2', newVal)
      // },
      // finished: function(newVal){
      //   this.$emit('update:finished2', newVal)
      // }
    },
    methods: {
      onLoad() {
        this.$emit('goodListLoad')
      },
      onGood(){
        location.href = 'https://m.purcotton.com'
      }
    },
    components:{
      'van-list': List,
      'van-cell': Cell
    }
  }
</script>

<style lang="less" scoped>
  .van-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 30px;
    .van-cell{
      width: 48%;
      padding: 20px 0;
      min-height: 200px;
      &::after{
        content: ' ';
        border: 0;
      }
      .good{
        text-align: center;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .price{
          color: #ff7878;
          font-size: 30px;
          padding: 10px;
        }
        .title{
          padding: 10px;
          p{
            font-size: 26px;
            line-height: 32px;
            height: 60px;
          } 
        }
      }
    }
    /deep/ .van-list__loading{
      width: 100%;
      background: transparent;
    }
  }
</style>
