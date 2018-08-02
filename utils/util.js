import Ajax from '../common/Ajax';
const app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// Global countinfo
const countInfoGlobal = function (modeltype, award) {
  let { appkey, business, uid, activityid, i, f, ua } = app.globalData.dataConfig;
  return Ajax.awardCountInfo({ appkey, business, uid, activityid, i, f, ua, modeltype, award });
}

module.exports = {
  formatTime,
  countInfoGlobal
}
