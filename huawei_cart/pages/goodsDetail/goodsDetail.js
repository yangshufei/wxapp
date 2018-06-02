function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = getApp(), o = s.globalData.mp, i = s.globalData.config, n = require("../../wxParse/wxParse.js"), d = {}, r = "", u = [], c = [], m = 0, l = [];

Array.prototype.equals && console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."), 
Array.prototype.equals = function(t) {
    if (!t) return !1;
    if (this.length != t.length) return !1;
    for (var a = 0, e = this.length; a < e; a++) if (this[a] instanceof Array && t[a] instanceof Array) {
        if (!this[a].equals(t[a])) return !1;
    } else if (this[a] != t[a]) return !1;
    return !0;
}, Object.defineProperty(Array.prototype, "equals", {
    enumerable: !1
});

var f = function(t) {
    if (!t.data.isFirstComment && !t.data.isCommentLoad) return t.setData({
        isCommentLoad: !1
    }), !1;
    t.setData({
        hidden: !1
    }), o.mpGet(i.service.rmsDomain + "/comment/getCommentList.json", {
        pid: t.data.prdId,
        extraType: 0,
        pageNum: t.data.pageNum,
        pageSize: t.data.pageSize
    }, {
        successFunc: function(a) {
            if (t.setData({
                isCommentLoad: !0,
                isFirstComment: !1
            }), a.data.data.comments && 0 != a.data.data.comments.length) {
                t.setData({
                    pageNum: t.data.pageNum + 1
                });
                var e = a.data.data.hotTags, s = 100 * a.data.data.goodRate, o = a.data.data.comments, i = a.data.data.count;
                o.forEach(function(t, a) {
                    t.creationTime = t.creationTime.split("+")[0], t.scorePercent = 20 * t.score;
                }), 0 != t.data.comments.length ? t.setData({
                    comments: t.data.comments.concat(o)
                }) : t.setData({
                    comments: o
                }), t.setData({
                    hidden: !0,
                    goodRate: s,
                    hotTags: e,
                    count: i
                }), a.data.data.page && (a.data.data.page.pageNum == a.data.data.page.totalPage ? t.setData({
                    loading: !1,
                    loadMore: !1,
                    totalList: !0
                }) : t.setData({
                    loading: !0,
                    loadMore: !0
                }), t.setData({
                    totalPage: a.data.data.page.totalPage,
                    pageSize: a.data.data.page.pageSize
                }));
            } else t.data.comments.length > 0 ? t.setData({
                loading: !1,
                totalList: !0,
                noComments: !1,
                loadMore: !1
            }) : t.setData({
                loading: !1,
                totalList: !1,
                noComments: !0,
                loadMore: !1
            });
        }
    });
}, h = function(t, a) {
    var e = !1, s = [];
    return t.forEach(function(t, o) {
        a.forEach(function(a, o) {
            t == a && (e = !0, s.push(t));
        });
    }), {
        sboms: s,
        state: e
    };
}, p = function(t) {
    o.mpGet(i.service.rmsDomain + "/comment/getCommentList.json", {
        pid: t.data.prdId,
        extraType: 1,
        pageSize: 1
    }, {
        successFunc: function(a) {
            var e = a.data.data.hotTags;
            if (a.data.data.comments && 0 != a.data.data.comments.length) {
                var s = a.data.data.comments[0], o = s.headImage, i = s.creationTime.split("+")[0], n = s.content, d = s.images, r = s.userName, u = s.likes, c = s.replies, m = 20 * s.score;
                t.setData({
                    hidden: !0,
                    commentsFirst: s,
                    hotTags: e,
                    content: n,
                    creationTime: i,
                    userName: r,
                    headImage: o,
                    likes: u,
                    images: d,
                    replies: c,
                    scorePer: m
                });
            }
        },
        failFunc: function() {
            t.setData({
                toastState: !0,
                toastCont: "很抱歉，服务器开小差了"
            });
        }
    });
}, g = function(t) {
    o.mpGet(i.service.openApiDomain + "/mcp/queryPrdDisplayDetailInfo", {
        productId: t.data.prdId
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                var e = a.data.gbomAttrMappings, s = "", i = -1, n = [];
                if (a.data.sbomList && 0 != a.data.sbomList.length) {
                    for (var c in e) {
                        s = c, i += 1;
                        var m = {}, l = [];
                        e[c].forEach(function(t, a) {
                            var e = t.attrValue;
                            m[e] instanceof Array ? m[e].push(t.sbomCode) : (m[e] = [], m[e].push(t.sbomCode));
                        });
                        for (var f in m) l.push({
                            attrname: f,
                            skuIdList: m[f],
                            status: 1
                        });
                        n.push({
                            classifyName: s,
                            indexnum: i,
                            attrList: l
                        });
                    }
                    var p = "", g = [], D = a.data.sbomList;
                    D.forEach(function(a, e) {
                        t.data.defalutSkuCode && (t.data.defalutSkuCode == a.sbomCode ? a.defaultSbom = 1 : a.defaultSbom = 0), 
                        1 == a.defaultSbom && (p = a.sbomCode, t.data.nowBuy.itemId = a.sbomCode, t.data.nowBuy.qty = 1);
                    }), n[0].attrList.forEach(function(t, a) {
                        -1 != t.skuIdList.indexOf(p) ? (g = t.skuIdList, n[0].commonArrObj = t.skuIdList, 
                        t.status = 2) : t.status = 1;
                    });
                    var C = [ g ];
                    n.forEach(function(t, a) {
                        a > 0 && t.attrList.forEach(function(e, s) {
                            var o = h(e.skuIdList, C[a - 1]);
                            o.state ? -1 != o.sboms.indexOf(p) ? (e.status = 2, C.push(e.skuIdList), t.commonArrObj = e.skuIdList) : e.status = 1 : e.status = 0;
                        });
                    }), t.setData({
                        nowBuy: t.data.nowBuy,
                        skuList: a.data.sbomList,
                        deal_skuAttrValueList: n,
                        orgin_skuAttrValueList: a.data.gbomAttrMappings,
                        current_skuId: p
                    }), y(t), D.forEach(function(a, e) {
                        if (u.push(a.sbomCode), 1 == a.defaultSbom) {
                            r = a.sbomCode;
                            var s = a.groupPhotoList || [], i = a.name, n = a.price, c = a.priceMode, m = a.limitedQuantity, l = a.sbomPromWord, f = a.timerPromWord, h = a.giftList, p = a.buttonMode, g = [], D = {
                                photoName: a.photoName,
                                photoPath: a.photoPath
                            };
                            if (h && h.length > 0) {
                                h.forEach(function(a, e) {
                                    t.data.giftCodesList.push(a.sbomCode), a.gbomAttrList.forEach(function(t, e) {
                                        "颜色" == t.attrName && (a.giftColor = t);
                                    });
                                }), g = w(h), t.setData({
                                    giftCodesList: t.data.giftCodesList
                                }), t.setData({
                                    tempGiftList: g
                                }), t.setData({
                                    limitedQuantity: m
                                });
                                var y = t.data.giftCodesList;
                                y.push(a.sbomCode), t.getGiftInventory(y);
                            } else t.setData({
                                limitedQuantity: m
                            }), t.getSkuInventory(a.sbomCode), t.data.giftCodesList = [], t.setData({
                                giftCodesList: t.data.giftCodesList
                            }), t.setData({
                                giftsUsefulList: []
                            }), t.setData({
                                showGifts: !1
                            }), t.data.nowBuy.gifts = [];
                            d = {
                                amount: 1,
                                name: i,
                                price: n,
                                priceMode: c,
                                groupPhotoList: s,
                                mainPhoto: D,
                                imgAmt: s.length + 1,
                                sbomPromWord: l,
                                timerPromWord: f,
                                buttonMode: p
                            }, t.setData({
                                nowBuy: t.data.nowBuy
                            }), t.setData(d), S(t), T(t, r), o.mpReport(400020001, {
                                load: "1",
                                SKUCode: r
                            });
                        }
                    });
                } else t.setData({
                    showProDown: !0
                });
            } else t.setData({
                showProDown: !0
            });
        }
    });
}, D = function(t) {
    for (var a = t.data.deal_skuAttrValueList, e = [], s = 0; s < a.length; s++) !function(t) {
        a[t].attrList.forEach(function(a, s) {
            2 == a.status && (0 == t && (e = a.skuIdList), e = C(a.skuIdList, e));
        });
    }(s);
    t.setData({
        current_skuId: e[0]
    }), t.data.skuList.forEach(function(a, e) {
        t.data.current_skuId == a.skuId && t.setData({
            phoneName: a.skuName,
            phonePrice: a.skuPrice,
            relatedProductList: a.relatedProductList,
            optionalGifPrdLst: a.optionalGifPrdLst,
            paywayList: a.benefitInfos,
            extendPrdList: a.extendPrdList,
            accidentPrdList: a.accidentPrdList,
            serviceList: a.serviceInfos
        });
    });
}, y = function(t, a) {
    if (a) {
        var s = function() {
            if (m = a.indexnum, 0 == a.status) return {
                v: void 0
            };
            for (var e = t.data.deal_skuAttrValueList, s = "", o = l = a.skuidlist, i = 0; i < e.length; i++) !function(t) {
                if (t > m) {
                    for (var i = 0; i < e[t].attrList.length; i++) e[t].attrList[i].status = 1;
                    for (var n = 0; n < e[t].attrList.length; n++) {
                        var d = e[t].attrList[n], r = {
                            state: !1
                        };
                        if (e[t].commonArrObj && (r = h(o, e[t].commonArrObj)), r.state) if ("" == s && 1 == r.sboms.length && (s = r.sboms[0]), 
                        d.skuIdList.equals(e[t].commonArrObj)) d.status = 2; else {
                            d.status = 1;
                            var u = h(d.skuIdList, o);
                            "" == s && 1 == u.sboms.length && (s = u.sboms[0]), u.state ? d.status = 1 : d.status = 0;
                        } else {
                            d.status = 1;
                            var c = h(d.skuIdList, o);
                            if ("" == s && 1 == c.sboms.length && (s = c.sboms[0]), c.state) {
                                for (var f = !1, p = 0; p < e[t].attrList.length; p++) 2 == e[t].attrList[p].status && (f = !0);
                                d.status = f ? 1 : 2;
                            } else d.status = 0;
                        }
                    }
                    for (var g = 0; g < e[t].attrList.length; g++) {
                        var D = e[t].attrList[g];
                        if (2 == D.status && (e[t].commonArrObj = D.skuIdList, o = D.skuIdList, t > 0 && e[t - 1].commonArrObj)) {
                            var y = h(e[t - 1].commonArrObj, o);
                            y.state && (o = y.sboms);
                        }
                    }
                } else if (t == m) a && e[t].attrList.forEach(function(s, i) {
                    a.attrname == s.attrname ? (e[t].commonArrObj = a.skuidlist, o = a.skuidlist, s.status = 2) : 0 != s.status && (s.status = 1);
                }); else if (t < m) for (var L = 0; L < e[t].attrList.length; L++) 2 == e[t].attrList[L].status && ((l = C(l, e[t].attrList[L].skuIdList)).length > 0 && (o = l), 
                "" == s && 1 == l.length && (s = l[0]));
                "" == s && t == e.length - 1 && e[t].commonArrObj.length > 0 && (s = [ e[t].commonArrObj[0] ]);
            }(i);
            t.setData({
                deal_skuAttrValueList: e,
                current_skuId: s
            });
        }();
        if ("object" === (void 0 === s ? "undefined" : e(s))) return s.v;
    } else m = 0;
    D(t);
}, C = function(t, a) {
    for (var e = [], s = 0; s < t.length; s++) for (var o = 0; o < a.length; o++) t[s] == a[o] && e.push(t[s]);
    return e;
}, L = function(t) {
    wx.request({
        url: i.service.openApiDomain + "/mcp/querySkuPicDetail",
        data: {
            skuCode: r,
            portal: "4",
            orderSourceList: "18",
            lang: "zh-CN",
            country: "CN"
        },
        success: function(a) {
            t.data.getgoodImg = !0;
            var e = a.data.detail;
            a.data.detail && (e = n.wxParse("detail", "html", e, t), t.setData({
                detail: e,
                majorSpecificationList: a.data.majorSpecificationList
            }));
        }
    });
}, b = function(t) {
    o.mpGet(i.service.openApiDomain + "/mcp/querySkuSpecific", {
        skuCode: r
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                t.data.getparm = !0;
                var e = a.data, s = e.majorSpecificationList, o = e.specificationsList[0].specifications, i = o[0].value, d = o[2].value;
                i = n.wxParse("pack", "html", i, t), d = n.wxParse("service", "html", d, t), t.setData({
                    pack: i,
                    service: d,
                    specifications: a.data.specifications
                }), t.setData({
                    majorSpecificationList: s,
                    specifications: o
                });
            }
        },
        failFunc: function(a) {
            t.setData({
                toastState: !0,
                toastCont: "请求错误"
            });
        }
    });
}, v = function(t) {
    o.mpGet(i.service.openApiDomain + "/mcp/queryPrdRelatedProduct", {
        productID: t.data.prdId
    }, {
        successFunc: function(a) {
            if (a.data.relatedProductList) {
                var e = a.data.relatedProductList;
                t.setData({
                    relatedProductList: e,
                    relatedProduct: !0
                });
            } else t.setData({
                relatedProduct: !1
            });
        },
        failFunc: function(a) {
            t.setData({
                toastState: !0,
                toastCont: "请求发送失败"
            });
        }
    });
}, S = function(t) {
    o.mpGet(i.service.openApiDomain + "/mcp/querySkuCouponList", {
        skuCodes: r
    }, {
        successFunc: function(a) {
            var e = a.data.couponCodeData;
            e && e.length > 0 ? (e.forEach(function(t, a) {
                t.beginDate = o.formatTimeNumber(t.beginDate, "Y.M.D"), t.endDate = o.formatTimeNumber(t.endDate, "Y.M.D");
            }), t.setData({
                conponBtn: !0,
                couponCodeList: a.data.couponCodeData
            })) : t.setData({
                conponBtn: !1,
                couponCodeList: []
            });
        },
        failFunc: function(a) {
            t.setData({
                toastState: !0,
                toastCont: "优惠券获取失败"
            }), t.setData({
                conponBtn: !1,
                couponCodeList: [],
                toastState: !0,
                toastCont: "请求失败"
            });
        }
    });
}, T = function(t, a) {
    o.mpGet(i.service.openApiDomain + "/mcp/querySkuDetailDispInfo", {
        skuCodes: a
    }, {
        successFunc: function(a) {
            if (a.data && a.data.detailDispInfos && a.data.detailDispInfos.length > 0) {
                var e = a.data.detailDispInfos[0].skuPriceInfo;
                2 == e.priceMode ? t.data.showPrice = !1 : 1 == e.priceMode && e.unitPrice != e.orderPrice ? (t.data.showSalePrice = !0, 
                t.data.showPrice = !0) : 1 == e.priceMode && e.unitPrice == e.orderPrice && (t.data.showSalePrice = !1, 
                t.data.showPrice = !0), t.setData({
                    showSalePrice: t.data.showSalePrice,
                    showPrice: t.data.showPrice,
                    orderPrice: e.orderPrice,
                    unitPrice: e.unitPrice
                });
            } else t.setData({
                showSalePrice: !1,
                showPrice: !1
            });
        },
        faileFunc: function() {
            t.setData({
                toastState: !0,
                toastCont: "请求发送失败"
            });
        }
    });
}, w = function(t) {
    for (var a = [], e = {}, s = 0; s < t.length; s++) e[t[s].disPrdId] ? (t[s].selected = !1, 
    a[a.length - 1].push(t[s])) : (e[t[s].disPrdId] = !0, t[s].selected = !0, a.push([ t[s] ]));
    return a;
}, k = function(t, a) {
    var e = a.data.skuList;
    a.data.nowBuy.gifts = [], a.setData({
        nowBuy: a.data.nowBuy
    }), a.data.inventory = 1, e.forEach(function(e, s) {
        if (a.setData({
            openIcon: !1
        }), e.sbomCode == t) {
            r = e.sbomCode;
            var o = e.groupPhotoList || [], i = e.name, n = e.price, u = e.priceMode, m = e.limitedQuantity, l = e.sbomPromWord, f = e.timerPromWord, h = e.buttonMode, p = e.giftList, g = [], D = 0, y = "", C = "", b = {
                photoName: e.photoName,
                photoPath: e.photoPath
            };
            if (p && p.length > 0) {
                a.data.giftCodesList = [], p.forEach(function(t, e) {
                    a.data.giftCodesList.push(t.sbomCode), t.gbomAttrList.forEach(function(a, e) {
                        "颜色" == a.attrName && (t.giftColor = a);
                    });
                }), g = w(p), a.setData({
                    giftCodesList: a.data.giftCodesList
                }), a.setData({
                    tempGiftList: g
                });
                var v = a.data.giftCodesList;
                v.push(e.sbomCode), a.setData({
                    limitedQuantity: m
                }), a.getGiftInventory(v);
            } else a.setData({
                limitedQuantity: m
            }), a.getSkuInventory(e.sbomCode), a.data.giftCodesList = [], a.setData({
                giftCodesList: a.data.giftCodesList
            }), a.setData({
                giftsUsefulList: []
            }), a.setData({
                giftList: []
            }), a.setData({
                showGifts: !1
            });
            r && a.data.sbomCodeInventoryList && a.data.sbomCodeInventoryList.length > 0 && a.data.sbomCodeInventoryList.forEach(function(t, a) {
                t.skuCode == r && (D = t.inventoryQty);
            }), r && c && c.length > 0 && c.forEach(function(t, a) {
                t.skuPriceInfo.sbomCode == r && (y = t.skuPriceInfo.unitPrice, C = t.skuPriceInfo.promotionWord);
            }), d = {
                amount: 1,
                name: i,
                price: n,
                priceMode: u,
                groupPhotoList: o,
                mainPhoto: b,
                imgAmt: o.length + 1,
                sbomPromWord: l,
                timerPromWord: f,
                buttonMode: h,
                inventory: D,
                salePrice: y,
                promotionWord: C
            }, a.setData(d), T(a, r), S(a), L(a);
        }
    });
};

