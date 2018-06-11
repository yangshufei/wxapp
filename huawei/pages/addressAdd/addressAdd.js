
Page({
  data:{
    addreValue:0,   //地址下标
    addreRange:['　　　　　　　　　　','江西省赣州市','江西省南昌市','江西省上饶市','江西省抚州市','江西省宜春市','江西省九江市']
  },
  // 选择哪个地址
  addrePickerBindchange:function(e){   
    this.setData({
      addreValue:e.detail.value
    })
  },
  // 表单提交数据
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    var flag = false;
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
        wx.redirectTo({
        url: '../addressList/addressList?tel='+e.detail.value.tel+"&addre="+that.data.addreRange[e.detail.value.addre]+"&door="+e.detail.value.door+"&name="+e.detail.value.name+"&flag="+flag+"&addrevalue="+e.detail.value.addre
        //后面跟的是需要传递到下一个页面的参数

      }); 
        //  console.log("传过去的地址下标是多少？"+e.detail.value.addre)
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })