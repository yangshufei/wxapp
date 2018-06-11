var flag=false;
Page({
  data:{
    name:"收货人姓名",
    tel:"收货人电话",
    addreValue:0,
    addreRange:['　　　　　　　　　　','江西省赣州市','江西省南昌市','江西省上饶市','江西省抚州市','江西省宜春市','江西省九江市'],
    door:"请输入小区/门牌号/楼层",
    index:"0"
  },
  onLoad: function(options) {
    this.setData({
      name:options.name,
      tel:options.tel,
      addreValue:options.addrevalue,
      door:options.door,
      index:options.index
    })
  },
 
  addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  //点击删除
  delete:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该地址信息吗？',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.redirectTo({
            url: '../addressList/addressList?index='+that.data.index+"&sign="+'2'
            }); 
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  //点击取消，返回上个页面
  cancel:function(){
    wx.navigateBack({
        delta: 1
    })
  },
  //点击保存
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    if(!e.detail.value.name){
      warn = "请填写您的姓名！";
    }else if(!e.detail.value.tel){
      warn = "请填写您的手机号！";
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))){
      warn = "手机号格式不正确";
    }else if(!e.detail.value.addre){
      warn = "请选择您的所在区域";
    }else if(!e.detail.value.door){
      warn = "请输入您的具体地址";
    }else{
      flag=true;
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        wx.redirectTo({
        url: '../addressList/addressList?tel='+e.detail.value.tel+"&addre="+that.data.addreRange[e.detail.value.addre]+"&door="+e.detail.value.door+"&name="+e.detail.value.name+"&sign="+'1'+"&addrevalue="+e.detail.value.addre+"&index="+that.data.index
        //？后面跟的是需要传递到下一个页面的参数
      }); 
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }   
  },
  
})