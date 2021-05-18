<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { login, getSystemConfigs } from '@/api/user'

export default {
  data () {
    return {
    }
  },
  mounted () {
    // 屏蔽浏览器右键菜单
    document.oncontextmenu = () => {
      return false 
    } 

    // 测试 request() 
    setInterval(() => {
      console.log('why', process.env.VUE_APP_BASE_API)
      let data = {
        username: 'admin', 
        password: 'admin'
      }
      getSystemConfigs().then(response => {
        console.log('response', response)
        
        //response.data.result
      }).catch(error => {
        //console.error(error)
      })

    }, 1000)
  },
  methods: {
  }
}
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  user-select:none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
