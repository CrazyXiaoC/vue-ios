<template>
  <div class="boot-up">
    <div class="container">

      <div class="boot-up icon">
        <svg-icon id="tmpSvg" icon-class="apple-logo" class="apple-logo-icon"/>
      </div>

      <div class="boot-up progress-bar" id="progress-bar">
        <div class="progress-bar__outer" id="progress-bar__outer">
          <div class="progress-bar__inner" id="progress-bar__inner">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'boot-up',
  data () {
    return {
      pbDiv: '',
      pbIDiv: '',
      timer: null
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')

    this.pbDiv = document.getElementById('progress-bar')
    this.pbODiv = document.getElementById('progress-bar__outer')
    this.pbIDiv = document.getElementById('progress-bar__inner')

    this.bootUpRunProgress()

  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    bootUpRunProgress () {
      this.pbIDiv.style.width = '0px'
      this.timer = setInterval(() => {
        this.pbIDiv.style.width = this.pbIDiv.offsetWidth + 1 + 'px'
        if (this.pbIDiv.offsetWidth === this.pbDiv.offsetWidth) {

          this.$router.push({ path:'/layout' })

          clearInterval(this.timer)
          this.timer = null
        }
      }, 100)
    }
  }
  
}
</script>
<style lang="scss" scoped>
.boot-up {
  width: 100vw;
  height: 100vh;
  touch-action: none;
  background-color: black;
  position: relative;

  .container {
    width: 60px;
    height: 60px;
    // background-color: green;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;

    .icon {
      width: 60px;
      height: 60px;
      // background-color: red;
    
      .apple-logo-icon {
        color: white;
        font-size: 60px;
      }
    }

    .progress-bar {
      width: 60px;
      height: 5px;
      margin-top: 20px;
      border-radius: 2px;

      .progress-bar__outer {
        width: 100%;
        height: 100%;
        background-color: #262631;
        border-radius: inherit;
        
        .progress-bar__inner {
          width: 50%;
          height: 100%;
          border-radius: inherit;
          background-color: white;
        }
      }

    }


  }

  

  
}
</style>