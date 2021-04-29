<template>
  <div class="main-container">
    <!-- <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item + 'main-container' }}</h3>
      </el-carousel-item>
    </el-carousel> -->


    <div ref="carousel" 
      class="carousel" 
      @touchstart="gtouchstart($event)"
      @touchend="gtouchend($event)"
      @touchmove="gtouchmove($event)"
    >
      
      <!-- <div ref="carousel-page" class="grid-page">
        <app-box 
          v-for="(item, index) in appCopy" 
          :key="item.id"
          :item-index="index"
          :app-infor="item"
          :display-app-name="true"
        />
      </div> -->
      <!-- <div 
        v-for="(item, index) in carouselList" 
        :key="item" 
        :ref="`carousel-page${index}`" 
        :style="{ left: `${index*270}px` }"  
        class="carousel-page"
      >
        {{ item.id }}
      </div> -->
      <div ref="carousel-page1" class="carousel-page1">
        1
      </div>
      <div ref="carousel-page2" class="carousel-page2">
        2
      </div>
      <div ref="carousel-page3" class="carousel-page3">
        3
      </div>

     

      <!-- <ul class="carousel-indicators">
        <li v-for="item in pageList" :key="item.id"></li>
      </ul> -->

    </div>

    <!-- <app-box 
      v-for="item in appList" 
      :key="item.id"
      :app-infor="item"
    /> -->

  </div>  
</template>

<script>
//import appBox from '../appBox/index.vue'

