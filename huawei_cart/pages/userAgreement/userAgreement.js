var a = getApp(), e = (a.globalData.mp, a.globalData.config);

Page({
    data: {
        uaPath: e.service.webViewDomain + "/mcp/hwyhxy.html"
    },
    onLoad: function() {
        wx.showShareMenu({
            withShareTicket: !0
        });
    }
});