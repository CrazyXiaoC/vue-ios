<template>
  <div ref="footerContainer" class="footer-container">
    <app-box 
      v-for="(item, index) in appList" 
      :key="item.id"
      :item-index="index"
      :app-infor="item"
      :display-app-name="false"
    />
  </div>  
</template>

<script>
import appBox from '../appBox/index.vue'

export default {
  name: 'footerContainer',
  components: {
    appBox
  },
  data () {
    return {
      appList: [
        { 
          id: 'f-1',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: 'safari',
          shakeStatus: false,
          bgImgFileName: 'safari.jpeg',
        },
        { 
          id: 'f-2',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '照片',
          shakeStatus: false,
          bgImgFileName: 'photoAlbum.jpeg',
        },
        { 
          id: 'f-3',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 3,
          boxName: '信息',
          shakeStatus: false,
          bgImgFileName: 'message.jpeg',
        },
        { 
          id: 'f-4',
          type: 'single', // 单 app
          gridNum: '1 * 1',
          badgeNum: 0,
          boxName: '电话',
          shakeStatus: false,
          bgImgFileName: 'telephone.jpeg',
        }
      ],
      isShake: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.footer-container {
  height: 75px;
  margin: 0 6px;
  border-radius: 25px;
  background-color: rgba(144, 147, 153, 0.6);
  padding: 5px 5px;


  display: grid;
  grid-template-columns: repeat(4, 47.5px);
  grid-template-rows: repeat(1, 47.5px);
  grid-gap: 25px 25px;
  place-content: center center;
  place-items: center center;


  // display: flex;
  // //flex-flow: row || nowrap;
  // justify-content: space-between;
}
</style>