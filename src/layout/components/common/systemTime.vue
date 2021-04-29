<template>
  <div class="time" :style="timeStyle">
    <div class="time-box" :style="timeBoxStyle">
      <p v-show="hoursVisible" class="hours" :style="{ 'line-height': height }"> {{ hours }} </p>
      <span v-show="hoursVisible" class="colon" :style="{ 'line-height': height }"> : </span>
      <p v-show="minutesVisible" class="minutes" :style="{ 'line-height': height }"> {{ minutes }} </p>
      <span v-show="secondsVisible" class="colon" :style="{ 'line-height': height }"> : </span>
      <p v-show="secondsVisible" class="seconds" :style="{ 'line-height': height }"> {{ seconds }} </p>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'systemTime',
  props: {
    timeFormat: {
      type: String,
      default: 'H:M:S', // 时间格式
      required: true
    },
    height: {
      type: String,
      default: '100%'
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    activeColor: {
      type: String,
      default: 'white'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hours: null,
      minutes: null,
      seconds: null,
      hoursVisible: true,
      minutesVisible: true,
      secondsVisible: true
    }
  },
  computed: {
    timeStyle () {
      return {
        height: this.height,
        'border-radius': this.isActive ? '10px' : '0px',
        'background-color': this.isActive ? '#409eff' : ''
      }
    },
    timeBoxStyle () {
      return {
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
        color: this.activeColor,
      }
    },
  },
  mounted () {
    if (this.timeFormat.indexOf('H') !== -1) { // 显示 hours
      this.hoursVisible = true        
    } else {
      this.hoursVisible = false      
    }
    if (this.timeFormat.indexOf('M') !== -1) { // 显示 minutes
      this.minutesVisible = true        
    } else {
      this.minutesVisible = false      
    }
    if (this.timeFormat.indexOf('S') !== -1) { // 显示 seconds
      this.secondsVisible = true        
    } else {
      this.secondsVisible = false      
    }

    this.updateCurrentTime()
  },
  methods: {
    updateCurrentTime () {
      this.getCurrentTime()
      setInterval(() => {
        this.getCurrentTime()
      }, 1000)
    },
    getCurrentTime () {
      let t = new Date()
      this.hours = (t.getHours() >= 0 && t.getHours() <= 9) ? "0" + t.getHours() : t.getHours()
      this.minutes = t.getMinutes() > 9 ? t.getMinutes() : "0" + t.getMinutes()
      this.seconds = t.getSeconds() > 9 ? t.getSeconds() : "0" + t.getSeconds()
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;

  .time-box {
    position: relative;
    height: 100%;
    margin: auto 5px;
 
    p, span {
      display: inline-block;
      vertical-align: top;
      height: 100%;
      text-align: center;
    }

    .colon {
      position: relative;
      top: -0.11em;
    }
  }
}
</style>