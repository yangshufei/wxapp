var e = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
        "content-type": "application/json"
    };
    c.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
    c.userId = wx.getStorageSync("userId"), c.UA = "VMall-MP 1.1.1.0", a.portal = "4", 
    a.orderSourceList = "18", a.lang = "zh-CN", a.country = "CN", wx.request({
        url: e,
        data: a,
        header: c,
        success: function(u) {
            u.data.euid && wx.setStorageSync("euid", u.data.euid), "50001" == u.data.resultCode || "9206" == u.data.code || "用户名不能为空。" == u.data.info ? (getApp().globalData.continueRequestParams = {
                url: e,
                data: a,
                header: c
            }, wx.clearStorageSync(u), o(getApp(), function(e) {
                c.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
                c.userId = wx.getStorageSync("userId"), c.UA = "VMall-MP 1.1.1.0", wx.request({
                    url: getApp().globalData.continueRequestParams.url,
                    data: getApp().globalData.continueRequestParams.data,
                    header: getApp().globalData.continueRequestParams.header,
                    success: function(e) {
                        e.data.euid && wx.setStorageSync("euid", e.data.euid), n.successFunc && t(n.successFunc) && n.successFunc(e);
                    },
                    fail: function(e) {
                        n.failFunc && t(n.failFunc) && n.failFunc(e);
                    },
                    complete: function(e) {
                        n.completeFunc && t(n.completeFunc) && n.completeFunc(e);
                    }
                });
            })) : n.successFunc && t(n.successFunc) && n.successFunc(u);
        },
        fail: function(e) {
            n.failFunc && t(n.failFunc) && n.failFunc(e);
        },
        complete: function(e) {
            n.completeFunc && t(n.completeFunc) && n.completeFunc(e);
        }
    });
}, t = function(e) {
    return "[object Function]" === Object.prototype.toString.call(e);
}, a = function(e) {
    return [ e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds() ].map(n).join("");
}, n = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, o = function(e, a) {
    wx.login({
        success: function(n) {
            e.globalData.mp.mpGet(e.globalData.config.service.openApiDomain + "/mcp/miniProgramLogin", {
                authCode: n.code
            }, {
                successFunc: function(e) {
                    wx.setStorageSync("openId", e.data.openId), wx.setStorageSync("unionId", e.data.unionId), 
                    wx.setStorageSync("userId", e.data.userId), wx.setStorageSync("ukmc", e.data.ukmc), 
                    a && t(a) && a(e), wx.hideLoading();
                    var n = getCurrentPages(), o = n[n.length - 1].route;
                    getApp().globalData.currentPageUrl = o;
                },
                failFunc: function(e) {
                    a && t(a) && a(e), wx.hideLoading();
                }
            });
        }
    });
}, c = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    mpGet: e,
    mpPost: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
            "content-type": "application/json"
        };
        o.Cookie = "euid=" + wx.getStorageSync("euid") + ";", o.userId = "userId=" + wx.getStorageSync("userId") + ";", 
        a._t = new Date().getTime(), wx.request({
            url: e,
            data: a,
            header: o,
            method: "POST",
            success: function(e) {
                e.data.success && n.successFunc && t(n.successFunc) && n.successFunc(e);
            },
            fail: function(e) {
                n.failFunc && t(n.failFunc) && n.failFunc(e);
            },
            complete: function(e) {
                n.completeFunc && t(n.completeFunc) && n.completeFunc(e);
            }
        });
    },
    mpIsFunction: t,
    mpIsEmpty: function(e) {
        return "undefined" == e || null == e || "" == e || 0 == e.length;
    },
    mpFormatTime: a,
    mpEncodeScript: function(e) {
        return e && "" != e && (e = (e = (e = (e = (e = String(e)).replace(new RegExp("&", "gm"), "&amp;")).replace(new RegExp(">", "gm"), "&gt;")).replace(new RegExp("<", "gm"), "&lt;")).replace(new RegExp('"', "gm"), "&quot;")), 
        e;
    },
    mpReport: function(e, t) {
        var n = {
            UNIONID: wx.getStorageSync("unionId"),
            OPENID: wx.getStorageSync("opentId"),
            TIME: a(new Date()),
            CPSID: "",
            CPSWI: "",
            CONTENT: {}
        };
        Object.assign(n, {
            CONTENT: t
        }), wx.reportAnalytics(e, n);
    },
    mpGetUserInfo: function(e, a) {
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(n) {
                        e.globalData.userInfo = n.userInfo, a && t(a) ? a(n) : e.userInfoReadyCallback && e.userInfoReadyCallback(n);
                    }
                }) : wx.authorize({
                    scope: "scope.userInfo",
                    success: function() {
                        wx.getUserInfo({
                            success: function(n) {
                                e.globalData.userInfo = n.userInfo, a && t(a) ? a(n) : e.userInfoReadyCallback && e.userInfoReadyCallback(n);
                            }
                        });
                    },
                    fail: function() {
                        var e = getCurrentPages();
                        "pages/error/unauthorized/unauthorized" != e[e.length - 1].route && wx.navigateTo({
                            url: "/pages/error/unauthorized/unauthorized"
                        });
                    }
                });
            }
        });
    },
    mpLogin: o,
    mpGotoPayment: function(t, a, n) {
        0 != n ? e(t.globalData.config.service.openApiDomain + "/mcp/paymentProcess", {
            orderCode: a,
            openId: wx.getStorageSync("openId"),
            portal: "4"
        }, {
            successFunc: function(t) {
                wx.removeStorageSync("invoiceInfoForConfirm"), wx.removeStorageSync("productItems"), 
                wx.removeStorageSync("confirmVOList"), wx.removeStorageSync("userInvoiceInfoVO"), 
                t.data.success ? e(t.data.redirectUrl, t.data.redirectPara, {
                    successFunc: function(e) {
                        e.data.status && "succ" == e.data.status ? wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.packageName,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                "requestPayment:ok" == e.errMsg ? wx.redirectTo({
                                    url: "/pages/pay/paySuccess?orderCode=" + a + "&cashPay=" + n
                                }) : wx.redirectTo({
                                    url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                                });
                            },
                            fail: function(e) {
                                wx.redirectTo({
                                    url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                                });
                            }
                        }) : wx.redirectTo({
                            url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                        });
                    },
                    failFunc: function(e) {
                        wx.redirectTo({
                            url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                        });
                    }
                }) : wx.redirectTo({
                    url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                });
            },
            failFunc: function(e) {
                wx.redirectTo({
                    url: "/pages/pay/payFail?orderCode=" + a + "&cashPay=" + n
                });
            }
        }) : wx.redirectTo({
            url: "/pages/pay/paySuccess?orderCode=" + a + "&cashPay=" + n
        });
    },
    formatTime: function(e) {
        var t = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate(), c = e.getHours(), u = e.getMinutes(), r = e.getSeconds();
        return [ t, a, o ].map(n).join("-") + " " + [ c, u, r ].map(n).join(":");
    },
    formatTimeNumber: function(e, t) {
        var a = [ "Y", "M", "D", "h", "m", "s" ], n = [], o = new Date(e);
        n.push(o.getFullYear()), n.push(c(o.getMonth() + 1)), n.push(c(o.getDate())), n.push(c(o.getHours())), 
        n.push(c(o.getMinutes())), n.push(c(o.getSeconds()));
        for (var u in n) t = t.replace(a[u], n[u]);
        return t;
    },
    mpGetWXAddressInfo: function(e, a) {
        wx.getSetting({
            success: function(n) {
                if (n.authSetting["scope.address"]) {
                    for (var o = [], c = getCurrentPages(), u = 0; u < c.length; u++) o.push(c[u].route);
                    "pages/error/unauthorized/unauthorized" == c[c.length - 1].route && wx.navigateBack({
                        delta: o.indexOf(c[c.length - 1].route) - o.indexOf(e.globalData.currentPageUrl)
                    }), wx.chooseAddress({
                        success: function(e) {
                            a && t(a) && a(e);
                        }
                    });
                } else wx.authorize({
                    scope: "scope.address",
                    success: function() {
                        wx.chooseAddress({
                            success: function(e) {
                                a && t(a) && a(e);
                            }
                        });
                    },
                    fail: function() {
                        var e = getCurrentPages();
                        "pages/error/unauthorized/unauthorized" != e[e.length - 1].route && wx.navigateTo({
                            url: "/pages/error/unauthorized/unauthorized"
                        });
                    }
                });
            }
        });
    }
};