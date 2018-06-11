
var flag = false;
var title,price,num,totalPrice;
Page({
  
  data:{
    name:"",
    tel:"",
    addre:"",
    display1:"flex",
    display2:"none",
  },
  
  toAddAddre:function(){
    wx.redirectTo({
       url: '../addressList/addressList'
    });
  },
 
  onLoad: function(options) { 
      title = options.title;
      price = options.price;
      num = options.num;
      totalPrice = options.totalPrice;
      flag=options.flag;
      // console.log(title);
      this.setData({
        title,
        num,
        price,
        totalPrice
      })
    if(!flag){
      this.setData({
          display1:"flex",
          display2:"none",
        })
      
    }else{
       this.setData({
          display1:"none",
          display2:"flex",
          name:options.name,
          tel:options.tel,
          addre:options.addre
       })
    }
  },
  onShow(){
    wx.getStorage({
      key: 'detail',
      success: (res)=>{
        // console.log(res.data);
        this.setData({
          title:res.data.name,
          price:res.data.price,
          totalPrice:res.data.totalPrice,
          num:res.data.num
        })
      },
    })
  },
})