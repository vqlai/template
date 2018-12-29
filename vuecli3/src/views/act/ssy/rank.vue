<template>
  <div class="rank">
    <div class="medal">
      <ul>
        <li class="no2" v-if="medalList[1]">
          <div class="pic">
            <img :src="medalList[1].memberPic | filterImg" alt="" v-if="medalList[1].memberPic">
            <img src="@/common/imgs/act/ssy/avator.jpg" alt="" v-else>
          </div>
          <p class="name line-hidden" v-html="filterName(medalList[1].nickName || medalList[1].loginName)"></p>
          <span class="num">{{medalList[1].cacheCount}}</span>
        </li>
        <li class="no1" v-if="medalList[0]">
          <div class="pic">
            <img :src="medalList[0].memberPic | filterImg" alt="" v-if="medalList[0].memberPic">
            <img src="@/common/imgs/act/ssy/avator.jpg" alt="" v-else>
          </div>
          <p class="name line-hidden" v-html="filterName(medalList[0].nickName || medalList[0].loginName)"></p>
          <span class="num">{{medalList[0].cacheCount}}</span>
        </li>
        <li class="no3" v-if="medalList[2]">
          <div class="pic">
            <img :src="medalList[2].memberPic | filterImg" alt="" v-if="medalList[2].memberPic">
            <img src="@/common/imgs/act/ssy/avator.jpg" alt="" v-else>
          </div>
          <p class="name line-hidden" v-html="filterName(medalList[2].nickName || medalList[2].loginName)">></p>
          <span class="num">{{medalList[2].cacheCount}}</span>
        </li>
      </ul>
    </div>
    <div class="panel">
      <div class="podium"><img src="@/common/imgs/act/ssy/rank-bg2.png" alt=""></div>
      <div class="box">
        <div class="list">
          <ul v-for="(item, index) in rankList" :key="index" class="row" v-if="rankList.length">
            <li>{{index+4}}</li>
            <li>
              <img :src="item.memberPic | filterImg" alt="" v-if="item.memberPic">
              <img src="@/common/imgs/act/ssy/avator.jpg" alt="" v-else>
            </li>
            <li class="line-hidden" v-html="filterName(item.nickName || item.loginName)"></li>
            <li>{{item.cacheCount}}</li>
          </ul>
          <div class="no-data" v-if="!rankList.length">暂无更多数据</div>
        </div>
      </div>
    </div>
    <ol class="btm">
      <li v-if="user">
        <img :src="user.memberPic | filterImg" alt="" v-if="user.memberPic">
        <img src="@/common/imgs/act/ssy/avator.jpg" alt="" v-else>
      </li>
      <li v-if="user" class="line-hidden" v-html="filterName(user.nickName || user.loginName)"></li>
      <li v-if="user">第<span class="num">{{user.ranking}}</span>位</li>
      <li v-if="!user" class="no-login">您还未登录哦~</li>
      <li @click="onChallenge">我要冲榜</li>
    </ol>
    <van-loading color="white" type="spinner" size="40px" v-if="vanLoading"/>
  </div>
</template>

<script>
  // import { List } from 'vant'
  import { getRankList } from '@/api/act/ssy.js'
  import {getOldAppParams,browser} from '@/common/js/utils.js' 
  import emoji from '@/common/js/emoji.js'
  import AppNative from '@/common/js/native.js'
  export default {
    name: 'rank',
    data(){
      return {
        medalList: [],
        rankList: [],
        user: null,
        loading: false,
        finished: false,
        vanLoading: false,
        token: ''
      }
    },
    created: function(){
      if(this.retype === 'm'){
        this._getRankList({})
      }else if(this.retype === 'app'){
        let obj = getOldAppParams()
        this.token = obj.token || this.$route.query.token
        if(this.token){
          this._getRankList({token: this.token})
        }else{
          // 未登录
          this._getRankList({})
          // AppNative.openLogin()
        }
      }
    },
    filters:{
      filterImg(value){
        // filters内无法获取this实例
        return `https://res.purcotton.com/${value}`
      },
    },
    methods: {
      // onLoad() {
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     this.loading = false;

      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 500);
      // },
      filterName(value){
        return emoji.emoji(value)
      },
      _getRankList(params){
        this.vanLoading = true
        getRankList(params).then(res=>{
          if(res.data.success){
            this.rankList = res.data.data.result
            // 设置默认值
            if(this.rankList.length < 3){
              this.medalList = [...this.rankList]
              this.rankList = []
              for(let i = 0; i < 3-this.rankList.length; i++){
                this.medalList.push({memberPic: '',loginName: '-',nickName: '-',cacheCount: 0})
              }
            }else{
              this.medalList = this.rankList.splice(0,3)
            }
            // console.log(this.rankList)
            // if(JSON.stringify(res.data.data.member) == "{}"){
            //   this.user = null
            // }
            if(typeof res.data.data.member === 'undefined'){
              this.user = null
            }else{
              this.user = Object.assign({}, res.data.data.member) // 返回第一个合并后的参数对象
            }
          }else{
            // 解决活动数据返回异常时前三名不显示
            for(let i = 0; i < 3; i++){
              this.medalList.push({memberPic: '',loginName: '-',nickName: '-',cacheCount: 0})
            }
            this.$toast(res.data.msg)
          }
        }).then(()=>{ this.vanLoading = false })
      },
      onChallenge(){
        if(this.retype === 'm'){
          this.$router.push('/ssy/invite')
        }else{
          let link = `${location.origin}/app/h5/2018/11/11/index.html#/ssy/invite`
          if(browser.versions.android){
            link = link.replace('#', '%23')
          }
          AppNative.sendAction('mobile',{'type': 7,'data': link})
        }
      }
    },
    // components:{
    //   'VanList': List
    // }
  }
