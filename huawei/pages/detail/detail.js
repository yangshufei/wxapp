import util from  '../../utils/index';

Page({

  data: {
    index:0,      //所选导航栏
    product:'',     // 商品数据
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
    currentPage:1,
    totalPage:1,
    total:0,
    noLoading:true,
    noLoadingImage:true,
    //详情数据
    detail:'',
  },
  // 获取页面评论数据
  onLoad:function(){
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b129d3c791ed91ba99b116c/detail',
      success:(res)=>{
        this.setData({
          product:res.data.product,
          noLoading:true,
          noLoadingImage:true,
          comments:res.data.comments,
          currentPage:1,
          totalPage:res.data.totalPage,
          total:res.data.total,
          detail:res.data.detail
        })
        console.log(res.data);
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
  toComment(){
   this.setData({
     index:1
   })
  },
  // 下拉加载数据评论
  onReachBottom(){
    let {currentPage,totalPage,noLoading,noLoadingImage}=this.data;
    console.log(currentPage,totalPage,noLoading,noLoadingImage);
    if(currentPage >= totalPage){
      this.setData({
        hasMore:false
      })
      return;
    }
    currentPage ++;
    this.setData({
      noLoading:false,
      noLoadingImage:false
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b129d3c791ed91ba99b116c/detail',
      success: (res)=>{
        const comments =[...this.data.comments,...res.data.comments]; 
        this.setData({
          comments,
          noLoading:true,
          noLoadingImage:true,
          currentPage
        })
      }   
    })
  }
})