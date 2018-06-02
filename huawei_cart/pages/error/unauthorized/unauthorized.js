var e = getApp(), t = e.globalData.mp;

e.globalData.config;

Page({
    data: {},
    gotoAuth: function() {
        var t = this;
        wx.openSetting({
            success: function(a) {
                "pages/addressList/addressList" == e.globalData.currentPageUrl ? t.getWXAddressInfo() : t.getUserInfo();
            },
            fail: function(e) {}
        });
    },
    getUserInfo: function() {
        t.mpGetUserInfo(e, function(t) {
            for (var a = [], n = getCurrentPages(), r = 0; r < n.length; r++) a.push(n[r].route);
            "pages/goodsDetail/goodsDetail" == e.globalData.currentPageUrl ? wx.navigateBack({
                delta: a.indexOf(n[n.length - 1].route) - a.indexOf(e.globalData.currentPageUrl)
            }) : wx.switchTab({
                url: "/pages/personal/personal"
            });
        });
    },
    getWXAddressInfo: function() {
        t.mpGetWXAddressInfo(e, function(t) {
            for (var a = [], n = getCurrentPages(), r = 0; r < n.length; r++) a.push(n[r].route);
            n[a.indexOf(e.globalData.currentPageUrl)].addWXAddress(t);
        });
    }
});