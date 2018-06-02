var e = getApp(), a = e.globalData.mp, t = e.globalData.config;

Page({
    data: {
        userName: "账号登录",
        loginImage: "../../pages/personal/imgs/defaultface_user_gray.png",
        hideClass: "hide"
    },
    onLoad: function() {
        wx.showShareMenu({
            withShareTicket: !0
        }), a.mpReport(400050001, {
            load: "1"
        });
    },
    onShow: function() {
        this.setUserStatus();
    },
    logIn: function() {
        var t = this;
        wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), a.mpLogin(e, function(s) {
            a.mpGetUserInfo(e, t.setUserStatus);
        }), a.mpReport(400000201, {
            type: "1",
            load: "1"
        });
    },
    logOut: function() {
        e.globalData.userInfo = null, wx.clearStorageSync(), this.setUserStatus();
    },
    setUserStatus: function() {
        var s = this;
        a.mpGet(t.service.wapDomain + "/member/status.json", {}, {
            successFunc: function(a) {
                a.data.success ? e.globalData.userInfo ? s.setData({
                    userName: e.globalData.userInfo.nickName,
                    loginImage: e.globalData.userInfo.avatarUrl,
                    hideClass: ""
                }) : s.setData({
                    userName: e.globalData.defaultUserInfo.nickName,
                    loginImage: e.globalData.defaultUserInfo.avatarUrl,
                    hideClass: ""
                }) : s.setData({
                    userName: "账号登录",
                    loginImage: "../../pages/personal/imgs/defaultface_user_gray.png",
                    hideClass: "hide"
                }), wx.hideLoading();
            },
            failFunc: function(e) {
                wx.hideLoading(), s.setData({
                    userName: "账号登录",
                    loginImage: "../../pages/personal/imgs/defaultface_user_gray.png",
                    hideClass: "hide"
                });
            }
        });
    },
    toMyOrderList: function() {
        wx.navigateTo({
            url: "/pages/orderList/orderList"
        }), a.mpReport(400050101, {
            click: "1"
        });
    },
    toMyCouponList: function() {
        wx.navigateTo({
            url: "/pages/couponList/couponList"
        }), a.mpReport(400050102, {
            click: "1"
        });
    },
    toUserAgreement: function() {
        wx.navigateTo({
            url: "/pages/userAgreement/userAgreement"
        }), a.mpReport(400050104, {
            click: "1"
        });
    },
    toPrivacyAgreement: function() {
        wx.navigateTo({
            url: "/pages/privacyAgreement/privacyAgreement"
        }), a.mpReport(400050103, {
            click: "1"
        });
    },
    toReturnOrExchange: function() {
        wx.navigateTo({
            url: "/pages/returnOrExchange/returnOrExchange"
        });
    }
});