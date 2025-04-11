// pages/profile/edit.js
const defaultAvatarUrl = '/images/default-avatar.png'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: ''
    },
    grades: ['小学六年级', '初中一年级', '初中二年级', '初中三年级', '高中一年级', '高中二年级', '高中三年级'],
    gradeIndex: -1,
    school: '',
    className: '',
    phoneNumber: '',
    phoneNumberDisplay: '' // 用于显示带星号的手机号
  },

  onLoad(options) {
    // 获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {}
    const userGrade = wx.getStorageSync('userGrade') || ''
    const userSchool = wx.getStorageSync('userSchool') || ''
    const userClass = wx.getStorageSync('userClass') || ''
    const phoneNumber = wx.getStorageSync('phoneNumber') || ''
    
    // 确保userId已设置，如果没有则设置为1
    if (!wx.getStorageSync('userId')) {
      wx.setStorageSync('userId', '1')
      console.log('已设置默认userId为1')
    }
    
    // 根据年级名称找到对应索引
    const gradeIndex = this.data.grades.findIndex(grade => grade === userGrade)
    
    // 设置手机号显示格式 (如: 138****8888)
    let phoneNumberDisplay = ''
    if (phoneNumber) {
      phoneNumberDisplay = phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(7)
    }
    
    this.setData({
      userInfo: userInfo,
      gradeIndex: gradeIndex !== -1 ? gradeIndex : 5, // 默认高中二年级
      school: userSchool,
      className: userClass,
      phoneNumber: phoneNumber,
      phoneNumberDisplay: phoneNumberDisplay
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  // 修改头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const userInfo = this.data.userInfo
    userInfo.avatarUrl = avatarUrl
    this.setData({
      userInfo
    })
  },
  
  // 修改昵称
  onNicknameChange(e) {
    const nickName = e.detail.value
    const userInfo = this.data.userInfo
    userInfo.nickName = nickName
    this.setData({
      userInfo
    })
  },
  
  // 选择年级
  onGradeChange(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },
  
  // 修改学校
  onSchoolChange(e) {
    this.setData({
      school: e.detail.value
    })
  },
  
  // 修改班级
  onClassChange(e) {
    this.setData({
      className: e.detail.value
    })
  },
  
  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      return
    }
    
    // 正常情况下这里需要将encryptedData和iv发送到后端解密获取手机号
    // 这里为了演示，使用模拟数据
    const simulatePhoneNumber = '13812345678'
    const phoneNumberDisplay = simulatePhoneNumber.substring(0, 3) + '****' + simulatePhoneNumber.substring(7)
    
    this.setData({
      phoneNumber: simulatePhoneNumber,
      phoneNumberDisplay: phoneNumberDisplay
    })
  },
  
  // 更换手机号
  changePhone() {
    this.setData({
      phoneNumber: '',
      phoneNumberDisplay: ''
    })
  },
  
  // 保存资料
  saveProfile() {
    const { userInfo, gradeIndex, school, className, phoneNumber } = this.data
    
    // 验证必填字段
    if (!userInfo.nickName) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }
    
    // 构建要保存的用户数据
    const userGrade = this.data.grades[gradeIndex]
    
    // 保存到本地存储
    wx.setStorageSync('userInfo', userInfo)
    wx.setStorageSync('userGrade', userGrade)
    wx.setStorageSync('userSchool', school)
    wx.setStorageSync('userClass', className)
    wx.setStorageSync('phoneNumber', phoneNumber)
    
    // 同步到服务器
    wx.showLoading({
      title: '保存中...',
      mask: true
    })
    
    // 获取用户ID - 由于是本地测试，userId可能未设置，使用默认值1
    const userId = wx.getStorageSync('userId') || '1'
    
    console.log('正在保存用户资料，userId:', userId)
    
    // 调用API更新用户资料
    wx.request({
      url: `http://localhost:8080/api/user/profile/${userId}`,
      method: 'PUT',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        nickName: userInfo.nickName,
        grade: userGrade,
        school: school,
        className: className,
        phoneNumber: phoneNumber || ''
      },
      success: (res) => {
        console.log('保存成功响应:', res)
        wx.hideLoading()
        
        if (res.statusCode === 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                // 返回个人中心页面
                this.goBack()
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '保存失败: ' + (res.data.message || '未知错误'),
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('请求失败:', err)
        wx.hideLoading()
        
        // 错误处理
        wx.showToast({
          title: '网络异常，已保存到本地',
          icon: 'none'
        })
        
        // 虽然网络请求失败，但至少本地存储已更新
        setTimeout(() => {
          this.goBack()
        }, 1500)
      }
    })
  }
})