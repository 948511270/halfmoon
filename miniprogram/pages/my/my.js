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
    fieldValue:'',
    cascaderValue: '',
    // 学生姓名
    studentName:'',
    // 学生id
    studentId:'',
    // 控制考核订阅popup弹出层
    showAssessmentSubscription:false,
    // 控制修改信息弹出层
    showModifyInformation:false,
    // 控制级联选择弹出层
    showCascader: false,
    
    
  },
  bindReplaceInput(){
    console.log("bindReplaceInput");
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
  // 点击我的批阅后跳转到我的批阅页面
  urlJump(){
    wx.navigateTo({
      url: '../../subPackages/pages/marking/marking',
    })
  },

  // 当输入姓名的输入框失焦后调用此方法 将姓名存入变量studentName
  onEnterName(event){
    
    const chineseNameRegex = /^[\u4e00-\u9fa5]{2,}$/;
    // event.detail 为当前输入的值
    if(event.detail.value){
      if (!chineseNameRegex.test(event.detail.value)) {
        wx.showToast({
          title: '请输入正确姓名',
          icon: 'none',
          duration: 2000//持续的时间
        })
        return
      } 
      
    }
    this.data.studentName = event.detail.value
  },

  // 当输入学号的输入框失焦后调用此方法 将学号存入变量studentId
  onEnterID(event) {
    const idNumberRegex = /^6020\d{6}$/;
    // event.detail 为当前输入的值
    if(event.detail.value){
      if (!idNumberRegex.test(event.detail.value)) {
        wx.showToast({
          title: '请输入正确学号',
          icon: 'none',
          duration: 2000//持续的时间
        })
        return
      } 
    }
    // event.detail 为当前输入的值
    this.data.studentId = event.detail.value
  },
  
  // 当点击修改信息单元格中的确认修改按钮时调用 将数据输入框与整个修改信息popup关闭
  // 注意：此方法只能保证第一次输入有效，也就是程序中studentName studentId中有值，并不能保证每次输入都在输入框中有值。(因为我没想到怎么在按钮事件中判断输入框数据是否存在，所以只能判断整个页面中的这两个变量是否被输入框中数据赋值了)
  onClickModifyInformation(event){
    try {

        //判断姓名学号是否有输入（如果点进输入框但是没有输入任何东西就会被这个判断为不合理）
        if( this.data.studentName.value === ''||this.data.studentId.value === '') throw "姓名或学号输入框输入值不符合要求或为空"

        //判断姓名学号是否有输入(如果没有点进输入框就会被这个判断为不合理)
        if( this.data.studentName=== ''||this.data.studentId === '') throw "姓名或学号输入框输入值不符合要求或为空2"
     
    }catch(err){
      //在此弹出警告信息并return出方法使this.setData不执行
      console.log("onClickModifyInformation() err:",err);
      return
    }
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