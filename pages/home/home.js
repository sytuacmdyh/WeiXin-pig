var app = getApp()
Page({
  data: {},
  getUserInfo: function(res) {
    console.log(res)
    let userInfo = res.detail.userInfo
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    })
    wx.navigateBack({
      
    })
  }
})
