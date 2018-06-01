//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    index:0,
    imgUrls:[
      '/images/01.jpg',
      '/images/02.jpg',
      '/images/03.png'
    ],
    indicatorDots:false,
    autoplay:false,
    interval:3000,
    duration:800,
    products:[
      {
        id:1,
        image:'/images/a.jpg',
        productName:'ISDN怡思丁',
        describe:'"水"做的防晒',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/b.jpg',
        productName:'MUJI/无印良品',
        describe:'敏感肌必备 清爽滋润',
        discountPrice:137,
        originalPrice:150,
      },
      {
        id:3,
        image:'/images/c.jpg',
        productName:'ELTAMD',
        describe:'美国医生推荐的氨基酸洗面奶',
        discountPrice:138,
        originalPrice:199,
      },
    ],
    skinCare:[
      {
        id:1,
        image:'/images/a.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/b.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:3,
        image:'/images/c.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:4,
        image:'/images/a.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
    ],
    bestMakeup:[
      {
        id:1,
        image:'/images/b.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/a.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/c.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
    ],
    bestLife:[
      {
        id:1,
        image:'/images/c.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/b.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
      {
        id:2,
        image:'/images/a.jpg',
        productName:'男朋友都看不出你化了妆|Hapsode/悦芙媞 素颜霜50g',
        describe:'快速上妆自然气色',
        discountPrice:99,
        originalPrice:169,
      },
    ],
  },
  onLoad: function () {
   
  },
  select(e){
     let index = e.currentTarget.dataset.index;
     console.log(index)
     this.setData({
       index
     })
  },
  onPullDownRefresh: function(){
    console.log('--------下拉刷新-------')
　  wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(()=>{
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1000)
  },
  onReachBottom(){
    wx.showLoading({
      title: '玩命加载中'
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b0fabe33eb25e1de3c41f2d/products',
      method: 'GET',
      success:(res)=>{
        // console.log(res.data.skinCare);
        let skinCare_list = this.data.skinCare;
        // console.log(skinCare_list);
        let skinCare = [...skinCare_list,...res.data.skinCare];
        this.setData({
          skinCare
        })
        wx.hideLoading();
      }
    })
  }
})
