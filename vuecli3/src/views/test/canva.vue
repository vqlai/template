<template>
  <div class="cvs">
    <canvas id="canvas">当前环境不支持canvas</canvas>
  </div>
</template>

<script>
  export default {
    name: 'cvs',
    data() {
      return {
        canvas: null,
        ctx: null,
        lineX: 50,
        lineY: 50,
        quadraticObj: {p0_x: 50,p0_y: 100,p1_x: 200,p1_y: 30,p2_x: 200, p2_y: 200},
        quadraticT: 0,
        bezierObj: {p0_x: 50,p0_y: 500,p1_x: 300,p1_y: 200,p2_x: 100, p2_y: 200,p3_x: 300, p3_y: 500},
        bezierT: 0,
        circleX: 50,
        circleY: 580
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.initCanvas()
      })
    },
    methods:{
      initCanvas(){
        //获取canvas容器
        this.canvas = document.getElementById('canvas')
        //创建一个画布
        this.ctx = this.canvas.getContext('2d')
        if(!this.ctx) return
        this.ratio = window.devicePixelRatio
        // console.log(this.ratio)
        // this.canvas.width = window.innerWidth * this.ratio
        // this.canvas.height = window.innerHeight * this.ratio
        this.canvas.width = window.innerWidth 
        this.canvas.height = window.innerHeight
        // this.drawDemo()
        this.drawDemo2()
        // this.draw_curve(this.obj)
        // let xy = this.get_bezier_dot(0, this.obj)
        // this.draw_ball(xy.x,xy.y)
        // this.drawLine()
        // this.drawMivie()
        // setInterval(()=>{
          // this.moveLineBall()
          // this.moveQuadraticBall()
          // this.moveBezierBall()
          // this.moveCircle()
        // },20)
        // this.drawBezier(this.bezierObj)
      },
      drawDemo(){
        // 绘制矩形
        // 绘制实心矩形
        // this.ctx.fillStyle = 'yellow' // 设置矩形的填充色
        // this.ctx.fillRect(50,50,200,200) // 绘制矩形
        // 绘制空心矩形
        this.ctx.strokeStyle = 'blue' // 设置空心矩形边框颜色
        this.ctx.strokeRect(50,50,200,200) // 绘制空心矩形
        
        // 清除矩形
        // this.ctx.clearRect(50,50,200,200) // 清除某个矩形区域的内容
        // 绘制文本
        this.ctx.font= "Bold 20px Arial" // 设置字体
        this.ctx.textAlign = 'left' // 设置对齐方式
        // this.ctx.fillStyle = 'red' // 设置字体填充颜色
        // 创建渐变
        let gradient = this.ctx.createLinearGradient(0,0,this.canvas.width,0)
        gradient.addColorStop("0","magenta")
        gradient.addColorStop("0.5","blue")
        gradient.addColorStop("1.0","red")
        // 绘制实心文本
        // this.ctx.fillStyle = gradient // 用渐变填色
        // this.ctx.fillText('12312',50,100) // 设置字体内容，以及在画布上的位置
        this.ctx.strokeStyle = gradient  // 用渐变填色
        // 绘制空心文本
        this.ctx.strokeText('hello',50,100) 

        // 绘制实心的圆形
        this.ctx.beginPath()
        this.ctx.arc(110,310,50,0,Math.PI*1,false)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()
        this.ctx.closePath()
        // 绘制空心的圆形
        this.ctx.beginPath()
        this.ctx.arc(250,310,50,0,Math.PI*2,true)
        this.strokeStyle = 'blue'
        this.ctx.stroke()
        // 	把已经创建的路径转换成裁剪路径。裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。
        // 	注意：clip()只能遮罩在这个方法调用之后绘制的图像，如果是clip()方法调用之前绘制的图像，则无法实现遮罩。
        // this.ctx.clip() 
        this.ctx.closePath()
        
        // // 绘制阴影
        this.ctx.shadowOffsetX = 10
        this.ctx.shadowOffsetY = 10
        this.ctx.shadowBlur = 5
        this.ctx.shadowColor = 'rgba(0,0,0,.2)'
        this.ctx.fillStyle = "#eee"
        this.ctx.fillRect(50,380,200,100)

        // 处理图像
        let image = new Image()
        image.src = 'https://res.purcotton.com/app/images/2018/11/750-380-1116.jpg'
        image.onload = ()=>{
          this.ctx.drawImage(image,100,100,200,200)
        }
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        // for(let i=0;i<100000;i++){
        //   imageData.data[i] = Number.parseInt(Math.random()*255)
        // }
        console.log(imageData)
        // this.grayscale(imageData)
        // this.sepia(imageData)
        this.red(imageData)
        this.ctx.putImageData(imageData, 0, 0)
        console.log(imageData)

        // this.ctx.save() //保存状态
        // this.ctx.restore() //恢复状态
      },
      drawDemo2(){
        // save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数
        // canvas 的状态就是当前画面应用的所有样式和变形的一个快照
        // this.ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
        // this.ctx.save();                  // 保存默认状态

        // this.ctx.fillStyle = 'red'       // 在原有配置基础上对颜色做改变
        // this.ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

        // this.ctx.save();                  // 保存当前状态
        // this.ctx.fillStyle = '#FFF'       // 再次改变颜色配置
        // this.ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

        // // this.ctx.restore();               // 重新加载之前的颜色状态
        // this.ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

        // // this.ctx.restore();               // 加载默认颜色配置
        // this.ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形

        // 平移
        // this.ctx.save(); //保存坐原点平移之前的状态
        // this.ctx.translate(100, 100);
        // this.ctx.strokeRect(0, 0, 100, 100);
        // this.ctx.restore(); //恢复到最初状态
        // this.ctx.translate(220, 220);
        // this.ctx.fillRect(0, 0, 100, 100);

        // this.ctx.fillStyle = "red";
        // this.ctx.save();
        // 旋转
        // this.ctx.translate(100, 100);
        // this.ctx.rotate(Math.PI / 180 * 45);
        // this.ctx.fillStyle = "blue";
        // this.ctx.fillRect(0, 0, 100, 100);
        // this.ctx.restore();

        // this.ctx.save();
        // this.ctx.translate(0, 0);
        // this.ctx.fillRect(0, 0, 50, 50);
        // this.ctx.restore();

        // 合成
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, 200, 200);

        this.ctx.globalCompositeOperation = "xor"; //全局合成操作
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(100, 100, 200, 200);
      },
      grayscale (pixels) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
          var r = d[i];
          var g = d[i + 1];
          var b = d[i + 2];
          d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
        }
        return pixels;
      },
      sepia (pixels) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
          var r = d[i];
          var g = d[i + 1];
          var b = d[i + 2];
          d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
          d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
          d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
        }
        return pixels;
      },
      red (pixels) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
          var r = d[i];
          var g = d[i + 1];
          var b = d[i + 2];
          d[i] = (r+g+b)/3;        // 红色通道取平均值
          d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
        }
        return pixels;
      },
      // 播放动画
      requestAnimFrame(){
        // 返回一个函数
        // 大多数设备的刷新频率是 60 次/秒，（1000/60 = 16.6ms）也就说是浏览器对每一帧画面的渲染
        // 工作要在 16ms 内完成，超出这个时间，页面的渲染就会出现卡顿现象，影响用户体验。
        let requestAnimationFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) { window.setTimeout(callback, 1000 / 60); };
        return requestAnimationFrame
      },
      drawLine(){
        this.ctx.beginPath() // 开始路径绘制
        this.ctx.moveTo(50,50)  //起始点（x,y）
        this.ctx.lineTo(200,50) // 绘制一条到(x,y)的直线
        this.ctx.lineWidth = 2 // 设置线宽
        let gradient = this.ctx.createLinearGradient(0,0,170,0) // 用渐变进行填充笔触
        gradient.addColorStop("0","magenta")
        gradient.addColorStop("0.5","blue")
        gradient.addColorStop("1.0","red")
        this.ctx.strokeStyle = gradient  // 设置线的颜色
        // this.ctx.strokeStyle = 'tomato'
        this.ctx.stroke() // 进行线的着色，这时整条线才变得可见
        this.ctx.closePath() // 结束路径绘制
      },
      moveLineBall(){
        if(this.lineX > 200){
          this.lineX = 50
        }else{
          // 清除内容
          this.ctx.clearRect(0, 0, 250, 60)
          // this.ctx.closePath()
          // 画直线
          this.drawLine()
          this.lineX += 2
          // 画圆
          this.ctx.beginPath()
          this.ctx.strokeStyle = "white" // 设置边框颜色
          // this.ctx.arc(this.lineX,this.lineY,5,0,2*Math.PI,false) // 跑圆
          // this.ctx.moveTo(50,50)  //起始点（x,y）// 跑长线
          // this.ctx.lineTo(this.lineX, 50) 
          this.ctx.moveTo(this.lineX, this.lineY)  //起始点（x,y）// 跑短线
          this.ctx.lineTo(this.lineX+20, this.lineY) 
          this.ctx.fillStyle = "white" // 设置填充色
          this.ctx.fill()
          this.ctx.stroke()
          this.ctx.closePath()
        }
        this.requestAnimFrame()(this.moveLineBall) // 播放动画
      },
      drawCircle(){
        this.ctx.beginPath()
        this.ctx.arc(this.circleX,this.circleY,50,0,2*Math.PI)
        this.ctx.lineWidth = 2
        let gradient = this.ctx.createLinearGradient(0,0,170,0)
        gradient.addColorStop("0","magenta")
        gradient.addColorStop("0.5","blue")
        gradient.addColorStop("1.0","red")
        this.ctx.strokeStyle = gradient // 用渐变进行填充笔触
        this.ctx.stroke()
        this.ctx.closePath()
      },
      moveCircle(){
        if(this.circleX>400){
          this.circleX = 50
        }else{
          this.ctx.clearRect(0, 480,400, 400)
          this.circleX +=2
          this.drawCircle()
        }
        this.requestAnimFrame()(this.moveCircle) // 播放动画
      },
      moveQuadraticBall(){
        if(this.quadraticT >= 1){
          this.quadraticT = 0
        }else{
          // 清除画的图
          this.ctx.clearRect(30, 60, 350, 250)
          // this.ctx.closePath()
          // 画2次贝塞尔曲线
          this.drawQuadratic(this.quadraticObj)
          this.quadraticT += 0.02
          // 画运动的圆
          this.ctx.beginPath()
          let pos = this.getQuadraticDot(this.quadraticT, this.quadraticObj)
          this.ctx.strokeStyle = "white" // 设置边框颜色
          this.ctx.fillStyle = '#00E5EE' // 设置填充色
          this.ctx.arc(pos.x, pos.y,10, 0, Math.PI * 2)
          this.ctx.fill()
          this.ctx.stroke()
          this.ctx.closePath()
        }
        this.requestAnimFrame()(this.moveQuadraticBall)
      },
      //绘制2次贝塞尔曲线
      drawQuadratic(obj) {
        this.ctx.beginPath();
        this.ctx.moveTo(obj.p0_x,obj.p0_y);/*开始点*/
        this.ctx.quadraticCurveTo(obj.p1_x,obj.p1_y,obj.p2_x,obj.p2_y);/*前两个是控制点坐标xy，后两个是结束点坐标xy*/
        this.ctx.strokeStyle = "#000";
        this.ctx.stroke();
        this.ctx.closePath();
      },
      // 利用2次贝塞尔曲线公式计算出曲线上某点坐标
      getQuadraticDot(t,obj){
        let x = (1-t)*(1-t)*obj.p0_x + 2*t*(1-t)*obj.p1_x + t*t*obj.p2_x
        let y = (1-t)*(1-t)*obj.p0_y + 2*t*(1-t)*obj.p1_y + t*t*obj.p2_y
        return {x:x,y:y}
      },
      moveBezierBall(){
        // 清除画的图
        this.ctx.clearRect(30, 200, 300, 320)
        // this.ctx.closePath()
        // 画2次贝塞尔曲线
        this.drawBezier(this.bezierObj)
        if(this.bezierT >= 1){
          this.bezierT = 1
        }else{
          this.bezierT += 0.002
        }
        // 画运动的圆
        this.ctx.beginPath()
        let pos = this.getBezierDot(this.bezierT, this.bezierObj)
        this.ctx.strokeStyle = "white" // 设置边框颜色
        this.ctx.fillStyle = '#00E5EE' // 设置填充色
        this.ctx.arc(pos.x, pos.y,10, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
        // }
        this.requestAnimFrame()(this.moveBezierBall)
      },
      //绘制3次贝塞尔曲线
      drawBezier(obj) {
        this.ctx.beginPath();
        /*开始点*/
        this.ctx.moveTo(obj.p0_x,obj.p0_y);
        /*前四个是控制点坐标xy，后两个是结束点坐标xy*/
        this.ctx.bezierCurveTo(obj.p1_x,obj.p1_y,obj.p2_x,obj.p2_y,obj.p3_x,obj.p3_y);
        this.ctx.strokeStyle = "#000";
        this.ctx.stroke();
        this.ctx.closePath();
      },
      // 利用3次贝塞尔曲线公式计算出曲线上某点坐标
      getBezierDot(t,obj){
        let x = (1-t)*(1-t)*(1-t)*obj.p0_x + 3*t*(1-t)*(1-t)*obj.p1_x + 3*t*t*(1-t)*obj.p2_x + t*t*t*obj.p3_x
        let y = (1-t)*(1-t)*(1-t)*obj.p0_y + 3*t*(1-t)*(1-t)*obj.p1_y + 3*t*t*(1-t)*obj.p2_y + t*t*t*obj.p3_y
        return {x:x,y:y}
      },
      // drawLine(){
      //   this.ctx.beginPath()
      //   this.ctx.moveTo(50,50)  //起始点（x,y）
      //   this.ctx.quadraticCurveTo(200,30,200,200) //创建二次贝塞尔曲线
      //   // this.ctx.moveTo(100,100)  //起始点（x,y）
      //   // this.ctx.quadraticCurveTo(200,30,100,150) //创建二次贝塞尔曲线
      //   this.ctx.lineWidth = 2
      //   this.ctx.strokeStyle = 'tomato'
      //   this.ctx.stroke()
      //   this.ctx.closePath()
      // },
      // draw_ball(x,y) {
      //   this.ctx.beginPath()
      //   this.ctx.fillStyle = '#00E5EE'
      //   this.ctx.arc(x, y,10, 0, Math.PI * 2)
      //   this.ctx.fill()
      //   this.ctx.stroke()
      //   this.ctx.closePath()
      // },
      // drawMivie(){
      //   let x = 100
      //   let y = Math.pow(x,2)*0.005
      //   this.ctx.beginPath()
      //   // this.ctx.moveTo(50,50)  //起始点（x,y）
      //   this.ctx.strokeStyle = "white"
      //   this.ctx.arc(x,y,5,0,2*Math.PI,false)
      //   this.ctx.fillStyle = "white"
      //   this.ctx.fill()
      //   this.ctx.stroke()
      //   this.ctx.closePath()
      // }
    }
  }
</script>

<style lang="less" scoped>
  .cvs{

  }
</style>
