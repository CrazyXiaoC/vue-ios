<template>
  <div class="battery-power">
    <svg-icon id="batteryPower" class="battery-power-icon"
      :style="{ color: iconColor }" 
      icon-class="battery-power" 
    />
    <div id="current-power" :style="currentPowerStyle">
    </div>
    <svg-icon v-show="rechargeShowStatus" id="recharge" class="recharge-icon"
      icon-class="recharge" 
    />
  </div>  
</template>

<script>
export default {
  name: 'batteryPower',
  props: {
    // 当前电量
    currentPowerValue: {
      type: Number,
      default: 20,
      required: true,
      validator: (value) => { // min 0, max 100
        return value >= 0 && value <=100
      }
    },
    // 电池当前状态
    batteryStatus: {
      type: String,
      default: 'standby', //Standby(待机) charging(充电) lowPower(低电量)
      required: true,
      validator: (value) => {
        return ['standby', 'chargin', 'lowPower'].indexOf(value) !== -1 // 这个值必须匹配下列字符串中的一个
      }
    },
    // 当前图标颜色
    activeColor: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      // 电量图标颜色
       batteryColor: {
        charginColor: 'green',
        lowPowerColor: 'red'
      },
      rechargeShowStatus: false
    }
  },
  watch: {
    batteryStatus: {
      handler(newVal, oldVal) {
        this.rechargeShowStatus = newVal === 'chargin' ? true : false 
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    iconColor () {
      let color = ''
      if (this.batteryStatus === 'chargin' || this.batteryStatus === 'standby') {
        color = this.activeColor
      }
      if (this.batteryStatus === 'lowPower') {
        color = this.batteryColor.lowPowerColor
      }
      return color
    },
    currentPowerStyle () {
      let color = ''
      if (this.batteryStatus === 'standby') {
        color = this.activeColor
      }
      if (this.batteryStatus === 'chargin') {
        color = this.batteryColor.charginColor
      }
      if (this.batteryStatus === 'lowPower') {
        color = this.batteryColor.lowPowerColor
      }
      return {
        width: this.currentPowerValue * (15 / 100) + 1 + 'px',
        backgroundColor: color
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.battery-power {
  display: inline-block;
  height: 22px;
  width: 25px;
  color: white;

  .battery-power-icon {
    position: absolute;
    left: 0px;
    top: -1px;
    font-size: 25px;
  }

  #current-power {
    position: absolute;
    display: inline-block;
    left: 2px;
    top: 8px;
    height: 7px;
  }

  .recharge-icon {
    display: inline-block;
    position: absolute;
    z-index: 2;
    left: 3px;
    top: 5px;
    vertical-align: top;
    font-size: 15px;
  }
}
</style>