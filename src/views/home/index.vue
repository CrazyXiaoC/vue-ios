<template>
  <div class="home" :style="'background-image: url(' + bgImgURL + ')'">
      123
      <el-button type="primary" @click="changeBgImg()">主要按钮</el-button>
  </div>
</template>


<script>
export default {
  name: 'Home',
  data () {
    return {
      bgImgURL: require('../../assets/background.jpeg'),
      isCBGIMG: false
    }
  },
  watch: {
    isCBGIMG: {
      handler (newVal, oldVal) {
        newVal = !oldVal
        if (newVal) {
          this.bgImgURL = require('../../assets/logo.png')
        } else {
          this.bgImgURL = require('../../assets/background.jpeg')
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // document.addEventListener('touchmove', (e) => {
    //   console.log(213)
    //   e.preventDefault()
    // }, false)
  },
  methods: {
    changeBgImg () {
      this.isCBGIMG = !this.isCBGIMG
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  margin: 0px auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
  border: 1px solid #cccccc;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
