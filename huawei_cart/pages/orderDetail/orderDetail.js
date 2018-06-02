var e = getApp(), t = e.globalData.mp, r = e.globalData.config, a = "", o = function(e, a) {
    t.mpGet(r.service.openApiDomain + "/mcp/queryUserOrderDetail", {
        orderCode: e
    }, {
        successFunc: function(e) {
            a.setData({
                showcontent: !0
            });
            if (50012 == e.data.resultCode && (a.setData({
                toastState: !0,
                toastCont: "抱歉，该订单不存在！"
            }), setTimeout(function() {
                a.setData({
                    toastState: !1
                });
            }, 3e3)), e.data.success) {
                var r = e.data;
                if (!t.mpIsEmpty(r.cutdownTime) && "1" != r.orderDetails.orderDetailInfo.paymentStatus && "3" != r.orderDetails.orderDetailInfo.paymentStatus && 7 != r.orderDetails.orderDetailInfo.orderStatus && 8 != r.orderDetails.orderDetailInfo.orderStatus && 12 != r.orderDetails.orderDetailInfo.orderStatus && 3 != r.orderDetails.orderDetailInfo.orderType) {
                    var o = r.cutdownTime;
                    i(o, a) ? (o -= 1e3, a.setData({
                        showCurrentTime: !0
                    })) : a.setData({
                        showCurrentTime: !1
                    });
                    var d = setInterval(function() {
                        i(o, a) ? o -= 1e3 : (a.setData({
                            showCurrentTime: !1
                        }), clearInterval(d));
                    }, 1e3);
                    i(o, a);
                }
                var s = {
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
                }, n = {
                    0: "不开发票",
                    1: "纸质普通发票",
                    2: "保留（不启用）",
                    3: "增值税专票",
                    50: "电子普通发票",
                    51: "电子增值税专票（不启用)"
                }, l = {
                    1: "已全部支付",
                    2: "未支付",
                    3: "已支付部分",
                    4: "处理中"
                }, c = r.orderDetails.orderDetailInfo.cashPay.toFixed(2), D = r.orderDetails.orderDetailInfo.totalOriginalPrice.toFixed(2), u = r.orderDetails.orderDetailInfo.deliveryFee.toFixed(2), f = r.orderDetails.orderDetailInfo.discount.toFixed(2), p = r.orderDetails.orderDetailInfo.couponDeduct.toFixed(2), h = (parseFloat(f) + parseFloat(p)).toFixed(2);
                a.setData({
                    cashPay: c,
                    deliveryFee: u,
                    discountMount: h
                });
                var y = r.orderDetails.orderOperatorLogs, v = r.orderDetails.orderDeliveryAddress.consignee, I = r.orderDetails.orderDeliveryAddress.mobile, m = r.orderDetails.orderDeliveryAddress.address, T = r.orderDetails.orderDeliveryAddress.province, g = r.orderDetails.orderDeliveryAddress.district, C = r.orderDetails.orderDeliveryAddress.city, S = r.orderDetails.orderDeliveryAddress.street, w = r.orderDetails.orderDetailInfo.invoiceTitle, P = r.orderDetails.orderDetailInfo.paymentType, x = r.orderDetails.orderDetailInfo.orderCode, O = r.orderDetails.orderDetailInfo.orderType, k = r.orderDetails.orderDetailInfo.productList, F = r.orderDetails.orderDetailInfo;
                if (a.setData({
                    logisticsList: y,
                    consignee: v,
                    mobile: I,
                    address: m,
                    province: T,
                    city: C,
                    district: g,
                    street: S,
                    invoiceTitle: w,
                    paymentType: P,
                    orderCode: x,
                    orderType: O,
                    productList: k,
                    totalOriginalPrice: D,
                    carrierInvoice: r.carrierInvoice,
                    orderStatusData: r.orderDetails.orderDetailInfo.orderStatus
                }), 3 != a.data.orderType && (a.data.orderStatusData <= 3 || 9 == a.data.orderStatusData) && (14 != a.data.orderType || 14 == a.data.orderType && 2 == a.data.paymentType) && 24 != a.data.orderType && a.setData({
                    showCancelOrder: !0
                }), 0 != y.length) {
                    for (var L = void 0, A = 0; A < y.length; A++) null != (L = y[A].disposeTime) && (y[A].time = L.split("+")[0]);
                    a.setData({
                        logisticsList: y.reverse()
                    });
                }
                for (var b in F) for (var M in s) F.orderStatus == M && a.setData({
                    orderStatus: s[M]
                });
                for (var R in F) for (var E in n) F.titleType == E && a.setData({
                    titleType: n[E]
                });
                for (var G in l) for (var B in l) F.paymentStatus == B && a.setData({
                    paymentStatus: l[B]
                });
                1 != r.orderDetails.orderDetailInfo.orderStatus && 3 != r.orderDetails.orderDetailInfo.orderStatus && 4 != r.orderDetails.orderDetailInfo.orderStatus || "3" == r.orderDetails.orderDetailInfo.orderType || "2" == r.orderDetails.orderDetailInfo.paymentStatus && a.setData({
                    goPay: !0,
                    gologistic: !1
                }), "1" != r.orderDetails.orderDetailInfo.paymentStatus || "6" != r.orderDetails.orderDetailInfo.orderStatus && "7" != r.orderDetails.orderDetailInfo.orderStatus && "14" != r.orderDetails.orderDetailInfo.orderStatus || "14" == r.orderDetails.orderDetailInfo.orderType || "28" == r.orderDetails.orderDetailInfo.orderType || "24" == r.orderDetails.orderDetailInfo.orderType || a.setData({
                    goPay: !1,
                    gologistic: !0
                }), "7" == r.orderDetails.orderDetailInfo.orderStatus && 14 != r.orderDetails.orderDetailInfo.orderType && 28 != r.orderDetails.orderDetailInfo.orderType && 24 != r.orderDetails.orderDetailInfo.orderType && a.setData({
                    returnOrexchange: !0
                });
            } else a.setData({
                toastState: !0,
                toastCont: "订单获取失败！"
            }), setTimeout(function() {
                a.setData({
                    toastState: !1
                });
            }, 3e3);
        }
    });
}, i = function(e, t) {
    if (e > 1e3) {
        var r = Math.floor(e / 1e3), a = Math.floor(r / 3600), o = Math.floor((r - 60 * a * 60) / 60), i = r - 60 * a * 60 - 60 * o;
        return t.setData({
            hoursold: a,
            minsold: o,
            seconds: i
        }), !0;
    }
    return !1;
};

