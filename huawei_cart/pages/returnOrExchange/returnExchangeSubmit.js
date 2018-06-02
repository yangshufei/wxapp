function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), s = a.globalData.mp, r = a.globalData.config, d = "1";

Page({
    data: (e = {
        cdnPath: r.service.cdnPath,
        loading: !1,
        stateIdx: 0,
        reasonIdx: 0,
        reasonArray: [],
        repairTypeArr: [],
        reasonTitle: "退货原因",
        orderCode: "",
        applyType: "",
        products: [],
        repairReasonList: [],
        repairType: "0",
        addressSelectStatus: "hide",
        textareaShow: !1,
        problemDescription: "",
        addressSelect: "",
        addressName: {
            province: "请选择",
            city: "",
            district: "",
            street: ""
        },
        addressId: {
            province: "",
            city: "",
            district: "",
            street: ""
        },
        addressNameOld: {
            province: "",
            city: "",
            district: "",
            street: ""
        },
        addressIdOld: {
            province: "",
            city: "",
            district: "",
            street: ""
        },
        addressDatas: [],
        showType: "start",
        nextShowType: {
            start: "province",
            province: "city",
            city: "district",
            district: "street",
            street: "end"
        },
        parentType: {
            province: "start",
            city: "province",
            district: "city",
            street: "district"
        },
        closeButtonClick: !1,
        needL4Addr: !0,
        isRepeatClicked: !1,
        oldAddress: {
            district: "",
            consignee: "",
            mobile: "",
            province: "",
            city: "",
            street: "",
            address: "",
            _method: "POST"
        },
        newAddress: {
            address: "",
            city: "",
            cityName: "",
            consignee: "",
            district: "",
            districtName: "",
            mobile: "",
            needL4Addr: "",
            needModify: "",
            province: "",
            provinceName: "",
            street: "",
            streetName: ""
        },
        clearIcons: {
            consignee: "hide",
            mobile: "hide",
            address: "hide"
        }
    }, t(e, "isRepeatClicked", !1), t(e, "errorinfo", "此订单的商品已全部办理退换货，\n不可重复操作"), t(e, "isIOS", !1), 
    e),
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this, a = "1" == (d = t.applyType) ? "退货原因" : "换货原因";
        this.setData({
            orderCode: t.orderCode,
            applyType: t.applyType,
            reasonTitle: a,
            reasonArray: [ "请选择" + a ],
            repairType: "0"
        }), i(this), wx.getSystemInfo({
            success: function(t) {
                "iOS" == t.system.split(" ")[0] && e.setData({
                    isIOS: !0
                });
            }
        });
    },
    bindProblemDescription: function(t) {
        this.setData({
            problemDescription: t.detail.value
        });
    },
    bindStatePickerChange: function(t) {
        var e = [], a = [];
        e = this.data.repairReasonList[t.detail.value].repairReasonArr, a = this.data.repairReasonList[t.detail.value].repairTypeArr, 
        this.setData({
            reasonIdx: 0,
            reasonArray: e,
            repairTypeArr: a,
            stateIdx: parseInt(t.detail.value)
        });
    },
    bindReasonPickerChange: function(t) {
        var e = this.data.repairTypeArr[parseInt(t.detail.value)];
        this.setData({
            reasonIdx: parseInt(t.detail.value),
            repairType: e
        });
        var a = this.data.products;
        "1" == e ? a.forEach(function(t, e) {
            t.quantity > 0 && (t.quantity = 1), t.giftList && t.giftList.length > 0 && t.giftList.forEach(function(t, e) {
                t.giftQuantity > 0 && (t.giftQuantity = 1);
            });
        }) : a.forEach(function(t, e) {
            t.quantity = t.max, t.giftList && t.giftList.length > 0 && t.giftList.forEach(function(t, e) {
                t.giftQuantity = t.max;
            });
        }), this.setData({
            products: a
        });
    },
    checkitem: function(t) {
        var e = this, a = e.data.products;
        if ("1" == e.data.repairType && "2" == e.data.applyType) {
            var s = t.currentTarget.dataset.index;
            if ("prd" == t.currentTarget.dataset.type) a[s].checked = !a[s].checked; else {
                var r = t.currentTarget.dataset.prdidx, d = t.currentTarget.dataset.index;
                a[r].giftList[d].checked = !a[r].giftList[d].checked;
            }
            e.setData({
                products: a
            });
        }
        if ("1" == e.data.repairType && "1" == e.data.applyType) {
            var i = t.currentTarget.dataset.index;
            "prd" == t.currentTarget.dataset.type && (a[i].checked = !a[i].checked), e.setData({
                products: a
            });
        }
    },
    minusAmt: function(t) {
        var e = this, a = e.data.products;
        if ("1" == e.data.repairType && "2" == e.data.applyType) {
            if ("prd" == t.currentTarget.dataset.type) {
                var s = t.currentTarget.dataset.index;
                a[s].quantity > 1 && a[s].quantity--;
            } else {
                var r = t.currentTarget.dataset.prdidx, d = t.currentTarget.dataset.index;
                a[r].giftList[d].giftQuantity > 1 && a[r].giftList[d].giftQuantity--;
            }
            e.setData({
                products: a
            });
        }
        if ("1" == e.data.repairType && "1" == e.data.applyType && "prd" == t.currentTarget.dataset.type) {
            var i = t.currentTarget.dataset.index;
            a[i].quantity > 1 && a[i].quantity--, e.setData({
                products: a
            });
        }
    },
    addAmt: function(t) {
        var e = this, a = e.data.products;
        if ("1" == e.data.repairType && "2" == e.data.applyType) {
            var s = t.currentTarget.dataset.index;
            if ("prd" == t.currentTarget.dataset.type) a[s].quantity < a[s].max && a[s].quantity++; else {
                var r = t.currentTarget.dataset.prdidx, d = t.currentTarget.dataset.index;
                a[r].giftList[d].giftQuantity < a[r].giftList[d].max && a[r].giftList[d].giftQuantity++;
            }
            e.setData({
                products: a
            });
        }
        if ("1" == e.data.repairType && "1" == e.data.applyType) {
            var i = t.currentTarget.dataset.index;
            "prd" == t.currentTarget.dataset.type && (a[i].quantity < a[i].max && a[i].quantity++, 
            e.setData({
                products: a
            }));
        }
    },
    addReturnExchangeOrder: function() {
        var t = this.data.newAddress;
        t.province = this.data.addressId.province, t.city = this.data.addressId.city, t.district = this.data.addressId.district, 
        t.street = this.data.addressId.street, t.provinceName = this.data.addressName.province, 
        t.cityName = this.data.addressName.city, t.districtName = this.data.addressName.district, 
        t.streetName = this.data.addressName.street;
        var e = this;
        this.setData({
            newAddress: t
        });
        var a = {
            consignee: [ this.data.newAddress.consignee, /^[A-Za-z0-9\-\_\u4e00-\u9fa5]{2,10}$/, "联系人只支持中英文、数字、下划线或减号(2-10个字)" ],
            mobile: [ this.data.newAddress.mobile, /^1[0-9]{10}$/, "手机号码格式不正确" ],
            address: [ this.data.newAddress.address.replace(/[\r\n]/g, ""), /^.{2,50}$/, "请输入详细地址(2-50个字)" ]
        };
        if (0 == this.data.stateIdx) return wx.showModal({
            title: "提示",
            content: "请选择包裹状态",
            showCancel: !1
        }), !1;
        if (0 == this.data.reasonIdx) return wx.showModal({
            title: "提示",
            content: "请选择" + reasonTitle,
            showCancel: !1
        }), !1;
        if (this.data.problemDescription.length < 1) return wx.showModal({
            title: "提示",
            content: "请输入问题描述",
            showCancel: !1
        }), !1;
        if (this.data.newAddress.consignee.length < 1) return wx.showModal({
            title: "提示",
            content: "联系人请输入2-10个字",
            showCancel: !1
        }), !1;
        if (this.data.newAddress.mobile.length < 1) return wx.showModal({
            title: "提示",
            content: "请输入手机号码",
            showCancel: !1
        }), !1;
        if ("2" == this.data.applyType) {
            if ("" == this.data.newAddress.province) return wx.showModal({
                title: "提示",
                content: "请选择地区！",
                showCancel: !1
            }), !1;
            if (this.data.needL4Addr) return wx.showModal({
                title: "提示",
                content: "更完整的收货地址，能让快递小哥跑得更快哦",
                showCancel: !1
            }), !1;
            if (this.data.newAddress.address.length < 1) return wx.showModal({
                title: "提示",
                content: "请输入详细地址",
                showCancel: !1
            }), !1;
        }
        for (var d in a) {
            var i = a[d], n = i[0], c = i[1], o = i[2];
            if (!c.test(n)) return wx.showModal({
                title: "提示",
                content: o,
                showCancel: !1
            }), !1;
        }
        if (this.data.isRepeatClicked) return !1;
        var p = [];
        if (this.setData({
            isRepeatClicked: !0
        }), setTimeout(function() {
            e.setData({
                isRepeatClicked: !1
            });
        }, 5e3), this.data.products.forEach(function(t, a) {
            t.checked && t.quantity > 0 && p.push({
                skuCode: t.skuCode,
                orderProductCode: t.orderProductCode,
                giftSkuCode: t.giftSkuCode,
                bundleCode: t.bundleCode,
                quantity: t.quantity
            }), t.giftList && t.giftList.length > 0 && t.giftList.forEach(function(a, s) {
                var r = "1" == e.data.repairType && "2" == e.data.applyType ? a.giftQuantity : t.quantity;
                a.checked && r > 0 && p.push({
                    skuCode: a.mainSkuCode,
                    orderProductCode: a.orderProductCode,
                    giftSkuCode: a.giftSkuCode,
                    bundleCode: "",
                    quantity: r
                });
            });
        }), 0 == p.length) return wx.showModal({
            title: "提示",
            content: "请选择需要换货的商品",
            showCancel: !1
        }), !1;
        var u = "" + (this.data.stateIdx > 0) ? this.data.stateIdx - 1 : 0, h = "" + this.data.repairReasonList[this.data.stateIdx].repairReasonCodeArr[this.data.reasonIdx], l = "" + this.data.repairReasonList[this.data.stateIdx].repairTypeArr[this.data.reasonIdx], y = {
            orderCode: this.data.orderCode,
            applyType: this.data.applyType,
            orderAddressInfo: [ this.data.newAddress ],
            repairReason: h,
            packageStatus: u,
            repairType: l,
            problemDescription: this.data.problemDescription,
            rmaPrdList: p
        };
        s.mpGet(r.service.openApiDomain + "/mcp/createRmaOrder", y, {
            successFunc: function(t) {
                t.data.success ? wx.navigateTo({
                    url: "/pages/returnOrExchange/returnExchangeResult?applyType=" + e.data.applyType
                }) : wx.showModal({
                    title: "提示",
                    content: t.data.info,
                    showCancel: !1
                });
            },
            failFunc: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "出错了",
                    showCancel: !1
                });
            }
        });
    },
    checkValue: function(t) {
        var e = {
            consignee: "hide",
            mobile: "hide",
            address: "hide"
        };
        "input" == t.type && "" != t.detail.value || "" != t.detail.value ? e[t.currentTarget.id] = "show" : e[t.currentTarget.id] = "hide", 
        this.setData({
            clearIcons: e
        });
        var a = this.data.newAddress;
        a[t.currentTarget.id] = t.detail.value, this.setData({
            newAddress: a
        });
    },
    clearInputValue: function(t) {
        var e = this.data.clearIcons, a = this.data.newAddress;
        a[t.currentTarget.dataset.contentid] = "", e[t.currentTarget.dataset.contentid] = "hide", 
        this.setData({
            newAddress: a,
            clearIcons: e
        });
    },
    openAddress: function(t) {
        this.setData({
            addressSelectStatus: "",
            textareaShow: !0
        }), this.getAddressValues();
    },
    closeAddress: function(t) {
        var e = this;
        this.setData({
            addressSelectStatus: "hide",
            textareaShow: !1,
            addressNameOld: this.data.addressName,
            addressIdOld: this.data.addressId,
            closeButtonClick: !0
        }), this.data.addressId.street ? this.setData({
            needL4Addr: !1
        }) : this.data.addressId.district ? e.getChildrenAddress(e.data.addressId.district) : this.setData({
            needL4Addr: !0
        });
    },
    getAddressValues: function() {
        var t = this;
        t.data.closeButtonClick || ("" == t.data.addressIdOld.province ? s.mpGet(r.service.addressDomain + "/data/region/tree/0.json", {}, {
            successFunc: function(e) {
                t.setData({
                    addressDatas: e.data.data[0],
                    needL4Addr: !0
                });
            }
        }) : s.mpGet(r.service.addressDomain + "/data/region/tree/" + (t.data.addressIdOld.street || t.data.addressIdOld.district || t.data.addressIdOld.city || t.data.addressIdOld.province) + ".json", {}, {
            successFunc: function(e) {
                3 == e.data.data.length ? (t.setData({
                    showType: "city"
                }), t.getChildrenAddress(t.data.addressId.district)) : 4 == e.data.data.length && t.setData({
                    showType: "district",
                    addressDatas: e.data.data[3],
                    needL4Addr: !1
                });
            }
        }));
    },
    getChildrenAddress: function(t) {
        var e = this;
        s.mpGet(r.service.addressDomain + "/data/region/children/" + t + ".json", {}, {
            successFunc: function(t) {
                t.data.data.length > 0 ? e.setData({
                    needL4Addr: !0,
                    showType: "district",
                    addressDatas: t.data.data
                }) : e.setData({
                    needL4Addr: !1
                });
            }
        });
    },
    chooseAddress: function(t) {
        var e = this, a = e.data.addressName, d = e.data.addressId;
        s.mpGet(r.service.addressDomain + "/data/region/children/" + t.currentTarget.dataset.id + ".json", {}, {
            successFunc: function(s) {
                s.data.data.length > 0 ? (e.setData({
                    addressDatas: s.data.data
                }), e.setData({
                    showType: t.currentTarget.dataset.type
                }), a[e.data.showType] = t.currentTarget.dataset.name, d[e.data.showType] = t.currentTarget.dataset.id, 
                e.data.nextShowType[e.data.showType] && (a[e.data.nextShowType[e.data.showType]] = "请选择"), 
                e.setData({
                    addressName: a,
                    addressId: d,
                    needL4Addr: !0
                })) : (e.setData({
                    showType: t.currentTarget.dataset.type,
                    needL4Addr: !1,
                    closeButtonClick: !1,
                    addressSelectStatus: "hide",
                    textareaShow: !1
                }), a[e.data.showType] = t.currentTarget.dataset.name, d[e.data.showType] = t.currentTarget.dataset.id, 
                e.setData({
                    addressName: a,
                    addressId: d
                }), e.setData({
                    addressIdOld: e.data.addressId,
                    addressNameOld: e.data.addressName
                }), e.setData({
                    showType: e.data.parentType[e.data.showType]
                }));
            }
        });
    },
    changeAddress: function(t) {
        var e = this;
        switch (e.setData({
            showType: e.data.parentType[t.target.dataset.type]
        }), t.target.dataset.type) {
          case "province":
            e.setData({
                addressName: {
                    province: "请选择",
                    city: "",
                    district: "",
                    street: ""
                },
                addressId: {
                    province: "",
                    city: "",
                    district: "",
                    street: ""
                },
                needL4Addr: !0
            }), s.mpGet(r.service.addressDomain + "/data/region/tree/0.json", {}, {
                successFunc: function(t) {
                    t.data.data.length > 0 && e.setData({
                        addressDatas: t.data.data[0]
                    });
                }
            });
            break;

          case "city":
            e.setData({
                addressName: {
                    province: this.data.addressName.province,
                    city: "请选择",
                    district: "",
                    street: ""
                },
                addressId: {
                    province: this.data.addressId.province,
                    city: "",
                    district: "",
                    street: ""
                },
                needL4Addr: !0
            }), s.mpGet(r.service.addressDomain + "/data/region/children/" + t.target.dataset.parentid + ".json", {}, {
                successFunc: function(t) {
                    t.data.data.length > 0 && e.setData({
                        addressDatas: t.data.data
                    });
                }
            });
            break;

          case "district":
            e.setData({
                addressName: {
                    province: this.data.addressName.province,
                    city: this.data.addressName.city,
                    district: "请选择",
                    street: ""
                },
                addressId: {
                    province: this.data.addressId.province,
                    city: this.data.addressId.city,
                    district: "",
                    street: ""
                },
                needL4Addr: !0
            }), s.mpGet(r.service.addressDomain + "/data/region/children/" + t.target.dataset.parentid + ".json", {}, {
                successFunc: function(t) {
                    t.data.data.length > 0 && e.setData({
                        addressDatas: t.data.data
                    });
                }
            });
            break;

          case "street":
            e.setData({
                addressName: {
                    province: this.data.addressName.province,
                    city: this.data.addressName.city,
                    district: this.data.addressName.district,
                    street: "请选择"
                },
                addressId: {
                    province: this.data.addressId.province,
                    city: this.data.addressId.city,
                    district: this.data.addressId.district,
                    street: ""
                }
            }), s.mpGet(r.service.addressDomain + "/data/region/children/" + t.target.dataset.parentid + ".json", {}, {
                successFunc: function(t) {
                    t.data.data.length > 0 ? e.setData({
                        addressDatas: t.data.data,
                        needL4Addr: !0
                    }) : e.setData({
                        needL4Addr: !1
                    });
                }
            });
        }
    }
});

