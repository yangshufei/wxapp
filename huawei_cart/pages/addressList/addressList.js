var e = getApp(), t = e.globalData.mp, a = e.globalData.config;

Page({
    data: {
        imageSelectedName: "radio_selected.png",
        imageName: "radio.png",
        addressList: [],
        selectIdx: "-1",
        hideEmptyClass: "hide",
        hasDefault: !1
    },
    onLoad: function() {
        wx.hideShareMenu();
        var e = this;
        t.mpGet(a.service.addressDomain + "/member/myAddresses/list.json", {}, {
            successFunc: function(t) {
                t && t.data.success && t.data.shoppingConfigList ? (t.data.shoppingConfigList.forEach(function(a, s) {
                    a.id == wx.getStorageSync("shoppingConfigId") && (e.setData({
                        selectIdx: s
                    }), t.data.shoppingConfigList[s].selected), 1 == a.defaultFlag && e.setData({
                        hasDefault: !0
                    });
                }), !wx.getStorageSync("shoppingConfigId") && t.data.shoppingConfigList.length > 0 && e.data.hasDefault && (e.setData({
                    selectIdx: 0
                }), t.data.shoppingConfigList[0].selected), t.data.shoppingConfigList.length > 0 ? e.setData({
                    addressList: t.data.shoppingConfigList,
                    hideEmptyClass: "hide"
                }) : e.setData({
                    addressList: t.data.shoppingConfigList,
                    hideEmptyClass: ""
                })) : e.setData({
                    hideEmptyClass: ""
                });
            }
        });
    },
    onShow: function() {},
    toAdd: function(e) {
        wx.navigateTo({
            url: "/pages/addressAdd/addressAdd"
        });
    },
    toModify: function(e) {
        wx.navigateTo({
            url: "/pages/addressUpdate/addressUpdate?address=" + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.address))
        });
    },
    selectAddress: function(e) {
        var t = e.currentTarget.dataset.idx, a = this.data.addressList;
        a[this.data.selectIdx] && (a[this.data.selectIdx].selected = null), a[t].selected = !0, 
        this.setData({
            selectIdx: t
        }), wx.setStorageSync("shoppingConfigId", a[t].id), wx.navigateBack();
    },
    towxAddress: function() {
        var s = this;
        t.mpGet(a.service.wapDomain + "/member/status.json", {}, {
            successFunc: function(a) {
                var d = getCurrentPages(), i = d[d.length - 1].route;
                getApp().globalData.currentPageUrl = i, e.globalData.userInfo && a.data.success ? t.mpGetWXAddressInfo(e, s.addWXAddress) : t.mpLogin(e, function(a) {
                    t.mpGetWXAddressInfo(e, s.addWXAddress);
                });
            },
            failFunc: function(a) {
                var d = getCurrentPages(), i = d[d.length - 1].route;
                getApp().globalData.currentPageUrl = i, t.mpLogin(e, function(a) {
                    t.mpGetWXAddressInfo(e, s.addWXAddress);
                });
            }
        });
    },
    addWXAddress: function(e) {
        t.mpGet(a.service.addressDomain + "/matchRegion.json", {
            provinceName: e.provinceName,
            cityName: e.cityName,
            districtName: e.countyName
        }, {
            successFunc: function(t) {
                t.data.success ? (t.data.districtId && (e.needl4addr = t.data.needL4Addr, e.province = t.data.provinceId, 
                e.city = t.data.cityId, e.district = t.data.districtId), e.consignee = e.userName, 
                e.mobile = e.telNumber, e.address = e.detailInfo, e.provinceName = e.provinceName, 
                e.cityName = e.cityName, e.districtName = e.countyName, e.street = "", e.streetName = "", 
                e.addressSelectStatus = "") : (e.consignee = e.userName, e.mobile = e.telNumber, 
                e.address = e.detailInfo, e.provinceName = e.provinceName, e.cityName = e.cityName, 
                e.districtName = e.countyName, e.street = "", e.streetName = "", e.addressSelectStatus = ""), 
                wx.navigateTo({
                    url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(e))
                });
            },
            failFunc: function(e) {}
        });
    }
});