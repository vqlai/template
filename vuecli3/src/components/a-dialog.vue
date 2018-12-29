<template>
    <!-- overlay	是否显示背景蒙层 -->
    <!-- lock-scroll	是否锁定背景滚动 -->
    <van-popup 
      v-model="isShowDialog" 
      :close-on-click-overlay="false" 
      :lock-scroll="true"
      :overlay="true"
      :style="{width: dialogWidth,minHeight: dialogHeight}"
      @click-overlay="onOverlay"
      class="a-dialog"> 
      <!-- ,fontSize: closeBtnSize -->
       <!-- :class="{out: showCloseBtn == 1,in: showCloseBtn == 2, 'in-out': showCloseBtn == 4}" -->
      <span 
        class="dialog-close-btn" 
        :class="'c'+showCloseBtn"
        :style="{backgroundColor: closeBtnBg,color: closeBtnColor}"
        @click="closeDialog" v-if="showCloseBtn !== 3">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </span>
      <div class="dialog-body" :style="{backgroundColor: dialogBg, borderRadius:dialogRadius,border: dialogBorder}">
        <!-- 标准弹窗 -->
        <div class="dialog1" v-if="dialogType === 1">
          <div class="dialog-header" :style="{backgroundColor: headerBg,color: headerColor}" v-if="showHeader">
            <span class="dialog-title">{{headerTitle}}</span>
          </div>
          <slot></slot>
        </div>
        <!-- 分享弹窗 -->
        <div class="dialog2" v-else-if="dialogType === 2">
          <slot></slot>
          <div class="btn" @click="closeDialog">我知道了</div>
        </div>
        <!-- 分享弹窗2 -->
        <div class="dialog3" v-else-if="dialogType === 3">
          <slot></slot>
        </div>
        <!-- 其他 -->
        <div class="dialog4" v-else>
          未找到弹窗
        </div>
      </div>
    </van-popup>
</template>

<script>
  import { Popup } from 'vant'
  export default {
    name: 'a-dialog',
    // vue不推荐直接在子组件中修改父组件传来的prop的值，如果要避免这个抛出错误，需要通过事件派发来处理
    // 如果通过data来绑定props，会导致父组件无法修改同步props的值
    // data() {
    //   return {
    //     isDialog: this.isShowDialog
    //   }
    // },
    props:{
      isShowDialog:{ // 是否显示弹窗
        type: Boolean,
        default: false
      },
      dialogType:{ // 弹窗类型 1为标准弹窗，2为分享提示弹窗
        type: Number,
        default: 1
      },
      canCloseOverlay:{ // 弹窗遮罩点击是否可以关闭弹窗
        type: Boolean,
        default: false
      }, 
      showCloseBtn:{ // 关闭按钮是否展示与展示位置
        type: Number,
        default: 1 // 1为弹窗外侧显示，2为弹窗内测显示，3为不显示
      },
      showHeader:{ // 是否显示头部
        type: Boolean,
        default: false
      },
      headerTitle:{ // 设置标题文字
        type:String,
        default: '提示'
      },
      headerBg:{ // 头部背景
        type: String,
        default: '#fff'
      },
      headerColor:{ // 头部颜色
        type: String,
        default: '#fff'
      },
      dialogWidth:{ // 弹窗宽度
        type:String,
        default: '80%'
      },
      dialogHeight:{ // 弹窗高度
        type:String,
        default: 'auto'
      },
      dialogBg:{ // 弹窗背景 透明背景用transparent
        type: String,
        default: '#fff'
      },
      dialogRadius: { // 弹窗边框形状
        type: String,
        default: '10px'
      },
      dialogBorder: {
        type: String,
        default: '0px'
      },
      closeBtnBg:{ // 关闭按钮背景
        type: String,
        default: '#fff'
      },
      closeBtnColor:{ // 关闭按钮颜色
        type: String,
        default: '#666'
      },
      // 关闭按钮不能绑定，因为大小无法进行适配
      // closeBtnSize: {
      //   type: String,
      //   default: '28px'
      // },
    },
    // 无法完美通过watch解决props属性绑定到data上
    // watch: {
    //   isShowDialog(val){
    //     this.isDialog = val
    //   }
    // },
    methods: {
      closeDialog(){
        this.$emit('closeDialog')
      },
      onOverlay(){
        if(this.canCloseOverlay){
          this.$parent.isDialog = false  // 双向绑定，关闭父组件的弹窗
        }
      }
      // closeShareDialog(){
      //   this.$emit('closeShareDialog')
      // }
    },
    components:{
      'VanPopup': Popup
    }
  }
</script>

<style lang="less" scoped>
  .a-dialog{
    // width: auto;
    // height: auto;
    overflow: visible;
    background-color: transparent;
    .dialog-close-btn{
      position: absolute;
      z-index: 2010;
      font-size: 42px;
      // padding: 4px;
      width: 54px;
      height: 54px;
      text-align: center;
      line-height: 54px;
      // color: #666;
      // background-color: #fff;
      border-radius: 100%;
      // border-radius: 40px;
      // &.in{
      //   top: 10px;
      //   right: 10px;
      // }
      // &.out{
      //   top: -60px;
      //   right: -30px;
      // }
      // &.in-out{
      //   top: -24px;
      //   right: -24px;
      // }
      &.c1{
        top: 10px;
        right: 10px;
      }
      &.c2{
        top: -60px;
        right: -40px;
      }
      &.c4{
        top: -20px;
        right: -20px;
      }
      &.c5{
        top: -28px;
        right: 32px;
      }
      &.c6{
        top: 50px;
        right: -20px;
      }
      &.c7{
        bottom: -160px;
        left: 50%;
        transform: translateX(-50%);
      }
      &.c8{
        top: -80px;
        right: -10px;
      }
      &.c9{
        bottom: -160px;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #bdbdbd;
      }
      &.c10{
        top: -80px;
        right: -10px;
        border: 1px solid #bdbdbd;
      }
    }
    .dialog-body{
      position: relative;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
      overflow: hidden;
      .dialog1{
        .dialog-header{
          padding: 30px 0;
          color: #fff;
          text-align: center;
          background-color: blue;
          .dialog-title{
            position: relative;
            font-size: 36px;
            letter-spacing: 4px;
            &:before{
              content: ' ';
              position:absolute;
              top: 50%;
              left: -180px;
              transform: translateY(-50%);
              width: 34px;
              height: 58px;
              background: url(../assets/imgs/act/base/leaf.png) no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              content: ' ';
              position:absolute;
              top: 50%;
              right: -180px;
              transform: translateY(-50%);
              width: 36px;
              height: 36px;
              background: url(../assets/imgs/act/base/flower.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .dialog2{
        width: 100%;
        height: 760px;
        padding: 100px 0;
        position: relative;
        text-align: center;
        .btn{
          display: inline-block;
          padding: 20px 60px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          border-radius: 40px;
          border: 1px solid #fff;
        }
      }
      .dialog3{}
      .dialog4{}
    }
  }
</style>
