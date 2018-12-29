<template>
  <div class="initpwd">
    <div class="form">
      <div class="input-box">
        <div class="password">
          <input type="text" placeholder="请输入密码" v-model="password" maxlength="50">
        </div>
        <div class="password">
          <input type="text" placeholder="请确认密码" v-model="comfirmPwd" maxlength="50">
        </div>
      </div>
      <div class="comfirm-btn"><a href="javscript:;">完 成</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'initpwd',
    data() {
      return {
        password: '',
        comfirmPwd: ''
      }
    },
  }
</script>

<style lang="less" scoped>
  .initpwd{
    .form{
      padding: 30px;
      .input-box{
        >div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100px;
          padding-left: 20px;
          border-bottom: 1px solid #e4e4e4;
          >input{
            width: 100%;
            font-size: 30px;
            color: #7A7A7A;
          }
        }
      }
      .comfirm-btn{
        padding: 40px 0;
        a{
          display: block;
          text-align: center;
          height: 80px;
          line-height: 80px;
          color: #fff;
          border-radius: 40px;
          background-color: #00a282;
        }
      }
    }
  }
</style>
