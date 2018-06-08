//app.js
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'loginImage',
      success: (res)=>{
       console.log(res)
       this.globalData.loginImage=res.data;
    } 
    })
    wx.getStorage({
      key: 'userName',
      success: (res)=>{
       console.log(res)
       this.globalData.userName=res.data;
    } 
    })
 },
 globalData: {
   userInfo: null
 }
})