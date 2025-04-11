// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '未登录',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    
    // 学习数据
    studyDays: 36,
    points: 168,
    completedQuestions: 289,
    favoriteQuestions: 42,
    correctRate: 83,
    
    // 每周学习数据
    weeklyQuestions: 124,
    studyHours: 8.5,
    weeklyRate: 89,
    streak: 27,
    
    // 活动标签页
    activeTab: 'week'
  },
  
  onLoad() {
    // 检查是否已有登录信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
    
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
  
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 保存用户信息到本地
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
  },
  
  // 底部标签栏跳转
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    if (index === 0) return // 已在首页
    
    const urls = ['', '../question/list', '../study/index', '../me/index']
    wx.switchTab({
      url: urls[index]
    })
  },
  
  // 进入科目详情
  navigateToSubject(e) {
    const subject = e.currentTarget.dataset.subject
    wx.navigateTo({
      url: `../subject/detail?id=${subject}`
    })
  },
  
  // 切换学习统计标签
  switchStatsTab(e) {
    const tab = e.currentTarget.dataset.tab
    // 更新当前活动标签
    this.setData({ activeTab: tab })
    
    // 根据不同标签加载不同数据
    if (tab === 'week') {
      this.setData({
        weeklyQuestions: 124,
        studyHours: 8.5,
        weeklyRate: 89,
        streak: 27
      })
    } else if (tab === 'month') {
      this.setData({
        weeklyQuestions: 468,
        studyHours: 32.5,
        weeklyRate: 85,
        streak: 27
      })
    } else if (tab === 'total') {
      this.setData({
        weeklyQuestions: 1289,
        studyHours: 168.5,
        weeklyRate: 83,
        streak: 27
      })
    }
  }
})
