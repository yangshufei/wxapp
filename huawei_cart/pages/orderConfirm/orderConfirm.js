var e = getApp(), o = e.globalData.mp, i = e.globalData.config;

Page({
    data: {
        cdnPath: i.service.cdnPath,
        shoppingConfigVO: {},
        orderReq: {
            orderItemReqArgs: [],
            enablePoint: !1,
            addressID: "",
            orderSouce: "18",
            orderType: "0",
            salePortal: "2",
            couponCode: "",
            carrierInvoiceVOs: []
        },
        confirmVOLists: [],
        hasAddress: !0,
        userSelectCouponCode: "",
        userInvoiceInfoVO: {},
        invoiceShowData: {
            invoiceTypeName: "",
            invoiceType: "",
            invoiceTitleTypeName: "",
            invoiceTitleType: ""
        },
        invoiceShowDataString: "{}",
        ucToorder: {
            0: "0",
            1: "1",
            3: "3",
            2: "50"
        },
        orderTouc: {
            0: "0",
            1: "1",
            3: "3",
            50: "2"
        },
        invoiceTypes: [ {
            type: "1",
            invoiceName: "纸质普通发票",
            titleType: ""
        }, {
            type: "50",
            invoiceName: "电子普通发票",
            titleType: ""
        }, {
            type: "3",
            invoiceName: "专用发票"
        }, {
            type: "0",
            invoiceName: "不开发票"
        } ],
        showInvalid: !1,
        userManulCoupon: {
            couponCode: ""
        },
        userManulCouponCode: "",
        couponTipsClass: "hide",
        couponTips: "优惠券码输入有误，请重新输入",
        needRemoveAll: !1,
        isCreateClicked: !1,
        removeTips: "部分商品暂不可购买"
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        JSON.parse(e.nowBuy);
        this.setData({
            productItems: JSON.parse(e.nowBuy)
        }), wx.setStorageSync("productItems", e.nowBuy), o.mpReport(400030001, {
            load: "1"
        });
    },
    onUnload: function() {
        wx.removeStorageSync("invoiceInfoForConfirm"), wx.removeStorageSync("productItems"), 
        wx.removeStorageSync("confirmVOList"), wx.removeStorageSync("userInvoiceInfoVO");
    },
    onShow: function() {
        this.buildOrder();
    },
    openCoupon: function(e) {
        this.setData({
            couponTipsClass: "hide",
            couponTips: ""
        });
        var o = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = o, o.translateY(300).step(), this.setData({
            animationData: o.export()
        }), 1 == e.currentTarget.dataset.status && this.setData({
            showCoupon: !0
        }), setTimeout(function() {
            o.translateY(0).step(), this.setData({
                animationData: o
            }), 0 == e.currentTarget.dataset.status && this.setData({
                showCoupon: !1
            });
        }.bind(this), 200);
    },
    radioSelected: function(e) {
        var o = e.currentTarget.dataset.couponcode;
        this.data.confirmVOLists[0].usedCouponInfo = this.data.confirmVOLists[0].usedCouponInfo || {}, 
        this.data.confirmVOLists[0].usedCouponInfo.couponCode = o, this.setData({
            confirmVOLists: this.data.confirmVOLists
        });
        var i = this.data.orderReq;
        "0000" == o ? (i.couponCode = "", i.autoUseCoupon = !1) : (i.couponCode = o, i.autoUseCoupon = !0), 
        this.setData({
            orderReq: i,
            showCoupon: !1
        }), this.buildOrder();
    },
    orderCreate: function() {
        var t = this;
        if (t.data.isCreateClicked) return !1;
        var a = this.data.orderReq;
        if (t.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            t.setData({
                isCreateClicked: !1
            });
        }, 5e3), "" == a.addressID || "0" == a.addressID) return wx.showModal({
            title: "提示",
            content: "请您选择收货地址~",
            showCancel: !1
        }), !1;
        if (0 == a.carrierInvoiceVOs.length || 0 == Object.keys(a.carrierInvoiceVOs[0]).length) return wx.showModal({
            title: "提示",
            content: "请您选择发票信息",
            showCancel: !1
        }), !1;
        "0000" == a.couponCode && (a.couponCode = ""), t.setData({
            orderReq: a
        }), o.mpGet(i.service.openApiDomain + "/mcp/createOrder", a, {
            successFunc: function(i) {
                if (i.data && i.data.orderCodes && "null" != i.data.orderCodes) t.setData({
                    showInvalid: !1
                }), o.mpGotoPayment(e, i.data.orderCodes, t.data.confirmVOLists[0].cashPay); else {
                    if (!i.data.confirmVOLists) return t.setData({
                        showInvalid: !1
                    }), wx.showModal({
                        title: "提示",
                        content: "下单失败，请稍后重试！",
                        showCancel: !1
                    }), !1;
                    if (t.setData({
                        confirmVOLists: i.data.confirmVOLists
                    }), !(i.data.confirmVOLists[0].needRemoveProduct.length > 0)) return t.setData({
                        showInvalid: !1
                    }), wx.showModal({
                        title: "提示",
                        content: i.data.info,
                        showCancel: !1
                    }), !1;
                    t.setData({
                        showInvalid: !0
                    }), i.data.confirmVOLists[0].orderItemArg && i.data.confirmVOLists[0].orderItemArg.length > 0 ? (wx.setStorageSync("productItems", i.data.confirmVOLists[0].orderItemArg), 
                    a.orderItemReqArgs = i.data.confirmVOLists[0].orderItemArg, t.setData({
                        orderReq: a,
                        needRemoveAll: !1,
                        removeTips: "部分商品暂不可购买"
                    })) : t.setData({
                        orderReq: a,
                        needRemoveAll: !0,
                        removeTips: "下手慢了，全部商品均不可购买"
                    });
                }
            }
        });
        var n = [];
        a.orderItemReqArgs.forEach(function(e, o) {
            n.push(e.itemId + "," + e.qty);
        }), o.mpReport(400030101, {
            SKUCode: n,
            click: "1"
        });
    },
    buildOrder: function() {
        var e = this, t = this, a = this.data.productItems, n = this.data.orderReq;
        n.orderItemReqArgs = a, "0000" == n.couponCode && (n.couponCode = ""), wx.getStorageSync("shoppingConfigId") && (n.addressID = wx.getStorageSync("shoppingConfigId")), 
        t.setData({
            orderReq: n
        }), o.mpGet(i.service.openApiDomain + "/mcp/buildOrder", n, {
            successFunc: function(o) {
                if (!o.data.success) return t.setData({
                    couponTipsClass: "",
                    couponTips: o.data.info
                }), !1;
                if (t.setData({
                    userManulCouponCode: "",
                    showCoupon: !1,
                    couponTipsClass: "hide"
                }), o.data.confirmVOLists) {
                    var i = o.data.confirmVOLists, a = i[0].effectiveCoupons;
                    if (i[0].deliveryFee = i[0].deliveryFee.toFixed(2), i[0].discount = i[0].discount.toFixed(2), 
                    i[0].subtotal = i[0].subtotal.toFixed(2), i[0].cashPay = i[0].cashPay.toFixed(2), 
                    i[0].singlePrdList[0].skuPrice = i[0].singlePrdList[0].skuPrice.toFixed(2), i[0].effectiveCoupons && i[0].effectiveCoupons.length > 0 && ((a = a.map(function(e) {
                        return e.beginDate = e.beginDate.split(" ")[0].replace(/-/g, "."), e.endDate = e.endDate.split(" ")[0].replace(/-/g, "."), 
                        1 == e.ruleType ? 1 == e.deliveryFree ? e.frontType = "noPostage" : e.frontType = "coupon" : 2 == e.ruleType && (e.frontType = "discount"), 
                        e;
                    })).push({
                        frontType: "notSelect",
                        couponCode: "0000"
                    }), i[0].effectiveCoupons = a), i[0].invalidCoupons && i[0].invalidCoupons.length > 0) {
                        var n = i[0].invalidCoupons;
                        n = n.map(function(e) {
                            return e.beginDate = e.beginDate.split(" ")[0].replace(/-/g, "."), e.endDate = e.endDate.split(" ")[0].replace(/-/g, "."), 
                            1 == e.ruleType ? 1 == e.deliveryFree ? e.frontType = "noPostage" : e.frontType = "coupon" : 2 == e.ruleType && (e.frontType = "discount"), 
                            e;
                        }), i[0].invalidCoupons = n;
                    }
                    i[0].usedCouponInfo || (i[0].usedCouponInfo = {
                        couponCode: "0000"
                    }), t.setData({
                        confirmVOLists: o.data.confirmVOLists
                    });
                }
                var r = t.data.orderReq;
                o.data.orderDeliveryAddress ? (r.addressID = o.data.orderDeliveryAddress.id, t.setData({
                    orderDeliveryAddress: o.data.orderDeliveryAddress,
                    hasAddress: !0
                })) : t.setData({
                    orderDeliveryAddress: o.data.orderDeliveryAddress,
                    hasAddress: !1
                }), t.data.confirmVOLists[0] && t.data.confirmVOLists[0].usedCouponInfo && (r.couponCode = t.data.confirmVOLists[0].usedCouponInfo.couponCode), 
                t.setData({
                    orderReq: r
                }), wx.setStorageSync("confirmVOList", t.data.confirmVOLists[0]), wx.getStorageSync("invoiceInfoForConfirm") && (t.data.confirmVOLists[0].defaultInvoiceType = String(wx.getStorageSync("invoiceInfoForConfirm").invoiceType), 
                t.setData({
                    confirmVOLists: t.data.confirmVOLists
                }), wx.setStorageSync("confirmVOList", t.data.confirmVOLists[0])), e.getInvoinceInfo();
            }
        });
    },
    getInvoinceInfo: function() {
        var e = this;
        o.mpGet(i.service.ucDomain + "/invoice/queryInvoiceList.json", {}, {
            successFunc: function(o) {
                var i = JSON.parse(o.data.split("(")[1].split(")")[0]), t = e.data.confirmVOLists, a = e.data.invoiceShowData, n = e.data.ucToorder;
                if (i.userInvoiceInfoVO && Object.keys(i.userInvoiceInfoVO).length > 0 && wx.setStorageSync("userInvoiceInfoVO", i.userInvoiceInfoVO), 
                wx.getStorageSync("userInvoiceInfoVO") && wx.getStorageSync("userInvoiceInfoVO").invoiceInfoVOList) {
                    var r = wx.getStorageSync("userInvoiceInfoVO").invoiceInfoVOList, s = e.data.invoiceTypes;
                    r.forEach(function(e) {
                        switch (e.invoiceType) {
                          case "0":
                            break;

                          case "1":
                            s[0].company = e.company, s[0].taxpayerId = e.taxpayerId;
                            break;

                          case "3":
                            s[2].company = e.company, s[2].taxpayInvoiceInfoVO = e.taxpayInvoiceInfoVO;
                            break;

                          case "2":
                            s[1].company = e.company, s[1].taxpayerId = e.taxpayerId;
                        }
                    }), e.setData({
                        invoiceTypes: s
                    });
                }
                i.userInvoiceInfoVO && Object.keys(i.userInvoiceInfoVO).length > 0 && t[0].defaultInvoiceType == n[i.userInvoiceInfoVO.lastInvoiceType] && !t[0].invoiceTypeInfo.unsupportedInvoices.includes(t[0].defaultInvoiceType) ? (e.setData({
                    userInvoiceInfoVO: i.userInvoiceInfoVO
                }), e.setDefaultInvoice()) : i.userInvoiceInfoVO || t[0].invoiceTypeInfo.unsupportedInvoices.includes(t[0].defaultInvoiceType) ? (a.invoiceTypeName = "发票信息", 
                a.invoiceTitleTypeName = "选择发票类型", a.invoiceType = "", a.invoiceTitleType = "", 
                a.carrierCode = t[0].carrierCode) : e.setDefaultInvoice(), e.setData({
                    invoiceShowData: a
                }), e.setData({
                    invoiceShowDataString: encodeURIComponent(JSON.stringify(a))
                });
                var c = e.data.orderReq, d = {}, p = e.data.invoiceTypes;
                p.forEach(function(o) {
                    switch (o.type) {
                      case "0":
                        "0" == a.invoiceType && (d.invoiceType = "0", d.carrierCode = t[0].carrierCode, 
                        e.setData({
                            invoiceReq: d
                        }));
                        break;

                      case "1":
                        "1" == a.invoiceType && (d.invoiceType = "1", "2" == a.invoiceTitleType ? d.invoiceTitle = p[0].company : d.invoiceTitle = "个人", 
                        d.taxpayerIdentityNum = p[0].taxpayerId, d.carrierCode = t[0].carrierCode, e.setData({
                            invoiceReq: d
                        }));
                        break;

                      case "3":
                        "3" == a.invoiceType && (d.carrierCode = t[0].carrierCode, d.invoiceType = "3", 
                        d.invoiceTitle = p[2].company, d.taxpayerIdentityNum = p[2].taxpayInvoiceInfoVO.taxpayerId, 
                        d.vatInvoice = {
                            companyName: p[2].company,
                            taxpayerIdentityNum: p[2].taxpayInvoiceInfoVO.taxpayerId,
                            registeredAddress: p[2].taxpayInvoiceInfoVO.regAddress,
                            registeredTelephone: p[2].taxpayInvoiceInfoVO.regTelephone,
                            depositBank: p[2].taxpayInvoiceInfoVO.bank,
                            bankAccount: p[2].taxpayInvoiceInfoVO.bankAccount
                        }, d.vatInvoiceDeliveryAddress = {
                            consignee: p[2].taxpayInvoiceInfoVO.checkTaker,
                            mobile: p[2].taxpayInvoiceInfoVO.takerMobile,
                            provinceId: p[2].taxpayInvoiceInfoVO.takerProvince,
                            cityId: p[2].taxpayInvoiceInfoVO.takerCity,
                            districtId: p[2].taxpayInvoiceInfoVO.takerDistrict,
                            streetId: p[2].taxpayInvoiceInfoVO.takerStreet,
                            address: p[2].taxpayInvoiceInfoVO.takerAddress
                        }, d.invoiceComment = "", e.setData({
                            invoiceReq: d
                        }));
                        break;

                      case "50":
                        "50" == a.invoiceType && (d.invoiceType = "50", "2" == a.invoiceTitleType ? d.invoiceTitle = p[1].company : d.invoiceTitle = "个人", 
                        d.taxpayerIdentityNum = p[1].taxpayerId, d.carrierCode = t[0].carrierCode, e.setData({
                            invoiceReq: d
                        }));
                    }
                }), e.data.orderReq.carrierInvoiceVOs = [ d ], e.setData({
                    orderReq: c
                });
            }
        });
    },
    setDefaultInvoice: function() {
        var e = this, o = e.data.confirmVOLists, i = e.data.invoiceShowData, t = e.data.invoiceTypes;
        if (i.invoiceType = o[0].defaultInvoiceType, e.data.userInvoiceInfoVO.lastInvoiceInfo && Object.keys(e.data.userInvoiceInfoVO.lastInvoiceInfo).length > 0) for (var a = e.data.userInvoiceInfoVO.lastInvoiceInfo, n = 0; n < a.length; n++) {
            var r = a[n];
            if (r.carrierCode == o[0].carrierCode) {
                switch (r.invoiceType) {
                  case "0":
                    i.invoiceTypeName = "不开发票", i.invoiceType = r.invoiceType, i.invoiceTitleType = r.titleType, 
                    i.invoiceTitleTypeName = "", i.carrierCode = o[0].carrierCode;
                    break;

                  case "1":
                    i.invoiceTypeName = "纸质普通发票", "2" == r.titleType ? i.invoiceTitleTypeName = t[0].company : i.invoiceTitleTypeName = "个人", 
                    i.invoiceType = r.invoiceType, i.invoiceTitleType = r.titleType, i.carrierCode = o[0].carrierCode;
                    break;

                  case "3":
                    i.invoiceTypeName = "专用发票", i.invoiceTitleTypeName = t[2].company, i.invoiceType = r.invoiceType, 
                    i.invoiceTitleType = r.titleType, i.carrierCode = o[0].carrierCode;
                    break;

                  case "2":
                    i.invoiceTypeName = "电子普通发票", "2" == r.titleType ? i.invoiceTitleTypeName = t[1].company : i.invoiceTitleTypeName = "个人", 
                    i.invoiceType = e.data.ucToorder[r.invoiceType], i.invoiceTitleType = r.titleType, 
                    i.carrierCode = o[0].carrierCode;
                }
                return !1;
            }
            switch (o[0].defaultInvoiceType) {
              case "0":
                i.invoiceTypeName = "不开发票", i.invoiceTitleTypeName = "", i.invoiceType = o[0].defaultInvoiceType, 
                i.invoiceTitleType = "", i.carrierCode = o[0].carrierCode;
                break;

              case "1":
                i.invoiceTypeName = "纸质普通发票", i.invoiceTitleTypeName = "个人", i.invoiceType = o[0].defaultInvoiceType, 
                i.invoiceTitleType = "1", i.carrierCode = o[0].carrierCode;
                break;

              case "3":
                i.invoiceTypeName = "专用发票", i.invoiceTitleTypeName = "", i.invoiceType = o[0].defaultInvoiceType, 
                i.invoiceTitleType = "", i.carrierCode = o[0].carrierCode;
                break;

              case "50":
                i.invoiceTypeName = "电子普通发票", i.invoiceTitleTypeName = "个人", i.invoiceType = o[0].defaultInvoiceType, 
                i.invoiceTitleType = "1", i.carrierCode = o[0].carrierCode;
            }
        } else switch (o[0].defaultInvoiceType) {
          case "0":
            i.invoiceTypeName = "不开发票", i.invoiceTitleTypeName = "", i.invoiceType = o[0].defaultInvoiceType, 
            i.invoiceTitleType = "", i.carrierCode = o[0].carrierCode;
            break;

          case "1":
            i.invoiceTypeName = "纸质普通发票", i.invoiceTitleTypeName = "个人", i.invoiceType = o[0].defaultInvoiceType, 
            i.invoiceTitleType = "1", i.carrierCode = o[0].carrierCode;
            break;

          case "3":
            i.invoiceTypeName = "专用发票", i.invoiceTitleTypeName = "", i.invoiceType = o[0].defaultInvoiceType, 
            i.invoiceTitleType = "", i.carrierCode = o[0].carrierCode;
            break;

          case "50":
            i.invoiceTypeName = "电子普通发票", i.invoiceTitleTypeName = "个人", i.invoiceType = o[0].defaultInvoiceType, 
            i.invoiceTitleType = "1", i.carrierCode = o[0].carrierCode;
        }
        e.setData({
            invoiceShowData: i
        });
    },
    removeProducts: function() {
        var e = this, t = this, a = t.data.orderReq;
        t.setData({
            showInvalid: !1
        }), o.mpGet(i.service.openApiDomain + "/mcp/buildOrder", a, {
            successFunc: function(o) {
                if (!o.data.success) return t.setData({
                    couponTipsClass: "",
                    couponTips: o.data.info
                }), !1;
                if (t.setData({
                    userManulCouponCode: "",
                    showCoupon: !1,
                    couponTipsClass: "hide"
                }), o.data.confirmVOLists) {
                    var i = o.data.confirmVOLists, a = i[0].effectiveCoupons;
                    if (i[0].deliveryFee = i[0].deliveryFee.toFixed(2), i[0].discount = i[0].discount.toFixed(2), 
                    i[0].subtotal = i[0].subtotal.toFixed(2), i[0].cashPay = i[0].cashPay.toFixed(2), 
                    i[0].singlePrdList[0].skuPrice = i[0].singlePrdList[0].skuPrice.toFixed(2), i[0].effectiveCoupons && i[0].effectiveCoupons.length > 0 && ((a = a.map(function(e) {
                        return e.beginDate = e.beginDate.split(" ")[0].replace(/-/g, "."), e.endDate = e.endDate.split(" ")[0].replace(/-/g, "."), 
                        1 == e.ruleType ? 1 == e.deliveryFree ? e.frontType = "noPostage" : e.frontType = "coupon" : 2 == e.ruleType && (e.frontType = "discount"), 
                        e;
                    })).push({
                        frontType: "notSelect",
                        couponCode: "0000"
                    }), i[0].effectiveCoupons = a), i[0].invalidCoupons && i[0].invalidCoupons.length > 0) {
                        var n = i[0].invalidCoupons;
                        n = n.map(function(e) {
                            return e.beginDate = e.beginDate.split(" ")[0].replace(/-/g, "."), e.endDate = e.endDate.split(" ")[0].replace(/-/g, "."), 
                            1 == e.ruleType ? 1 == e.deliveryFree ? e.frontType = "noPostage" : e.frontType = "coupon" : 2 == e.ruleType && (e.frontType = "discount"), 
                            e;
                        }), i[0].invalidCoupons = n;
                    }
                    i[0].usedCouponInfo || (i[0].usedCouponInfo = {
                        couponCode: "0000"
                    }), t.setData({
                        confirmVOLists: o.data.confirmVOLists
                    });
                }
                var r = t.data.orderReq;
                o.data.orderDeliveryAddress ? (r.addressID = o.data.orderDeliveryAddress.id, t.setData({
                    orderDeliveryAddress: o.data.orderDeliveryAddress,
                    hasAddress: !0
                })) : t.setData({
                    orderDeliveryAddress: o.data.orderDeliveryAddress,
                    hasAddress: !1
                }), t.data.confirmVOLists[0] && t.data.confirmVOLists[0].usedCouponInfo && (r.couponCode = t.data.confirmVOLists[0].usedCouponInfo.couponCode), 
                t.setData({
                    orderReq: r
                }), wx.setStorageSync("confirmVOList", t.data.confirmVOLists[0]), wx.getStorageSync("invoiceInfoForConfirm") && (t.data.confirmVOLists[0].defaultInvoiceType = String(wx.getStorageSync("invoiceInfoForConfirm").invoiceType), 
                t.setData({
                    confirmVOLists: t.data.confirmVOLists
                }), wx.setStorageSync("confirmVOList", t.data.confirmVOLists[0])), e.getInvoinceInfo();
            }
        });
    },
    useCouponManual: function(e) {
        if ("" == e.currentTarget.dataset.couponcode) return this.setData({
            couponTipsClass: "",
            couponTips: "请输入优惠券编码"
        }), !1;
        this.data.userManulCoupon.couponCode = e.currentTarget.dataset.couponcode, this.setData({
            userManulCoupon: this.data.userManulCoupon
        });
        var o = this.data.userManulCoupon.couponCode;
        this.data.confirmVOLists[0].usedCouponInfo = this.data.confirmVOLists[0].usedCouponInfo || {}, 
        this.data.confirmVOLists[0].usedCouponInfo.couponCode = o, this.setData({
            confirmVOLists: this.data.confirmVOLists
        });
        var i = this.data.orderReq;
        i.couponCode = o, i.autoUseCoupon = !0, this.setData({
            orderReq: i
        }), this.buildOrder();
    },
    checkValue: function(e) {
        this.setData({
            userManulCouponCode: e.detail.value
        }), this.data.userManulCoupon.couponCode = e.detail.value, this.setData({
            userManulCouponCode: e.detail.value,
            userManulCoupon: this.data.userManulCoupon
        });
    }
});