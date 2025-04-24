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
 * 跳转到登录页面
 */
  navigateToLogin() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  // /**
  //  * 微信一键登录
  //  */
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
      url: '../profile/edit'
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
    this.checkUserLoginInfo()
    // 获取最新的学习统计数据
    if (this.data.isLogin) {
      this.getUserInfo() // 添加此行调用获取用户信息
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
  },

  /**
 * 获取用户信息
 */
getUserInfo() {
  // 获取用户ID
  const userId = wx.getStorageSync('userId') || '1'
  
  // 显示加载状态
  wx.showLoading({
    title: '加载中...',
    mask: false
  })
  
  // 设置API基础URL - 根据环境配置
  const apiBaseUrl = 'http://localhost:8080' // 本地开发环境
  
  console.log('正在获取用户信息...')
  
  // 调用后端接口获取用户信息
  wx.request({
    url: `${apiBaseUrl}/api/user/profile/${userId}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync('token') || '' // 添加授权头
    },
    success: (res) => {
      console.log('获取用户信息成功:', res)
      wx.hideLoading()
      
      if (res.statusCode === 200 && res.data) {
        // 更新用户信息
        const userInfo = {
          avatarUrl: res.data.avatarUrl || defaultAvatarUrl,
          nickName: res.data.nickName || '未知用户'
        }
        
        // 更新页面数据
        this.setData({
          isLogin: true,
          userInfo: userInfo,
          userGrade: res.data.grade || '',
          userSchool: res.data.school || '',
          userClass: res.data.className || '',
          streak: res.data.streak || 0,
          points: res.data.points || 0,
          ranking: res.data.ranking || 0
        })
        
        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('userGrade', res.data.grade || '')
        wx.setStorageSync('userSchool', res.data.school || '')
        wx.setStorageSync('userClass', res.data.className || '')
      } else {
        console.error('获取用户信息失败:', res)
      }
    },
    fail: (err) => {
      console.error('请求失败:', err)
      wx.hideLoading()
      
      // 显示错误提示
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: () => {
      // 确保loading被关闭
      setTimeout(() => wx.hideLoading(), 200)
    }
  })
}
})