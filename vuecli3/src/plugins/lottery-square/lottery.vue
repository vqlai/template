<template>
    <div class="lottery">
        <ul>
            <li class="row">
              <div :class="[{active : activeClass[index]}]" v-for="(prize,index) in lis1" :key="index">
                <img :src="prize">
              </div>
            </li>
            <li class="row">
              <div :class="[{active : activeClass[7]}]">
                <img :src="prizesList[7]">
              </div>
              <div @click="startLottery">
                <img :src="lotteryBtn.img">
              </div>
              <div :class="[{active : activeClass[3]}]">
                <img :src="prizesList[3]">
              </div>
            </li>
            <li class="row">
              <div :class="[{active : activeClass[6-index]}]" v-for="(prize,index) in lis2" :key="index">
                <img :src="prize">
              </div>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>



<script type="text/javascript">
  export default {
    name: 'lottery-square',
    data() {
      return {
        activeClass: [false, false, false, false, false, false, false, false],
        index: -1,
        count: 8,
        timer: null,
        times: 0,
        speedData: 100,
        lock: false,
        afterLotteryHandler: null
      };
    },
    props: {
      prizesList: {
        type: Array,
        default() {
          return [];
        }
      },
      lotteryBtn: {
        type: Object,
        default() {
          return {
            img: ''
          };
        }
      },
      beforeLottery: {
        type: Function,
        default() { throw new Error('you must define beforeLottery before draw a lottery '); }
      },
      afterLottery: {
        type: Function,
        // eslint-disable-next-line
        default() { console.warn('you can use afterLottery after rolling'); }
      },
      prize: {
        type: Number,
        default: 0
      },
      speed: {
        type: Number,
        default: 100
      },
      cycle: {
        type: Number,
        default: 20
      }
    },
      computed: {
        lis1() {
          return this.prizesList.slice(0, 3);
        },
        lis2() {
          return this.prizesList.slice(4, 7).reverse();
        }
      },
      created() {
        this.speedData = this.speed;
        this.afterLotteryHandler = this.afterLottery;
      },
      beforeDestroy() {
        this.afterLotteryHandler = () => { };
      },
      methods: {
        startLottery() {
          if (!this.lock) {
            let promise = () => {
              return new Promise((resolve, reject) => {
                // this.lock = true;
                this.beforeLottery(resolve, reject);
              });
            };
            let start = async () => {
              try {
                await promise();
                this.roll();
              } catch (e) {
                e();
              }
            };
            start();
          }
        },
        _rollHandler() {
          var index = this.index;
          var count = this.count;
          for (let i = 0, len = this.activeClass.length; i < len; i++) {
            this.activeClass[i] = false;
          }
          index += 1;
          if (index > count - 1) {
            index = 0;
          }
          this.activeClass[index] = true;
          this.index = index;
          return false;
        },
        roll() {
          // eslint-disable-next-line
          this.activeClass = this.activeClass.map(item => item = false);
          this.times += 1;
          this._rollHandler();
          if (this.times > this.cycle + 10 && this.prize == this.index) {
            clearTimeout(this.timer);
            setTimeout( () => { this._showResult(); } , 1000);
            this.lock = false;
            this.index = -1;
            this.count = 8;
            this.timer = null;
            this.speedData = this.speed;
            this.times = 0;
          } else {
            if (this.times < this.cycle) {
              this.speedData -= 2;
            } else {
              if (this.times > this.cycle + 10 && ((this.prize == 0 && this.index == 7) || this.prize == this.index + 1)) {
                this.speedData += 110;
              } else {
                this.speedData += 20;
              }
            }
            if (this.speedData < 40) {
              this.speedData = 40;
            }
            this.timer = setTimeout(() => { this.roll(); }, this.speedData);
          }
          return false;
        },
        _showResult() {
            this.afterLotteryHandler();
        }
      }
  };
</script>
<style lang="less" scoped>
  .lottery{
    width: 100%;
    height: auto;
    ul{
      // padding: 20px;
      box-sizing: border-box;
      li.row{
        display: flex;
        overflow:hidden;
        position: relative;
        >div{
          flex: 1;
          padding: torem(1.2);
          // margin: 5px;
          // padding: 6px;
          position: relative;
          &.active:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background: rgba(255, 135, 46, 0.62); 
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%,-50%);
            // background: url('../../common/imgs/act/wmd/lottery-active.png') no-repeat; 
            // background-size: 100%;
            // box-shadow: -20px 0px 20px #5daac1,
            //             0px -20px 20px #5daac1,
            //             20px 0px 20px #5daac1,
            //             0px 20px 20px #5daac1;
          }
        }
      }
    }
  }
</style>
