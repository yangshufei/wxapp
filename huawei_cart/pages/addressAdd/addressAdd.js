var e = getApp(), t = e.globalData.mp, a = e.globalData.config;

Page({
    data: {
        checkboxImageName: "checkbox.png",
        checkboxImageNameSelected: "checkbox_selected.png",
        setDefault: !1,
        checkItems: [ {
            value: "1",
            checked: "false"
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
        },
        clearIcons: {
            consignee: "",
            mobile: "",
            address: ""
        },
        isRepeatClicked: !1
    },
    onLoad: function(e) {
        if (wx.hideShareMenu(), void 0 != e.address) {
            var t = JSON.parse(decodeURIComponent(e.address)) || "", a = {
                consignee: t.consignee,
                mobile: t.mobile,
                district: t.districtName,
                province: t.provinceName,
                city: t.cityName,
                street: t.streetName || "",
                address: t.address,
                _method: "POST"
            }, s = {
                province: t.provinceName,
                city: t.cityName,
                district: t.districtName,
                street: t.streetName || ""
            }, d = {
                province: t.province,
                city: t.city,
                district: t.district,
                street: t.street || ""
            }, r = {
                province: t.provinceName,
                city: t.cityName,
                district: t.districtName,
                street: t.streetName || ""
            }, i = {
                province: t.province,
                city: t.city,
                district: t.district,
                street: t.street || ""
            };
            this.setData({
                newAddress: a,
                addressName: s,
                addressId: d,
                addressNameOld: r,
                addressIdOld: i,
                addressSelectStatus: t.addressSelectStatus
            });
        }
        this.getAddressValues();
    },
    setDefault: function(e) {
        this.setData({
            setDefault: !this.data.setDefault
        });
        var t = this.data.newAddress;
        this.data.setDefault ? t.defaultFlag = 1 : delete t.defaultFlag, this.setData({
            newAddress: t
        });
    },
    addAddress: function() {
        var e = this.data.newAddress;
        e.province = this.data.addressId.province, e.city = this.data.addressId.city, e.district = this.data.addressId.district, 
        e.street = this.data.addressId.street, this.setData({
            newAddress: e
        });
        var s = {
            consignee: [ this.data.newAddress.consignee, /^[A-Za-z0-9\-\_\u4e00-\u9fa5]{2,10}$/, "收货人只支持中英文、数字、下划线或减号(2-10个字)" ],
            mobile: [ this.data.newAddress.mobile, /^1[0-9]{10}$/, "手机号码格式不正确" ],
            address: [ this.data.newAddress.address.replace(/[\r\n]/g, ""), /^.{2,50}$/, "请输入详细地址(2-50个字)" ]
        };
        if (this.data.newAddress.consignee.length < 1) return wx.showModal({
            title: "提示",
            content: "收货人请输入2-10个字",
            showCancel: !1
        }), !1;
        if (this.data.newAddress.mobile.length < 1) return wx.showModal({
            title: "提示",
            content: "请输入手机号码",
            showCancel: !1
        }), !1;
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
        for (var d in s) {
            var r = s[d], i = r[0], c = r[1], n = r[2];
            if (!c.test(i)) return wx.showModal({
                title: "提示",
                content: n,
                showCancel: !1
            }), !1;
        }
        if (this.data.isRepeatClicked) return !1;
        this.setData({
            isRepeatClicked: !0
        }), setTimeout(function() {
            this.setData({
                isRepeatClicked: !1
            });
        }, 5e3), t.mpGet(a.service.addressDomain + "/member/myAddresses/add.json", this.data.newAddress, {
            successFunc: function(e) {
                e.data.success ? (wx.setStorageSync("shoppingConfigId", e.data.shoppingConfig.id), 
                wx.navigateBack({
                    delta: 2
                })) : e.data.msg && wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            },
            failFunc: function(e) {}
        });
    },
    checkValue: function(e) {
        var t = {
            consignee: "",
            mobile: "",
            address: ""
        };
        ("input" == e.type && "" != e.detail.value || "" != e.detail.value) && (t[e.currentTarget.id] = "show"), 
        this.setData({
            clearIcons: t
        });
        var a = this.data.newAddress;
        a[e.currentTarget.id] = e.detail.value, this.setData({
            newAddress: a
        });
    },
    clearInputValue: function(e) {
        var t = this.data.newAddress;
        t[e.currentTarget.dataset.contentid] = "", this.setData({
            newAddress: t
        });
    },
    openAddress: function(e) {
        this.setData({
            addressSelectStatus: ""
        }), this.getAddressValues();
    },
    closeAddress: function(e) {
        var t = this;
        this.setData({
            addressSelectStatus: "hide",
            addressNameOld: this.data.addressName,
            addressIdOld: this.data.addressId,
            closeButtonClick: !0
        }), this.data.addressId.street ? this.setData({
            needL4Addr: !1
        }) : this.data.addressId.district ? t.getChildrenAddress(t.data.addressId.district) : this.setData({
            needL4Addr: !0
        });
    },
    getAddressValues: function() {
        var e = this;
        e.data.closeButtonClick || ("" == e.data.addressIdOld.province ? t.mpGet(a.service.addressDomain + "/data/region/tree/0.json", {}, {
            successFunc: function(t) {
                e.setData({
                    addressDatas: t.data.data[0],
                    needL4Addr: !0
                });
            }
        }) : t.mpGet(a.service.addressDomain + "/data/region/tree/" + (e.data.addressIdOld.street || e.data.addressIdOld.district || e.data.addressIdOld.city || e.data.addressIdOld.province) + ".json", {}, {
            successFunc: function(t) {
                var a = e.data.addressName;
                3 == t.data.data.length ? (e.setData({
                    showType: "district"
                }), a[e.data.nextShowType[e.data.showType]] = "请选择", e.getChildrenAddress(e.data.addressId.district), 
                e.setData({
                    addressName: a
                })) : 4 == t.data.data.length && e.setData({
                    showType: "district",
                    addressDatas: t.data.data[3],
                    needL4Addr: !1
                });
            }
        }));
    },
    getChildrenAddress: function(e) {
        var s = this;
        t.mpGet(a.service.addressDomain + "/data/region/children/" + e + ".json", {}, {
            successFunc: function(e) {
                e.data.data.length > 0 ? s.setData({
                    needL4Addr: !0,
                    showType: "district",
                    addressDatas: e.data.data
                }) : s.setData({
                    needL4Addr: !1
                });
            }
        });
    },
    chooseAddress: function(e) {
        var s = this, d = s.data.addressName, r = s.data.addressId;
        t.mpGet(a.service.addressDomain + "/data/region/children/" + e.currentTarget.dataset.id + ".json", {}, {
            successFunc: function(t) {
                t.data.data.length > 0 ? (s.setData({
                    addressDatas: t.data.data
                }), s.setData({
                    showType: e.currentTarget.dataset.type
                }), d[s.data.showType] = e.currentTarget.dataset.name, r[s.data.showType] = e.currentTarget.dataset.id, 
                s.data.nextShowType[s.data.showType] && (d[s.data.nextShowType[s.data.showType]] = "请选择"), 
                s.setData({
                    addressName: d,
                    addressId: r,
                    needL4Addr: !0
                })) : (s.setData({
                    showType: e.currentTarget.dataset.type,
                    needL4Addr: !1,
                    closeButtonClick: !1,
                    addressSelectStatus: "hide"
                }), d[s.data.showType] = e.currentTarget.dataset.name, r[s.data.showType] = e.currentTarget.dataset.id, 
                s.setData({
                    addressName: d,
                    addressId: r
                }), s.setData({
                    addressIdOld: s.data.addressId,
                    addressNameOld: s.data.addressName
                }), s.setData({
                    showType: s.data.parentType[s.data.showType]
                }));
            }
        });
    },
    changeAddress: function(e) {
        var s = this;
        switch (s.setData({
            showType: s.data.parentType[e.target.dataset.type]
        }), e.target.dataset.type) {
          case "province":
            s.setData({
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
            }), t.mpGet(a.service.addressDomain + "/data/region/tree/0.json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && s.setData({
                        addressDatas: e.data.data[0]
                    });
                }
            });
            break;

          case "city":
            s.setData({
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
            }), t.mpGet(a.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && s.setData({
                        addressDatas: e.data.data
                    });
                }
            });
            break;

          case "district":
            s.setData({
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
            }), t.mpGet(a.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 && s.setData({
                        addressDatas: e.data.data
                    });
                }
            });
            break;

          case "street":
            s.setData({
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
            }), t.mpGet(a.service.addressDomain + "/data/region/children/" + e.target.dataset.parentid + ".json", {}, {
                successFunc: function(e) {
                    e.data.data.length > 0 ? s.setData({
                        addressDatas: e.data.data,
                        needL4Addr: !0
                    }) : s.setData({
                        needL4Addr: !1
                    });
                }
            });
        }
    }
});