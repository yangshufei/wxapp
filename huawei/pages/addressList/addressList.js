
var index = 0;
var list=[];

Page({
  data:{
    list:[],
  },
  onLoad: function(options) {
    var flag=false;//判断是从哪个页面跳转过来
    var sign = 0//判断从修改页面中的保存还是删除按钮过来，保存为1，删除为2
    flag =options.flag;
    sign = options.sign;
    if (flag) {
      list.push({
      "index":index++,
      "name":options.name,
      "tel":options.tel,
      "addre":options.addre+options.door,
      "image":"../../image/uncheck.png",
      "addrevalue":options.addrevalue,
      "door":options.door
      })
      this.setData({
        list
      })
    };
    if(sign=='1'){
      // console.log("我是从修改页面过来的"+options.addrevalue)
      list[options.index].name=options.name;
      list[options.index].tel=options.tel;
      list[options.index].addre=options.addre+options.door;
      list[options.index].addrevalue=options.addrevalue;
      list[options.index].door=options.door;
      this.setData({
          list
        })
    };
    // 删除页面过来
    if(sign=='2'){
        list.splice(options.index, 1);
        this.setData({
          list
        })
      }
  },
  addAddre:function(e){
      wx.navigateTo({
        url: '../addressAdd/addressAdd'
      })
    },
  toModifyAddre:function(e){
    // console.log("选中的电话"+e.currentTarget.dataset.addrevalue);
    // console.log("选中的index"+e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../addressEdit/addressEdit?name='+ e.currentTarget.dataset.name+"&tel="+e.currentTarget.dataset.tel+"&addrevalue="+e.currentTarget.dataset.addrevalue+"&door="+e.currentTarget.dataset.door+"&index="+e.currentTarget.dataset.index
    })
  },
  toSelectAddr:function(e){
    for(var i = 0;i<this.data.list.length;i++){
      if(i==e.currentTarget.dataset.index){
      list[e.currentTarget.dataset.index].image = "../../image/radio_selected.png"}
      else{
        list[i].image = "../../image/uncheck.png"
      }
    }
    wx.navigateTo({
      url: '../order/order?name='+ e.currentTarget.dataset.name+"&tel="+e.currentTarget.dataset.tel+"&addre="+e.currentTarget.dataset.addre+"&flag="+true
    });
  }
 
})