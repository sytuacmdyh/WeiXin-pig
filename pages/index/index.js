//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    notes: [],
    code: null,
    openid: null,
  },

  onsubmit: function (e) {
    wx.showToast({
      title: this.data.openid,
      duration: 10000,
    })
    console.log(this.data.openid)
    wx.request({
      url: 'https://www.yzccz.cn/api/wxSendTemplate',
      data: {
        formId: e.detail.formId,
        touser: this.data.openid
      },
      header: {
        'Accept': 'application/json',
        'Authorization': app.globalData.apiToken,
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json'
    })
  },

  bindViewTap: function () {
    var tt = this;

    wx.request({
      url: 'https://www.yzccz.cn/api/getNotes',
      header: {
        'Accept': 'application/json',
        'Authorization': app.globalData.apiToken
      },
      success: function (res) {
        tt.setData({
          notes: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  getExtraInfo: function () {
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.yzccz.cn/api/wxLogin',
            data: {
              code: res.code
            },
            header: {
              'Accept': 'application/json',
              'Authorization': app.globalData.apiToken,
              'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
              console.log("xix", res)
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            that.setData({
              openid: res.data
            })
          },
          fail: function (e) {
            that.getExtraInfo()
          }
        })
      },
      fail: function (e) {
        wx.navigateTo({
          url: '../home/home'
        })
      }
    })
  }
})
