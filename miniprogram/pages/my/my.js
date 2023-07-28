// pages/my/my.js
// 级联选择数据 软件/物联 ->23级/24级/25级
const options = [
  {
    text: '软件',
    value: '01',
    children: [{ text: '23级', value: '0123' },{ text: '24级', value: '0124' },{ text: '25级', value: '0125' }],
  },
  {
    text: '物联',
    value: '02',
    children: [{ text: '23级', value: '0223' },{ text: '24级', value: '0224' },{ text: '25级', value: '0225' }],
  },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // options fieldValue cascaderValue为级联选择相关数据
    options,
    fieldValue: '',
    cascaderValue: '',
    // 学生id
    studentId:'',
    // 控制考核订阅popup弹出层
    showAssessmentSubscription:false,
    // 控制修改信息弹出层
    showModifyInformation:false,
    // 控制级联选择弹出层
    showCascader: false,
    
    
  },

  // 不知道为什么不能传参数 不然我就写到一个方法里了
  // showPopup1 是考核订阅的popup 
  // showPopup2 是修改信息的popup
  showPopup1() {
    this.setData({ showAssessmentSubscription: true});
  },
  showPopup2() {
    
    // 逻辑是 点击修改信息单元格后 将修改信息的弹出层显示，并且将
    this.setData({ showModifyInformation: true,showCascader:true  });
  },
  closePopup1(){
    this.setData({ showAssessmentSubscription: false });
  },
  closePopup2(){
    this.setData({ showModifyInformation: false });
  },
  urlJump(){
    wx.redirectTo({
      url: '../../subPackages/pages/marking/marking',
    })
  },
  // 当输入学号的输入框失焦后调用此方法 将学号存入变量studentId
  onEnterID(event) {
    // event.detail 为当前输入的值
    this.data.studentId = event.detail
  },
  // 当点击修改信息单元格中的确认修改按钮时调用 将数据输入框与整个修改信息popup关闭
  onClickModifyInformation(event){
    this.setData({
      showField:false,
      showModifyInformation: false
    });
  },
  // 级联选择完毕后调用 将数据拿到后分割开来 分割格式如下：软件/22级，分割完毕后存入变量中并关闭级联选择弹出层并打开学号输入框
  onFinish(e) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
    this.setData({
      showCascader:false ,
      showField:true
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  }
})