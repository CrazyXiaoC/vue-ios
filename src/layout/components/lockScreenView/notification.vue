<template>
  <div class="notification">
    <div v-show="visible" class="notification-top-panel">
      <div class="notification-title"> 通知中心 </div>
      <div class="notification-remove" 
        ref="remove" 
        @touchstart="removeTouchStart($event)"
        @touchmove="removeTouchMove($event)"
        @touchend="removeTouchEnd($event)"
      > 
        {{ removeCharacter }}
      </div>
    </div>
 
    <div v-if="visible" class="message-container">
      <message-box v-for="item in messageList" :key="item.id" :message="item" @delete-message="deleteMessage"/>
    </div>
    <div v-else class="no-data-text">
      {{ noDataText }}
    </div>
  </div>
</template>

<script>
import messageBox from './messageBox.vue'

export default {
  name: 'notification',
  components: {
    messageBox,
  },
  props: {
    noDataText: {
      type: String,
      default: '没有通知'
    },
    messageList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      removeStatus: false,
      removeCharacter: 'ㄨ',
    }
  },
  computed: {
    visible () {
      return this.messageList.length > 0
    }
  },
  mounted () {
  },
  methods: {
    removeTouchStart (e) {
      e.stopPropagation()
      if (this.removeStatus) {
        this.$emit('remove-all-message')
      }
    },
    removeTouchMove (e) {
      e.stopPropagation()
    },
    removeTouchEnd (e) {
      e.stopPropagation()
      this.removeStatus = !this.removeStatus
      this.$refs['remove'].style.transition = 'width 0.5s ease 0.01s'
      if (this.removeStatus) {
        this.removeCharacter = '清除'
        this.$refs['remove'].style.width = '35px'
      } else {
        this.removeCharacter = 'ㄨ'
        this.$refs['remove'].style.width = '25px'
      }
    },
    deleteMessage (id) {
      this.$emit('delete-message', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  height: 100%;
  min-height: 50px;

  .notification-top-panel {
    position: relative;
    height: 35px;
    margin: 0px 15px;
    line-height: 35px;

    .notification-title {
      display: inline-block;
      position: absolute;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 24px;
      color: white;
    }

    .notification-remove {
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 5px;
      height: 25px;
      width: 25px;
      border-radius: 12.5px;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: #3A3C3D;
      background-color: #787b7d;
    }
  }

  .message-container {
    position: relative;
    width: 100%;
    touch-action: none;
  }

  .no-data-text {
    position: relative;
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 14px;
  }  
}
</style>