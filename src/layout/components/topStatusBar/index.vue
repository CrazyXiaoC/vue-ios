<template>
  <div v-show="visible" class="top-status-bar" :style="topStatusBarStyle">

    <transition name="fade">
      <network-carrier 
        v-if="isActive" 
        class="network-carrier" 
        network-carrier="中国移动" 
        active-color="white"
      />
      <system-time 
        v-else
        time-format="H:M" 
        height="25px" 
        font-size="14px" 
        font-weight="bold" 
        :is-active="false"
        active-color="white" 
        class="system-time"
      />
    </transition>

    <mobile-signal class="mobile-signal" active-color="white"/>
    <network-model class="network-model" network-model="wifi" active-color="white"/>
    <battery-power 
      class="battery-power"
      :current-power-value="currentPowerValue"
      :battery-status="batteryStatus"
      active-color="white"
    />
  </div>  
</template>

<script>
import networkCarrier from './networkCarrier/index.vue'
import systemTime from '../common/systemTime.vue'
import mobileSignal from './mobileSignal/index.vue'
import networkModel from './networkModel/index.vue'
import batteryPower from './batteryPower/index.vue'

export default {
  name: 'topStatusBar',
  components: {
    networkCarrier,
    systemTime,
    mobileSignal,
    networkModel,
    batteryPower
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPowerValue: 0,
      batteryStatus: 'lowPower'
    }
  },
  computed: {
    topStatusBarStyle () {
      return {
        'background-color': this.isActive ? 'rgba(120, 120, 120, 0.5)' : ''
      }
    }
  },
  mounted () {
    this.runPowerValue()
  },
  methods: {
    runPowerValue() {
      let timer = setInterval(() => {
        this.currentPowerValue = this.currentPowerValue + 5
        if (this.currentPowerValue < 20) {
          this.batteryStatus = 'lowPower'
        }
        if (this.currentPowerValue > 20 && this.currentPowerValue < 100) {
          this.batteryStatus = 'chargin'
        }
        if (this.currentPowerValue === 100) {
          this.batteryStatus = 'standby'
          clearInterval(timer)
          timer = null
          return 0
        }
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-status-bar {
  position: relative;
  height: 35px;
  width: 100%;
  padding: 5px 10px;

  .network-carrier {
    position: absolute;
    left: 10px;
  }

  .system-time {
    position: absolute;
    left: 10px;
  }

  .mobile-signal {
    position: absolute;
    right: 60px;
  }

  .network-model {
    position: absolute;
    right: 40px;
  }

  .battery-power {
    position: absolute;
    right: 10px;
  }
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