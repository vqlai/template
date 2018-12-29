<template>
  <div class="es6">
  </div>
</template>

<script>
  import ax from '@/assets/api/ax.js'
  export default {
    name: 'es6',
    data(){
      return {
      }
    },
    created: function(){
      this.mock({phone: '17727989230'}).then(res=>{
        console.log(res)
      })
    },
    mounted: function(){
      this.$nextTick(()=>{
        this.test()
      })
    },
    methods: {
      test() {
        class Test{
          static a = 'a' // 类的静态属性 通过类名访问
          b = 'b' // 类的实例属性 通过实例访问
          constructor(x){ // 
            this.c = x
          }
          get dd(){ // 类的取值函数
            return 'myself'
          }
          set dd(value){ //类的存值函数
            console.log('setter:' + value)
          }
          static getA(){ // 类的静态方法
            return 'A'
          }
          getB(){ // 类的实例方法
            return 'B'
          }
          // 类的私有属性 #x
          // 类的私有方法 #sum() { return #a + #b }
        }
        // let test  = new Test('c')
        // console.log(Test.a)
        // console.log(test.b)
        // console.log(test.c)
        // console.log(test.dd)
        // test.dd = 'yourself'
        // console.log(Test.getA())
        // console.log(test.getB())
        console.log('-----------------')
        class Test2 extends Test{
          constructor(x){
            // 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
            // 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
            super(x) 
            // 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象Test.prototype；在静态方法中，指向父类Test。
            console.log(super.getB())  // console.log(super.getB()) ==== console.log(Test.prototype.getB())
            // 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。？？
            console.log(super.b) // 为啥super对象可以调用父类的实例方法，无法调用父类实例属性。？？
            console.log(Test.prototype)
          }
        }
        let test2 = new Test2('cc')
        console.log(Test2.a)
        console.log(test2.b)
        console.log(test2.c)
        console.log(test2.dd)
        test2.dd = 'child yourself'
        console.log(Test2.getA())
        console.log(test2.getB())
        console.log('-----------------')
        // import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。都是运行时加载，注意区分静态加载和编译时加载
        // import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
        // import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
        // import和reruire只能引用项目内的资源，无法引用外部或cdn资源
        import('@/assets/api/act/spn.js').then(({getMsgCode}) =>{  
          // console.log(module)
          getMsgCode({phone:'17727989230'}).then(res=>{ })
        })

        console.log('-----------------')
        let obj = {
          o: 123,
          fn1: (params)=>{
            return params
          },
          fn2(params){
            return params
          }
        }
        console.log(obj.fn1('fn1'))
        console.log(obj.fn2('fn2'))
      },
      async mock({phone}) {
        return await ax({
          url: 'https://easy-mock.com/mock/5bfc9b370a883e1654768d59/example/test',
          method: 'get',
          params: {
            phone: phone
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .es6{

  }
</style>
