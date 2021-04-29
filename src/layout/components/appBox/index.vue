<template>
  <div :id="`${app.id}`"
    :ref="'app-box-container' + app.id"
    class="app-box-container"
    :class="appBoxContainerClass" 
    :style="appBoxContainerStyle"
  >
    
    <div v-if="app.type === 'single'" 
      :id="'single-box' + app.id"
      :ref="'single-box' + app.id"
      class="single-box" 
      :style="singleStyle"
      @touchstart="touchStartAppBox($event, app)"
      @touchmove="touchMoveAppBox($event, app)"
      @touchend="touchEndAppBox($event, app)"
    >
    </div>
    <div v-else-if="app.type === 'group'" 
      class="group-box" 
      :style="groupStyle"
    >
      <div v-for="item in app.groupAppList" 
        :key="item.id"
        class="group-app-item" 
        :style="'background-image: url(' + require('@/assets/appIcon/' + item.bgImgFileName) + ')'"
      >
      </div>
    </div>

    <div v-show="removeIconStatus" 
      class="remove-app-icon"
      :class="removeIconClass"
      @touchstart="touchStartRemoveIcon($event, app)"
      @touchmove="touchMoveRemoveIcon($event, app)"
      @touchend="touchEndRemoveIcon($event, app)"
    > 
      <svg-icon :style="svgIconStyle" 
        :icon-class="app.removeIconName"
      />
    </div>

    <div v-show="!app.edgeVisible && badgeNum > 0" class="badge">
      {{ badgeNum }}
    </div>
    <div v-show="!app.edgeVisible && boxLabelVisible" 
      class="box-label-box" 
      :style="boxLabelStyle"
    >
      {{ app.boxLabel }}
    </div>
    <div v-show="app.edgeVisible" 
      :class="{'edge-effect': true, 'edge-zoom-in': true, 'edge-zoom-in': false }"
    >
    </div>

  </div>
</template>

<script>
import { getStyleSheetAttrVal } from '@/utils/styleSheet.js'

