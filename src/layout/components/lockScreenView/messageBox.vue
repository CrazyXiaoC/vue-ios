<template>
  <div class="message-box-container"
    :id="`message-box-container-${message.id}`"
    :ref="`message-box-container-${message.id}`"
    :style="messageBoxContainerStyle"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"  
  >
    <!-- left-box -->
    <div class="left-box"
      :id="`left-box-${message.id}`"
      :ref="`left-box-${message.id}`"
      :style="leftBoxStyle"
      @touchstart="leftBoxTouchStart($event)"
      @touchmove="(e) => { e.stopPropagation() }"
      @touchend="leftBoxTouchEnd($event)"
    >
      <span v-show="leftBoxVisible"> 打开 </span>
    </div>

    <!-- message-box -->
    <div class="message-box"
      :id="`message-box-${message.id}`"
      :ref="`message-box-${message.id}`" 
      :style="messageBoxStyle"
    >
      <!-- 当前应用最顶层的消息 -->
      <div class="top-message" :style="topMessageStyle">
        <div class="message-header">
          <div class="app-logo" :style="'background-image: url(' + require('@/assets/appIcon/' + message.bgImgFileName) + ')'"> </div>
          <div class="app-name"> {{ message.appName }} </div>
          <div class="message-time"> {{ message.time }} </div>
        </div>
        <div class="message-content" :style="messageContentStyle">
          <div class="message-title"> {{ message.title }} </div>
          <div class="message-description"> {{ message.description }} </div>
          <div class="message-image"> </div>
          <div v-show="message.num !== 0" class="message-num"> {{ '还有' + message.num + '个通知' }} </div>
        </div>
      </div>
      <!-- 当前应用其余消息，依次放置顶层之下 -->
      <div class="fold-message"
        v-for="item in message.num" 
        :key="item.index" 
        :style="{ 
          top: `${item * 5}px`, 
          left: `${item * 10}px`,
          width: `${270 - item * 20}px`,
          height: '90px',
          'z-index': `${message.num - item}`,
          'background-color': `rgba(${170 - item * 30}, ${182 - item * 30}, ${191 - item * 30}, 0.95)`
        }" 
      >
      </div>
    </div>

    <!-- right-box -->
    <div class="right-box"
      :id="`right-box-${message.id}`"
      :ref="`right-box-${message.id}`" 
      :style="rightBoxStyle"
    >
      <div class="management"
        :ref="`management-${message.id}`"
        @touchstart="managementTouchStart($event)"
        @touchmove="(e) => { e.stopPropagation() }"
        @touchend="managementTouchEnd($event)"
      > 
        管理 
      </div>
      <div class="view" 
        :ref="`view-${message.id}`"
        @touchstart="viewTouchStart($event)"
        @touchmove="(e) => { e.stopPropagation() }"
        @touchend="viewTouchEnd($event)"
      > 
        查看 
      </div>
      <div class="delete"
        :ref="`delete-${message.id}`"
        @touchstart="deleteTouchStart($event)"
        @touchmove="(e) => { e.stopPropagation() }"
        @touchend="deleteTouchEnd($event)"
      > 
        {{ message.num !== 0 ? '全部清除' : '清除' }} 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  props: {
    message: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      eventTimerId: null, // 事件延迟定时器Id
      startX: 0, // 触摸屏幕开始坐标x
      startY: 0, // 触摸屏幕开始坐标y
      endX: 0, // 触摸屏幕结束坐标y
      endY: 0, // 触摸屏幕结束坐标y
      startTimeStamp: 0, // 触摸屏幕开始时间戳
      endTimeStamp: 0, // 触摸屏幕结束时间戳
      touchTime: 0, // 触摸屏幕时长
      touchMinTime: 150,

      messageBox: null,
      rightBox: null,
      leftBox: null,
      managementBox: null,
      viewBox: null,
      deleteBox: null,

      rightBoxVisible: false,
      leftBoxVisible: false,
    }
  },
  computed: {
    height () {
      return this.message.num !== 0 ? `${90}px` : '73px'
    },
    messageBoxContainerStyle () {
      return {
        'height': this.message.num !== 0 ? `${90 + this.message.num * 5}px` : '73px',
      }
    },
    leftBoxStyle () {
      return {
        'height': this.height,
        'line-height': this.height,
      }
    },
    rightBoxStyle () {
      return {
        'height': this.height,
        'line-height': this.height,
      }
    },
    messageBoxStyle () {
      return {
        'height': this.message.num !== 0 ? `${90 + this.message.num * 5}px` : '73px',
      }
    },
    topMessageStyle () {
      return {
        'height': this.height,
        'z-index': `${this.message.num}`,
        'background-color': `rgba(170, 182, 191, ${this.message.num !== 0 ? '1' : '0.95'})`
      }
    },
    messageContentStyle () {
      return {
        'height': this.message.num !== 0 ? `${58}px` : '40px',
      }
    }
  },
  mounted () {
    this.leftBox = this.$refs[`left-box-${this.message.id}`]
    this.messageBox = this.$refs[`message-box-${this.message.id}`]
    this.rightBox = this.$refs[`right-box-${this.message.id}`]
    this.managementBox = this.$refs[`management-${this.message.id}`]
    this.viewBox = this.$refs[`view-${this.message.id}`]
    this.deleteBox = this.$refs[`delete-${this.message.id}`]
  },
  methods: {
    touchStart (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.startTimeStamp = e.timeStamp
      this.startX = touch.pageX
      this.startY = touch.pageY

      this.messageBox.style.transition = ''
      this.rightBox.style.transition = ''
      this.leftBox.style.transition = ''

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
          //console.log('messageBox: move(left->right)')
          if (Math.abs(dX) > 270) return 
          this.leftToRightMove(dX)
        }
        if (dX < 0) { // 从右往左滑
          //console.log('messageBox: move(right->left)')
          if (Math.abs(dX) > 270) return 
          this.rightToLeftMove(dX)
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上向下滑
        }
        if (dY < 0) { // 从下向上滑
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
          //console.log('messageBox: end(left->right)')
          this.leftToRightEnd(dX) 
        }
        if (dX < 0) { // 右向左滑结束
          //console.log('messageBox: end(right->left)')
          this.rightToLeftEnd(dX) 
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上往下滑结束
        }
        if (dY < 0) { // 从下往上滑结束
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
    },
    leftToRightMove (dX) {
      if (!this.leftBoxVisible && !this.rightBoxVisible) {
        this.messageBox.style.left = `${15+dX}px`
        this.leftBox.style.width = `${dX-5}px`
        this.leftBox.style.backgroundColor = `rgba(170, 182, 191, ${0.95})`
      }

      if (this.rightBoxVisible && !this.leftBoxVisible) {
        this.messageBox.style.left = `${-200+dX}px`
        this.rightBox.style.width = `${210-dX}px`
        if (Math.abs(dX) > 210 - 70) {
          this.rightBox.style.backgroundColor = `rgba(170, 182, 191, ${(210-Math.abs(dX))/70 - 0.05})`
        }
      }

    },
    rightToLeftMove (dX) {
      if (!this.rightBoxVisible && !this.leftBoxVisible) {
        this.messageBox.style.left = `${15+dX}px`
        this.rightBox.style.width = `${-dX-5}px`
        if (Math.abs(dX) <= 70) {
          this.rightBox.style.backgroundColor = `rgba(170, 182, 191, ${Math.abs(dX)/70 - 0.05})`
        }
      }

      if (!this.rightBoxVisible && this.leftBoxVisible) {
        this.messageBox.style.left = `${270+15+5+dX}px`
        this.leftBox.style.width = `${270+dX}px`
        this.leftBox.style.backgroundColor = `rgba(170, 182, 191, ${0.95})`
      } 
    
    },
    leftToRightEnd (dX) {
      this.messageBox.style.transition = 'left 0.5s ease-in-out 0.01s'
      this.rightBox.style.transition = 'width 0.5s ease-in-out 0.01s'
      this.leftBox.style.transition = 'width 0.5s ease-in-out 0.01s'

      if (this.rightBoxVisible && !this.leftBoxVisible) {
        if (Math.abs(dX) < 30) {
          this.messageBox.style.left = `${-200}px`
          this.rightBox.style.width = `${210}px`
        }
        if (Math.abs(dX) > 30 || this.touchTime < 150) {
          this.messageBox.style.left = `${15}px`
          this.rightBox.style.width = `${0}px`
          this.rightBoxVisible = false
        }
        return
      } 

      if (!this.leftBoxVisible && !this.rightBoxVisible){
        if (Math.abs(dX) < 30) {
          this.messageBox.style.left = `${15}px`
          this.leftBox.style.width = `${0}px`
        }
        if (Math.abs(dX) > 30 || this.touchTime < 150) {
          this.messageBox.style.left = `${270 + 15 + 5}px`
          this.leftBox.style.width = `${0 + 270}px`
          this.leftBoxVisible = true
        }
        return
      }
    },
    rightToLeftEnd (dX) {
      this.messageBox.style.transition = 'left 0.5s ease-in-out 0.01s'
      this.rightBox.style.transition = 'width 0.5s ease-in-out 0.01s'
      this.leftBox.style.transition = 'width 0.5s ease-in-out 0.01s'

      if (!this.rightBoxVisible && !this.leftBoxVisible) {
        if (Math.abs(dX) < 30) {
          this.messageBox.style.left = `${15}px`
          this.rightBox.style.width = `${0}px`
        }
        if (Math.abs(dX) > 30 || this.touchTime < 150) {
          this.messageBox.style.left = `${-200}px`
          this.rightBox.style.width = `${210}px`
          this.rightBoxVisible = true
        }
        return
      }

      if (this.leftBoxVisible && !this.rightBoxVisible) {
        if (Math.abs(dX) < 30) {
          this.messageBox.style.left = `${270 + 15 + 5}px`
          this.leftBox.style.width = `${0 + 270}px`
        }
        if (Math.abs(dX) > 30 || this.touchTime < 150) {
          this.messageBox.style.left = `${15}px`
          this.leftBox.style.width = `${0}px`
          this.leftBoxVisible = false
        }
        return
      }
    },
    leftBoxTouchStart (e) {
      e.stopPropagation()
      this.leftBox.style.backgroundColor = '#787b7d'
    },
    leftBoxTouchEnd (e) {
      e.stopPropagation()
      this.leftBox.style.backgroundColor = `rgba(170, 182, 191, ${0.95})`
      this.$emit('open-message', this.message.id)
    },
    managementTouchStart (e) {
      e.stopPropagation()
      this.managementBox.style.backgroundColor = '#787b7d'
    },
    managementTouchEnd (e) {
      e.stopPropagation()
      this.managementBox.style.backgroundColor = ''
      this.$emit('management-message', this.message.id)
    },
    viewTouchStart (e) {
      e.stopPropagation()
      this.viewBox.style.backgroundColor = '#787b7d'
    },
    viewTouchEnd (e) {
      e.stopPropagation()
      this.viewBox.style.backgroundColor = ''
      this.$emit('view-message', this.message.id)
    },
    deleteTouchStart (e) {
      e.stopPropagation()
      this.deleteBox.style.backgroundColor = '#787b7d'
    },
    deleteTouchEnd (e) {
      e.stopPropagation()
      this.deleteBox.style.backgroundColor = ''
      this.$emit('delete-message', this.message.id)
    },
  }
}
</script>

