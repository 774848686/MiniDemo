import Device from './standard/Device'
import Md5 from './common/md5'
App({
	globalData:{
        //用户相关
        loginStatus: 0, //0: 未发起登录    -1: 授权失败    -2: 登录失败    1: 登录中    2: 已登录
        wxUserInfo:null,
        userInfo:null,
        token:null,
        appStatus:0,   //小程序状态， 0:默认   1：正常   -1：店铺打烊  -2：微信或者系统版本低，不支持第三方
        appConfig:null, //appConfig.js里的数据 和 服务器端configUrl里的配置合在一起

        appKey:null, //渠道key
        appEntranceId:null, //渠道入口

        shoppingAddresses:null,
        deliveryInfo:null
    },
    version:1.0,
    pageJumpParam:null, //页面跳转时传递的参数

    //有些页面数据，如果在其他页面可能被修改，在其他页面修改时需要置标记
    //返回页面时，onShow获取标志，刷新数据
    //标志命名规范：页面路径+数据元素，非严格
    dataRefreshFlag:{
	    me_coin:false,
        me_profile:false,
        my_order:false
    },

    appTools:null,
    utils:null,
    device:null,
    storage:null,
    models:null,
    apis:null,
    reload() {
        return new Promise((resolve, reject) => {
            // 登录
            wx.login({
                success: res => {
                    //发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                      url: 'https://m.sanweiche.com/hz/weChat/getCode',
                      // url: 'http://t.imhuola.com/hz/weChat/getCode',
                      data: {
                        js_code: res.code
                      },
                      success: (res) => {
                        resolve(res);
                      },
                      fail: (res) => {
                        reject();
                      }
                    })
                }
            })
        })
    },
    onLaunch: function () {
        // 展示本地存储能力
        // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo;
        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    convertHtmlToText: function (inputText) {
        var returnText = "" + inputText;
        returnText = returnText.replace(/<\/div>/ig, '\r\n');
        returnText = returnText.replace(/<\/li>/ig, '\r\n');
        returnText = returnText.replace(/<li>/ig, '  *  ');
        returnText = returnText.replace(/<\/ul>/ig, '\r\n');
        //-- remove BR tags and replace them with line break
        returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

        //-- remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*?>/gi, "\r\n");
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, '');

        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/ /gi, " ");
        returnText = returnText.replace(/&/gi, "&");
        returnText = returnText.replace(/"/gi, '"');
        returnText = returnText.replace(/</gi, '<');
        returnText = returnText.replace(/>/gi, '>');

        // &nbsp
        returnText = returnText.replace(/&nbsp/gi, '');
        return returnText;
    }
})
