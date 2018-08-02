const app = getApp();
import Device from '../standard/Device';
import md5 from '../common/md5'
class Ajax {
    /**
     * 防作弊加签名请求
     * @param {*Object} config 配置
     *  absUrl: 请求接口绝对地址
     *  data: 请求数据
     */
    static enAjax(config) {
        return new Promise(resolve => {
            let { absUrl, data } = config;
            wx.request({
                url: absUrl,
                method: "POST",
                data: data || {},
                header: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    'Authorization': Md5value(data) // 默认值
                },
                success: function (res) {
                    resolve(res);
                }
            });
        })
        // data.secret = '684d2590b5fd4534a44224d419cc4cec';
        // 获取md5 签名
        function Md5value(postData) {
            const orders = Object.keys(postData).sort();
            let values = [];
            for (let i = 0; i < orders.length; i++) {
                let key = orders[i];
                let value = postData[key];
                value != null && values.push(value);
            };
            return md5.b64_md5(values.join(''));
        }
    }

    /**
     * 埋点
     * @param {*Object} config 配置
     *  modeltype：埋点类型
     *  activityid：活动id
     *  appkey、business、uid、ua、i、f
     *  award: 券的相关信息，埋点类型为567时需要
     */
    static awardCountInfo(config) {
        var modelnames = {
            '3': '首页',
            '4': '活动参与',
            '5': '活动发券',
            '6': '券曝光',
            '7': '券点击'
        };
        var data = {
            activityid: config.activityid,
            appos: Device.systemCode(),
            appkey: config.appkey || '',
            business: config.business || '',
            uid: config.uid || '',
            ua: config.ua || '',
            i: config.i || '',
            f: config.f || ''
        };
        var absUrl = Ajax.domain.main + '/award/countInfo';
        data.modelname = modelnames[config.modeltype];
        data.modeltype = config.modeltype;
        if (config.award != undefined) {
            data.preid = config.award.awardid;
            data.awardtype = config.award.awardtype;
        };
        if (data.modeltype == '7') {
            // modeltype为7的时候，采取加密请求
            data.secret = '684d2590b5fd4534a44224d419cc4cec';
            data.timestamp = new Date().getTime();
            let enConfig = { data, absUrl }
            return this.enAjax(enConfig);
        } else {
            return new Promise(resolve => {
                wx.request({
                    url: absUrl,
                    method: "POST",
                    data: data,
                    header: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    success: function (resData) {
                        resolve(resData);
                    }
                })
            });
        };

    }
    /**
     * 获取券
     * @param {*Object} config 获取奖品需要的一些参数
     * appkey/business/i/f/ua/uid/activityid
     */
    static awardAwardInfo(config) {
        return new Promise(function (resolve) {
            var data = {
                appkey: config.appkey,
                appos: Device.systemCode(),
                business: config.business,
                i: config.i,
                f: config.f,
                ua: config.ua,
                activityid: config.activityid,
                uid: config.uid
            };
            wx.request({
                method: "POST",
                url: Ajax.domain.main + '/award/awardInfo',
                data: data,
                header: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                success: function (resData) {
                    resolve(resData);
                }
            })
        });
    }
    /**
     * 活动参与之后调用此方法减少活动次数
     * @param {*Object} config 接口中要用的一些参数
     * uid/appkey/activityid/business
     * award: 券的相关信息
     */
    static awardSubtracttimes(config) {
        return new Promise(function (resolve) {
            var data = {
                uid: config.uid,
                appkey: config.appkey,
                activityid: config.activityid,
                business: config.business
            };
            wx.request({
                method: "POST",
                url: Ajax.domain.main + '/award/subtracttimes',
                data: data,
                header: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                success: function (resData) {
                    resolve(resData);
                }
            });
        });
    }
     /**
     * 获取活动配置
     * @param {*Object} config 接口中要用的一些参数
     * uid/appkey/activityid/business
     */
    static activityConfig(config) {
        return new Promise(function (resolve) {
            var data = {
                appkey: config.appkey,
                business: config.business,
                activityid: config.activityid,
                uid: config.uid
            };
            wx.request({
                method: "POST",
                url: Ajax.domain.main + '/award/activityInfo',
                data: data,
                header: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                success: function (resData) {
                    resolve(resData);
                }
            })
        });
    }
     /**
     * 获取我的奖品配置
     * @param {*Object} config 接口中要用的一些参数
     * uid/appkey/activityid/business
     */
    static myAwardInfo(config) {
        return new Promise(function (resolve) {
            var data = {
                appkey: config.appkey,
                business: config.business,
                activityid: config.activityid,
                uid: config.uid
            };
            wx.request({
                method: "POST",
                url: Ajax.domain.main + '/award/myAwardInfo',
                data: data,
                header: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                success: function (resData) {
                    resolve(resData);
                }
            })
        });
    }
    /**
     * 获取需要添加到剪切板的内容
     */
    static clipboardtext() {
        return new Promise(resolve => {
            $.ajax({
                url: Ajax.domain.logs + '/34386f8d636b613bb06f457e07919a5a',
                method: 'GET',
                async: true,
                success: function (res) {
                    resolve(res);
                },
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", '04121140eebd2adb9b56c0e4aa58ad6a');
                }
            });
        })
    }
}

Ajax.domain = {
    // main = 'http://118.178.131.193:8097',
    main: 'https://service.tandehao.com',
    logs: 'https://logs.bianxianmao.com',
    buimg: 'https://buyimg.bianxianmao.com',
}
module.exports = Ajax;
