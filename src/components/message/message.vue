<template>
  <transition
    name="fade"
    appear
  >
    <div v-show="visible" class="message-warpper">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      visible: false,
      type:'info',
      message: '',
      duration: 3000,
      index: 0
    }
  },
  mounted () {
    this.setTimer()
    console.log('mounted', this._uid)
  },
  methods: {
    setTimer() {
      setTimeout(() => {
        this.close()
        console.log('???/')
      }, this.duration+2000)
    },
    close () {
      this.visible = false
      setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }, 500)
    },

    // --------
    // 进入中
    // --------

    beforeEnter: function (el) {
      // ...
      //el.style.transition = 'all 0.5s ease-in-out 0.01s'
      el.style.top = `${0}px`
      console.log('beforeEnter')
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // ...
      console.log('enter')
     // el.style.transition = 'all 0.5s ease-in-out 0.01s'
      done()
    },
    afterEnter: function (el) {
      // ...
      el.style.top = `${40}px`
      console.log('afterEnter')
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
      // ...
      console.log('beforeLeave')
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      // ...
      console.log('leave')
      done()
    },
    afterLeave: function (el) {
      // ...
      console.log('afterLeave')
    }
  }
}
</script>

<style lang="scss" scoped>
.message-warpper {
  position: fixed;
  z-index: 1000;
  //top: 0px;
  left: 50%;
  transform: translateX(-50%);
  //transition: opacity .3s, transform .4s, top 0.4s;
  overflow: hidden;
  
  //transition: top 1s ease 0.01s;


  min-width: 270px;
  box-sizing: border-box;
  border-radius: 4px;

  height: 35px;

  background-color: red;
  color: white;
  text-align: center;
  line-height: 35px;
}

// .fade-enter, .fade-leave-to {
//   
//   top: 0px;
// }

// .fade-enter-active, .fade-leave-active {
//   transition: all 1s ease-in-out 0.01s;
// }

// .fade-enter-to, .fade-leave {
//   opacity: 1;
//   top: 35px;
// }

// .fade-enter {
//   //opacity: 0;
//   top: 0px;
// }

// .fade-enter-active {
//   transition: opacity .3s, transform .4s, top 0.4s;
// }

// .fade-enter-to {
//   //opacity: 1;
//   top: 40px;
// }


// .fade-leave {
//   //opacity: 0;
//   top: 40px;
// }

// .fade-leave-active {
//   transition: opacity .3s, transform .4s, top 0.4s;
// }

// .fade-leave-to {
//   //opacity: 1;
//   top: 0px;
// }
</style>