<template>
  <div class="mobil-signal">
    <svg-icon id="mobilSignal" class="mobil-signal-icon"
      :style="mobilSignalStyle" 
      icon-class="mobile-signal" 
    />
  </div>  
</template>

<script>
export default {
  name: 'mobileSignal',
  props: {
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
    mobilSignalStyle () {
      return {
        color: this.activeColor,
        fontSize: '15px'
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
.mobil-signal {
  display: inline-block;
  height: 22px;
}
</style>