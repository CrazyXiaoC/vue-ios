<template>
  <div ref="carousel" 
    class="carousel"
    :style="carouselStyle"
    @touchstart="touchCarouselStart($event)"
    @touchmove="touchCarouselMove($event)"
    @touchend="touchCarouselEnd($event)"
  > 
    <!-- <slot/> -->
    <div class="carousel-panel" ref="carousel-panel" :style="carouselPanelStyle">
      <div v-for="(item, index) in pageList" 
        :key="index" 
        :id="`carousel-item-${index}`"
        :ref="`carousel-item-${index}`" 
        class="carousel-item"
        :style="{ 'left': index * itemWidth + 'px', 'background-color': index % 2 === 0 ? '#99a9bf': '#d3dce6'}"
      >
      {{ item }}
      </div>
    </div>

    <ul v-show="indicatorVisible && pageList.length !== 0" 
      class="carousel-indicators"
      @touchstart="touchIndicatorUlStart($event)"
      @touchmove="touchIndicatorUlMove($event)"
      @touchend="touchIndicatorUlEnd($event)"
    >
      <!-- <li v-for="(item, index) in pageList" 
        :key="index" 
        :style="{ 'background-color': index === currentViewIndex ? 'white' : '#cccccc' }"
        @touchstart="touchIndicatorLiStart($event, index)"
        @touchmove="touchIndicatorLiMove($event, index)"
        @touchend="touchIndicatorLiEnd($event, index)"
      >
      </li> -->
      <li v-for="(item, index) in pageList" 
        :key="index"
        :class="`carousel-indicators-${index}`"
        :style="{ 'background-color': index === currentViewIndex ? 'white' : '#cccccc' }"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import { getStyleSheetAttrVal } from '@/utils/styleSheet.js'

export default {
  name: 'carousel',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    indicatorVisible: {
      type: Boolean,
      default: true
    },
    // 指示器位置
    indicatorPosition: {
      type: String,
      default: 'none' // outside/none
    }
  },
  data () {
    return {
      pageList: ['1', '2', '3'],
      //pageList: [],
      startX: 0,
      startY: 0,
      dX: 0,
      dY: 0,
      startTimeStamp: 0,
      touchTime: 0,
      currentViewIndex: 0,
      target: null
    }
  },
  computed: {
    carouselStyle () {
      return {
        height: this.height,
        width: this.width
      }
    },
    carouselPanelStyle () {
      return {
        height: '100%',
        width: '100%'
      }
    },
    itemWidth () {
      return Number(this.width.split('px')[0])
    }
  },
  mounted () {
    this.target = this.$refs['carousel-panel']
  },
  methods: {
    touchCarouselStart (e) {
      e.stopPropagation()
      if (this.pageList.length === 0) return false
      this.startTimeStamp = e.timeStamp
      let touch = e.targetTouches[0]
      this.startX = touch.pageX
      this.startY = touch.pageY
      this.target.style.transition = ''
    },
    touchCarouselMove (e) {
      e.stopPropagation()
      if (this.pageList.length === 0) return false
      let touch = e.targetTouches[0]
      this.dX = touch.pageX  - this.startX
      this.dY = touch.pageY - this.startY

      /* 判断处理手指怎么滑动的 */ 
      if (Math.abs(this.dX) > Math.abs(this.dY)) { // 左右划
        if ((Math.abs(this.dX) > this.itemWidth) || (this.dX > 0 && this.currentViewIndex === 0) || (this.dX < 0 && this.currentViewIndex === this.pageList.length - 1)) {
          return false // 不满足条件，不能划动
        } else {
          this.target.style.left = - (this.currentViewIndex * this.itemWidth) + this.dX + 'px'
        }
      }
      if (Math.abs(this.dX) < Math.abs(this.dY)) { // 上下划
      }

    },
    touchCarouselEnd (e) {
      e.stopPropagation()
      if (this.pageList.length === 0) return false
      this.touchTime = Math.floor(e.timeStamp - this.startTimeStamp)

      // 判断手指怎么滑动的
      if (Math.abs(this.dX) > Math.abs(this.dY)) { // 左右划
        if ((this.dX > 0 && this.currentViewIndex === 0) || (this.dX < 0 && this.currentViewIndex === this.pageList.length - 1)) {
          return false // 不满足条件，不能划动
        } else {
          this.target.style.transition = 'left 0.25s ease-in-out 0.01s'
          if (Math.abs(this.dX) > this.itemWidth / 2 || this.touchTime < 150) {
            if (this.dX > 0) {
              this.target.style.left = - (this.currentViewIndex - 1) * this.itemWidth + 'px'
              this.currentViewIndex--
            }
            if (this.dX < 0) {
              this.target.style.left = - (this.currentViewIndex + 1) * this.itemWidth + 'px'
              this.currentViewIndex++
            }
          }
          if (Math.abs(this.dX) < this.itemWidth / 2) {
            this.target.style.left = - (this.currentViewIndex * this.itemWidth) + 'px'
          }
        }
      }
      if (Math.abs(this.dX) < Math.abs(this.dY)) { // 上下划
      }
    },
    touchIndicatorUlStart (e) {
      e.stopPropagation()
    },
    touchIndicatorUlMove (e) {
      e.stopPropagation()
      console.log('iiii')
    },
    touchIndicatorUlEnd (e) {
      e.stopPropagation()
      let index = e.target.className.split('carousel-indicators-')[1]
      if (index !== undefined) {
        this.target.style.transition = 'left 0.25s ease-in-out 0.01s'
        if (index > this.currentViewIndex) { //右向左移动
          this.target.style.left = - (this.currentViewIndex + 1) * this.itemWidth + 'px'
          this.currentViewIndex++
        }
        if (index < this.currentViewIndex) {//左向右移动
          this.target.style.left = - (this.currentViewIndex - 1) * this.itemWidth + 'px'
          this.currentViewIndex--
        }
      }
    },
    touchIndicatorLiStart (e, index) {
      e.stopPropagation()
    },
    touchIndicatorLiMove (e, index) {
      e.stopPropagation()
    },
    touchIndicatorLiEnd (e, index) {
      e.stopPropagation()
      this.target.style.transition = 'left 0.25s ease-in-out 0.01s'
      if (index > this.currentViewIndex) { //右向左移动
        this.target.style.left = - (this.currentViewIndex + 1) * this.itemWidth + 'px'
        this.currentViewIndex++
      }
      if (index < this.currentViewIndex) {//左向右移动
        this.target.style.left = - (this.currentViewIndex - 1) * this.itemWidth + 'px'
        this.currentViewIndex--
      }
      console.log('index', index)
    },
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  display: inline-block;
  position: relative;

  .carousel-panel {
    display: inline-block;
    position: absolute;

    .carousel-item {
      display: inline-block;
      position: absolute;
      height: 100%;
      width: 100%;


      color: white;
      font-size: 48px;
      text-align: center;
      line-height: 469px;
    }
  }

  .carousel-indicators {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0px;
    height: 30px;
    border-radius: 35px;
    padding: 0 10px;
    touch-action: auto;

    // &:active {
    //   background-color: #cccccc;
    // }

    li {
      display: inline-block;
      height: 5px;
      width: 5px;
      border-radius: 5px;
      background-color: white;
      margin: auto 5px;
      
      // &:hover {
      //   background-color: #6a6a6a;
      // }
    }
  }
}
</style>