/**
 * 首页数据配置
 **/  

const dataJson = {
  homeData:{
    menu: [
      {title:'Kids婴童',url:'https://m.purcotton.com/mall/main/getTopCatForApp.ihtml?oprtCatNo=001',linkCode:'001',linkType:2,imgPath:require('@/assets/imgs/main/kids.png')},
      {title:'Women女士',url:'https://m.purcotton.com/mall/main/getTopCatForApp.ihtml?oprtCatNo=002',linkCode:'002',linkType:2,imgPath:require('@/assets/imgs/main/women.png')},
      {title:'Home家居',url:'https://m.purcotton.com/mall/main/getTopCatForApp.ihtml?oprtCatNo=003',linkCode:'003',linkType:2,imgPath:require('@/assets/imgs/main/home.png')},
      {title:'Men男士',url:'https://m.purcotton.com/mall/main/getTopCatForApp.ihtml?oprtCatNo=004',linkCode:'004',linkType:2,imgPath:require('@/assets/imgs/main/men.png')},
    ],
    welfare:{
      headline:{
        title: '福利专场',
        tip:'',
        moreLink: ''
      },
      giftList:[
        {
          mUrl:'/coupon',
          // appUrl: `${location.origin}/coupon/`,
          appUrl: `${location.origin}/#/coupon`,
          clickType: 7,
          imgPath: require('@/assets/imgs/main/welfare1.jpg')
        },
        {
          mUrl:'https://m.purcotton.com/wap/activity/2018/06/28/wap_PqFY.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/06/28/app_PqFY.html',
          clickType: 7,
          imgPath: require('@/assets/imgs/main/welfare2.jpg')
        },
        {
          // mUrl:'https://m.purcotton.com/wap/h5/2018/07/02/index.html#/julygift/register',
          // appUrl: 'https://app.purcotton.com/app/h5/2018/07/02/index.html#/julygift/register',
          mUrl:'/test',
          appUrl: `${location.origin}/#/test`,
          clickType: 7,
          imgPath: require('@/assets/imgs/main/welfare3.jpg')
        }
      ]
    },
    // 因为m端多了头部和菜单，所以无法共用
    ad:{
      // mUrl:'https://m.purcotton.com/wap/activity/2018/07/04/wap_GPAA.html',
      // appUrl: 'https://app.purcotton.com/app/activity/2018/07/04/app_GPAA.html',
      mUrl:'https://m.purcotton.com/wap/activity/2018/06/28/wap_PqFY.html',
      appUrl: 'https://app.purcotton.com/app/activity/2018/06/28/app_PqFY.html',
      picPath: require("@/assets/imgs/main/home-ad.jpg"),
      type: 7,
    },
    dialogAd:{
      mUrl:'https://m.purcotton.com/wap/activity/2018/07/03/m_7_4.html',
      appUrl: 'https://app.purcotton.com/app/activity/2018/07/03/a_7_4.html',
      picPath: 'https://res.purcotton.com/activity/2018/07/03/7-4/cup0704.png',
      type: 7,
    },
    areaChoice:{
      headline:{
        title: '社区精选',
        tip:'',
        moreLink: 'http://life.purcotton.com/PurCom/UI/app/page/live/index.html'
      }
    },
    brandNews:{
      headline:{
        title: '品牌快讯',
        tip:'一起见证全棉改变世界',
        moreLink: 'https://m.purcotton.com/wap/activity/2018/news/wap_newsTwoLevelPage.html',
        appMoreLink: 'https://app.purcotton.com/app/activity/2018/news/app_newsTwoLevelPage.html'
      },
      newsList:[
        {
          title: '专家“启”航，全棉“融”创',
          desc: '全棉时代2018创新发展研讨会圆满落幕',
          picPath: 'https://res.purcotton.com/activity/2018/news/08/17/697-378.png',
          mUrl: 'https://app.purcotton.com/app/activity/2018/news/08/17/m_9A4U.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/08/17/m_9A4U.html'
        },{
          title: '全棉活动 | 《壹棉壹世界：7000年的人与棉》新书震撼首发！',
          desc: '《壹棉壹世界：7000年的棉与人》',
          picPath: 'https://res.purcotton.com/activity/2018/07/20/fyNn/697-378.png',
          mUrl: 'https://m.purcotton.com/wap/activity/2018/07/20/m_fyNn.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/07/20/a_fyNn.html'
        },{
          title: '“全棉生活家”全景快闪店重庆走红 全棉时代2018全国巡展暖心启幕',
          desc: '近年来，零售业的新宠——快闪店，正从街头行为艺术转变成品牌营销新手段。',
          picPath: 'https://res.purcotton.com/activity/2018/news/06/20/01/697-378.png',
          mUrl: 'https://m.purcotton.com/wap/activity/2018/news/06/20/wap_01.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/06/20/app_01.html'
        },
        {
          title:'短片《妈妈都是胆小鬼》母亲节暖心上映',
          desc:'周一围监制短片《妈妈都是胆小鬼》母亲节暖心上映',
          picPath:'https://res.purcotton.com/activity/2018/news/05/15/02/697-378.png',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/05/15/02.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/05/15/02.html'
        },
        {
          title:'寻找世界上最胆小妈妈',
          desc:'人民日报母亲节惊现另类寻人启事，寻找世界上最胆小妈妈',
          picPath:'https://res.purcotton.com/activity/2018/news/05/15/697-378.png',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/05/15/01.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/05/15/01.html'
        },
        {
          title:'全棉时代响世界地球日',
          desc:'“棉·自然·人”年度摄影赛',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-01.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/23/wap_ErVo.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/23/app_ErVo.html'
        },
        {
          title:'自动化立体仓库正式上线',
          desc:'全棉时代黄冈物流中心',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-02.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_THLg.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_THLg.html'
        },
        {
          title:'企业品牌建设促进会',
          desc:'今日在深圳成立',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-03.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_vujQ.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_vujQ.html'
        },
        {
          title:'站在世界级专利起点',
          desc:'用心造中国好棉品',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-04.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_GcgL.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_GcgL.html'
        },
        {
          title:'因为全棉所以不同',
          desc:'奈丝公主卫生巾新品发布会',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-05.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_9D0c.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/wap_9D0c.html'
        },
        {
          title:'守护高品质生活',
          desc:'全棉时代参与多项行业标准',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-06.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_hVYQ.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_hVYQ.html'
        },
        {
          title:'与全球一线品牌共舞',
          desc:'全棉时代签约天猫新零售',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-07.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_MJh2.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_MJh2.html'
        },
        {
          title:'苏芒、陈妍希助阵',
          desc:'京东全棉时代2018战略发布会',
          picPath:'https://res.purcotton.com/activity/2018/news/697-378-2/pic-08.jpg',
          mUrl:'https://m.purcotton.com/wap/activity/2018/news/04/13/wap_tDo6.html',
          appUrl: 'https://app.purcotton.com/app/activity/2018/news/04/13/app_tDo6.html'
        }
      ]
    },
    live:{
      headline:{
        title: '趣味直播',
        tip:'我们一起面对面嗨聊',
        moreLink: 'http://life.purcotton.com/PurCom/UI/app/page/live/index.html'
      },
      liveList:[
        {
          title:'你知道吗，妈妈都是胆小鬼哦~',
          picPath: 'https://res.purcotton.com/app/images/2018/06/live1.jpg'
        },{
          title: '和上千MM一起分享夏日美食制作小技巧，速速观看…',
          picPath: 'https://res.purcotton.com/app/images/2018/06/live2.jpg'
        },{
          title: '聊聊那些经典的电影趣事，一起分享实用电影…',
          picPath: 'https://res.purcotton.com/app/images/2018/06/live3.jpg'
        }
      ]
    },
  },
  couponData:{
    ad:{
      picPath: 'https://res.purcotton.com/base/pic/coupon-ad.jpg'
    },
    coupon:[
      {
        picPath: require('@/assets/imgs/main/bgy1.jpg'),
        type: 1
      },{
        picPath: require('@/assets/imgs/main/bgy2.jpg'),
        type: 2
      }
    ]
  }
}

export default dataJson