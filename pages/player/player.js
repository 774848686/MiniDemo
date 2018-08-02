const app = getApp();
import Mock from '../../common/mock-min'
import API from '../../common/request'
import { sings, extrawords, extraSize } from './config';
Page({
  data: {
    src: '',//歌曲地址
    imgvia: "",//头像
    ifpluseed: false,
    randomwords: [],//最后随机生成的文字数组
    singname: '',
    answers: [],
    canswers: [],//答案
    indexClick: [],
    singIndex: 0,
  },
  onReady: function (e) {
    this.initSing();
  },
  initAudio() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc(this.data.src);
    this.audioCtx.play();

  },
  audioPlay() {
    this.audioCtx.play();
    this.setData({
      ifpluseed: false
    })
  },
  audioPause() {
    this.setData({
      ifpluseed: true
    });
    this.audioCtx.pause();
  },
  audioStart() {
    this.audioCtx.seek(0);
    this.audioCtx.play();
  },
  /**数组中获取几个随机数
   * @param {*Array} arr 数组
   * @param {*number} count 要随机选择几个数 
   */
  getRandom(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  /**
   * 合并数组，随机插入
   * @param {*Array} enterArr 要插入的数组
   * @param {*Array} targetArr 目标数组
   */
  concatArr(enterArr, targetArr) {
    enterArr.forEach(value =>
      targetArr.splice(Math.random() * targetArr.length, 0, value))
    return targetArr;
  },
  //初始化
  initSing() {
    let len = sings[this.data.singIndex].singname.length, temparr = [];
    for (let i = 0; i < len; i++) {
      temparr.push('');
    };


    this.setData({
      canswers: temparr,
      imgvia: sings[this.data.singIndex].imgurl,
      src: sings[this.data.singIndex].singadress
    });

    this.getRandomwords();
    this.initAudio();

  },
  //选择后与正确答案对比
  getWords(e) {
    let { word, index } = e.currentTarget.dataset;
    let { answers, randomwords, canswers } = this.data;
    if (this.checkIfclick(index)) {
      return;
    } else {
      let temparr = this.data.indexClick;
      temparr.push(index);
      this.setData({
        indexClick: temparr
      });
    }
    randomwords[index] = '';
    if (answers.length > canswers.length) return;
    answers.push(word);
    if (answers.length === canswers.length) {
      if (answers.join('') === sings[this.data.singIndex].singname) {
        this.showModal('哎哟，不错哦；进入下一题');
      } else {
        this.showModal('继续努力哦');
      }
    }
    //加入选择答案
    let temparr = canswers;
    answers.forEach((item, index) => {
      temparr[index] = item;
    });
    this.setData({
      canswers: temparr,
      randomwords: randomwords
    });

  },
  //获取随机字
  getRandomwords() {
    let singname = sings[this.data.singIndex].singname;
    let randoms = this.getRandom(extrawords, extraSize - singname.length);
    let result = this.concatArr(singname.split(''),randoms);
    this.setData({
      randomwords: result,
      singname: singname
    });
  },
  //重置
  resetWords() {
    let temp = [], temp2 = [], temp3 = [], singIndex = this.data.singIndex;
    //随机在已有歌曲里再取
    let singArr = [0, 1, 2, 3];
    singIndex = this.getRandom(singArr, 1);
    this.setData({
      answers: temp,
      canswers: temp3,
      indexClick: temp2,
      singIndex: singIndex
    });
    this.getRandomwords();
    this.audioStart();
  },
  checkIfclick(index) {
    let ifClick = this.data.indexClick.some((item) => {
      return (item == index);
    });
    return ifClick;
  },
  showModal(title) {
    wx.showModal({
      title: '提示',
      content: title,
      success: (res) => {
        if (res.confirm) {
          this.resetWords();
          this.initSing();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})