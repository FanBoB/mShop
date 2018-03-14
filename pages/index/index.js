//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollTopId: 0,
    curNav: 0,
    listHeight: [],
    commoditUpdate: [],
    commoditIndex:[],

    commodityList: [
      {
        mshopTitle: "折扣",
        discount: 7,
        fullCut: 2,
        id: 1,
        detial: [
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味181ml", surplus: '1', price: 10, foodid: 1 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味281ml", surplus: '2', price: 20, foodid: 2 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味381ml", surplus: '3', price: 30, foodid: 3 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味481ml", surplus: '4', price: 40, foodid: 4 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味581ml", surplus: '5', price: 50, foodid: 5 },
        ]
      },
      {
        mshopTitle: "第一层",
        discount: 8,
        fullCut: 9,
        id: 2,
        detial: [
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味181ml", surplus: '1', price: 10, foodid: 6 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味281ml", surplus: '2', price: 20, foodid: 7 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味381ml", surplus: '3', price: 30, foodid: 8 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味581ml", surplus: '5', price: 50, foodid: 9 },
        ]
      },
      {
        mshopTitle: "第二层",
        discount: 9,
        fullCut: 6,
        id: 3,
        detial: [
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味181ml", surplus: '1', price: 10, foodid: 10 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味281ml", surplus: '2', price: 20, foodid: 11 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味581ml", surplus: '5', price: 50, foodid: 12 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味581ml", surplus: '5', price: 50, foodid: 13 },
          { commoditySrc: "../../images/1.jpg", commodityTitle: "星巴克星冰乐咖啡味581ml", surplus: '5', price: 50, foodid: 14 },
        ]
      }
    ]
  },
  onReady: function (options) {
    var that = this;

    // 定义右侧标题的 rpx 高度 和 px 高度
    var right_titleRpxHeight = 116;
    var right_titleHeight;

    // 定义右侧单个商品的 rpx 高度 和 px 高度
    var right_contentRpxHeight = 190;
    var right_contentHeight;

    // 定义左侧单个tab的 rpx 高度 和 px 高度
    var left_titleRpxHeight = 84;
    var left_titleHeight;

    //获取可视区屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        // percent 为当前设备1rpx对应的px值
        var percent = res.windowWidth / 750;
        that.setData({
          winHeight: res.windowHeight - 92,	//屏幕高度 - （footer高度 + 顶部view高度） (120 + 84) / 2 = 102 兼容差距 
          right_titleHeight: Number(right_titleRpxHeight * percent),
          right_contentHeight: Number(right_contentRpxHeight * percent),
          left_titleHeight: Number(left_titleRpxHeight * percent)
        })
      }
    })

    var names = '';

    for (var item in that.data.commodityList) {
      // 把 listChild1 中每一项的键值用“：”（便于后期处理）分隔开，存入 names 中，数据格式见图‘names中的数据’
      names += ":" + item;
      // 计算右侧每一个分类的 Height 。
      // listChild1 下的每一个 item 中包含该分类的 title，所以 listChild1[item].length 需要减一 
      // 右侧每一个分类中每一行放两个商品，所以 this.data.right_contentHeight 除二
      // 最后加上 right_titleHeight，此时 height 为右侧一个完整分类的高度
      var height = (that.data.commodityList[item].detial.length - 1) * this.data.right_contentHeight / 1 + this.data.right_titleHeight;
      // 同上面 names 的道理，把每一个 height 用“：”隔开放入 listHeight 中
      this.data.listHeight += ":" + height;
      this.setData({
        listHeight: this.data.listHeight
      })
    }

    // 把 names 的数据切成数组
    var names = names.substring(1).split(':');
    this.setData({
      names: names
    })
    // console.log(names, this.data.listHeight)

  },
  onLoad:function(e){
    let commoditNumArr = [];
    let commodityList = this.data.commodityList;

    for (let i = 0; i < commodityList.length; i++){
      commoditNumArr.push(commodityList[i]);
      for (let n = 0; n < commodityList[i].detial.length; n++){
        commodityList[i].detial[n].add = 0;
      }
    }
    this.setData({
      commoditNumArr: commoditNumArr
    });

    // console.log(this.data.commoditNumArr)
  },
  navLeft: function (e) {
    let id = e.target.id;
    this.setData({
      scrollTopId: id,
      curNav: id
    })
  },
  scrollChange: function (event) {
    // 把 listHeight 切割成数组
    var height = this.data.listHeight.substring(1).split(':');
    // console.log(height)
    // 定义一个 index 供左侧边栏联动使用
    var index = 1;
    var num = 0;
    for (var i = 0; i < height.length; i++) {
      // 累计右侧滑栏滚动上去的每一个分类的 Height
      num += parseInt(height[i]);
      // 循环判断 num 是否大于右侧滑栏滚动上去的 Height ，然后 get 到 i 值赋给 index

      if (num > event.detail.scrollTop) {
        // console.log(num, event.detail.scrollTop)
        index = i;
        // 如果右侧滑栏滚动高度小于单个类别高度的 1/2 时，index 为 0
        if (event.detail.scrollTop < height[0] / 2) {
          index = 0;
        }
        break;
      }
    }

    // 定义并设置左侧边栏的滚动高度
    // var left_scrollTop = this.data.left_titleHeight * index
    this.setData({
      // scrollTop: left_scrollTop,
      // 动态给左侧滑栏传递对应该项的 id，用于高亮效果显示
      curNav: this.data.names[index]
    })
  },
  commodityPlus: function (event) {	//+
    let commoditNumArr = this.data.commoditNumArr;
    let index = event.target.dataset.index;	//当前索引
    let parentIndex = event.target.dataset.parentindex;  //父元素索引
    let surplus = event.target.dataset.surplus;	//剩余数量
    let thisNum = event.target.dataset.add; //当前数量
    let commoditNum =  commoditNumArr[parentIndex].detial[index]; //增加当前商品数量
    let arr = this.data.commoditUpdate;
    let isBl = true;

    thisNum++;
    if (thisNum > 0 && thisNum <= surplus){  //如果商品增加并且不能大于剩余数量 则更新 数据 和 增加商品的列  
      commoditNum.add = thisNum;

      if(arr.length>0){
        for(let i=0;i<arr.length;i++){
          if (arr[i].foodid == commoditNum.foodid){ //若增加商品ID = 上次存储的商品ID  则更新商品数量
            arr[i] = commoditNum;
            isBl = false;
            break;
          }
        }
      }
      if (isBl){
        arr.push(commoditNum);
      }
      
      this.setData({
        commoditNumArr: commoditNumArr,
        commoditUpdate: arr
      })
    } else {
      return
    }
   
    // console.log(this.data.commoditUpdate)
  },
  commodityMinus: function (event) {	//-
    let commoditNumArr = this.data.commoditNumArr;
    let index = event.target.dataset.index;	//当前索引
    let parentIndex = event.target.dataset.parentindex;  //父元素索引
    let surplus = event.target.dataset.surplus;	//剩余数量
    let thisNum = event.target.dataset.add; //当前数量
    let commoditNum = commoditNumArr[parentIndex].detial[index]; //减少当前商品数量
    let arr = this.data.commoditUpdate;
    let isBl = true;

    thisNum--;

    if (thisNum >= 0 && thisNum < surplus){
      commoditNum.add = thisNum;

      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].foodid == commoditNum.foodid && commoditNum.add == 0) {//若减少商品数量=0 则删除
            arr.splice(i, 1);
            isBl = false;
            break;
          } else if (arr[i].foodid == commoditNum.foodid && commoditNum.add != 0) { //若减少商品ID = 上次存储的商品ID  则更新商品数量
            arr[i] = commoditNum;
            isBl = false;
            break;
          }
        }
      }

      if (isBl) {
        arr.push(commoditNum);
      }

      this.setData({
        commoditNumArr: commoditNumArr,
        commoditUpdate: arr
      })
    }else{
      return;
    }
    // console.log(this.data.commoditUpdate)
  }
})
