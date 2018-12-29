<template>
  <div class="search-box">
    <div class="logo"><img src="@/assets/imgs/main/logo.png" alt=""></div>
    <div class="btns">
      <svg class="icon icon-search" aria-hidden="true" @click="showSearchDialog=true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <svg class="icon icon-type" aria-hidden="true" @click="onCatalogBtn">
        <use xlink:href="#icon-more"></use>
      </svg>
    </div>
    <transition name="fade">
      <div class="search-Dialog" v-if="showSearchDialog">
        <div class="opt">
          <div class="close-btn" @click="showSearchDialog=false">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
          <div class="search-btn">
            <input type="text" placeholder="请输入搜索内容..." v-model="searchText">
            <svg class="icon icon-search" aria-hidden="true" @click="onSearch">
              <use xlink:href="#icon-search"></use>
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'searchBox',
    // props:{
    //   showSearchDialog: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data: function() {
      return {      
        showSearchDialog: false,  
        searchText: ''
      }
    },
    methods: {
      onCatalogBtn() {
        location.href = "https://m.purcotton.com/mall/main/getTopCatForApp.ihtml?oprtCatNo=001"
      },
      onSearch(){
        location.href = `https://m.purcotton.com/mall/CommodityList/searchCommodityForWap.ihtml?keyword=${this.searchText}&button=搜索`
      }
    },
  }
</script>

<style lang="less" scoped>
  .search-box{
    height: 60px;
    padding: 10px 30px;
    background: #fff;
    display: flex;
    align-items: center;
    .logo{
      width: 360px;
    }
    .btns{
      flex: 1;
      text-align: right;
      .icon{
        font-size: 46px;
        color: #03ad88;
        &.icon-search{
          margin-right: 80px;
        }
      }
    }
    .search-Dialog{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 3888;
      background: #fff;
      overflow: hidden;
      .opt{
        display: flex;
        padding: 20px 40px 20px 20px;
        .close-btn{
          width: 80px;
          font-size: 60px;
          color: #999;
          align-self: center;
          text-align: center;
        }
        .search-btn{
          flex: 1;
          font-size: 36px;
          border: 1px solid #ddd;
          border-radius: 20px;
          position: relative;
          padding: 20px 70px 20px 30px;
          input{
            width: 100%;
          }
          .icon-search{
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 60px;
            color: #009d85;
          }
        }
      }
    }
  }
</style>
