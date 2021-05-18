<template>
  <div id="layout" ref="layout" class="layout">

    <div id="main-view" ref="main-view" class="main-view"  
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
      :style="'background-image: url(' + mainViewBGIMGURL + ')'"
    >
      <top-status-bar 
        ref="top-status-bar" 
        class="top-status-bar" 
        :visible="topStatusBarVisible"
      />    

      <div ref="carousel-view" class="carousel-view">

        <div v-for="(item, index) in pageList" 
          :key="index" 
          :id="`carousel-item-${index}`"
          class="carousel-item"
          :style="{ 'left': index * viewWidth + 'px'}"
        >
          <div :id="`carousel-app-container-${index}`" class="carousel-app-container"> 
            <app-box 
              v-for="(item, index) in carouselAppList[index]" 
              :key="item.id"
              :item-index="index"
              :app="item"
              :current-status="item.currentStatus"
              :edge-visible="item.edgeVisible"
              :box-label-visible="true"
            /> 
          </div>
        </div>

        <ul v-show="pageList.length !== 0"
          ref="carousel-indicators" 
          class="carousel-indicators"
        >
          <li v-for="(item, index) in pageList" 
            :key="index"
            :id="`carousel-indicators-${index}`"
            :class="`carousel-indicators-${index}`"
            :style="{ 'background-color': index === currentViewIndex ? 'white' : '#cccccc' }"
          >
          </li>
        </ul>

        <div ref="bottom-app-container" class="bottom-app-container"> 
          <app-box 
            v-for="(item, index) in bottomAppList" 
            :key="item.id"
            :item-index="index"
            :app="item"
            :current-status="item.currentStatus"
            :edge-visible="item.edgeVisible"
            :box-label-visible="false"
          />
        </div>

      </div>

      <div ref="left-view" class="left-view font-color"> left </div>
      <div ref="right-view" class="right-view font-color"> right </div>
      <lock-screen-view 
        ref="lock-screen-view" 
        :filter-val="lockScreenImageFilterVal"
        class="lock-screen-view"
      />
      <div ref="controller-view" class="controller-view font-color"> controller </div>
      <div ref="app-switch-view" class="app-switch-view font-color"> app-switch </div>
    </div>

  </div>  
</template>
   
<script>
import topStatusBar from './components/topStatusBar/index'
import lockScreenView from './components/lockScreenView/index'
//import topViewEdit from './components/topViewEdit/index'
import { carouselAppList, bottomAppList } from './appData.js'
import appBox from './components/appBox/index.vue'

let gridColumnWidth = 47
let gridRowHeight = 47
let gridRowGap = 23
let gridColumnGap = 23
let bottomGridRows = 1
let bottomGridColumns = 4

