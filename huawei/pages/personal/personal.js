const app = getApp()
Page({
  data: {
    userName: '账号登录',
    loginImage: "imgs/defaultface_user_gray.png",
    hide: true
  },
  onLoad: function () {
    if(app.globalData.userName && app.globalData.userName){
      this.setData({
        userName:app.globalData.userName,
        loginImage:app.globalData.loginImage,
        hide:false
      })
    }
 },
  logIn(){
    let that = this;
    wx.showLoading({
      title:'正在登录...'
    })
    setTimeout(function(){
      wx.hideLoading();
      wx.getUserInfo({
        success: (res)=> {
          that.setData({
             userName: res.userInfo.nickName,
            loginImage: res.userInfo.avatarUrl,
            hide: false
         })
         wx.setStorage({
           key: 'loginImage',
           data: that.data.loginImage,
           success: function(res){
             console.log('保存成功')
           }
         })
         wx.setStorage({
          key: 'userName',
          data: that.data.userName,
          success: function(res){
            console.log('保存成功')
          }
        })
         },
      })
    },1000)  
  },
  logOut(){
    app.globalData.loginImage = null;
    app.globalData.userName = null;
     this.setData({
      userName: '账号登录',
      loginImage: "imgs/defaultface_user_gray.png",
      hide: true,
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