Page({
    data: (a = {
        defalutSkuCode: "",
        hidden: !0,
        goods: !0,
        goodsTab: !0,
        details: !1,
        param: !1,
        evaluate: !1,
        imgIndex: 1,
        currentIndex: 0,
        imgLarge: 1,
        flag: !0,
        openIcon: !1,
        closeIcon: !1,
        packing: "",
        custServicename: "",
        bigImg: ""
    }, t(a, "hidden", !1), t(a, "optionalGifPrdLst", []), t(a, "current_skuId", ""), 
    t(a, "majorSpecificationList", []), t(a, "scrollTop", 0), t(a, "scrollHeight", 0), 
    t(a, "remarkList", []), t(a, "defaultAttrSkuid", ""), t(a, "relatedProductList", []), 
    t(a, "skuList", []), t(a, "remarkLabel", []), t(a, "imgdetailsrc", ""), t(a, "prdId", ""), 
    t(a, "phoneName", ""), t(a, "phonePrice", ""), t(a, "paywayList", []), t(a, "serviceList", []), 
    t(a, "accidentPrdList", []), t(a, "extendPrdList", []), t(a, "firstIndex", -1), 
    t(a, "deal_skuAttrValueList", []), t(a, "orgin_skuAttrValueList", []), t(a, "attrValueList", []), 
    t(a, "amount", 1), t(a, "index", 1), t(a, "scaleWidth", ""), t(a, "scaleHeight", ""), 
    t(a, "showRed", 0), t(a, "inventory", 1), t(a, "limitedQuantity", 0), t(a, "toastState", !1), 
    t(a, "toastCont", ""), t(a, "giftCodesList", []), t(a, "giftsUsefulList", []), t(a, "showProDown", !1), 
    t(a, "buttonClass", "disabled"), t(a, "buttonText", ""), t(a, "buttonAreaClass", "hide"), 
    t(a, "showPrice", "null"), t(a, "showSalePrice", ""), t(a, "totalList", !1), t(a, "loading", !1), 
    t(a, "loadMore", !1), t(a, "pageSize", 20), t(a, "comments", []), t(a, "noComments", !1), 
    t(a, "totalRow", ""), t(a, "totalPage", ""), t(a, "nowBuy", {
        itemId: "",
        itemType: "S0",
        qty: 1,
        gifts: []
    }), t(a, "numDelClass", ""), t(a, "numAddClass", ""), t(a, "skuLimitQty", "1"), 
    t(a, "isCommentLoad", !1), t(a, "isFirstComment", !0), t(a, "pageNum", 1), t(a, "getgoodImg", !1), 
    t(a, "getparm", !1), a),
    onLoad: function(t) {
        wx.showShareMenu({
            withShareTicket: !0
        }), t.skuCode && this.setData({
            defalutSkuCode: t.skuCode
        }), this.setData({
            prdId: t.prdId,
            cdnPath: i.service.cdnPath
        }), f(this), p(this), g(this), v(this);
    },
    onReady: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                });
            }
        }), this.setData({
            scaleHeight: this.data.windowHeight,
            scaleWidth: this.data.windowWidth
        });
    },
    selectGood: function(t) {
        var a = t.currentTarget.dataset;
        if ("0" == a.status) return !1;
        this.setData({
            defaultAttrSkuList: a.skuidlist,
            imgIndex: 1,
            currentIndex: 0
        }), y(this, a), k(this.data.current_skuId, this), this.data.nowBuy.itemId = this.data.current_skuId, 
        this.setData({
            nowBuy: this.data.nowBuy
        });
    },
    selectGift: function(t) {
        var a = this;
        this.data.nowBuy.gifts = [], this.data.giftList[t.currentTarget.dataset.listidx].forEach(function(t, a) {
            t.selected = !1;
        }), this.data.giftList[t.currentTarget.dataset.listidx][t.currentTarget.dataset.coloridx].selected = !0, 
        this.data.giftList.forEach(function(t, e) {
            t.forEach(function(t, e) {
                t.selected && a.data.nowBuy.gifts.push({
                    sbomCode: t.sbomCode
                });
            });
        }), this.setData({
            nowBuy: a.data.nowBuy
        }), this.setData({
            giftList: this.data.giftList
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
    changIndex: function(t) {
        this.setData({
            imgIndex: t.detail.current + 1
        });
    },
    chang_bigimg_Index: function(t) {
        this.setData({
            click_item: t.detail.current + 1
        });
    },
    swipclick: function(t) {
        var a = this, e = t.currentTarget.dataset.large, s = t.currentTarget.dataset.index, o = t.currentTarget.dataset.bigimages, i = t.currentTarget.dataset.score, n = t.currentTarget.dataset.content, d = [];
        a.setData({
            flag: !1,
            large: e,
            bigImg: s,
            bigImages: o,
            score: i,
            content: n,
            click_item: s + 1
        }), a.data.bigImages.forEach(function(t, a) {
            d.push(t.large);
        }), wx.previewImage({
            current: a.data.large,
            urls: d
        });
    },
    closebigImg: function() {
        this.setData({
            flag: !0
        });
    },
    goTogoods: function() {
        this.setData({
            goodsTab: !0,
            goods: !0,
            details: !1,
            param: !1,
            evaluate: !1,
            evaluateTab: !1,
            scrollTop: 0
        });
    },
    goTodetails: function() {
        this.data.getgoodImg || L(this), this.setData({
            goods: !1,
            goodsTab: !1,
            details: !0,
            param: !1,
            evaluate: !1,
            evaluateTab: !1,
            scrollTop: 0
        });
    },
    goToparam: function() {
        this.data.getparm || b(this), this.setData({
            goods: !1,
            goodsTab: !1,
            details: !1,
            param: !0,
            evaluate: !1,
            evaluateTab: !1,
            scrollTop: 0
        });
    },
    goToevaluate: function() {
        this.setData({
            goods: !1,
            goodsTab: !1,
            details: !1,
            param: !1,
            evaluate: !0,
            scrollTop: 0
        }), this.data.remarkList.length < 0 && f(this);
    },
    addNum: function(t) {
        var a = this, e = this.data.amount;
        e < a.data.skuLimitQty ? (a.data.nowBuy.qty = e + 1, a.setData({
            amount: e + 1,
            nowBuy: a.data.nowBuy
        }), a.data.amount == a.data.skuLimitQty && 2 == a.data.amount ? (a.data.numAddClass = "disabled", 
        a.data.numDelClass = "") : a.data.amount == a.data.skuLimitQty && (a.data.numAddClass = ""), 
        e + 1 == a.data.skuLimitQty && (a.data.numAddClass = "disabled"), a.setData({
            numAddClass: a.data.numAddClass,
            numDelClass: ""
        })) : (a.data.nowBuy.qty = e, a.setData({
            amount: e,
            nowBuy: a.data.nowBuy
        }), a.setData({
            toastState: !0,
            toastCont: "哎哟，购买数达上限啦",
            numAddClass: "disabled"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3));
    },
    reduceNum: function(t) {
        var a = this.data.amount;
        if (a <= 1) return !1;
        2 == a && a == this.data.skuLimitQty ? this.setData({
            numAddClass: "",
            numDelClass: "disabled"
        }) : a == this.data.skuLimitQty ? a == this.data.skuLimitQty && this.setData({
            numAddClass: ""
        }) : a < this.data.skuLimitQty && 2 == a && this.setData({
            numDelClass: "disabled"
        }), this.data.nowBuy.qty = a - 1, this.setData({
            numDelClass: this.data.numDelClass,
            numAddClass: "",
            amount: a - 1,
            nowBuy: this.data.nowBuy
        });
    },
    openGetCoupon: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showGetCoupon: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showGetCoupon: !1
            });
        }.bind(this), 200);
    },
    opensupport: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showsupport: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showsupport: !1
            });
        }.bind(this), 200);
    },
    loadMoreParam: function() {
        this.goToparam();
    },
    loadMoreevaluate: function() {
        this.goToevaluate();
    },
    loadCommentMore: function() {
        if (1 == this.data.totalPage || "" == this.data.totalPage || !this.data.isCommentLoad) return !1;
        f(this);
    },
    getCouponAction: function(t) {
        var a = this, e = t.currentTarget.dataset.activitycode, s = t.currentTarget.dataset.batchcode, n = t.currentTarget.dataset.idx;
        o.mpGet(i.service.amsDomain + "/couponCodeActivity/receive.json", {
            activityCode: e,
            batchCode: s,
            receiveChannel: 2
        }, {
            successFunc: function(t) {
                if (t.data.success) {
                    a.setData({
                        toastState: !0,
                        toastCont: "优惠券领取成功"
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3);
                    var e = a.data.couponCodeList;
                    e[n].state = t.data.state, a.setData({
                        couponCodeList: e
                    });
                } else {
                    var s = a.data.couponCodeList;
                    if (s[n].state = t.data.state, a.setData({
                        couponCodeList: s
                    }), "9200" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9201" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9202" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9203" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9204" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9205" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9206" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9207" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9208" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9209" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9210" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9211" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9212" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9213" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9214" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.msg
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9215" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9216" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9217" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9218" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                    if ("9219" == t.data.code) return a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 3e3), !1;
                }
            },
            failFunc: function(t) {
                a.setData({
                    toastState: !0,
                    toastCont: "请求发送失败"
                }), setTimeout(function() {
                    a.setData({
                        toastState: !1
                    });
                }, 3e3);
            }
        });
    },
    toBuy: function(t) {
        var a = this;
        if ("立即购买" != t.currentTarget.dataset.button) return !1;
        o.mpGet(i.service.wapDomain + "/member/status.json", {}, {
            successFunc: function(t) {
                t.data.success ? wx.navigateTo({
                    url: "../orderConfirm/orderConfirm?nowBuy=" + JSON.stringify([ a.data.nowBuy ])
                }) : o.mpLogin(s, function(t) {
                    a.setUserStatus();
                });
            },
            failFunc: function(t) {
                o.mpLogin(s, function(t) {
                    a.setUserStatus();
                });
            }
        }), o.mpReport(400020101, {
            buttonName: "立即购买",
            SKUCode: this.data.nowBuy.itemId,
            click: "1"
        });
    },
    getGiftInventory: function(t) {
        var a = this;
        o.mpGet(i.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(t) {
                var e = t.data.inventoryReqVOs;
                a.setData({
                    sbomCodeInventoryList: a.data.sbomCodeInventoryList
                }), e && e.length > 0 && (a.data.giftsUsefulList = [], e.forEach(function(t, e) {
                    if (t.inventoryQty > 0 && t.skuCode != r && a.data.giftsUsefulList.push(t.skuCode), 
                    t.skuCode == r) {
                        if (a.setData({
                            inventory: t.inventoryQty
                        }), 0 == a.data.limitedQuantity && a.data.inventory <= 0) a.data.numAddClass = "disabled", 
                        a.data.skuLimitQty = 0; else if (0 == a.data.limitedQuantity && a.data.inventory > 0) a.data.skuLimitQty = a.data.inventory; else if (a.data.limitedQuantity > 0 && a.data.inventory > 0) {
                            var s = [ parseInt(a.data.limitedQuantity, 10), a.data.inventory ].sort(function(t, a) {
                                return t - a;
                            })[0];
                            a.data.skuLimitQty = s, a.data.numAddClass = 1 == s ? "disabled" : "";
                        } else a.data.limitedQuantity > 0 && a.data.inventory <= 0 && (a.data.skuLimitQty = 0, 
                        a.data.numAddClass = "disabled");
                        a.data.numDelClass = "disabled", a.setData({
                            numAddClass: a.data.numAddClass,
                            numDelClass: a.data.numDelClass,
                            skuLimitQty: a.data.skuLimitQty
                        });
                    }
                }), a.setData({
                    giftsUsefulList: a.data.giftsUsefulList
                })), a.data.giftsUsefulList.length > 0 ? a.setData({
                    showGifts: !0
                }) : a.setData({
                    showGifts: !1
                });
                var s = a.data.tempGiftList, o = [];
                a.data.nowBuy.gifts = [], s.forEach(function(t, e) {
                    var s = [];
                    t.forEach(function(t, e) {
                        -1 != a.data.giftsUsefulList.indexOf(t.sbomCode) && (a.data.nowBuy.gifts.push({
                            sbomCode: t.sbomCode
                        }), s.push(t));
                    }), s.length > 0 && o.push(s);
                }), o.forEach(function(t, a) {
                    return t[0].selected = !0, t;
                }), a.setData({
                    nowBuy: a.data.nowBuy,
                    giftList: o
                }), a.data.inventory > 0 && "1" == a.data.buttonMode ? (a.data.buttonClass = "", 
                a.data.buttonText = "立即购买") : a.data.inventory <= 0 && "1" == a.data.buttonMode ? (a.data.buttonClass = "-disabled", 
                a.data.buttonText = "抱歉，暂时缺货") : "1" != a.data.buttonMode && (a.data.buttonClass = "-disabled", 
                a.data.buttonText = "抱歉，暂未开放此功能"), a.setData({
                    buttonClass: a.data.buttonClass,
                    buttonText: a.data.buttonText,
                    buttonAreaClass: ""
                });
            },
            failFunc: function(t) {
                a.setData({
                    toastState: !0,
                    toastCont: "请求发送失败"
                }), setTimeout(function() {
                    a.setData({
                        toastState: !1
                    });
                }, 3e3);
            }
        });
    },
    getSkuInventory: function(t) {
        var a = this;
        o.mpGet(i.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(t) {
                var e = 0;
                if (t.data && t.data.inventoryReqVOs && (e = t.data.inventoryReqVOs[0].inventoryQty), 
                a.setData({
                    inventory: e
                }), 0 == a.data.limitedQuantity && a.data.inventory <= 0) a.data.numAddClass = "disabled", 
                a.data.skuLimitQty = 0; else if (0 == a.data.limitedQuantity && a.data.inventory > 0) a.data.skuLimitQty = a.data.inventory; else if (a.data.limitedQuantity > 0 && a.data.inventory > 0) {
                    var s = [ parseInt(a.data.limitedQuantity, 10), a.data.inventory ].sort(function(t, a) {
                        return t - a;
                    })[0];
                    a.data.skuLimitQty = s;
                } else a.data.limitedQuantity > 0 && a.data.inventory <= 0 && (a.data.skuLimitQty = 0, 
                a.data.numAddClass = "disabled");
                a.data.numDelClass = "disabled", a.setData({
                    numAddClass: a.data.numAddClass,
                    numDelClass: a.data.numDelClass,
                    skuLimitQty: a.data.skuLimitQty
                }), a.data.inventory > 0 && "1" == a.data.buttonMode ? (a.data.buttonClass = "", 
                a.data.buttonText = "立即购买") : a.data.inventory <= 0 && "1" == a.data.buttonMode ? (a.data.buttonClass = "-disabled", 
                a.data.buttonText = "抱歉，暂时缺货") : "1" != a.data.buttonMode && (a.data.buttonClass = "-disabled", 
                a.data.buttonText = "抱歉，暂未开放此功能"), a.setData({
                    buttonClass: a.data.buttonClass,
                    buttonText: a.data.buttonText,
                    buttonAreaClass: ""
                });
            },
            failFunc: function(t) {
                a.setData({
                    toastState: !0,
                    toastCont: "请求发送失败"
                }), setTimeout(function() {
                    a.setData({
                        toastState: !1
                    });
                }, 3e3);
            }
        });
    },
    imageLarg: function(t) {
        var a = t.detail.width, e = t.detail.height, s = e / a, o = this.data.windowHeight, i = this.data.windowWidth, n = o / i, d = 0, r = 0;
        a < i && e < o ? (d = a, r = e) : s < n ? (r = i, d = i * e / a) : (d = o, r = o * a / e), 
        this.setData({
            imageHeight: d,
            imageWidth: r
        });
    },
    setUserStatus: function() {
        var t = this;
        o.mpGet(i.service.wapDomain + "/member/status.json", {}, {
            successFunc: function(a) {
                a.data.success && wx.navigateTo({
                    url: "../orderConfirm/orderConfirm?nowBuy=" + JSON.stringify([ t.data.nowBuy ])
                });
            },
            failFunc: function(t) {}
        });
    }
});