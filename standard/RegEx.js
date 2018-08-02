
export default class RegEx {
    // 判断浏览器的userAgent确定是否为ios手机浏览器
    static ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/;
    // 判断浏览器的userAgent确定是否为微信内的浏览器
    static wechat = /MicroMessenger/i;
}