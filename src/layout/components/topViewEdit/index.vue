<template>
  <div v-show="visible" class="top-view-edit-panel"> 
    <div ref="add-bt" :class="{ 'add-bt': true, 'zoom-in': visible, 'zoom-out': zoomOut }" 
      @touchstart="addBtTouchStart($event)"
      @touchmove="addBtTouchMove($event)"
      @touchend="addBtTouchEnd($event)"
    > 
      + 
    </div>
    <div ref="confirm-bt" :class="{ 'confirm-bt': true, 'zoom-in': visible, 'zoom-out': zoomOut }"
      @touchstart="confirmBtTouchStart($event)"
      @touchmove="confirmBtTouchMove($event)"
      @touchend="confirmBtTouchEnd($event)"
    >
      完成 
    </div>
  </div>
</template>

<script>
export default {
  name: 'topViewEditPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      zoomOut: false,
    }
  },
  methods: {
    addBtTouchStart (e) {
      e.stopPropagation()
      this.$refs['add-bt'].style.backgroundColor = '#333333'
      this.$emit('add-touch-start', e)
    },
    addBtTouchMove (e) {
      e.stopPropagation()
      this.$emit('add-touch-move', e)
    },
    addBtTouchEnd (e) {
      e.stopPropagation()
      this.$refs['add-bt'].style.backgroundColor = '#cccccc'
      this.$emit('add-touch-end', e)
    },
    confirmBtTouchStart (e) {
      e.stopPropagation()
      this.$refs['confirm-bt'].style.backgroundColor = '#333333'
      this.$emit('confirm-touch-start', e)
    },
    confirmBtTouchMove (e) {
      e.stopPropagation()
      this.$emit('confirm-touch-move', e)
    },
    confirmBtTouchEnd (e) {
      e.stopPropagation()
      this.$refs['confirm-bt'].style.backgroundColor = '#cccccc'
      this.zoomOut = true
      setTimeout(() => {
        this.$emit('update:visible', false) // sync 
        this.zoomOut = false
      }, 150)
      this.$emit('confirm-touch-end', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/scaleAnimation.scss";

.top-view-edit-panel {
  position: relative;
  height: 35px;
  width: 100%;

  .add-bt {
    position: absolute;
    left: 10px;
    bottom: 5px;
    height: 20px;
    width: 45px;
    text-align: center;
    font-size: 22px;
    line-height: 20px;
    border-radius: 10px;
    background-color: #cccccc;
  }

  .confirm-bt {
    position: absolute;
    right: 10px;
    bottom: 5px;
    height: 20px;
    width: 45px;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;
    border-radius: 10px;
    background-color: #cccccc;
  }
}
</style>