Page({
    data: {
        openIcon: !1,
        closeIcon: !1,
        textList: [],
        goToPay: !1,
        goLogis: !1,
        returnOrexchange: !1,
        orderCode: "",
        totalOriginalPrice: "",
        cashPay: "",
        toastState: !1,
        toastCont: "自定义toast组件",
        showcontent: !1,
        isCreateClicked: !1,
        orderStatusData: "",
        checked: !0,
        cancel: [ {
            id: 1,
            value: "不想买了"
        }, {
            id: 2,
            value: "商品选择错误"
        }, {
            id: 3,
            value: "重复下单/误下单"
        }, {
            id: 4,
            value: "忘记使用优惠券、积分等"
        }, {
            id: 5,
            value: "收货信息"
        }, {
            id: 6,
            value: "该商品商城降价了"
        }, {
            id: 7,
            value: "其他商家价格更低"
        }, {
            id: 8,
            value: "发货太慢"
        }, {
            id: 9,
            value: "支付方式有误/无法支付"
        }, {
            id: 10,
            value: "其他原因"
        } ],
        disabled: !0,
        showCancelOrder: !1,
        showBackMoney: !1
    },
    onLoad: function(e) {
        wx.hideShareMenu(), o(e.orderCode, this), this.setData({
            cdnPath: r.service.cdnPath
        }), t.mpReport(400040001, {
            ordercode: e.orderCode,
            load: "1"
        });
    },
    onReady: function(e) {
        this.data.textList.length > 1 && this.setData({
            openIcon: !0
        });
    },
    opentext: function() {
        this.data.openIcon ? this.setData({
            openIcon: !1,
            closeIcon: !0
        }) : this.setData({
            openIcon: !0,
            closeIcon: !1
        });
    },
    goTobuy: function() {
        var r = this;
        if (r.data.isCreateClicked) return !1;
        r.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            r.setData({
                isCreateClicked: !1
            });
        }, 5e3), t.mpGotoPayment(e, this.data.orderCode, this.data.cashPay), t.mpReport(400040101, {
            ordercode: this.data.orderCode,
            click: "1"
        });
    },
    goToLogis: function() {
        t.mpReport(400040102, {
            ordercode: this.data.orderCode,
            click: "1"
        });
    },
    openGoCancel: function(e) {
        var t = this, r = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = r, r.translateY(300).step(), this.setData({
            animationData: r.export()
        }), 1 == e.currentTarget.dataset.status && this.setData({
            showCancel: !0
        }), setTimeout(function() {
            r.translateY(0).step(), this.setData({
                animationData: r
            }), 0 == e.currentTarget.dataset.status && this.setData({
                showCancel: !1
            });
        }.bind(this), 200), t.data.cancel.forEach(function(e, t) {
            e.checked = !1;
        }), t.setData({
            cancel: t.data.cancel
        }), t.setData({
            disabled: !0
        });
    },
    chooseReason: function(e) {
        var t = this;
        t.data.cancel.forEach(function(t, r) {
            t.id == e.detail.value ? (t.checked = !0, a = t.id) : t.checked = !1;
        }), t.setData({
            cancel: t.data.cancel
        }), t.setData({
            disabled: !1
        });
    },
    submit: function() {
        var e = this;
        if ("" == a) return !1;
        e.setData({
            showBackMoney: !0
        });
    },
    cancelOrder: function() {
        var e = this;
        e.setData({
            showBackMoney: !1
        }), t.mpGet(r.service.openApiDomain + "/mcp/cancelOrder", {
            orderCode: e.data.orderCode,
            reasonType: a - 0
        }, {
            successFunc: function(t) {
                if (0 != t.data.code) wx.showModal({
                    title: "提示",
                    content: t.data.info
                }); else {
                    var r = getCurrentPages(), a = r[r.length - 2];
                    a.route;
                    if (a.data.userOrderList) {
                        var o = a.data.userOrderList;
                        o.forEach(function(t, r) {
                            t.orderCode == e.data.orderCode && ("未支付" == e.data.paymentStatus ? t.orderStatusStr = "已取消" : t.orderStatusStr = "取消处理中");
                        }), e.setData({
                            userOrderList: o
                        });
                    }
                    e.setData({
                        showCancelOrder: !1,
                        goPay: !1,
                        orderStatus: "未支付" == e.data.paymentStatus ? "已取消" : "取消处理中",
                        showCurrentTime: !1
                    });
                }
            }
        });
    }
});