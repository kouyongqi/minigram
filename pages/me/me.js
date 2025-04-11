// pages/me/me.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false, // 是否已登录
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '未登录',
    },
    phoneNumber: '', // 用户手机号
    userGrade: '高中二年级',
    userSchool: '重点中学附属中学',
    userClass: '火箭班',
    
    // 用户统计数据
    streak: 36,
    points: 1680,
    ranking: 12,
    medals: 8,
    
    // 学科统计数据
    mathStats: {
      completed: 289,
      correctRate: 83
    },
    physicsStats: {
      completed: 176,
      correctRate: 79
    },
    chemistryStats: {
      completed: 132,
      correctRate: 81
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkUserLoginInfo()
    
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        console.log('设备信息:', res)
        // 判断是否为 iPhone 15 Pro Max
        const isIPhone15ProMax = res.model.indexOf('iPhone') > -1 && 
                               (res.screenHeight >= 926 || res.screenWidth >= 428)
        this.setData({
          isIPhone15ProMax: isIPhone15ProMax
        })
      }
    })
  },

  /**
   * 微信一键登录
   */
  handleWechatLogin() {
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
                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
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

  onChooseAvatar(e)
  {
     this.setData({
      userInfo:{
        avatarUrl:e.detail.avatarUrl
      }
     })
  },
  /**
   * 底部标签栏切换
   */
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    if (index === 3) return // 已在"我的"页面
    
    const urls = ['../index/index', '../question/list', '../study/index', '']
    wx.switchTab({
      url: urls[index]
    })
  },
  
  /**
   * 页面导航
   */
  navigateTo(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  
  /**
   * 编辑个人资料
   */
  editProfile() {
    wx.navigateTo({
      url: '/pages/profile/edit'
    })
  },
  
  /**
   * 显示会员详情
   */
  showVipDetails() {
    wx.navigateTo({
      url: '../vip/detail'
    })
  },
  
  /**
   * 联系客服
   */
  contactService() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取最新的学习统计数据
    if (this.data.isLogin) {
      this.getLatestStats()
    }
  },
  
  /**
   * 获取最新的学习统计数据
   */
  getLatestStats() {
    // 模拟从服务器获取数据
    // 实际项目中应该通过API获取
    
    // 模拟异步加载
    setTimeout(() => {
      this.setData({
        'mathStats.completed': 289,
        'mathStats.correctRate': 83,
        'physicsStats.completed': 176,
        'physicsStats.correctRate': 79,
        'chemistryStats.completed': 132,
        'chemistryStats.correctRate': 81,
        streak: 36,
        points: 1680,
        ranking: 12
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新，重新获取数据
    this.getLatestStats()
    
    // 完成刷新
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '刷题助手 - 高效学习新方式',
      path: '/pages/index/index',
      imageUrl: '/images/share.png'
    }
  },

  checkUserLoginInfo()
  {
        // 检查是否已有登录信息
        const token = wx.getStorageSync('token')
        const userInfo = wx.getStorageSync('userInfo')
        
        if (token && userInfo) {
          this.setData({
            isLogin: true,
            userInfo: userInfo
          })
          
          // 确保userId已设置
          if (!wx.getStorageSync('userId')) {
            wx.setStorageSync('userId', '1')
            console.log('已设置默认userId为1')
          }
        }
  }
})