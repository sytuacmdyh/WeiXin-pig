//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getApiToken();
  },

  getApiToken: function() {
    var that = this
    if (!this.globalData.apiToken) {
      wx.request({
        url: 'https://www.yzccz.cn/api/getToken',
        success: function (res) {
          console.log(res)
          that.globalData.apiToken = 'Bearer ' + res.data
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    apiToken: null
  }
})
