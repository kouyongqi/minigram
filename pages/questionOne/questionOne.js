// pages/questionOne/questionOne.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: '15:30',
    currentFilter: 'all',
    isBookmarked: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateTime()
    // 每分钟更新一次时间
    setInterval(this.updateTime, 60000)
  },

  /**
   * 更新时间
   */
  updateTime: function() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    this.setData({
      currentTime: formattedTime
    })
  },

  /**
   * 返回上一页
   */
  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 切换收藏状态
   */
  toggleBookmark: function(e) {
    const id = e.currentTarget.dataset.id
    const isBookmarked = this.data.isBookmarked
    isBookmarked[id] = !isBookmarked[id]
    
    this.setData({
      isBookmarked: isBookmarked
    })
    
    // 提示用户收藏/取消收藏成功
    wx.showToast({
      title: isBookmarked[id] ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    })
  },

  /**
   * 筛选题目
   */
  filterQuestions: function(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentFilter: type
    })
  },

  /**
   * 搜索
   */
  onSearch: function(e) {
    const keyword = e.detail.value
    console.log('搜索关键词:', keyword)
    // 实际应用中应该进行搜索逻辑处理
  },

  /**
   * 前往做题
   */
  goToQuestion: function(e) {
    const id = e.currentTarget.dataset.id
    console.log('前往做题，题目ID:', id)
    // 跳转到题目详情页面
    wx.navigateTo({
      url: '/pages/questionDetail/questionDetail?id=' + id
    })
  },

  /**
   * 前往模拟考试
   */
  goToMockExam: function(e) {
    const id = e.currentTarget.dataset.id
    console.log('前往模拟考试，ID:', id)
    // 实际应用中应该跳转到模拟考试页面
    wx.showToast({
      title: '正在开发中...',
      icon: 'none',
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 模拟刷新数据
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 模拟加载更多题目
    wx.showToast({
      title: '已加载全部题目',
      icon: 'none',
      duration: 1500
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '高校教育科目一题库',
      path: '/pages/questionOne/questionOne',
      imageUrl: '/images/share.png' // 实际应用中替换为真实的分享图片
    }
  }
}) 