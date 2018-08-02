import RegEx from './RegEx';
/**
 * commited by: 张丹峰
 */
export default class Device {
    /**
     * 判断设备系统 2为iOS 1为Android
     */
    static systemCode() {
        return Number(this.wxSystemModel().indexOf('iPhone') > -1) + 1;
    }
    /**
     * 判断浏览器环境是否时微信
     */
    static wechatCode() {
        var ua = window.navigator.userAgent.toLowerCase();
        return Number(RegEx.wechat.test(ua));
    }
    static wxSystemModel() {
        let model = '';
        wx.getSystemInfo({
            success: function (res) {
                model = res.model;
            }
        });
        return model;
    }
}