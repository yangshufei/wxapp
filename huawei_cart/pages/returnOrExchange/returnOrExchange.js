var t = getApp(), a = t.globalData.mp, e = t.globalData.config, s = [], i = [];

Page({
    data: {
        scrollTop: 0,
        mainOrdersTab: !0,
        applyedOrdersTab: !1,
        pageSize: 10,
        pageNo1: 1,
        isLive: 1,
        loadingShow: !1,
        totalListloaded: !1,
        userOrderList: [],
        rmaInfoList: [],
        toastState: !1,
        toastCont: "自定义toast组件",
        isCreateClicked: !1,
        applyedListLoad: !1
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.setData({
            pageSize: 10,
            isLive: 1,
            cdnPath: e.service.cdnPath
        }), s = [], i = [], o(this);
    },
    onReady: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                });
            }
        });
    },
    onUnload: function() {
        s = [], i = [];
    },
    loadMainOrder: function() {
        if (1 == this.data.totalPage1 || "" == this.data.totalPage1 || this.data.totalListloaded) return !1;
        o(this);
    },
    loadApplyedOrder: function() {
        if (1 == this.data.totalPage2 || "" == this.data.totalPage2 || this.data.totalListloaded2) return !1;
        r(this);
    },
    goToMainList: function() {
        this.setData({
            mainOrdersTab: !0,
            applyedOrdersTab: !1,
            scrollTop: 0
        });
    },
    goToApplyedList: function() {
        this.data.applyedListLoad || r(this), this.setData({
            mainOrdersTab: !1,
            applyedOrdersTab: !0,
            scrollTop: 0
        });
    },
    cancalApply: function(t) {
        var s = this, i = t.currentTarget.dataset.rmacode;
        a.mpGet(e.service.openApiDomain + "/mcp/cancelRmaOrder", {
            rmaCode: i
        }, {
            successFunc: function(t) {
                t.data.success ? r(s) : wx.showToast({
                    title: "取消申请失败!",
                    icon: "success",
                    duration: 2e3
                });
            },
            failFunc: function() {
                wx.showToast({
                    title: "取消申请失败!",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    }
});

var o = function(t) {
    a.mpGet(e.service.openApiDomain + "/mcp/queryRmaRefundableList", {
        pageNo: t.data.pageNo1,
        pageSize: t.data.pageSize
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                if (null != (a = a.data).userOrderList && a.userOrderList.length > 0) {
                    a.userOrderList.forEach(function(t, a) {
                        t.userOrder.cashPay = t.userOrder.cashPay.toFixed(2), t.userOrder.deliveryFee = t.userOrder.deliveryFee.toFixed(2), 
                        t.userOrder && t.userOrder.productList && t.userOrder.productList.length > 0 && t.userOrder.productList.forEach(function(t, a) {
                            t.orderPrice = t.orderPrice.toFixed(2), t.salePrice = t.salePrice.toFixed(2);
                        });
                    }), s = s.concat(a.userOrderList), t.setData({
                        pageNo1: t.data.pageNo1 + 1
                    });
                    var e = Math.ceil(a.totalCount / a.pageSize);
                    a.pageSize == t.data.pageSize ? t.setData({
                        loadingShow: !0
                    }) : t.setData({
                        loadingShow: !1,
                        totalListloaded: !0
                    }), t.setData({
                        totalPage1: e
                    }), "1" == t.data.isLive && "0" == a.isLive && (t.setdata({
                        pageNo1: 0
                    }), t.setData({
                        isLive: a.isLive
                    })), 0 == a.totalCount && (e = 0, this.setData({
                        totalPage1: 0
                    })), s.forEach(function(t, a) {
                        t.signDate && t.signDate.indexOf("+") >= 0 && (t.signDate = t.signDate.split("+")[0]);
                    });
                } else t.data.pageNo1 > 1 ? t.setData({
                    loadingShow: !1,
                    totalListloaded: !0
                }) : t.setData({
                    loadingShow: !1
                });
                t.setData({
                    totalCount: a.totalCount,
                    userOrderList: s,
                    pageSize: a.pageSize
                });
            } else t.setData({
                totalPage1: 0
            });
        },
        failFunc: function() {
            t.setData({
                totalPage1: 0
            }), wx.showToast({
                title: "订单列表获取失败!",
                icon: "success",
                duration: 2e3
            });
        }
    });
}, r = function(t) {
    a.mpGet(e.service.openApiDomain + "/mcp/queryRmaRecodeList", {}, {
        successFunc: function(e) {
            if (e.data.success) {
                if (null != (e = e.data).rmaInfoList && e.rmaInfoList.length > 0) {
                    var s = [ "待审核", "已受理", "审核通过（待验货）", "完成", "作废", "已补充附件（等待审核）", "等待退款", "等待重新发货" ];
                    i = e.rmaInfoList, e.rmaInfoList.forEach(function(t, a) {
                        t.statestr = s[parseInt(t.status) - 1];
                    }), i.forEach(function(t, e) {
                        t.applyDate && (t.applyDate = a.formatTimeNumber(t.applyDate, "Y-M-D h:m:s"));
                    });
                }
                t.setData({
                    rmaInfoList: i,
                    applyedListLoad: !0
                });
            }
        },
        failFunc: function() {
            wx.showToast({
                title: "列表获取失败!",
                icon: "success",
                duration: 2e3
            });
        }
    });
};