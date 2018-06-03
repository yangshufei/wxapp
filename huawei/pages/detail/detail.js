import util from  '../../utils/index';

Page({

  data: {
    index:0,      //所选导航栏
    detail:'',     // 商品数据
    current:1,     // 当前图片
    num:1,          //所选商品数
    grey:true,      // -号背景色
    grey1:false,    // +号背景色
    curColor:1,       // 所选颜色 版本 定制
    curVersion:1,
    curRequire:1,
    // 评论数据
    comments:[],
    hasMore:true,
    page:1,
    pageSize:4,
  },
  onLoad:function(){
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5b13d3d7c5450f078273c5ba/comments',
    //   success:(res)=>{
    //     this.setData({
    //       comments:res.data.data
    //     })
    //     console.log(res.data);
    //  }  
    // })
    this.requestArticle();
  },
  onShow: function () {
    wx.request({
      url:'https://www.easy-mock.com/mock/5b129d3c791ed91ba99b116c/detail',
      success:(res)=>{
         this.setData({
          detail:res.data
         })
        //  console.log(res.data);
      }    
    })
  },
  // 选择导航栏
  selectNav(e){
    this.setData({
      index:e.currentTarget.dataset.index
    })
  },
  //swiper中第几张图片
  change(e){
    // console.log(e.detail.current);
    this.setData({
      current:e.detail.current+1
    })
  },
  // 购买数量减
  minusCount(){
    let num = this.data.num;
    if(num <= 2){
      this.setData({
        grey:true,
        num:1
      })
      return;
    }
    num--;
    this.setData({
      grey:false,
      grey1:false,
      num
    })
  },
  // 购买数量加
  addCount(){
    let num = this.data.num;
    let totalNum = this.data.detail[0].num;
    console.log(totalNum);
    if(num >= totalNum){
      this.setData({
        grey1:true
      })
      return;
    }
    num++;
    this.setData({
      num,
      grey:false,
      grey1:false
    })
  },
  // 选择颜色
  selectColor(e){
    this.setData({
      curColor:e.currentTarget.dataset.id
    })
  },
  // 选择版本
  selectVersion(e){
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      curVersion:e.currentTarget.dataset.id
    })
  },
  // 选择定制
  selectRequire(e){
    this.setData({
      curRequire:e.currentTarget.dataset.id
    })
  },
  // 点击购买按钮
  primary(){
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  // 评论页面操作
  requestArticle(){
    util.request({
      url:'https://www.easy-mock.com/mock/5b13d3d7c5450f078273c5ba/comments',
      mock: false,
      data: {
        start: this.data.page,
        end: this.data.pageSize,
      }
    }).then(res=>{
      // console.log(res);
      this.setData({
        // hasMore:false,
        comments:res.data
      })
    })
  },
  onReachBottom(){
    if(this.data.hasMore){
      let nextPage = this.data.page + 1;
      this.setData({
        page : nextPage
      });
      this.requestArticle();
    }
  }
})