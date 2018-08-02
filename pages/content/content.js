const app = getApp();
import Mock from '../../common/mock-min.js'
import API from '../../common/request.js'

Page({
    data: {
      ifhidden:false,
      username:''
    },
   
    onReady() {
      console.log('onReady')
    },
    onLoad(e) {
      console.log(app.globalData.userInfo)
      console.log(e)
      console.log('onLoad')
      setTimeout(()=>{
        this.setData({
          ifhidden:true,
          username: app.globalData.userInfo.nickName
        })
      },1000);
      
    },
    onShow(opt) {
      console.log('onShow')
    },
    /** 
 * 生命周期函数--监听页面隐藏
 */
    onHide() {
      console.log('onHide')
    },
    onUnload(){
      console.log('onUnload')
    },
    clickme(e){
      console.log(e)
    },
    // 获取用户信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: res => {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            resolve(res)
                        }
                    })
                }
            })
        })
    },
    /**

   * 用户点击右上角分享
   */
    onShareAppMessage: function () {
      return {
        title: '足球缤纷季',
        path: 'pages/home/home',
        imageUrl: 'https://cups.bianxianmao.com/worldcup/cupimgs/worldCup/share_image.png'
      }
    },


})