export default {
  name: 'mainContainer',
  components: {
    //appBox
  },
  computed: {
  },
  data () {
    return {
      pageList: [
        { 
          id: '1',
          pageBadge: 1
        },
        { 
          id: '2',
          pageBadge: 2
        },
        { 
          id: '3',
          pageBadge: 3
        }
      ],
      appCopy: [

      ],
      carouselList: [
        { 
          id: '1'
        },
        { 
          id: '2'
        },
        { 
          id: '3'
        }
      ],
      appList: [  
        { 
          id: '1',
          type: 'single', // 单 app
          gridNum: '2 * 2',
          badgeNum: 0,
          boxName: '时钟',
          shakeStatus: false,
          bgImgFileName: 'clock.jpeg',
        },
        { 
          id: '2',
          type: 'single', // 单 app
          gridNum: '2 * 2',
          badgeNum: 0,
          boxName: '天气',
          shakeStatus: false,
          bgImgFileName: 'weather.jpeg',
        },
        { 
          id: '3',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '邮件',
          shakeStatus: false,
          bgImgFileName: 'email.jpeg',
        },
        { 
          id: '4', 
          type: 'group', // app 组
          gridNum: '1 * 1',
          boxName: '实用工具',
          groupAppList: [
            { 
              id: '4-1',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: 'QQ',
              shakeStatus: false,
              bgImgFileName: 'qq.jpeg',
            },
            { 
              id: '4-2',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: '微信',
              shakeStatus: false,
              bgImgFileName: 'wechat.jpeg',
            },
            { 
              id: '4-3',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: 'wps',
              shakeStatus: false,
              bgImgFileName: 'wps.jpeg',
            },
            { 
              id: '4-4',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: '图书',
              shakeStatus: false,
              bgImgFileName: 'books.jpeg',
            },
            { 
              id: '4-5',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: 'Numbers表格',
              shakeStatus: false,
              bgImgFileName: 'numbers.jpeg',
            },
            { 
              id: '4-6',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: '日历',
              shakeStatus: false,
              bgImgFileName: 'calendar.jpeg',
            },
            { 
              id: '4-7',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: 'page文稿',
              shakeStatus: false,
              bgImgFileName: 'page.jpeg',
            },
            { 
              id: '4-8',
              type: 'single', // 单 app
              gridNum: '1 * 1',
              badgeNum: 0,
              boxName: '视频',
              shakeStatus: false,
              bgImgFileName: 'video.jpeg',
            }
          ]
        },
        { 
          id: '5',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '计算器',
          shakeStatus: false,
          bgImgFileName: 'cumputed.jpeg',
        },
        { 
          id: '6',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '地图',
          shakeStatus: false,
          bgImgFileName: 'map.jpeg',
        },
        { 
          id: '7',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 1,
          boxName: 'App Store',
          shakeStatus: false,
          bgImgFileName: 'appStore.jpeg',
        },
        { 
          id: '8',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '图书',
          shakeStatus: false,
          bgImgFileName: 'books.jpeg',
        },
        { 
          id: '9',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '通讯录',
          shakeStatus: false,
          bgImgFileName: 'addressbook.jpeg',
        },
        { 
          id: '10',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '提醒事项',
          shakeStatus: false,
          bgImgFileName: 'memo.jpeg',
        },
        { 
          id: '11',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '备忘录',
          shakeStatus: false,
          bgImgFileName: 'memo.jpeg',
        },
        { 
          id: '12',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '音乐',
          shakeStatus: false,
          bgImgFileName: 'music.jpeg',
        },
        { 
          id: '13',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '相机',
          shakeStatus: false,
          bgImgFileName: 'camera.jpeg',
        },
        { 
          id: '14',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 1,
          boxName: '设置',
          shakeStatus: false,
          bgImgFileName: 'setting.gif',
        },
        { 
          id: '15',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '视频',
          shakeStatus: false,
          bgImgFileName: 'video.jpeg',
        }
      ],
      isShake: false,
      pageGridNum: '4 * 6',


      timeOutEvent: null, // 事件延迟定时器
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      initLeft: 0,
      touchStartT: 0,
      touchEndT: 0
    }
  },
  mounted () {

  },
  methods: {
    gtouchstart (e) {
      this.touchStartT = new Date().getTime()

      console.log('???', e.target)

      let touch = e.targetTouches[0]
      this.startX = touch.pageX
      this.startY = touch.pageY
      this.initLeft = this.getStyleSheetVal(this.$refs['carousel'], 'left')

      this.$refs['carousel'].style.transition = ''
      this.$refs['carousel'].style.webkitTransition = ''

      
      this.timeOutEvent = setTimeout(this.longPress, 500)
      return false
    },
    gtouchend (e) {
      this.touchEndT = new Date().getTime()

      let dX = this.endX - this.startX
      let dY = this.endY - this.startY

      // if (dX !== this.startX) {
      //   //console.log('手指左右划动，x轴')
      // }
      // if (dY !== this.startY) {
      //   //console.log('手指上下滑动，y轴')
      // }
      
      //this.$refs['carousel-page1'].style.left = this.$refs['carousel-page1'].style.left.split('px')[0] + dX + 'px'

      this.$refs['carousel'].style.transition = 'left 0.5s ease 0.01s'
      this.$refs['carousel'].style.webkitTransition = 'left 0.5s ease 0.01s'

      console.log('touchend')

      // if ('手指快速移动'||'缓慢移动后并超过指定距离的一半') {
      //   '可以完成切换page'
      // } else {
      //   '不可完成切换page'
      // }

      // 点击，触摸，划动，快速移动，长按，
      // 从左->右划， 从右->左划，从上->下划，从下->上划，从左下->右上划，从右上->左下划，从右上->左下划， 从右下->左上划，从左上->右下划，

      let touchT = this.touchEndT - this.touchStartT


      if ((Math.abs(dX) >= 270 / 2) || touchT <= 150) { // 如果划动距离超过指定宽度的一半，活着时间差小于150ms，则确定可以完成移动

        console.log('可以完成移动 + 动画')

        if (dX > 0) {
         
          this.$refs['carousel'].style.left = 270 + this.initLeft + 'px'

          console.log('l->r', this.$refs['carousel'].style.left)
          // this.$refs['carousel-page1'].style.transform = `translateX(${270 - dX}px)`
          // this.$refs['carousel-page1'].style.webkitTransform = `translateX(${270 - dX}px)`
        }
        if (dX < 0) {
          
          this.$refs['carousel'].style.left = -270 + this.initLeft + 'px'
          console.log('r->l', this.$refs['carousel'].style.left)
          // this.$refs['carousel-page1'].style.transform = `translateX(${270 + dX}px)`
          // this.$refs['carousel-page1'].style.webkitTransform = `translateX(${270 + dX}px)`
        }
        
      } else {
        // 回退移动 + 动画
        console.log('回退')
        this.$refs['carousel'].style.left = this.initLeft + 'px'
        //this.$refs['carousel-page1'].style.transforms = `translateX(${this.initLeft}px)`
      }

      this.startX = this.startY = this.endX = this.endY = this.touchStartT = this.touchEndT = 0

      this.initLeft = this.getStyleSheetVal(this.$refs['carousel'], 'left')

      clearTimeout(this.timeOutEvent) //清除定时器   
      if(this.timeOutEvent !== null) {   
        //这里写要执行的内容（尤如onclick事件）   
        //alert("手指点击，不是手指长按") 
        //console.log("手指点击，不是手指长按") 
      }   
      return false   
    },
    gtouchmove (e) {
      clearTimeout(this.timeOutEvent)//清除定时器   
      this.timeOutEvent = null 
      //alert("手指移动事件触发")    
      let touch = e.targetTouches[0]
      this.endX = touch.pageX
      this.endY = touch.pageY
      // console.log("手指移动事件触发") 

      let dX = this.endX - this.startX
      let dY = this.endY - this.startY
      let left = this.getStyleSheetVal(this.$refs['carousel'], 'left')
    
      this.$refs['carousel'].style.left = this.initLeft + dX + 'px'  

      console.log("left", left, "dX", dX,) 
      
    },
    longPress () {
      this.timeOutEvent = null   
      //执行长按要执行的内容，如弹出菜单   
      //alert("手指长按事件触发")
      //console.log("手指长按事件触发")    
    },
    wetherScroll () {
    },
    // 得到样式表中的属性 数值
    getStyleSheetVal (target, attribute) {
      return Number(document.defaultView.getComputedStyle(target, null)[attribute].split('px').join(''))
    }
  }
  // mounted () {
  //   this.computedGrid(this.pageGridNum)
  //   window.addEventListener('resize', () => { 
  //     this.computedGrid(this.pageGridNum) 
  //   }, false)
  // },
  // methods: {
  //   computedGrid(str) {

  //     let rcArr = str.split(' ')
  //     let column = Number(rcArr[0])
  //     let rows = Number(rcArr[2])

  //     let space = 20

  //     let h = this.getStyleSheetVal(this.$refs['carousel-page'], 'height') 
  //     let w = this.getStyleSheetVal(this.$refs['carousel-page'], 'width')
      
  //     let boxH = (h / rows) - space
  //     let boxW = (w / column) - space

  //     this.$refs['carousel-page'].style.gridTemplateRows = `repeat(${rows}, ${boxW}px)`
  //     this.$refs['carousel-page'].style.gridTemplateColumns = `repeat(${column}, ${boxW}px)`
  //   },
  //   // 得到样式表中的属性 数值
  //   getStyleSheetVal (target, attribute) {
  //     return Number(document.defaultView.getComputedStyle(target, null)[attribute].split('px').join(''))
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 115px);
  padding: 10px 15px;
  //background-color: green;
  position: relative;
}

