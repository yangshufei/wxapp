const app = getApp()
Page({
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    loginImage: "imgs/defaultface_user_gray.png",
    hide: true
  },
  onLoad: function () {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true,
        hide: false
      })
    }
  },
  getUserInfo(e){
      this.setData({
        userInfo:e.detail.userInfo,
        hasUserInfo:true,
        hide:false
      })
      wx.setStorage({
      key:"user-info",
      data:e.detail.userInfo,
      success:function(){
        // console.log('保存成功');
      }
    })
  },
  logOut(){
    wx.removeStorage({
      key: 'user-info'
    })
    this.setData({
      hasUserInfo: false,
      hide:true
    })
  },
  toMyOrderList: function() {
    wx.navigateTo({
        url: "/pages/orderList/orderList"
    })
  },
  toMyCouponList: function() {
      wx.navigateTo({
          url: "/pages/couponList/couponList"
      })
  },
  toUserAgreement: function() {
      wx.navigateTo({
          url: "/pages/userAgreement/userAgreement"
      })
  },
  toPrivacyAgreement: function() {
      wx.navigateTo({
          url: "/pages/privacyAgreement/privacyAgreement"
      })
  },
  toReturnOrExchange: function() {
      wx.navigateTo({
          url: "/pages/returnOrExchange/returnOrExchange"
      });
  }
})