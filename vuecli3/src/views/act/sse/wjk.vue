<template>
  <!-- <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>  -->
  <div class="wjk">
    <!-- x5-video-orientation="portrait" muted webkit-playsinline="true" -->
    <video id="video" src="https://res.purcotton.com/wap/h5/2018/12/12/sse/wjk.mp4" autoplay loop x5-video-orientation="portrait">
      您的浏览器不支持 video 标签。
    </video>
  </div>
</template>

<script>
  // import wx from 'weixin-js-sdk'
  export default {
    name: 'wjk',
    mounted: function(){
      this.$nextTick(()=>{
        // console.log(wx)
        // console.log(document)
        document.getElementById('video').play()
        document.addEventListener('WeixinJSBridgeReady', function() { 
          document.getElementById('video').play()
        }, false)
        // require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js').then(()=>{
        //   document.getElementById('video').play()
        //   document.addEventListener('WeixinJSBridgeReady', function() { 
        //     document.getElementById('video').play()
        //   }, false)
        // })
      })
      // document.getElementById('video').play()
    }
  }
</script>

<style lang="less" scoped>
  .wjk{
    width: 100%;
    height: 100%;
    // min-height: 1206px;
    overflow: hidden;
    video{
      width: 100%;
      height: 100%;
    }
  }
</style>