var i = function(t) {
    s.mpGet(r.service.openApiDomain + "/mcp/buildRmaOrder", {
        orderCode: t.data.orderCode,
        applyType: t.data.applyType
    }, {
        successFunc: function(e) {
            if ((e = e.data).success) {
                var a = [], s = {}, r = [];
                t.setData({
                    showError: !1
                }), e.products && e.products.length > 0 && (a = e.products).forEach(function(t, e) {
                    t.max = t.quantity, t.checked = !0, t.giftList && t.giftList.length > 0 && t.giftList.forEach(function(t, e) {
                        t.checked = !0, t.max = t.giftQuantity;
                    });
                }), e.orderAddressInfo && (s = e.orderAddressInfo), e.repairReasonList && e.repairReasonList.length > 0 && (r = n(e.repairReasonList)).unshift({
                    packageStatus: "",
                    packageStatusDesc: "请选择包裹状态",
                    repairReason: "请选择" + t.data.reasonTitle,
                    repairReasonArr: [ "请选择" + t.data.reasonTitle ]
                }), t.setData({
                    products: a,
                    repairReasonList: r,
                    orderType: e.orderType,
                    oldAddress: s,
                    newAddress: s,
                    addressId: {
                        province: s.province,
                        city: s.city,
                        district: s.district,
                        street: s.street
                    },
                    addressName: {
                        province: s.provinceName,
                        city: s.cityName,
                        district: s.districtName,
                        street: s.streetName
                    },
                    addressNameOld: {
                        province: s.provinceName,
                        city: s.cityName,
                        district: s.districtName,
                        street: s.streetName
                    },
                    addressIdOld: {
                        province: s.province,
                        city: s.city,
                        district: s.district,
                        street: s.street
                    }
                }), t.getAddressValues();
            } else t.setData({
                showError: !0
            }), "35210" != e.resultCode && t.setData({
                errorinfo: "退换货失败，请稍后再试"
            });
        },
        failFunc: function() {
            wx.showToast({
                title: "订单信息获取失败!",
                icon: "success",
                duration: 2e3
            });
        }
    });
}, n = function(t) {
    for (var e = [], a = {}, s = 0; s < t.length; s++) if (t[s].repairReasonArr = [], 
    t[s].repairReasonCodeArr = [], t[s].repairTypeArr = [], a[t[s].packageStatus]) {
        var r = e.length;
        e[r - 1].repairReasonCodeArr.push(t[s].repairReason), e[r - 1].repairReasonArr.push(t[s].repairReasonDesc), 
        e[r - 1].repairTypeArr.push(t[s].repairType);
    } else a[t[s].packageStatus] = !0, t[s].repairReasonCodeArr.push(""), "1" == d ? t[s].repairReasonArr.push("请选择退货原因") : t[s].repairReasonArr.push("请选择换货原因"), 
    t[s].repairTypeArr.push("0"), t[s].repairReasonCodeArr.push(t[s].repairReason), 
    t[s].repairReasonArr.push(t[s].repairReasonDesc), t[s].repairTypeArr.push(t[s].repairType), 
    e.push(t[s]);
    return e;
};