.carousel {
  display: inline-block;
  position: absolute;
  left: 15px;
  height: calc(100vh - 135px);
  width: 814px;
  color: white;
  border: 1px solid #333333;
  font-size: 48px;

  //background-color: red;
  
  .carousel-page {
    display: inline-block;
    position: absolute;
    height: 100%;
    width: 270px;
    color: white;
    border: 1px solid white;
    font-size: 48px;
  }

  .carousel-page1 {
    vertical-align: top;
    display: inline-block;
    line-height: 471px;
    height: 100%;
    width: 270px;
    color: white;
    border: 1px solid white;
    font-size: 48px;

    background-color: red;
  }

  .carousel-page2 {
    vertical-align: top;
    display: inline-block;
    line-height: 471px;
    height: 100%;
    width: 270px;
    color: white;
    border: 1px solid white;
    font-size: 48px;

    background-color: green;
  }

  .carousel-page3 {
    vertical-align: top;
    display: inline-block;
    line-height: 471px;
    height: 100%;
    width: 270px;
    color: white;
    border: 1px solid white;
    font-size: 48px;

    background-color: blue;
  }



  .grid-page {
    height: calc(100vh - 200px);
    width: 100%;
    
    display: grid;
    grid-template-columns: repeat(4, 47.5px); // 列数，列宽
    grid-template-rows: repeat(6, 47.5px); // 行数，行高
    grid-gap: 25px 25px; // 单元格间距  行间距：<grid-row-gap> 列间距： <grid-column-gap>;
    place-content: center center; // 内容在容器内 水平: <justify-content> 、 垂直: <align-content> 居中 
    place-items: center center; // 单元格在容器内 水平: <justify-items> 、 垂直: <align-items> 居中 

    //background-color: #409eff;
  }



}

.carousel-indicators {
  position: relative;
  top: 35px;
  display: inline-block;
  height: 30px;
  border-radius: 35px;
  padding: 0 10px;
  touch-action: auto;

  &:active {
    background-color: #cccccc;
  }

  li {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 5px;
    background-color: white;
    margin: auto 5px;
    
    &:hover {
      background-color: #6a6a6a;
    }
  }
}





.el-carousel__item h3 {
  color: #475669;
  font-size: 56px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  opacity: 0.5;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  opacity: 0.5;
}
</style>