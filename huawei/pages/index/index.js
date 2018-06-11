//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[
      '/image/index_01.jpg',
      '/image/index_02.jpg',
    ],
    indicatorDots:false,
    autoplay:true,
    interval:3000,
    duration:800,
    toView:'phone',
    category: [
      {name:'精品手机',id:'phone'},
      {name:'平板&电脑',id:'computer'},
      {name:'智能家居',id:'intelligence'},
      {name:'潮流配件',id:'parts'},
    ],
    theme:[],
    height:1000,
    scroll:true,
    curIndex:0,
  },
  onReady: function () {
    wx.request({
      url:'https://www.easy-mock.com/mock/5b122f9f8cd63333d30a6c8b/mobile',
      success:(res)=>{
         this.setData({
          theme:res.data
         })
        //  console.log(res.data);
      }    
    })
  },
  selectCategory(e){
     this.setData({
       curIndex:e.currentTarget.dataset.index,
       toView:e.currentTarget.dataset.id
     })
  },
})