export default {
  name: 'Layout',
  components: {
    topStatusBar,
    appBox,
    lockScreenView
  },
  data () {
    return {
      viewHeight: 610,
      viewWidth: 300,
      mainViewBGIMGURL: require('../assets/background/earth.jpeg'),
      lockScreenViewBGIMGURL: require('../assets/background/earth.jpeg'),
      carouselAppList: carouselAppList(),
      bottomAppList: bottomAppList(),
      topStatusBarVisible: true,

      lockScreenImageFilterVal: 0,


      pageList: ['1', '2', '3'],
      currentViewIndex: 0,

      duration: 0,
      timingFunction: 'ease',  // ease linear ease-in ease-out ease-in-out cubic-bezier(n,n,n,n)
      delay: 0,

      eventTimerId: null, // 事件延迟定时器Id
      startX: 0, // 触摸屏幕开始坐标x
      startY: 0, // 触摸屏幕开始坐标y
      endX: 0, // 触摸屏幕结束坐标y
      endY: 0, // 触摸屏幕结束坐标y
      startTimeStamp: 0, // 触摸屏幕开始时间戳
      endTimeStamp: 0, // 触摸屏幕结束时间戳
      touchTime: 0, // 触摸屏幕时长
      touchMinTime: 150,

      leftViewIsOpen: false,
      rightViewIsOpen: false,

      layout: null,
      mainView: null,
      carouselView: null,
      carouselIndicators: null,
      bottomAppContainer: null,
      leftView: null,
      rightView: null,
      lockScreenView: null,
      controllerView: null,
      appSwitchView: null

    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.layout = this.$refs['layout']
    this.mainView = this.$refs['main-view']
    this.carouselView = this.$refs['carousel-view']
    this.carouselIndicators = this.$refs['carousel-indicators']
    this.bottomAppContainer = this.$refs['bottom-app-container']
    this.leftView = this.$refs['left-view']
    this.rightView = this.$refs['right-view']
    this.lockScreenView = this.$refs['lock-screen-view'].$el
    this.controllerView = this.$refs['controller-view']
    this.appSwitchView = this.$refs['app-switch-view']
  },
  methods: {
    touchStart (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.startTimeStamp = e.timeStamp
      this.startX = touch.pageX
      this.startY = touch.pageY

      this.mainView.style.transition = ''
      this.mainView.style.webkitTransition = ''

      this.lockScreenView.style.transition = ''
      this.lockScreenView.style.webkitTransition = ''

      this.leftView.style.transition = ''
      this.leftView.style.webkitTransition = ''

      this.rightView.style.transition = ''
      this.rightView.style.webkitTransition = ''

      this.eventTimerId = setTimeout(this.longPress, 500)
      return false
    },
    touchMove (e) {
      e.stopPropagation()
      clearTimeout(this.eventTimerId)//清除定时器   
      this.eventTimerId = null 
      // 手指移动事件
      //console.log('手指移动事件触发')
      let touch = e.targetTouches[0]
      this.endX = touch.pageX
      this.endY = touch.pageY
      let dX = this.endX - this.startX
      let dY = this.endY - this.startY

      /* 判断处理手指怎么滑动的 */ 
      if (Math.abs(dX) > Math.abs(dY)) {
        if (dX > 0) { // 从左往右滑
          console.log('layout: move(left->right)') 
        }
        if (dX < 0) { // 从右往左滑
          console.log('layout: move(right->left)') 
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上向下滑
          console.log('layout: move(up->down)')
          if (this.startY <= 35) { // 从屏幕顶部向下滑才可打开锁屏界面
            this.lockScreenViewUToDMove(dY) // 处理 打开 clock-screen-view 动画
          }
        }
        if (dY < 0) { // 从下向上滑
          console.log('layout: move(down->up)') 
        }
      }
    },
    touchEnd (e) {
      e.stopPropagation()
      this.endTimeStamp = e.timeStamp
      this.touchTime = Math.floor(this.endTimeStamp - this.startTimeStamp)

      let dX = this.endX - this.startX
      let dY = this.endY - this.startY

      // 判断手指怎么滑动的
      if (Math.abs(dX) > Math.abs(dY)) {
        if (dX > 0) { // 左向右滑结束
          console.log('layout: end(left->right)') 
        }
        if (dX < 0) { // 右向左滑结束
          console.log('layout: end(right->left)') 
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上往下滑结束
          this.lockScreenViewUToDEnd(dY)
          console.log('layout: end(up->down)') 
        }
        if (dY < 0) { // 从下往上滑结束
          console.log('layout: end(down->up)') 
        }
      }

      clearTimeout(this.eventTimerId) //清除定时器   
      if(this.eventTimerId !== null) {   
        // 手指点击事件   
        //console.log('手指点击事件触发')
      }   
      return false   
    },
    longPress () {
      this.eventTimerId = null   
      // 手指长按事件    
      //console.log('手指长按事件触发')

      let obj = this.$message({ 
        message: Math.floor(Math.random()*100), 
        duration: 3000, 
        type: 'success' 
      })

      let lock = this.$refs['lock-screen-view']

      console.log('124', obj, lock)

    },
    lockScreenViewUToDMove(dY) {
      this.lockScreenView.style.top = - this.viewHeight + dY + 'px'
      //this.lockScreenView.style.filter = `blur(${(this.viewHeight - dY) / 100}px)`
      //this.lockScreenView.style.filter = `opacity(${(dY*2/this.viewHeight)*100}%`
      this.lockScreenImageFilterVal = (this.viewHeight - dY) / 100
    },
    lockScreenViewUToDEnd(dY) {
      this.lockScreenView.style.transition = 'top 0.25s ease-in-out 0.01s'
      if (Math.abs(dY) > this.viewHeight / 2 || this.touchTime < 150) {
        this.lockScreenView.style.top = '0px'
        //this.lockScreenView.style.filter = `blur(0px)`
        this.lockScreenImageFilterVal = 0
      }
      if (Math.abs(dY) < this.viewHeight / 2) {
        this.lockScreenView.style.top = - this.viewHeight + 'px'
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
$deviceHeight: 610px;
$deviceWidth: 300px;

.layout {
  height: 100vh;
  width: 100vw;
  touch-action: none;
  overflow: hidden;

  .main-view {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: $deviceHeight;
    width: $deviceWidth;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 135% 110%;
    //background-color: blue;
    //padding: 10px 10px;

    .top-status-bar {
      position: fixed;
      z-index: 999;
    }

    .carousel-view {
      position: absolute;
      display: inline-block;
      height: $deviceHeight;
      width: $deviceWidth;

      .carousel-item {
        display: inline-block;
        position: absolute;
        height: 100%;
        width: 100%;

        .carousel-app-container {
          position: relative;
          top: 35px;
          width: 100%;
          height: 450px;
          //background-color: red;

          display: grid;
          place-content: center;
          place-items: center;
          grid-template-rows: repeat(6, 47px);
          grid-template-columns: repeat(4, 47px);
          gap: 23px 23px;
        }

      }

      .carousel-indicators {
        display: inline-block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 90px;
        height: 30px;
        border-radius: 35px;
        padding: 0 10px;
        touch-action: auto;
        //background-color: red;

        li {
          display: inline-block;
          height: 5px;
          width: 5px;
          border-radius: 5px;
          background-color: white;
          margin: auto 5px;
        }
      }

      .bottom-app-container {
        position: absolute;
        bottom: 0px;
        z-index: 1;
        height: 73px;
        width: 280px;
        border-radius: 25px;
        padding: 10px 10px;
        margin: 10px 10px;
        background-color: rgba(144, 147, 153, 0.6);

        display: grid;
        place-content: center center;
        place-items: center center;
        grid-template-rows: repeat(1, 47px);
        grid-template-columns: repeat(4, 47px);
        gap: 23px 23px;
      }

    }

    .left-view {
      position: absolute;
      display: inline-block;
      left: -100%;
      height: $deviceHeight;
      width: $deviceWidth;
      line-height: $deviceHeight;
      text-align: center;
      background-color: rgba(144, 147, 153, 0.6);
    }

    .right-view {
      position: absolute;
      display: inline-block;
      right: -100%;
      height: $deviceHeight;
      width: $deviceWidth;
      line-height: $deviceHeight;
      text-align: center;
      background-color: rgba(144, 147, 153, 0.6);
    }

    .lock-screen-view {
      position: absolute;
      z-index: 999;
      top: -100%;
      height: $deviceHeight;
      width: $deviceWidth;
    }

    .controller-view {
      position: absolute;
      top: -100%;
      height: $deviceHeight;
      width: $deviceWidth;
      line-height: $deviceHeight;
      text-align: center;
      background-color: green;
    }

    .app-switch-view {
      position: absolute;
      left: -100%;
      height: $deviceHeight;
      width: $deviceWidth;
      line-height: $deviceHeight;
      text-align: center;
      background-color: green;
    }

  }
}

.font-color {
  color: red;
  font-weight: bold;
  font-size: 48px; 
}
</style>