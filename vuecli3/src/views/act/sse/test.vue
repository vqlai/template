<template>
  <div>
    <lottery :beforeLottery="beforeLottery" :afterLottery="afterLottery" :lotteryBtn="lotterySquare.lotteryBtn" :prizesList="lotterySquare.prizesList" :prize="lotterySquare.prize">
      <!-- <p class="count">抽奖次数：{{drawCount}}次</p> -->
    </lottery>
  </div>
</template>

<script>
  import lottery from './lottery.vue'
  export default {
    data() {
      return {
        lotterySquare: {
          prize: 5,
          prizesList:[
            require('@/common/imgs/act/ssy/orderdraw/no1.png'),
            require('@/common/imgs/act/ssy/orderdraw/no2.png'),
            require('@/common/imgs/act/ssy/orderdraw/no3.png'),
            require('@/common/imgs/act/ssy/orderdraw/no4.png'),
            require('@/common/imgs/act/ssy/orderdraw/no5.png'),
            require('@/common/imgs/act/ssy/orderdraw/no6.png'),
          ],
          lotteryBtn:{
            img : require('@/common/imgs/act/ssy/luckdraw/lottery-btn.png')
          }
        }
      }
    },
    methods: {
      beforeLottery(resolve,reject){
        resolve()
      },
      afterLottery(){

      }
    },
    components:{
      lottery
    }
  }
</script>

<style lang="less" scoped>

</style>
