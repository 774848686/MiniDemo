let API_HOST = "https://m.sanweiche.com/";
// let API_HOST = "http://t.imhuola.com/";
let DEBUG = false;//切换数据入口
var Mock = require('mock-min.js')
function ajax(param) {
  if (!DEBUG) {
    wx.request({
      url: API_HOST + param.url,
      method: param.method ? param.method : 'get',
      data: param.data,
      header: param.header ? param.header : { "Content-Type": "application/json" },
      success: function (res) {
        
         if(res.statusCode == 200) {
           if (res.data.status == "ok") {
            param.callback(res.data.result);
           } else {
            param.error(res.data.result)
           }
         }         
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock(param.template)
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    param.callback(res);
  }
}
module.exports = {
  ajax: ajax
}