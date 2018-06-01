// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getUserInfo(e){
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true
    })
    wx.setStorage({
     key:"user-info",
     data:e.detail.userInfo,
     success:function(){
       console.log('保存成功');
     }
   })
 },
})