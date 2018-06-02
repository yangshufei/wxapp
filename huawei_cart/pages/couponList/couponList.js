var t = getApp(), o = t.globalData.mp, e = t.globalData.config;

Page({
    data: {
        couponList: [],
        hideEmptyClass: "",
        couponType: "coupon",
        selectIdx: 0,
        pageSize: 5,
        pageNo: 1
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.getCouponList();
    },
    opentext: function(t) {
        var o = t.currentTarget.dataset.idx, e = this.data.couponList;
        this.setData({
            selectIdx: o
        }), e[this.data.selectIdx].openIcon = !e[this.data.selectIdx].openIcon, this.setData({
            couponList: e
        });
    },
    getCouponList: function() {
        var t = this;
        o.mpGet(e.service.openApiDomain + "/mcp/queryUserCouponList", {
            pageNo: t.data.pageNo,
            pageSize: t.data.pageSize
        }, {
            successFunc: function(o) {
                o.data.success && o.data.couponList && o.data.couponList.length > 0 ? (o.data.couponList = o.data.couponList.map(function(t) {
                    return t.beginDate = t.beginDate.split(" ")[0].replace(/-/g, "."), t.endDate = t.endDate.split(" ")[0].replace(/-/g, "."), 
                    t.couponDes && t.couponDes.length > 30 ? (t.showIcon = !0, t.openIcon = !1) : (t.showIcon = !1, 
                    t.openIcon = !1), 1 == t.deliveryFree ? t.frontType = "noPostage" : t.amount && 0 != t.amount ? t.frontType = "coupon" : t.discount && 0 != t.discount && (t.frontType = "discount"), 
                    t;
                }), t.setData({
                    couponList: t.data.couponList.concat(o.data.couponList),
                    hideEmptyClass: "hide",
                    pageNo: t.data.pageNo + 1
                })) : t.data.couponList.length > 0 ? t.setData({
                    hideEmptyClass: "hide"
                }) : t.setData({
                    hideEmptyClass: ""
                });
            }
        });
    },
    onReachBottom: function() {
        this.getCouponList();
    }
});