var e = getApp(), r = e.globalData.mp, c = e.globalData.config;

Page({
    data: {
        indexPath: c.service.webViewDomain + "/mcp/mp-index.html"
    },
    onLoad: function(e) {
        var i = this;
        wx.hideShareMenu(), r.mpGet(c.service.openApiDomain + "/mcp/queryUserOrderDetail", {
            orderCode: e.orderCode
        }, {
            successFunc: function(e) {
                if (e.data.success) {
                    var r = e.data;
                    r.carrierInvoice && r.carrierInvoice.electronicUrl && -1 == r.carrierInvoice.electronicUrl.indexOf("https") && (r.carrierInvoice.electronicUrl = r.carrierInvoice.electronicUrl.replace("http", "https"), 
                    i.setData({
                        carrierInvoice: r.carrierInvoice
                    }));
                }
            }
        });
    }
});