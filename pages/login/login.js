// pages/login/login.js
const defaultAvatarUrl = '/images/default-avatar.png'

Page({
  data: {
    isAgree: false,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '未登录',
    }
  },

  onLoad() {
    // 检查是否已登录
    const token = wx.getStorageSync('token')
    if (token) {
      this.goBack()
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },


    /**
   * 微信一键登录
   */
  // handleWechatLogin() {
  //   wx.login({
  //     success: res => {
  //       if (res.code) {
  //         // 发送code到开发者服务器
  //         wx.request({
  //           url: 'http://localhost:3000/login',
  //           method: 'POST',
  //           data: {
  //             code: res.code
  //           },
  //           success: (res) => {
  //             if (res.data.status === 'success') {
  //               // 登录成功，保存自定义登录态
  //               wx.setStorageSync('token', res.data.token)
  //               wx.showToast({
  //                 title: '登录成功',
  //                 icon: 'success'
  //               })
  //             }
  //           },
  //           fail: (err) => {
  //             console.error('登录失败:', err)
  //           }
  //         })
  //       } else {
  //         console.error('登录失败:', res.errMsg)
  //       }
  //     },
  //     fail(res){
  //       // 这里打印发现微信账号登录错误
  //      console.log(res);
  //     }
  //   })
  // },

  // 处理微信登录
  handleWechatLogin() {
    if (!this.data.isAgree) {
      wx.showToast({
        title: '请先同意用户协议和隐私政策',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '登录中...',
      mask: true
    })

    wx.login({
      success: res => {
        if (res.code) {
          // 发送code到开发者服务器
          wx.request({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (res) => {
              if (res.data.status === 'success') {
                // 登录成功，保存自定义登录态
                
                wx.setStorageSync('token', res.data.token)
                wx.setStorageSync('userInfo',
                {
                  avatarUrl: defaultAvatarUrl,
                  nickName: '微信用户' + Math.floor(Math.random() * 10000)                
                })
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500,
                  success: () => {
                    setTimeout(() => {
                      this.goBack()
                    }, 1500)
                  }
                })
              }
            },
            fail: (err) => {
              console.error('登录失败:', err)
            }
          })
        } else {
          console.error('登录失败:', res.errMsg)
        }
      },
      fail(res){
        // 这里打印发现微信账号登录错误
       console.log(res);
      }
    })
  },

  // 处理协议勾选
  handleAgreementChange(e) {
    this.setData({
      isAgree: e.detail.value.length > 0
    })
  },

  // 显示用户协议
  showAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  },

  // 显示隐私政策
  showPrivacy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    })
  }
}) 