export default {
  name: 'appBox',
  props: {
    app: {
      type: Object,
      default: () => {},
      required: true
    },
    currentStatus: {
      type: String,
      default: 'normal', // normal edit move
      required: true,
      validate: (value) => {
        return ['normal', 'edit', 'move'].indexOf(value) !== -1
      }
    },
    boxLabelVisible: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data () {
    return {
      appTimer: null,
      appBoxContainerScaleStatus: false,
      appBoxContainerHeight: '47px',
      appBoxContainerWidth: '47px',
      removeIconStatus: false,
      iconZoomStatus: false,
      svgIconColor: 'white',
      left: 0,
      top: 0,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      target: null
    }
  },
  watch: {
    currentStatus: {
      handler(newVal, oldVal) {
        if (newVal === 'normal') { 
          this.iconZoomStatus = false // zoom-out 
          setTimeout(() => {
            this.removeIconStatus = false
          }, 150)
        }
        if (newVal === 'edit') {
          this.iconZoomStatus = true
          this.removeIconStatus = true // zoom-in
        }
        if (newVal === 'move') {
          this.iconZoomStatus = false // zoom-out 
          setTimeout(() => {
            this.removeIconStatus = false
          }, 150)
        }
      },
      // deep: true,
      // immediate: true
    }
  },
  computed: {
    appBoxContainerClass () {
      return {
        'shake-animation': this.app.currentStatus === 'edit' && !this.app.edgeVisible,
        'change-scale': this.appBoxContainerScaleStatus
      }
    },
    appBoxContainerStyle () {
      let style = {
        height: this.appBoxContainerHeight,
        width: this.appBoxContainerWidth 
      }
      // if (gridTotalNum === 1) {
      //   style.gridColumn = `1 / 3`
      //   style.gridRow = '1 / 3'
      // }
      // if (gridTotalNum === 2) {
      //   style.gridColumn = `3 / 5`
      //   style.gridRow = '1 / 3'
      // }
      // if (gridTotalNum === 3) {
      //   style.gridColumn = `1 / 3`
      //   style.gridRow = '3 / 5'
      // }
      // if (gridTotalNum === 4) {
      //   style.gridColumn = `3 / 5`
      //   style.gridRow = '3 / 5'
      // }
      // if (gridTotalNum === 5) {
      //   style.gridColumn = `1 / 3`
      //   style.gridRow = '5 / 7'
      // }
      // if (gridTotalNum === 6) {
      //   style.gridColumn = `3 / 5`
      //   style.gridRow = '5 / 7'
      // }
      return style
    },
    singleStyle () {
      return {
        backgroundImage: 'url(' + require('@/assets/appIcon/' + this.app.bgImgFileName) + ')'
      }
    },
    groupStyle () {
      return {
      }
    },
    shakeStatus () {
      return this.app.currentStatus === 'edit' && !this.app.edgeVisible 
    },
    removeIconClass () {
      return this.iconZoomStatus ? 'zoom-in' : 'zoom-out'
    },
    svgIconStyle () {
      return { 
        color: this.svgIconColor, 
        fontSize: '20px' 
      }
    },
    boxLabelStyle () {
      return {
        color: 'white',
        fontSize: '8px'
      }
    },
    badgeNum () {
      let num = 0
      if (this.app.type === 'single') {
        num = this.app.badgeNum
      } else {
        for (const i in this.app.groupAppList) {
          num = num + this.app.groupAppList[i].badgeNum
        }
      }
      return num
    }
  },
  mounted () {
    this.target = this.$refs[`app-box-container${this.app.id}`]
  },
  methods: {
    touchStartAppBox (e, app) {
      e.stopPropagation()
      this.$emit('touch-start-app', e, app)
      let touch = e.targetTouches[0]

      this.startX = touch.clientX
      this.startY = touch.clientY

      // this.offsetX = (touch.clientX - 0) - this.target.offsetLeft
      // this.offsetY = (touch.clientY - 40) - this.target.offsetTop 

      this.left = this.target.style.left === '' ? 0 : Number(this.target.style.left.split('px')[0])
      this.top = this.target.style.top === '' ? 0 : Number(this.target.style.top.split('px')[0])

      // console.log('left:', this.target.style.left, 'top:', this.target.style.top)
      // console.log('clientX:', touch.clientX, 'clientY:', touch.clientY)
      // console.log('offsetLeft:', this.target.offsetLeft, 'offsetTop:', this.target.offsetTop)
      // console.log('offsetX:', this.offsetX, 'offsetY:', this.offsetY)

      this.appTimer = setTimeout(() => {
        this.appTimer = null 

        if (this.currentStatus === 'normal') {
          // this.appBoxContainerScaleStatus = true
          // this.appBoxContainerHeight = '120%'
          // this.appBoxContainerWidth = '120%'
        }
        if (this.currentStatus === 'edit') {
          // this.appBoxContainerScaleStatus = true
          // this.appBoxContainerHeight = '100%'
          // this.appBoxContainerWidth = '100%'
        }
       
        this.$emit('long-press-app', e, app) // 手指长按事件，弹出app操作菜单 
      }, 500)
      return false
    },
    touchMoveAppBox (e, app) {
      e.stopPropagation()
      this.$emit('touch-move-app', e, app)
      clearTimeout(this.appTimer)//清除定时器   
      this.appTimer = null

      let touch = e.targetTouches[0]

      this.target.style.zIndex = '2'
      this.target.style.left = this.left + touch.clientX - this.startX + 'px'
      this.target.style.top = this.top + touch.clientY - this.startY + 'px'


      if (this.currentStatus === 'edit') {
        this.iconZoomStatus = false // zoom-out 
        setTimeout(() => {
          this.removeIconStatus = false
        }, 150)
      }

      // this.appBoxContainerScaleStatus = true
      // this.appBoxContainerHeight = '120%'
      // this.appBoxContainerWidth = '120%'

      this.$emit('move-app', e, app) // 手指移动app事件 
    },
    touchEndAppBox (e, app) {
      e.stopPropagation()
      this.startX = this.startY = 0
      this.$emit('touch-end-app', e, app)
      clearTimeout(this.appTimer) //清除定时器 

      if (this.currentStatus === 'edit') {
        this.iconZoomStatus = true // zoom-out 
        this.removeIconStatus = true
      }      

      // this.appBoxContainerScaleStatus = false 
      // this.appBoxContainerHeight = '100%'
      // this.appBoxContainerWidth = '100%'
      this.target.style.zIndex = '1'

      // this.target.style.left = ''
      // this.target.style.top = ''

      console.log('left', this.target.style.left, 'top', this.target.style.top)

      if(this.appTimer !== null) {   
        this.$emit('click-app', e, app) // 手指点击app事件 
      }   
      return false 
    },
    touchStartRemoveIcon (e, app) {
      e.stopPropagation()
      this.svgIconColor = '#333333'
    },
    touchMoveRemoveIcon (e, app) {
      e.stopPropagation()
    },
    touchEndRemoveIcon (e, app) {
      e.stopPropagation()
      this.svgIconColor = 'white'
      this.$emit('remove-selected-app', e, app)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/scaleAnimation.scss";

.app-box-container {
  display: inline-block;
  position: relative;
  // width: 47px;
  // height: 47px;
  // margin: 11.5px;
  z-index: 1;

  .single-box {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    border-radius: 12.5px;

    .remove-app-icon {
      position: absolute;
      top: -8px;
      left: -8px;
    }
  }

  .group-box {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #333333;
    border-radius: 12.5px;
    padding: 6px;
    display: grid;
    grid-template-columns: repeat(3, 10px);
    grid-template-rows: repeat(3, 10px);
    row-gap: 2px;
    column-gap: 2px;
    place-content: center center;
    place-items: center center;

    .group-app-item {
      height: 100%;
      width: 100%;
      border-radius: 2px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }
  }

  .edge-effect {
    position: absolute;
    z-index: 2;
    width: 125%;
    height: 125%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12.5px;
    background-color: white;
    opacity: 0.5;
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    height: 20px;
    width: 20px;
    border-radius: 25px;
    background-color: #ff3a30;
    color: white;
    text-align: center;
    line-height: 20px;
  }

  .box-label-box {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

}

/* app 左右抖动动画 */
.shake-animation {
  animation: shake 0.25s;  
  -webkit-animation: shake 0.25s; /* Safari and Chrome */
  animation-iteration-count: infinite; /* 循环播放次数 无限 */
}

@keyframes shake {
  0% { 
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg); /* Safari and Chrome */
  }
  25% { 
    transform: rotate(3deg);
    -webkit-transform: rotate(3deg); /* Safari and Chrome */
  }
  50% { 
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg); /* Safari and Chrome */
  }
  75% { 
    transform: rotate(-3deg);
    -webkit-transform: rotate(-3deg); /* Safari and Chrome */
  }
  100% { 
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg); /* Safari and Chrome */
  }
}

.change-scale {
  //transition: all 0.5s ease 0.01s;
  animation: scaleAnimation 0.5s;
  -webkit-animation: scaleAnimation 0.5s;
}

@keyframes scaleAnimation {
  0% {
    width: 100%;
    height: 100%;
  }
  25% {
    width: 90%;
    height: 90%;
  }
  50% {
    width: 100%;
    height: 100%;
  }
  75% {
    width: 110%;
    height: 110%;
  }
  100% {
    width: 120%;
    height: 120%;
  }
}

.edge-zoom-in {
  animation: edgeZoomIn 2.5s;
  -webkit-animaion: edgeZoomIn 2.5s;
}

@keyframes edgeZoomIn {
  0% {
    width: 100%;
    height: 100%;
  }
  25% {
    width: 105%;
    height: 105%;
  }
  50% {
    width: 110%;
    height: 110%;
  }
  75% {
    width: 115%;
    height: 115%;
  }
  100% {
    width: 120%;
    height: 120%;
  }
}

.edge-zoom-out {
  animation: edgeZoomOut 2.5s;
  -webkit-animaion: edgeZoomOut 2.5s;
}

@keyframes edgeZoomOut {
  0% {
    width: 120%;
    height: 120%;
  }
  25% {
    width: 115%;
    height: 115%;
  }
  50% {
    width: 110%;
    height: 110%;
  }
  75% {
    width: 105%;
    height: 105%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>