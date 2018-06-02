App({
    globalData: {
        mp: require("/utils/util.js"),
        config: require("VmallConfig.js"),
        userInfo: null,
        defaultUserInfo: {
            nickName: "",
            avatarUrl: "../../pages/personal/imgs/icon-notAuth.png"
        }
    },
    onLaunch: function() {
        this.globalData.userInfo = null, wx.clearStorageSync();
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e);
    },
    userInfoReadyCallback: function(e) {
        var n = getCurrentPages(), a = n[n.length - 1].route;
        console.log(a);
    }
});