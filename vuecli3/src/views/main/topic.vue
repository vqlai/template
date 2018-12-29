<template>
  <div class="topic" :class="{onwap: retype == 'm'}">
    <ul>
      <li v-for="(item,index) in tList" :key="index">
        <div class="pic"><a :href="item.link"><img v-lazy="item.pic" alt=""></a></div>
        <div class="content">
          <h3 class="title line-hidden" v-html="item.title"></h3>
          <p class="desc" v-html="item.desc"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'topic',
    data() {
      return {
        tList: [
          {title:'全棉时代纯棉柔巾|陪伴每一个幸福时刻',desc:'为娇嫩肌肤而生，开创纸巾新时代。',link:'javascript:;',pic:'https://res.purcotton.com/activity/2018/0530/640-320.jpg'},
          {title:'全棉时代纯棉柔巾|陪伴每一个幸福时刻',desc:'为娇嫩肌肤而生，开创纸巾新时代。',link:'javascript:;',pic:'https://res.purcotton.com/activity/2018/0530/640-320.jpg'},
          {title:'全棉时代纯棉柔巾|陪伴每一个幸福时刻',desc:'为娇嫩肌肤而生，开创纸巾新时代。',link:'javascript:;',pic:'https://res.purcotton.com/activity/2018/0530/640-320.jpg'},
        ]
      }
    },
  }
</script>

<style lang="less" scoped>
  .topic{
    width: 100%;
    min-height: 100%;
    background: #f8f8f8;
    &.onwap{
      padding-bottom: 100px;
    }
    ul{
      padding: 16px 32px;
      li{
        padding: 16px 0;
        a{
          display: block;
        }
        .content{
          background: #fff;
          padding: 24px;
          h3.title{
            font-size: 28px;
            font-weight: 600;
            color: #393939;
          }
          p.desc{
            font-size: 24px;
            color: #999;
            padding-top: 24px;
          }
        }
      }
    }
  }
</style>
