<template>
  <transition name="fade">
    <div class="icon-box" 
      v-show="visible"
      :ref="`${iconName}-box`"
      :style="{ 'background-color': isActive ? '#cccccc' : '#141414' }"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
    >
      <svg-icon class="button-icon" 
        :id="`${iconName}-icon`"
        :icon-class="iconName" 
        :style="{ 'color': isActive ? '#000000' : '#ffffff' }" 
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'svgButton',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      eventTimerId: null, // 事件延迟定时器Id
      startTimeStamp: 0, // 触摸屏幕开始时间戳
      endTimeStamp: 0, // 触摸屏幕结束时间戳
      touchTime: 0, // 触摸屏幕时长
      touchMinTime: 150,

      startX: 0, // 触摸屏幕开始坐标x
      startY: 0, // 触摸屏幕开始坐标y
      endX: 0, // 触摸屏幕结束坐标y
      endY: 0, // 触摸屏幕结束坐标y

      target: null,
      isActive: false
    }
  },
  mounted () {
    this.target = this.$refs[`${this.iconName}-box`]
  },
  methods: {
    touchStart (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.startX = touch.pageX
      this.startY = touch.pageY
      this.startTimeStamp = e.timeStamp

      this.target.style.transition = '' 
      this.target.style.webKitTransition = '' 

      this.eventTimerId = setTimeout(this.longPress, 250)
      return false
    },
    touchMove (e) {
      e.stopPropagation()
      clearTimeout(this.eventTimerId)//清除定时器   
      this.eventTimerId = null 
      // 手指移动事件
      let touch = e.targetTouches[0]
      this.endX = touch.pageX
      this.endY = touch.pageY
    },
    touchEnd (e) {
      e.stopPropagation()
      this.endTimeStamp = e.timeStamp
      this.touchTime = Math.floor(this.endTimeStamp - this.startTimeStamp)

      if (this.touchTime >= 250) {
        this.isActive = !this.isActive
        this.target.style.transform = `scale(1, 1)`
        this.$emit('touch-end', 'touch-end!!!')
      }

      clearTimeout(this.eventTimerId) //清除定时器   
      if(this.eventTimerId !== null) {   
        // 手指点击事件   
        this.target.style.transform = `scale(${1 + this.touchTime/1000}, ${1 + this.touchTime/1000})`
        this.target.style.transition = `all ${this.touchTime/1000}s ease-in-out 0.01s` 
        this.target.style.webKitTransition = `all ${this.touchTime/1000}s ease-in-out 0.01s` 
   
        setTimeout(() => {
          this.target.style.transform = `scale(1, 1)`
        }, this.touchTime)
      }   
      return false   
    },
    longPress () {
      this.eventTimerId = null   
      // 手指长按事件 
      this.target.style.transition = 'all 0.25s ease-in-out 0.01s' 
      this.target.style.webKitTransition = 'all 0.25s ease-in-out 0.01s' 
      this.target.style.transform = `scale(1.5, 1.5)`
    },
  }
}
</script>

<style lang="scss" scoped>
.icon-box {
  border-radius: 25px;
  text-align: center;
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
  margin: 10px auto;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.1, 0.1)
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-in-out 0.01s;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: scale(1, 1)
}
</style>