</script>

<style lang="less" scoped>
  .rank{
    width: 100%;
    height: auto;
    min-height: 1206px;
    background: url('../../../common/imgs/act/ssy/rank-bg1.jpg') #ccdded no-repeat;
    background-size: 100%;
    position: relative;
    overflow: hidden;
    .medal{
      ul{
        display: flex;
        padding: 70px 60px 0;
        li{
          flex: 1;
          text-align: center;
          align-self: center;
          .name{
            font-size: 28px;
            line-height: 48px;
            color: #595757;
            width: 210px;
          }
          .num{
            font-size: 36px;
            color: #ff8f8f;
            letter-spacing: 2px;
          }
          .pic{
            position: relative;
            img{
              background-color: #fff;
              border-radius: 100%;
              padding: 2px;
              box-sizing: border-box;
            }
          }
          &.no2 {
            // width: 35%;
            .pic{
              margin-top: 120px;
              padding: 0 40px;
              img{
                border: 6px solid #dcdcdc;
              }
              &:before{
                position: absolute;
                top: -66px;
                left: 50%;
                content: ' ';
                width: 100px;
                height: 80px;
                transform: translateX(-50%);
                background: url('../../../common/imgs/act/ssy/n2.png') no-repeat center; 
                background-size: contain;
                text-align: center;
              }
            }
          }
          &.no1 {
            // width: 45%;
            .pic{
              margin-top: 40px;
              padding: 0 20px;
              img{
                border: 6px solid #fff000;
              }
              &:before{
                position: absolute;
                top: -66px;
                left: 50%;
                content: ' ';
                width: 100px;
                height: 80px;
                transform: translateX(-50%);
                background: url('../../../common/imgs/act/ssy/n1.png') no-repeat center; 
                background-size: contain;
                text-align: center;
              }
            }
          }
          &.no3{
            // width: 35%;
            .pic{
              margin-top: 120px;
              padding: 0 40px;
              img{
                border: 6px solid #eebc72;
              }
              &:before{
                position: absolute;
                top: -66px;
                left: 50%;
                content: ' ';
                width: 100px;
                height: 80px;
                transform: translateX(-50%);
                background: url('../../../common/imgs/act/ssy/n3.png') no-repeat center; 
                background-size: contain;
                text-align: center;
              }
            }
          }
        }
      }
    }
    .panel{
      position: relative;
      .podium{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        width: 82%;
      }
      .box{
        position: relative;
        z-index: 10;
        height: 700px;
        width: 760px;
        padding: 130px 30px 0;
        box-sizing: border-box;
        overflow: hidden;
        .list{
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          overflow: scroll;
          padding: 10px 20px;
          box-sizing: border-box;
          ul.row{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #dcdcdc;
            li{
              &:nth-child(1){
                width: 120px;
                color: #9fa0a0;
                font-size: 26px;
                text-align: center;
              }
              &:nth-child(2){
                width: 100px;
                img{
                  width: 100px;
                  height: 100px;
                  background-color: #eee;
                  border-radius: 100%;
                  box-sizing: border-box;
                  padding: 2px;
                }
              }
              &:nth-child(3){
                flex: 1;
                padding-left: 10px;
                color: #595757;
                font-size: 26px;
              }
              &:nth-child(4){
                flex: 1;
                font-size: 30px;
                letter-spacing: 2px;
                color: #ff8f8f;
                text-align: center;
              }
            }
          }
        }
        .no-data{
          padding: 200px 0 0;
          font-size: 30px;
          color: #888;
          text-align: center;
        }
      }
    }
    .btm{
      position: relative;
      z-index: 20;
      display: flex;
      justify-content: flex-end;
      height: 100px;
      line-height: 100px;
      background-color: #fee5e5;
      color: #222;
      li{
        &:first-child{
          width: 120px;
          img{
            display: inline-block;
            width: 80px;
            height: 80px;
            margin: 10px 0 0 20px;
            padding: 2px;
            border-radius: 100%;
            background-color: #dcdcdc;
            border: 2px solid #fff;
            box-sizing: border-box;
          }
        }
        &.no-login{
          flex: 1;
          font-size: 28px;
          color: #222;
          text-indent: 60px;
        }
        &:nth-child(2){
          flex: 1;
          font-size: 30px;
        }
        &:nth-child(3){
          flex: 1;
          font-size: 30px;
          text-align: center;
          .num{
            display: inline-block;
            padding: 0 4px;
            position: relative;
            top: 2px;
            font-size: 38px;
            color: #ff8f8f;
          }
        }
        &:last-child{
          width: 300px;
          height: 100%;
          text-align: center;
          color: #fff;
          background-color: #ff8f8f;
        }
      }
    }
  }
</style>
