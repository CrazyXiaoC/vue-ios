<template>
  <div class="lock-screen-view">
    <div class="lock-screen-image" :style="lockScreenImageStyle"> </div>
  
    <top-status-bar class="top-status-bar" :is-active="topStatusBarActive"/>

    <div class="screen-panel"
      ref="screen-panel"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)" 
    >
      <div class="lock">
        <svg-icon v-show="true" id="lock-icon" class="lock-icon" :icon-class="isLock ? 'off-lock' : 'on-lock'" />
      </div>

      <system-time class="system-time" time-format="H:M" height="60px" font-size="60px" font-weight="100"/>

      <calendar class="calendar" />

      <notification 
        class="notification" 
        :message-list="messageList"
        no-data-text="当前没有通知"
        @remove-all-message="removeAllMessage"
        @delete-message="deleteMessageById"
      />
    </div>

    <div class="float-button-panel">
      <svg-button :visible="floatButtonVisible" class="flashlight" icon-name="flashlight" @touch-end="flashlightTouchEnd"/>
      <svg-button :visible="floatButtonVisible" class="camera" icon-name="camera" />
    </div>

    <div v-show="!isLock" ref="float-tooltip" class="float-tooltip" :class="{ 'tooltip-animation': !isLock }" > 向上轻扫以打开 </div>
    <div ref="home-indicator" class="home-indicator" :class="{ 'home-indicator-animation': !isLock }"> </div>

  </div>
</template>

<script>
import topStatusBar from '../../components/topStatusBar/index'
import systemTime from '../../components/common/systemTime.vue'
import calendar from './calendar.vue'
import notification from './notification.vue'
import svgButton from './svgButton.vue'