<style lang="scss" scoped>
.message-box-container {
  position: relative;
  margin: 5px 0px 0px 0px;

  .left-box {
    position: absolute;
    left: 15px;
    border-radius: 10px;
    text-align: center;
    color: #494949;
    font-size: 14px;
  }

  .message-box {
    position: absolute;
    left: 15px;
    width: 270px;
  }

  .right-box {
    position: absolute;
    right: 15px;
    border-radius: 10px;
    color: #494949;
    font-size: 14px;
    overflow: hidden;

    .management {
      position: absolute;
      right: 140px;
      display: inline-block;
      text-align: center;
      width: 70px;
    }

    .view {
      position: absolute;
      right: 70px;
      display: inline-block;
      text-align: center;
      width: 70px;
      border-left: 1px solid #111111;
      border-right: 1px solid #111111; 
    }

    .delete {
      position: absolute;
      right: 0px;
      display: inline-block;
      text-align: center;
      width: 70px;
    }

  }
}

.top-message {
  position: absolute;
  width: 270px;
  padding: 7px 7px;
  border-radius: 10px;
  color: white;

  .message-header {
    position: relative;
    width: 100%;
    height: 18px;

    .app-logo {
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 5px;
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .app-name {
      position: absolute;
      left: 23px;
      vertical-align: top;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      color: #494949;
    }

    .message-time {
      position: absolute;
      right: 0px;
      vertical-align: top;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      color: #494949;
    }
  }

  .message-content {
    position: relative;
    width: 100%;
    height: 58px;

    .message-title {
      position: absolute;
      top: 5px;
      height: 18px;
      line-height: 18px;
      font-size: 13px;
      font-weight: bold;
      color: #111111;
    }

    .message-description {
      position: absolute;
      top: 20px;
      width: 220px;
      line-height: 18px;
      font-size: 13px;
      color: #252525;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .message-image {
      position: absolute;
      top: 5px;
      right: 0px;
      height: 35px;
      width: 35px;
    }

    .message-num {
      position: absolute;
      top: 35px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: #373737;
    }    
  }

}

.fold-message {
  position: absolute;
  border-radius: 10px;
}
</style>