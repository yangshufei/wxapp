var a = getApp(), e = (a.globalData.mp, a.globalData.config);

Page({
    data: {
        paPath: e.service.webViewDomain + "/mcp/hwysxy.html"
    },
    onLoad: function() {
        wx.showShareMenu({
            withShareTicket: !0
        });
    }
});