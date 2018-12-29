<template>
  <div class="test">
    
    <!-- <div id="wave" class="wave"><span>60%</span><canvas></canvas></div> -->
    <!-- <canvas width="200" height="200" id="canvas">
      <div><img src="@/assets/imgs/act/ssy/test/test.png" alt=""></div>
    </canvas> -->
    <div class="box">
      <canvas width="200" height="200" id="canvas">当前环境不支持canvas</canvas>
      <div><img src="@/assets/imgs/act/ssy/test/test.png" alt=""></div>
    </div>
    <div class="test_wrap">
      <ul>
        <li>
          <a href="#">测试一号</a>
        </li>
        <li>
          <a href="#">测试二号</a>
        </li>
        <li>
          <a href="#">测试三号</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data(){
      return {
        canvans: null,
        ctx: null,
        img: null,
        requestAnimationFrame: null
      }
    },
    mounted(){
      //获取canvas容器
      this.canvans = document.getElementById('canvas')
      //创建一个画布
      this.ctx = this.canvans.getContext('2d')
      //创建新的图片对象
      this.img = new Image();  
      this.canvans.width = 200;
      this.canvans.height = 200;
      // this.draw(100,75,50,0,360,'red','fill')
      

      
      
      //浏览器加载图片完毕后再绘制图片
      this.img.onload = ()=>{
          /*
          * 将图像左侧的"Goo"部分(即以坐标(0,0)为左上角坐标、宽度为332px、高度为190px的部分图像)
          * 绘制到canvas中以坐标(10,10)为左上角、宽度为332px、高度为190px的矩形区域
          *
          * canvas绘制图像的目标区域的宽度和高度与截取的部分图像尺寸保持一致，
          * 就表示不进行缩放，以原始尺寸截取部分图像
          */        
        this.img.onload = null
        this.animate()
      }
      //指定图片的URL
      // this.img.src = require('@/assets/imgs/act/ssy/test/wave.png');
      this.img.src = require('@/assets/imgs/act/ssy/test/wave.png');
    },
    methods: {
      animate(){
	      var waveX = 0;
        var waveY = 0;
        var waveX_min = -203;
        var waveY_max = 200 * 0.7;
        var requestAnimationFrame = 
            window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
            let _this = this
        function loop () {
          _this.ctx.clearRect(0, 0, 200, 200);
          // if (!needAnimate) return;
          if (waveY < waveY_max) waveY += 1.5;
          if (waveX < waveX_min) waveX = 0; else waveX -= 3;
          
          _this.ctx.globalCompositeOperation = 'source-over';
          // _this.ctx.beginPath();
          // _this.ctx.arc(200/2, 200/2, 200/2, 0, Math.PI*2, true);
          _this.ctx.beginPath();
          _this.ctx.bezierCurveTo(0, 0,48, 50, 0, 200);
          _this.ctx.bezierCurveTo(0, 200,60, 165, 200, 200);
          _this.ctx.bezierCurveTo(200, 200,170, 90, 200, 0);
          _this.ctx.bezierCurveTo(200, 0,80, 40, 0, 0);
          // this.ctx.moveTo(0,0);
          // this.ctx.lineTo(0,200);
          // this.ctx.lineTo(200,200);
          // this.ctx.lineTo(200,0);
          _this.ctx.closePath();
          _this.ctx.stroke();
          // _this.ctx.clip();
          // _this.ctx.closePath();
          _this.ctx.fill();

          _this.ctx.globalCompositeOperation = 'source-in';
          _this.ctx.drawImage(_this.img, waveX, 200 - waveY);
          
          requestAnimationFrame(loop);
        }
        loop();
      },
      draw (x, y, r, start, end, color, type) {
        var unit = Math.PI / 180;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, start * unit, end * unit);
        this.ctx[type + 'Style'] = color;
        this.ctx.closePath();
        this.ctx[type]();
      }
    },
  }
</script>

<style lang="less" scoped>
  .test{
    position: relative;
    padding: 20px;
    .box{
      canvas {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        // width: 100%;
        // height: 100%;
      }
    }
    .wave{
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 50%;
      background: rgba(255,203,103,.6);
      margin: 100px auto;
      position: relative;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
       span {
        display: inline-block;
        color: #fff;
        font-size: 20px;
        position: relative;
        z-index: 2;
      }
      canvas {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
    }
    .test_wrap ul{
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding: 10px;
      background: #ffffff;
    }
    .test_wrap li{
      -moz-box-flex: 1;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      padding-right: 0.1rem;
      list-style-type: none;
      padding: 0 5px;
    }
    .test_wrap a{
      display: block;
      color: #ffffff;
      text-align: center;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      padding: 30px 0;
      background-color: #9a6ad8;
      -webkit-animation: proRotate 1s ease-in-out 500ms alternate none 1;
      animation: proRotate 1s ease-in-out 500ms alternate none 1;
    }
    @-webkit-keyframes proRotate { 
      0%{-webkit-transform:perspective(400px) rotateY(0deg);} 
      100%{-webkit-transform:perspective(400px) rotateY(180deg);} 
    }
    @keyframes proRotate { 
      0%{transform:perspective(400px) rotateY(0deg);} 
      100%{transform:perspective(400px) rotateY(180deg);} 
    }
  }
</style>
