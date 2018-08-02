Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    path: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    status:{
      type: Number,
      value: 0  
    },
    pic: {
      type: String,
      value: ''
    }
  },
  data: {
    ifClose: false
  },
  attached: function () {
    console.log(this.data.status);
    let flag = this.data.status == 0 ? false : true;
    console.log(flag);
    this.setData({
      ifClose: flag
    });
    this.Onshow();
  },
  methods: {
    closeWelfare() {
      this.setData({
        ifClose: true
      });
    },
    Onshow() {
      let storeTime = wx.getStorageSync('storeTime');
      let ifOpen = wx.getStorageSync('ifOpen');
      // let
      let nowdateTime = this.dateTime(new Date(), 'date');
      if (storeTime == '') {
        this.setData({
          ifClose: false
        });
        wx.setStorageSync('storeTime', nowdateTime);
        wx.setStorageSync('ifOpen', "no");
      } else {
        if (storeTime == nowdateTime && ifOpen == "yes") {
          this.setData({
            ifClose: true
          });
        } else {
          this.setData({
            ifClose: false
          });
          wx.setStorageSync('storeTime', nowdateTime);
        }
      }
    },
    //打开小程序
    toadMini(e) {
      var self = this;
      let url = e.currentTarget.dataset.link;
      if (url) {
        let self = this;
        wx.navigateToMiniProgram({
          appId: this.format(url).appid,
          path: this.format(url).path,
          success(res) {
            wx.setStorageSync('ifOpen', "yes");
            self.setData({
              ifClose: true
            });
          }
        });
      }
    },
    dateTime(num, type) {
      var str = num;
      if (num) {
        var _num = new Date(num);
        var dateStr = _num.getFullYear() + '-' + addZero(_num.getMonth() + 1) + '-' + addZero(_num.getDate());
        var timeStr = addZero(_num.getHours()) + ':' + addZero(_num.getMinutes()) + ':' + addZero(_num.getSeconds());
        if (type === 'date') {
          str = dateStr;
        } else if (type === 'time') {
          str = timeStr;
        } else {
          str = dateStr + ' ' + timeStr;
        }
      };
      return str;
      //格式化时间
      function addZero(num) {
        if (num < 10) {
          return '0' + num;
        }
        return num;
      };
    },
    //解析url
    format(url) {
      let appid = url.split(',')[0];
      let path = url.split(',')[1];
      return {
        appid,
        path
      }
    }
  }
})