export default {
  name: 'lockScreenView',
  components: {
    topStatusBar,
    systemTime,
    calendar,
    notification,
    svgButton
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

      
      screenPanel: null,
      lockScreenToolTip: null,
      homeTndicator: null,

      topStatusBarActive: false,
      floatButtonVisible: true,
      isLock: true,
      lockScreenViewBGIMGURL: require('@/assets/background/earth.jpeg'),

      messageList: [
        {
          id: '1',
          appName: '微信',
          bgImgFileName: 'wechat.jpeg',
          time: '15:30',
          title: '现金领取提醒',
          description: '您的88.0元现金即将提现，点击查看->',
          num: 2,
        },
        {
          id: '2',
          appName: 'qq',
          bgImgFileName: 'qq.jpeg',
          time: '15:30',
          title: '苹果系统升级',
          description: '苹果14.5RC版推送后，续航能力提升了->',
          num: 0
        },
        {
          id: '3',
          appName: 'message',
          bgImgFileName: 'message.jpeg',
          time: '15:30',
          title: '中国移动',
          description: '您的流量已使用15.6GB，点击查看->',
          num: 0
        },
        {
          id: '4',
          appName: '音乐',
          bgImgFileName: 'music.jpeg',
          time: '15:30',
          title: '会员到期提醒',
          description: '您的钻石VIP服务即将到期，点击查看->',
          num: 2,
        },
        {
          id: '5',
          appName: '邮件',
          bgImgFileName: 'email.jpeg',
          time: '15:30',
          title: '163邮件',
          description: 'iphone12 mini电子发票，请查看->',
          num: 0
        },
        {
          id: '6',
          appName: '设置',
          bgImgFileName: 'setting.jpeg',
          time: '15:30',
          title: '2项系统更新',
          description: '最新系统版本更新提醒，点击查看->',
          num: 1
        }
      ]
    }
  },
  computed: {
    lockScreenImageStyle () {
      return {
        filter: `blur(${this.filterVal}px)`,
        'background-image': `url(${this.lockScreenViewBGIMGURL})`
      }
    }
  },
  mounted () {
    this.screenPanel = this.$refs['screen-panel']
    this.lockScreenToolTip = this.$refs['float-tooltip']
    this.homeTndicator = this.$refs['home-indicator']
  },
  methods: {
    touchStart (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.startTimeStamp = e.timeStamp
      this.startX = touch.pageX
      this.startY = touch.pageY

      this.screenPanel.style.transition = ''
 
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
          //console.log('screen-panel: move(left->right)')
        }
        if (dX < 0) { // 从右往左滑
          //console.log('screen-panel: move(right->left)')
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上向下滑
          //console.log('screen-panel: move (up->down)')
          this.screenPanelUpToDownMove(dY)
        }
        if (dY < 0) { // 从下向上滑
          //console.log('screen-panel: move (down->up)')
          this.screenPanelDownToUpMove(dY)
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
          //console.log('screen-panel: end(left->right)')
        }
        if (dX < 0) { // 右向左滑结束
          //console.log('screen-panel: end(right->left)')
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上往下滑结束
          console.log('screen-panel: end (down->up)')
        }
        if (dY < 0) { // 从下往上滑结束
          console.log('screen-panel: end (down->up)')
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
    screenPanelUpToDownMove (dY) {

    },
    screenPanelDownToUpMove (dY) {
      this.screenPanel.style.top = `${dY}px`
      this.topStatusBarActive = Math.abs(dY) > 195 ? true : false
      this.floatButtonVisible = Math.abs(dY) > 30 ? false : true
    },
    flashlightTouchEnd (attr) {
      this.isLock = !this.isLock
    },
    removeAllMessage () {
      //this.messageList.length = 0
      this.messageList.splice(0)
    },
    deleteMessageById (id) {
      for (const i in this.messageList) {
        if (this.messageList[i].id === id) {
          this.messageList.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lock-screen-view {
  display: inline-block;
  overflow: hidden;

  .lock-screen-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 135% 110%;
  }

  .top-status-bar {
    position: absolute;
    top: 0px;
    z-index: inherit;
  }

  .screen-panel {
    position: absolute;
    top: 0px;
    width: 100%;
    min-height: 610px;

    .lock {
      position: relative;
      margin-top: 35px;
      z-index: inherit;
      height: 45px;
      width: 100%;

      .lock-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 35px;
        color: white;
        transform: translate(-50%, -50%);
      }
    }

    .system-time {
      position: relative;
    }

    .calendar {
      position: relative;
    }

    .notification {
      position: relative;
      margin-top: 35px;
    }
  }

  .float-button-panel {
    position: absolute;
    top: 525px; // 35 + 45 + 60 + 48 + 35 + 280
    z-index: inherit;
    height: 55px;
    width: 100%;

    .flashlight {
      position: absolute;
      left: 45px;
    }

    .camera {
      position: absolute;
      right: 45px;
    }
  }

  .float-tooltip {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: inherit;
    opacity: 0;
    color: white;
    font-size: 12px;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }

  .home-indicator {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    z-index: inherit;
    width: 100px;
    height: 4px;
    border-radius: 5px;
    background-color: white;
  }
}


.home-indicator-animation {
  animation: homeIndicator 1.2s;
  -webkit-animation: homeIndicator 1.2s;
}

@keyframes homeIndicator {
  0% {
    bottom: 5px;
  }
  10% {
    bottom: 7.5px;
  }
  20% {
    bottom: 10px;
  }
  40% {
    bottom: 12.5px;
  }
  50% {
    bottom: 15px;
  }
  60% {
    bottom: 12.5px;
  }
  70% {
    bottom: 10px;
  }
  80% {
    bottom: 7.5px;
  }
  90% {
    bottom: 7.5px;
  }
  100% {
    bottom: 5px;
  }
}

.tooltip-animation {
  animation: tooltip 3.6s;
  -webkit-animation: tooltip 3.6s;
}

@keyframes tooltip {
  0% {
    bottom: 10px;
    opacity: 0;
  }
  10% {
    bottom: 15px;
    opacity: 0.5;
  }
  20% {
    bottom: 20px;
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>