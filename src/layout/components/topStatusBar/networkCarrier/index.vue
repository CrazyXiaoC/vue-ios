<template>
  <div class="network-carrier" :style="networkCarrierStyle">
    <span :style="textStyle"> {{ networkCarrier }} </span>
  </div>  
</template>

<script>
export default {
  name: 'networkModel',
  props: {
    // 中国移动, 中国电信, 中国联通
    networkCarrier: {
      type: String,
      default: '中国移动',
      required: true, 
      validiator: (value) => {
        return ['中国移动', '中国电信', '中国联通'].indexOf(value) !== -1
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
    networkCarrierStyle () {
      return {
        color: this.activeColor
      }
    },
    textStyle () {
      return {
        fontSize: '12px',
        fontWeight: 'bold',
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
.network-carrier {
  display: inline-block;
  height: 22px;
  text-align: center;
  line-height: 22px;
}
</style>