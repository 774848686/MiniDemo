module.exports = {
    info:fetchDeviceInfo
}

/*
*  height:单位rpx，屏幕高度
* */
function fetchDeviceInfo() {
    let res = wx.getSystemInfoSync();
    let info = {iOS:false, rpxRatio:1, height:1334};
    if (res.system && res.system.toLowerCase().indexOf('ios') >= 0) {
        info.iOS = true;
    }
    console.log(res)
    info.rpxRatio = (res.windowWidth / 750);
    info.height = res.screenHeight / info.rpxRatio;
    info.wh = res.screenHeight;
    info.ww = res.windowWidth;
    return info;
}

