var t = getApp(), a = t.globalData.mp, e = t.globalData.config, o = [], s = "", i = function(t) {
    a.mpGet(e.service.openApiDomain + "/mcp/queryUserOrderList", {
        pageNo: t.data.pageNo,
        pageSize: t.data.pageSize,
        isLiveFlag: t.data.isLiveFlag,
        dataType: 0
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                var a = a.data;
                o = o.concat(a.userOrderList);
                var e = {
                    1: "待处理",
                    2: "待审核(保留未用)",
                    3: "审核通过",
                    4: "审核未通过(保留未用)",
                    5: "待发货(全部出库)",
                    6: "已发货",
                    7: "已完成",
                    8: "已取消",
                    9: "正在出库",
                    10: "部分出库",
                    11: "部分发货完成",
                    12: "关闭支付",
                    13: "已取消且已退款",
                    14: "用户拒收",
                    15: "物流丢单",
                    16: "取消处理中",
                    17: "修改处理中"
                }, i = {
                    1: "已支付",
                    2: "未支付",
                    3: "已支付部分",
                    4: "处理中"
                };
                if (null != a.userOrderList && a.userOrderList.length > 0) {
                    if (a.userOrderList.forEach(function(t, a) {
                        1 != t.orderStatus && 3 != t.orderStatus && 4 != t.orderStatus || "3" == t.orderType || "2" == t.paymentStatus && (t.goPay = !0, 
                        t.gologistic = !1, s = t.orderCode, t.cash = t.cashPay), "1" != t.paymentStatus || "6" != t.orderStatus && "7" != t.orderStatus && "14" != t.orderStatus || "14" == t.orderType || "28" == t.orderType || "24" == t.orderType || (t.goPay = !1, 
                        t.gologistic = !0);
                    }), 10 == a.pageSize) {
                        var r = Math.ceil(a.totalCount / a.pageSize);
                        a.pageNo >= r ? t.setData({
                            loading: !1,
                            totalList: !0,
                            loadMore: !1
                        }) : t.setData({
                            loading: !0,
                            loadMore: !0
                        }), t.setData({
                            totalPage: r
                        });
                    } else t.setData({
                        loading: !1,
                        totalList: !0,
                        loadMore: !1
                    });
                    "1" == t.data.isLiveFlag && "0" == a.isLiveFlag && t.setdata({
                        pageNo: 0
                    }), 0 == a.totalCount && (totalPage = 0), t.setData({
                        isLiveFlag: a.isLiveFlag
                    });
                    o.forEach(function(t, a) {
                        for (var o in e) t.orderStatus == o && (t.orderStatusStr = e[o]);
                        for (var s in i) t.paymentStatus == s && (t.paymentStatusStr = i[s]);
                        t.orderTime = t.orderTime.split("+")[0];
                    });
                } else t.setData({
                    noLogin: !1,
                    showList: !1
                });
                t.setData({
                    totalCount: a.totalCount,
                    userOrderList: o,
                    pageSize: a.pageSize
                });
            }
        },
        failFunc: function() {
            wx.showToast({
                title: "订单列表获取失败!",
                icon: "success",
                duration: 2e3
            });
        }
    });
};

Page({
    data: {
        orderList: [],
        showOrderOk: !1,
        pageSize: 10,
        pageNo: 1,
        totalPage: 1,
        noLogin: !1,
        showList: !0,
        isLiveFlag: 1,
        loading: !1,
        totalList: !1,
        loadMore: !1,
        userOrderList: [],
        toastState: !1,
        toastCont: "自定义toast组件",
        isCreateClicked: !1
    },
    onLoad: function(t) {
        wx.hideShareMenu(), i(this), this.setData({
            cdnPath: e.service.cdnPath
        });
    },
    onShow: function() {
        this.setData({
            userOrderList: this.data.userOrderList
        });
    },
    onReachBottom: function() {
        if (this.data.pageNo == this.data.totalPage || this.data.pageSize < 10) return !1;
        this.setData({
            pageNo: this.data.pageNo + 1
        }), i(this);
    },
    goTobuy: function(e) {
        var o = this;
        if (o.data.isCreateClicked) return !1;
        o.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            o.setData({
                isCreateClicked: !1
            });
        }, 5e3), a.mpGotoPayment(t, e.currentTarget.dataset.code, e.currentTarget.dataset.cashpay);
    },
    onHide: function() {},
    onUnload: function() {
        o = [];
    }
});