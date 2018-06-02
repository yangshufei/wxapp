var t = getApp(), s = t.globalData.mp, a = t.globalData.config;

Page({
    data: {
        isLiveFlag: 0,
        stateIdx: 0,
        openCont: !1,
        orderCode: "",
        applyType: "",
        rmaCode: "",
        logisticsCompony: "",
        logisticsNo: "",
        logisticsComponyTemp: "",
        logisticsNoTemp: "",
        createDate: "",
        rmaAppAddress: "",
        repairReason: "",
        packageStatus: "",
        status: "",
        prdReturnWay: "",
        contactBy: "",
        contactMobile: "",
        problemDescription: "",
        refundAmt: "",
        processTimeList: [],
        rmaPhotoList: [],
        rmaProductsList: [],
        rmaGiftsList: []
    },
    onLoad: function(t) {
        this.setData({
            cdnPath: a.service.cdnPath,
            isLiveFlag: 0,
            orderCode: t.orderCode,
            applyType: t.applyType,
            rmaCode: t.rmaCode,
            logisticsCompony: "",
            logisticsNo: ""
        }), e(this);
    },
    openProgress: function() {
        this.data.openCont ? this.setData({
            openCont: !1
        }) : this.setData({
            openCont: !0
        });
    },
    openModify: function(t) {
        var s = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = s, s.translateY(300).step(), this.setData({
            animationData: s.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showModify: !0
        }), setTimeout(function() {
            s.translateY(0).step(), this.setData({
                animationData: s
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showModify: !1
            });
        }.bind(this), 200);
    },
    changeLogCompony: function(t) {
        this.setData({
            logisticsComponyTemp: t.detail.value
        });
    },
    changeLogNO: function(t) {
        this.setData({
            logisticsNoTemp: t.detail.value
        });
    },
    saveLogisticInfo: function() {
        var t = this;
        return t.data.logisticsComponyTemp.length < 1 ? (wx.showModal({
            title: "提示",
            content: "请填写物流公司",
            showCancel: !1
        }), !1) : t.data.logisticsNoTemp.length < 1 ? (wx.showModal({
            title: "提示",
            content: "请填写物流单号",
            showCancel: !1
        }), !1) : (s.mpGet(a.service.openApiDomain + "/mcp/addRmaLogistics", {
            logisticsName: t.data.logisticsComponyTemp,
            logisticsNumbers: t.data.logisticsNoTemp,
            rmaCode: t.data.rmaCode
        }, {
            successFunc: function(s) {
                s.data.success ? t.setData({
                    logisticsCompony: t.data.logisticsComponyTemp,
                    logisticsNo: t.data.logisticsNoTemp
                }) : t.setData({
                    logisticsCompony: "",
                    logisticsNo: ""
                });
            },
            failFunc: function() {
                wx.showToast({
                    title: "接口调用失败!",
                    icon: "success",
                    duration: 2e3
                });
            }
        }), void this.setData({
            showModify: !1
        }));
    },
    cancalApply: function() {
        var t = this;
        s.mpGet(a.service.openApiDomain + "/mcp/cancelRmaOrder", {
            rmaCode: t.data.rmaCode
        }, {
            successFunc: function(s) {
                s.data.success ? e(t) : wx.showToast({
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

var e = function(t) {
    s.mpGet(a.service.openApiDomain + "/mcp/queryRmaDetail", {
        rmaCode: t.data.rmaCode,
        isLive: t.data.isLiveFlag
    }, {
        successFunc: function(a) {
            if ((a = a.data).success && a.rmaDetail) {
                var e = a.rmaDetail;
                t.setData({
                    contactBy: e.contactBy,
                    contactMobile: e.contactMobile,
                    contactPhone: e.contactPhone,
                    createDate: e.createDate,
                    deliveryAddr: e.orderDeliveryAddress,
                    packageStatus: e.packageStatusDis,
                    problemDescription: e.problemDescription,
                    processTimeList: e.processTimeList,
                    repairCredentials: e.repairCredentials,
                    repairReason: e.repairReasonDis,
                    rmaGiftsList: e.rmaGiftsList,
                    rmaPhotoList: e.rmaPhotoList,
                    rmaProductsList: e.rmaProductsList,
                    status: e.status,
                    logisticsCompony: e.logisticsName,
                    logisticsNo: e.logisticsNumbers
                }), t.data.processTimeList.forEach(function(t, a) {
                    t.processtime = s.formatTimeNumber(t.processTime, "Y-M-D h:m:s");
                }), t.setData({
                    processTimeList: t.data.processTimeList.reverse()
                });
            }
        },
        failFunc: function() {
            wx.showToast({
                title: "订单信息获取失败!",
                icon: "success",
                duration: 2e3
            });
        }
    });
};