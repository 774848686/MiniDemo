Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
      title: {            // 属性名
        type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '世界杯猜猜乐'     // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      ifIndex:{
        type: Boolean,
        value: false 
      }
    },
    data: {
      isphoneX: null,
    },
    attached: function () {
      this.getSystem();
    },
    methods: {
      onBack(){
        wx.navigateBack({
          delta: 1
        })
      },
      getSystem() {
        wx.getSystemInfo({
          success: (res) => {

            if (res.model.indexOf('iPhone X') >= 0) {
              this.setData({
                isphoneX: true
              })
            }
          }
        })
      }
    }
  })