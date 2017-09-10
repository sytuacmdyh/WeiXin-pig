//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    wx.request({
      url: 'http://120.25.69.243/api/test', 
      data: {
        x: '',
        y: ''
      },
      header: {
        'Accept': 'application/json',
        'Authorization': ''
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
