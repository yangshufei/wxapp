var a = getApp(), t = a.globalData.mp, e = a.globalData.config;

Page({
    data: {
        indexPath: e.service.webViewDomain + "/mp-index.html"
    },
    onLoad: function() {
        var a = this;
        this.setData({
            url: a.data.indexPath
        }), wx.showShareMenu({
            withShareTicket: !0
        }), t.mpReport(400010001, {
            load: "1"
        }), wx.setNavigationBarTitle({
            title: "华为商城+"
        });
    }
});