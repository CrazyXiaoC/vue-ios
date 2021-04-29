<template>
  <div class="network-model" :style="networkModelStyle">
    <span v-show="networkModel === '5G' || networkModel === '4G'" :style="textStyle"> {{ networkModel }} </span>
    <svg-icon v-show="networkModel === 'wifi'" id="wifi-icon" class="wifi-icon" icon-class="wifi" />
  </div>  
</template>

<script>
export default {
  name: 'networkModel',
  props: {
    // 5G, 4G, WIFI
    networkModel: {
      type: String,
      default: '5G',
      required: true, 
      validiator: (value) => {
        return ['5G', '4G', 'wifi'].indexOf(value) !== -1
      }
    },
    activeColor: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    networkModelStyle () {
      return {
        color: this.activeColor
      }
    },
    textStyle () {
      return {
        fontSize: '12px',
        fontWeight: 'normal',
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
.network-model {
  display: inline-block;
  height: 22px;
  text-align: center;
  line-height: 22px;
}
</style>