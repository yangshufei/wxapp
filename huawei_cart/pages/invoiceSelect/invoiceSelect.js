var e = getApp(), a = e.globalData.mp, t = e.globalData.config;

Page({
    data: {
        invoiceTypes: [ {
            type: "1",
            invoiceName: "纸质普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0
        }, {
            type: "50",
            invoiceName: "电子普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0
        }, {
            type: "3",
            invoiceName: "专用发票",
            className: "",
            contentClass: "hide"
        }, {
            type: "0",
            invoiceName: "不开发票",
            className: "",
            contentClass: "hide"
        } ],
        ucToorder: {
            0: "0",
            1: "1",
            3: "3",
            50: "2"
        },
        ucInfo: {},
        orderInfo: {},
        defaultType: "",
        lastClickType: "",
        invoiceReq: {},
        oldAddress: {},
        checkboxImageName: "checkbox.png",
        checkboxImageNameSelected: "checkbox_selected.png",
        setDefault: !0,
        checkItems: [ {
            value: "1",
            checked: "true"
        } ],
        addressSelectStatus: "hide",
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
        newAddress: {
            district: "",
            consignee: "",
            mobile: "",
            province: "",
            city: "",
            street: "",
            address: "",
            _method: "POST"
        }
    },
    onLoad: function(e) {
        wx.hideShareMenu(), this.setData({
            defaultInvoiceInfo: JSON.parse(decodeURIComponent(e.params))
        }), this.initInvoice(), this.initAddress();
    },
    onShow: function() {
        wx.getStorageSync("confirmVOList");
    },
    initInvoice: function() {
        var e = this, a = wx.getStorageSync("confirmVOList"), t = wx.getStorageSync("userInvoiceInfoVO"), i = (e.data.defaultInvoiceInfo, 
        e.data.invoiceTypes);
        e.setData({
            defaultType: a.defaultInvoiceType
        });
        var s = e.data.defaultType;
        switch (s) {
          case "0":
            i[3].contentClass = "", i[3].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("0") && (i[3].className = "disabledandchecked");
            break;

          case "1":
            i[0].contentClass = "", i[0].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("1") && (i[0].className = "disabledandchecked"), 
            i[0].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? i[0].checked = !1 : i[0].checked = !0;
            break;

          case "3":
            i[2].contentClass = "", i[2].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("3") && (i[2].className = "disabledandchecked");
            break;

          case "50":
            i[1].contentClass = "", i[1].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("50") && (i[1].className = "disabledandchecked"), 
            i[1].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? i[1].checked = !1 : i[1].checked = !0;
        }
        e.setData({
            invoiceTypes: i
        }), t && t.invoiceInfoVOList && (t.invoiceInfoVOList.forEach(function(e) {
            switch (e.invoiceType) {
              case "0":
                i[3].carrierCode = a.carrierCode;
                break;

              case "1":
                i[0].company = e.company, i[0].taxpayerId = e.taxpayerId, i[0].carrierCode = a.carrierCode;
                break;

              case "3":
                i[2].company = e.company, i[2].taxpayInvoiceInfoVO = e.taxpayInvoiceInfoVO, i[2].company = e.company, 
                i[2].taxpayerId = e.taxpayInvoiceInfoVO.taxpayerId, i[2].regAddress = e.taxpayInvoiceInfoVO.regAddress, 
                i[2].regTelephone = e.taxpayInvoiceInfoVO.regTelephone, i[2].bank = e.taxpayInvoiceInfoVO.bank, 
                i[2].bankAccount = e.taxpayInvoiceInfoVO.bankAccount, i[2].checkTaker = e.taxpayInvoiceInfoVO.checkTaker, 
                i[2].takerMobile = e.taxpayInvoiceInfoVO.takerMobile, i[2].takerAddress = e.taxpayInvoiceInfoVO.takerAddress, 
                i[2].takerProvince = e.taxpayInvoiceInfoVO.takerProvince, i[2].takerCity = e.taxpayInvoiceInfoVO.takerCity, 
                i[2].takerDistrict = e.taxpayInvoiceInfoVO.takerDistrict, i[2].takerStreet = e.taxpayInvoiceInfoVO.takerStreet, 
                i[2].carrierCode = a.carrierCode;
                break;

              case "2":
                i[1].company = e.company, i[1].taxpayerId = e.taxpayerId, i[1].carrierCode = a.carrierCode;
            }
        }), e.setData({
            invoiceTypes: i
        })), i.forEach(function(e, t) {
            switch (e.type) {
              case "0":
                i[3].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("0") && "0" != s && (i[3].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("0") || (i[3].className = "hide");
                break;

              case "1":
                i[0].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("1") && "1" != s && (i[0].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("1") || (i[0].className = "hide");
                break;

              case "3":
                i[2].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("3") && "3" != s && (i[2].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("3") || (i[2].className = "hide");
                break;

              case "50":
                i[1].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("50") && "50" != s && (i[1].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("50") || (i[1].className = "hide");
            }
        }), e.setData({
            invoiceTypes: i
        });
    },
    chooseInvoiceType: function(e) {
        var a = this, t = a.data.invoiceTypes;
        if ("disabled" == t[e.currentTarget.dataset.index].className || "disabledandchecked" == t[e.currentTarget.dataset.index].className) return wx.showModal({
            title: "提示",
            content: "订单包含不支持开" + t[e.currentTarget.dataset.index].invoiceName + "的商品",
            showCancel: !1
        }), !1;
        t.forEach(function(e, a) {
            "disabled" != e.className && "disabledandchecked" != e.className && "hide" != e.className && (e.className = ""), 
            "disabledandchecked" == e.className && (e.className = "disabled"), e.contentClass = "hide";
        }), t[e.currentTarget.dataset.index].className = "checked", t[e.currentTarget.dataset.index].contentClass = "", 
        a.setData({
            invoiceTypes: t
        });
    },
    chooseTitleType: function(e) {
        var a = this, t = a.data.invoiceTypes, i = e.detail.value;
        "1" == i.split("-")[1] ? "sigle" == i.split("-")[0] ? (t[0].checked = !0, t[0].titleType = 1) : (t[0].checked = !1, 
        t[0].titleType = 2) : "sigle" == i.split("-")[0] ? (t[1].checked = !0, t[1].titleType = 1) : (t[1].checked = !1, 
        t[1].titleType = 2), a.setData({
            invoiceTypes: t
        });
    },
    updateInvoice: function() {
        var e = this;
        this.constructInvoiceData(), e.data.invoiceReq.valid && a.mpGet(t.service.ucDomain + "/invoice/updateInvoiceInfo.json", e.data.invoiceReq, {
            successFunc: function(a) {
                if (a.data) var t = JSON.parse(a.data.split("(")[1].split(")")[0]);
                if ("200" == t.resultCode) {
                    var i = e.data.invoiceReq;
                    "2" == i.invoiceType && (i.invoiceType = "50"), wx.setStorageSync("invoiceInfoForConfirm", i), 
                    wx.navigateBack();
                } else wx.showModal({
                    title: "提示",
                    content: "保存发票信息失败",
                    showCancel: !1
                });
            }
        });
    },
    constructInvoiceData: function() {
        var e = this, a = e.data.invoiceTypes;
        a.forEach(function(t, i) {
            switch (t.type) {
              case "0":
                if ("checked" == a[3].className) {
                    s = {
                        invoiceType: 0,
                        carrierCode: a[3].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: s
                    });
                } else if ("disabledandchecked" == a[3].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[3].invoiceName + "的商品",
                        showCancel: !1
                    });
                    s = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: s
                    });
                }
                break;

              case "1":
                if ("checked" == a[0].className) {
                    if (2 == a[0].titleType) if (e.validCompanyName(a[0])) {
                        s = {
                            company: a[0].company,
                            invoiceType: 1,
                            titleType: 2,
                            carrierCode: a[0].carrierCode,
                            valid: !0
                        };
                        a[0].taxpayerId ? s.taxpayerId = a[0].taxpayerId : s.taxpayerId = "";
                    } else s = {
                        valid: !1
                    }; else s = {
                        invoiceType: 1,
                        titleType: a[0].titleType || 1,
                        carrierCode: a[0].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: s
                    });
                } else if ("disabledandchecked" == a[0].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[0].invoiceName + "的商品",
                        showCancel: !1
                    });
                    s = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: s
                    });
                }
                break;

              case "3":
                if ("checked" == a[2].className) {
                    if (e.validSpecialType(a[2])) s = {
                        company: a[2].company,
                        taxpayerId: a[2].taxpayerId,
                        regAddress: a[2].regAddress,
                        regTelephone: a[2].regTelephone,
                        bank: a[2].bank,
                        bankAccount: a[2].bankAccount,
                        checkTaker: a[2].checkTaker,
                        takerMobile: a[2].takerMobile,
                        takerAddress: a[2].takerAddress,
                        takerProvince: a[2].takerProvince,
                        takerCity: a[2].takerCity,
                        takerDistrict: a[2].takerDistrict,
                        takerStreet: a[2].takerStreet || "",
                        invoiceType: 3,
                        carrierCode: a[2].carrierCode,
                        valid: !0
                    }; else s = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: s
                    });
                } else if ("disabledandchecked" == a[2].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[2].invoiceName + "的商品",
                        showCancel: !1
                    });
                    s = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: s
                    });
                }
                break;

              case "50":
                if ("checked" == a[1].className) {
                    if (2 == a[1].titleType) if (e.validCompanyName(a[1])) s = {
                        company: a[1].company,
                        taxpayerId: a[1].taxpayerId,
                        invoiceType: 2,
                        titleType: 2,
                        carrierCode: a[1].carrierCode,
                        valid: !0
                    }; else s = {
                        valid: !1
                    }; else s = {
                        invoiceType: 2,
                        titleType: a[1].titleType || 1,
                        carrierCode: a[1].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: s
                    });
                } else if ("disabledandchecked" == a[1].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[1].invoiceName + "的商品",
                        showCancel: !1
                    });
                    var s = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: s
                    });
                }
            }
        });
    },
    checkValue: function(e) {
        var a = {
            "company-1": "",
            "taxpayerId-1": "",
            "company-50": "",
            "taxpayerId-50": "",
            company: "",
            taxpayerId: "",
            regAddress: "",
            regTelephone: "",
            bank: "",
            bankAccount: "",
            checkTaker: "",
            takerMobile: "",
            takerAddress: ""
        };
        ("input" == e.type && "" != e.detail.value || "" != e.detail.value) && (a[e.currentTarget.id] = "show"), 
        this.setData({
            clearIcons: a
        });
        var t = this.data.invoiceTypes, i = e.currentTarget.id.split("-");
        i.length > 1 ? 1 == i[1] ? t[0][i[0]] = e.detail.value : t[1][i[0]] = e.detail.value : t[2][i[0]] = e.detail.value, 
        this.setData({
            invoiceTypes: t
        });
    },
    clearInputValue: function(e) {
        var a = this.data.invoiceTypes, t = e.currentTarget.dataset.contentid.split("-");
        t.length > 1 ? 1 == t[1] ? a[0][t[0]] = "" : a[1][t[0]] = "" : a[2][t[0]] = "", 
        this.setData({
            invoiceTypes: a
        });
    },
    openAddress: function(e) {
        this.setData({
            addressSelectStatus: ""
        }), this.getAddressValues();
    },
    closeAddress: function(e) {
        var a = this;
        this.setData({
            addressSelectStatus: "hide",
            addressNameOld: this.data.addressName,
            addressIdOld: this.data.addressId,
            closeButtonClick: !0
        }), this.data.addressId.street ? this.setData({
            needL4Addr: !1
        }) : this.data.addressId.district ? a.getChildrenAddress(a.data.addressId.district) : this.setData({
            needL4Addr: !0
        });
        var t = a.data.addressId, i = a.data.addressName, s = a.data.invoiceTypes;
        s[2].takerProvince = t.province, s[2].takerCity = t.city, s[2].takerDistrict = t.district, 
        s[2].takerStreet = t.street, s[2].takerProvinceName = i.province, s[2].takerCityName = i.city, 
        s[2].takerDistrictName = i.district, s[2].takerStreetName = i.street, a.setData({
            invoiceTypes: s
        });
    },
    getAddressValues: function() {
        var e = this;
        e.data.invoiceTypes;
        e.data.closeButtonClick || ("" == e.data.addressIdOld.province ? a.mpGet(t.service.addressDomain + "/data/region/tree/0.json", {}, {
            successFunc: function(a) {
                e.setData({
                    addressDatas: a.data.data[0],
                    needL4Addr: !0
                });
            }
        }) : a.mpGet(t.service.addressDomain + "/data/region/children/" + (e.data.addressIdOld.street || e.data.addressIdOld.district || e.data.addressIdOld.city || e.data.addressIdOld.province) + ".json", {}, {
            successFunc: function(a) {
                a.data.data.length > 0 ? e.setData({
                    addressDatas: a.data.data,
                    needL4Addr: !0
                }) : e.setData({
                    needL4Addr: !1
                });
            }
        }));
    },
    getChildrenAddress: function(e) {
        var i = this;
        a.mpGet(t.service.addressDomain + "/data/region/children/" + e + ".json", {}, {
            successFunc: function(e) {
                e.data.data.length > 0 ? (i.data.nextShowType[i.data.showType] && (i.data.addressName[i.data.nextShowType.district] = "请选择"), 
                i.setData({
                    addressName: i.data.addressName,
                    addressDatas: e.data.data,
                    needL4Addr: !0,
                    showType: "district"
                })) : i.setData({
                    needL4Addr: !1
                });
            }
        });
    },
    chooseAddress: function(e) {
        var i = this, s = i.data.addressName, d = i.data.addressId;
        a.mpGet(t.service.addressDomain + "/data/region/children/" + e.currentTarget.dataset.id + ".json", {}, {
            successFunc: function(a) {
                a.data.data.length > 0 ? (i.setData({
                    addressDatas: a.data.data
                }), i.setData({
                    showType: e.currentTarget.dataset.type
                }), s[i.data.showType] = e.currentTarget.dataset.name, d[i.data.showType] = e.currentTarget.dataset.id, 
                i.data.nextShowType[i.data.showType] && (s[i.data.nextShowType[i.data.showType]] = "请选择"), 
                i.setData({
                    addressName: s,
                    addressId: d,
                    needL4Addr: !0
                })) : (i.setData({
                    showType: e.currentTarget.dataset.type,
                    needL4Addr: !1,
                    closeButtonClick: !1,
                    addressSelectStatus: "hide"
                }), s[i.data.showType] = e.currentTarget.dataset.name, d[i.data.showType] = e.currentTarget.dataset.id, 
                i.setData({
                    addressName: s,
                    addressId: d
                }), i.setData({
                    addressIdOld: i.data.addressId,
                    addressNameOld: i.data.addressName
                }), i.setData({
                    showType: i.data.parentType[i.data.showType]
                }));
                var t = i.data.invoiceTypes;
                t[2].takerProvince = d.province, t[2].takerCity = d.city, t[2].takerDistrict = d.district, 
                t[2].takerStreet = d.street, t[2].takerProvinceName = s.province, t[2].takerCityName = s.city, 
                t[2].takerDistrictName = s.district, t[2].takerStreetName = s.street, i.setData({
                    invoiceTypes: t
                });
            }
        });
    },
    changeAddress: function(e) {
        var i = this;
        switch (i.setData({
            showType: i.data.parentType[e.target.dataset.type]
        }), e.target.dataset.type) {
          case "province":
            i.setData({
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
            }), a.mpGet(t.service.addressDomain + "/data/region/tree/0.json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && i.setData({
                        addressDatas: e.data.data[0]
                    });
                }
            });
            break;

          case "city":
            i.setData({
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
            }), a.mpGet(t.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && i.setData({
                        addressDatas: e.data.data
                    });
                }
            });
            break;

          case "district":
            i.setData({
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
            }), a.mpGet(t.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && i.setData({
                        addressDatas: e.data.data
                    });
                }
            });
            break;

          case "street":
            i.setData({
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
            }), a.mpGet(t.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 ? i.setData({
                        addressDatas: e.data.data,
                        needL4Addr: !0
                    }) : i.setData({
                        needL4Addr: !1
                    });
                }
            });
        }
    },
    initAddress: function() {
        var e = this, a = {
            provinceName: "",
            cityName: "",
            districtName: "",
            streetName: "",
            district: e.data.invoiceTypes[2].takerDistrict,
            province: e.data.invoiceTypes[2].takerProvince,
            city: e.data.invoiceTypes[2].takerCity,
            street: e.data.invoiceTypes[2].takerStreet
        };
        this.setData({
            showType: "start",
            oldAddress: a,
            newAddress: a,
            addressId: {
                province: e.data.invoiceTypes[2].takerProvince || "",
                city: e.data.invoiceTypes[2].takerCity || "",
                district: e.data.invoiceTypes[2].takerDistrict || "",
                street: e.data.invoiceTypes[2].takerStreet || ""
            },
            addressName: {
                province: e.data.invoiceTypes[2].provinceName || "",
                city: e.data.invoiceTypes[2].cityName || "",
                district: e.data.invoiceTypes[2].districtName || "",
                street: e.data.invoiceTypes[2].streetName || ""
            },
            addressIdOld: {
                province: e.data.invoiceTypes[2].takerProvince || "",
                city: e.data.invoiceTypes[2].takerCity || "",
                district: e.data.invoiceTypes[2].takerDistrict || "",
                street: e.data.invoiceTypes[2].takerStreet || ""
            },
            addressNameOld: {
                province: e.data.invoiceTypes[2].provinceName || "",
                city: e.data.invoiceTypes[2].cityName || "",
                district: e.data.invoiceTypes[2].districtName || "",
                street: e.data.invoiceTypes[2].streetName || ""
            }
        }), "" != e.data.invoiceTypes[2].takerProvince && void 0 != e.data.invoiceTypes[2].takerProvince ? e.initOldAddress() : (e.data.addressName.province = "请选择", 
        e.setData({
            addressName: e.data.addressName
        }));
    },
    initOldAddress: function() {
        var e = this;
        "" != e.data.invoiceTypes[2].takerProvince && a.mpGet(t.service.addressDomain + "/data/region/tree/" + (e.data.addressIdOld.street || e.data.addressIdOld.district || e.data.addressIdOld.city || e.data.addressIdOld.province) + ".json", {}, {
            successFunc: function(a) {
                if (3 == a.data.data.length) {
                    e.setData({
                        showType: "city",
                        addressDatas: a.data.data[2]
                    }), e.getChildrenAddress(e.data.addressId.district);
                    var t = e.data.addressName;
                    a.data.data[2].forEach(function(e) {
                        e.id == a.data.values[2] && (t.district = e.name);
                    }), a.data.data[1].forEach(function(e) {
                        e.id == a.data.values[1] && (t.city = e.name);
                    }), a.data.data[0].forEach(function(e) {
                        e.id == a.data.values[0] && (t.province = e.name);
                    }), e.setData({
                        addressName: t
                    });
                } else if (4 == a.data.data.length) {
                    var i = e.data.addressName;
                    a.data.data[3].forEach(function(e) {
                        e.id == a.data.values[3] && (i.street = e.name);
                    }), a.data.data[2].forEach(function(e) {
                        e.id == a.data.values[2] && (i.district = e.name);
                    }), a.data.data[1].forEach(function(e) {
                        e.id == a.data.values[1] && (i.city = e.name);
                    }), a.data.data[0].forEach(function(e) {
                        e.id == a.data.values[0] && (i.province = e.name);
                    }), e.setData({
                        showType: "district",
                        addressDatas: a.data.data[3],
                        needL4Addr: !1,
                        addressName: i
                    });
                }
            }
        });
    },
    validCompanyName: function(e) {
        if (e.company) a = this.getStrLength(e.company); else var a = 0;
        if (0 == a) return wx.showModal({
            title: "提示",
            content: "【单位名称】不能为空",
            showCancel: !1
        }), !1;
        if (a < 3) return wx.showModal({
            title: "提示",
            content: "【单位名称】必须大于2个字符",
            showCancel: !1
        }), !1;
        if (a > 100) return wx.showModal({
            title: "提示",
            content: "【单位名称】不能超过100个字符",
            showCancel: !1
        }), !1;
        var t = /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{18}|[0-9A-Z]{20})$/;
        if (/[\*\/\+\$\^\\\<\>\{\}%~&-]|[";=']/.test(e.company)) return wx.showModal({
            title: "提示",
            content: "【单位名称】不能包含非法字符",
            showCancel: !1
        }), !1;
        var i = wx.getStorageSync("confirmVOList");
        if (i.invoiceTypeInfo.invoiceLimitCorpList && i.invoiceTypeInfo.invoiceLimitCorpList.length > 0 && -1 != i.invoiceTypeInfo.invoiceLimitCorpList.indexOf(e.company)) return wx.showModal({
            title: "提示",
            content: "单位名称不能为" + e.company + "请重新输入",
            showCancel: !1
        }), !1;
        if (2 == e.titleType) if (void 0 == e.taxpayerId || "" == e.taxpayerId) {
            if (50 == e.type) return wx.showModal({
                title: "提示",
                content: "【纳税人识别号】不能为空",
                showCancel: !1
            }), !1;
        } else if (void 0 != e.taxpayerId && "" != e.taxpayerId && null == e.taxpayerId.match(t)) return wx.showModal({
            title: "提示",
            content: "【纳税人识别号】格式不正确，请输入15,18,20位的数字或大写字母+数字",
            showCancel: !1
        }), !1;
        return !0;
    },
    validSpecialType: function(e) {
        if (e.taxpayerId) a = e.taxpayerId.trim(); else var a = "";
        if (e.regAddress) t = e.regAddress.trim(); else var t = "";
        if (e.regTelephone) i = e.regTelephone.trim(); else var i = "";
        if (e.bank) s = e.bank.trim(); else var s = "";
        if (e.bankAccount) d = e.bankAccount.trim(); else var d = "";
        if (e.checkTaker) r = e.checkTaker.trim(); else var r = "";
        if (e.takerProvince) c = String(e.takerProvince).trim(); else var c = "";
        if (e.takerCity) n = String(e.takerCity).trim(); else var n = "";
        if (e.takerDistrict) o = String(e.takerDistrict).trim(); else var o = "";
        if (e.takerAddress) l = e.takerAddress.trim(); else var l = "";
        if (e.takerMobile) p = e.takerMobile.trim(); else var p = "";
        var v = {
            taxpayerCode: [ a, /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{18}|[0-9A-Z]{20})$/, "【纳税人识别号】格式不正确，请输入15,18,20位的数字或大写字母+数字", "纳税人识别号" ],
            registerAddr: [ t, /^[^\<\>\(\)\\\'\"]+$/, "【注册地址】不能包含非法字符", "注册地址" ],
            regTelephone: [ i, /^[-\d]{10,15}$/, "【注册电话】格式不正确，请输入10到15位数字或-号", "注册电话" ],
            bankName: [ s.trim(), /^[^\*\/\+\$\^\\\.\<\>\{\}\-%~&";=']+$/, "【开户银行】不能包含非法字符", "开户银行" ],
            bankAccount: [ d.trim(), /^[0-9]{6,50}$/, "【银行账户】格式不正确，请输入6-50位数字", "银行账户" ]
        };
        if (this.validCompanyName(e)) {
            for (var y in v) {
                if ("" == v[y][0]) return wx.showModal({
                    title: "提示",
                    content: "【" + v[y][3] + "】不能为空",
                    showCancel: !1
                }), !1;
                if (!v[y][1].test(v[y][0])) return wx.showModal({
                    title: "提示",
                    content: v[y][2],
                    showCancel: !1
                }), !1;
            }
            if (this.getStrLength(t) > 200) return wx.showModal({
                title: "提示",
                content: "【注册地址】不能超过200个字符",
                showCancel: !1
            }), !1;
            if (this.getStrLength(s) > 100) return wx.showModal({
                title: "提示",
                content: "【开户银行】不能超过100个字符",
                showCancel: !1
            }), !1;
            var h = {
                consignee: [ r, /^[\u4E00-\u9FA5\s\u3000A-Za-z]+$/, "【联系人】格式不正确，请输入2-20个中英文字符", "联系人" ],
                mobile: [ p, /^1[0-9]{10}$/, "请填写正确的11位手机号码，例如：13XXXXXXXXX", "手机号码" ],
                detailAddress: [ l, new RegExp(void 0), "收货人详细地址中含有非法字符", "详细地址" ]
            };
            for (var m in h) {
                if ("" == h[m][0]) return wx.showModal({
                    title: "提示",
                    content: "【" + h[m][3] + "】不能为空",
                    showCancel: !1
                }), !1;
                if (!h[m][1].test(h[m][0])) return wx.showModal({
                    title: "提示",
                    content: h[m][2],
                    showCancel: !1
                }), !1;
            }
            return this.getStrLength(l) > 100 ? (wx.showModal({
                title: "提示",
                content: "【详细地址】不能超过100个字符",
                showCancel: !1
            }), !1) : this.getStrLength(r) > 20 || this.getStrLength(r) < 2 ? (wx.showModal({
                title: "提示",
                content: "【联系人】格式不正确，请输入2-20个中英文字符",
                showCancel: !1
            }), !1) : "" == c ? (wx.showModal({
                title: "提示",
                content: "请选择省",
                showCancel: !1
            }), !1) : "" == n ? (wx.showModal({
                title: "提示",
                content: "请选择市",
                showCancel: !1
            }), !1) : "" != o || (wx.showModal({
                title: "提示",
                content: "请选择区",
                showCancel: !1
            }), !1);
        }
    },
    getStrLength: function(e) {
        for (var a = 0, t = e.length, i = -1, s = 0; s < t; s++) a += (i = e.charCodeAt(s)) >= 0 && i <= 128 ? 1 : 2;
        return a;
    }
});