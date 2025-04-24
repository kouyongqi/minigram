// pages/questionDetail/questionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentQuestion: 3,
    totalQuestions: 20,
    isBookmarked: false,
    selectedOption: null,
    showAnswer: false,
    question: {
      id: 0,
      type: '选择题',
      difficulty: '中等',
      content: '设函数f(x)=ln(x+√(x²+1))，则f\'(x)=',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      imageCaption: '函数图像示意',
      options: [
        { key: 'A', value: '1/√(x²+1)' },
        { key: 'B', value: '1/(x²+1)' },
        { key: 'C', value: 'x/√(x²+1)' },
        { key: 'D', value: '1/(x+√(x²+1))' }
      ],
      correctAnswer: 'A',
      correctAnswerValue: '1/√(x²+1)',
      explanation: [
        '设u=x+√(x²+1)，则f(x)=ln(u)',
        '∴ f\'(x)=(1/u)·u\'',
        'u\'=1+x/√(x²+1)=[√(x²+1)+x]/√(x²+1)',
        'f\'(x)=(1/u)·u\'=1/[x+√(x²+1)]·[√(x²+1)+x]/√(x²+1)',
        '整理得: f\'(x)=1/√(x²+1)',
        '因此，正确答案为A.'
      ],
      viewCount: 1652,
      correctRate: 76,
      avgTime: '2分38秒',
      commentCount: 23,
      comments: [
        {
          id: 1,
          userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          userName: '张小明',
          timeAgo: '3天前',
          content: '这题求导数时需要注意使用链式法则，我第一次做时忘记了这点。',
          likeCount: 12
        }
      ]
    },
    // 题目数据字典，根据ID获取题目
    questionDict: {
      1: {
        id: 1,
        type: '单选题',
        difficulty: '中等',
        content: '高等教育学是研究什么的学科？',
        options: [
          { key: 'A', value: '研究高等教育现象及其规律的学科' },
          { key: 'B', value: '研究教育管理的学科' },
          { key: 'C', value: '研究高校教师队伍建设的学科' },
          { key: 'D', value: '研究大学生学习方法的学科' }
        ],
        correctAnswer: 'A',
        correctAnswerValue: '研究高等教育现象及其规律的学科',
        explanation: [
          '高等教育学是一门专门研究高等教育现象及其规律的学科。',
          '它包括高等教育的本质、特征、发展规律以及高等教育与社会的关系等方面。'
        ],
        viewCount: 1652,
        correctRate: 76,
        avgTime: '1分52秒',
        commentCount: 15,
        comments: []
      },
      2: {
        id: 2,
        type: '多选题',
        difficulty: '较难',
        content: '现代高等教育的基本职能包括哪些？',
        options: [
          { key: 'A', value: '人才培养' },
          { key: 'B', value: '科学研究' },
          { key: 'C', value: '社会服务' },
          { key: 'D', value: '文化传承与创新' }
        ],
        correctAnswer: 'ABCD',
        correctAnswerValue: '人才培养、科学研究、社会服务、文化传承与创新',
        explanation: [
          '现代高等教育的基本职能包括：人才培养、科学研究、社会服务、文化传承与创新。',
          '人才培养是高等教育的基本职能和首要任务。',
          '科学研究是高等教育区别于其他教育的重要特征。',
          '社会服务是高等教育直接服务社会的职能表现。',
          '文化传承与创新是高等教育的历史使命。'
        ],
        viewCount: 986,
        correctRate: 48,
        avgTime: '3分20秒',
        commentCount: 23,
        comments: []
      },
      3: {
        id: 3,
        type: '判断题',
        difficulty: '简单',
        content: '教育部是中国高等教育的最高行政管理机构。',
        options: [
          { key: 'A', value: '正确' },
          { key: 'B', value: '错误' }
        ],
        correctAnswer: 'A',
        correctAnswerValue: '正确',
        explanation: [
          '教育部是中国高等教育的最高行政管理机构，负责全国高等教育的宏观管理和政策制定。'
        ],
        viewCount: 2145,
        correctRate: 92,
        avgTime: '1分15秒',
        commentCount: 8,
        comments: []
      },
      4: {
        id: 4,
        type: '填空题',
        difficulty: '较难',
        content: '中国第一所现代大学是______，创建于______年。',
        correctAnswer: '北京大学，1898',
        correctAnswerValue: '北京大学，1898',
        explanation: [
          '中国第一所现代大学是北京大学（前身为京师大学堂），创建于1898年。',
          '这标志着中国近代高等教育的开端。'
        ],
        viewCount: 876,
        correctRate: 42,
        avgTime: '2分45秒',
        commentCount: 12,
        comments: []
      },
      5: {
        id: 5,
        type: '单选题',
        difficulty: '中等',
        content: '下列哪种教学方法不属于现代教学方法？',
        options: [
          { key: 'A', value: '项目教学法' },
          { key: 'B', value: '案例教学法' },
          { key: 'C', value: '填鸭式教学法' },
          { key: 'D', value: '翻转课堂教学法' }
        ],
        correctAnswer: 'C',
        correctAnswerValue: '填鸭式教学法',
        explanation: [
          '填鸭式教学法是传统的教学方法，不属于现代教学方法。',
          '它强调教师的讲授和学生的被动接受，不注重学生的主动参与和思考。',
          '而项目教学法、案例教学法和翻转课堂教学法都是强调学生主动参与、培养创新能力的现代教学方法。'
        ],
        viewCount: 1452,
        correctRate: 63,
        avgTime: '2分10秒',
        commentCount: 19,
        comments: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('加载题目详情页面，题目ID:', options.id)
    
    if (options.id) {
      const questionId = parseInt(options.id)
      // 从题目数据字典中获取题目数据
      if (this.data.questionDict[questionId]) {
        this.setData({
          question: this.data.questionDict[questionId]
        })
      }
    }
    
    // 更新页面标题
    wx.setNavigationBarTitle({
      title: '题目详情 - ' + this.data.question.type
    })
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  /**
   * 选择选项
   */
  selectOption(e) {
    const option = e.currentTarget.dataset.option
    this.setData({
      selectedOption: option
    })
  },
  
  /**
   * 提交答案
   */
  submitAnswer() {
    if (!this.data.selectedOption) {
      wx.showToast({
        title: '请先选择答案',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    // 显示答案和解析
    this.setData({
      showAnswer: true
    })
    
    // 判断答案是否正确
    if (this.data.selectedOption === this.data.question.correctAnswer) {
      wx.showToast({
        title: '回答正确',
        icon: 'success',
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '回答错误',
        icon: 'error',
        duration: 1500
      })
    }
  },
  
  /**
   * 切换收藏状态
   */
  toggleBookmark() {
    this.setData({
      isBookmarked: !this.data.isBookmarked
    })
    
    // 提示用户收藏/取消收藏成功
    wx.showToast({
      title: this.data.isBookmarked ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    })
  },
  
  /**
   * 举报题目
   */
  reportQuestion() {
    wx.showActionSheet({
      itemList: ['题目有误', '答案有误', '解析不清楚', '其他问题'],
      success: (res) => {
        if (!res.cancel) {
          wx.showToast({
            title: '举报成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },
  
  /**
   * 查看评论
   */
  viewComments() {
    // 滚动到评论区
    const query = wx.createSelectorQuery()
    query.select('.discussion-section').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      wx.pageScrollTo({
        scrollTop: res[0].top + res[1].scrollTop,
        duration: 300
      })
    })
  },
  
  /**
   * 添加评论
   */
  addComment() {
    wx.showToast({
      title: '评论功能开发中',
      icon: 'none',
      duration: 1500
    })
  },
  
  /**
   * 点赞评论
   */
  likeComment(e) {
    const commentId = e.currentTarget.dataset.id
    console.log('点赞评论:', commentId)
    
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 1500
    })
  },
  
  /**
   * 回复评论
   */
  replyComment(e) {
    const commentId = e.currentTarget.dataset.id
    console.log('回复评论:', commentId)
    
    wx.showToast({
      title: '回复功能开发中',
      icon: 'none',
      duration: 1500
    })
  },
  
  /**
   * 查看更多评论
   */
  viewMoreComments() {
    wx.showToast({
      title: '加载更多评论',
      icon: 'none',
      duration: 1500
    })
  },
  
  /**
   * 分享题目
   */
  shareQuestion() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  
  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.currentQuestion <= 1) {
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    const prevQuestionId = this.data.question.id - 1
    // 检查是否有上一题的数据
    if (this.data.questionDict[prevQuestionId]) {
      this.setData({
        question: this.data.questionDict[prevQuestionId],
        currentQuestion: this.data.currentQuestion - 1,
        selectedOption: null,
        showAnswer: false
      })
    }
  },
  
  /**
   * 下一题
   */
  nextQuestion() {
    if (this.data.currentQuestion >= this.data.totalQuestions) {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    const nextQuestionId = this.data.question.id + 1
    // 检查是否有下一题的数据
    if (this.data.questionDict[nextQuestionId]) {
      this.setData({
        question: this.data.questionDict[nextQuestionId],
        currentQuestion: this.data.currentQuestion + 1,
        selectedOption: null,
        showAnswer: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `${this.data.question.type} - ${this.data.question.content.substring(0, 20)}...`,
      path: `/pages/questionDetail/questionDetail?id=${this.data.question.id}`,
      imageUrl: this.data.question.image || '/images/share.png'
    }
  }
})