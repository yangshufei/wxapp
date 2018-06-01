// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },

  onLoad: function (options) {
    
  },
  transform(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      index
    })
  }
})