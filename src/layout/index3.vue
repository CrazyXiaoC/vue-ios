<template>
  <div 
    ref="layout"
    class="layout" 
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    :style="'background-image: url(' + desktopBgImgURL + ')'"
  >
    <top-status-bar 
      ref="top-status-bar" 
      class="top-status-bar" 
      :visible="topStatusBarVisible"
    />

    <top-view-edit 
      class="edit-panel" 
      :visible.sync="editPanelVisible"
      @add-touch-end="addComponent"
      @confirm-touch-end="finishViewEdit"
    /> 

    <div ref="main-view" class="main-view"> 
      
      <!-- <div ref="swiper-app-container" class="swiper-app-container">
        <div ref="app-wrapper-1" class="app-wrapper-1">1</div>
        <div ref="app-wrapper-2" class="app-wrapper-2">
          <app-box 
            v-for="(item, index) in carouselAppList" 
            :key="item.id"
            :item-index="index"
            :app="item"
            :current-status="item.currentStatus"
            :edge-visible="item.edgeVisible"
            :box-label-visible="true"
            @click-app="clickApp"
            @move-app="moveApp"
            @long-press-app="longPressApp"
            @remove-selected-app="removeSelectedApp"
          />
        </div>
        <div ref="app-wrapper-3" class="app-wrapper-3">3</div>
      </div> -->
      <carousel class="swiper-app-container" height="77%" width="300px">
      </carousel>

      <!-- <div ref="bottom-app-container" class="bottom-app-container">
        <app-box 
          v-for="(item, index) in bottomAppList" 
          :key="item.id"
          :item-index="index"
          :app="item"
          :current-status="item.currentStatus"
          :edge-visible="item.edgeVisible"
          :box-label-visible="false"
          @click-app="clickApp"
          @move-app="moveApp"
          @long-press-app="longPressApp"
          @remove-selected-app="removeSelectedApp"
        />
      </div> -->

    </div>

    <div ref="top-view" class="top-view font-color"> top </div>
    <div ref="right-view" class="right-view font-color"> right </div>
    <div ref="bottom-view" class="bottom-view font-color"> bottom </div>
    <div ref="left-view" class="left-view font-color"> left </div>

    <!-- <header-container/>
    <main-container/>
    <footer-container/> -->
  </div>  
</template>
   
<script>
import topStatusBar from './components/topStatusBar/index'
import topViewEdit from './components/topViewEdit/index'
import carousel from './components/carousel/index.vue'
// import mainContainer from './components/mainContainer/index'
// import footerContainer from './components/footerContainer/index'
//import appBox from './components/appBox/index.vue'
import { carouselAppList, bottomAppList } from './appData.js'

let gridColumnWidth = 47
let gridRowHeight = 47
let gridRowGap = 23
let gridColumnGap = 23
let bottomGridRows = 1
let bottomGridColumns = 4

export default {
  name: 'Layout',
  components: {
    carousel,
    //appBox,
    topStatusBar,
    topViewEdit,
    // mainContainer,
    // footerContainer
  },
  data () {
    return {
      carouselAppList: carouselAppList(),
      bottomAppList: bottomAppList(),
      topStatusBarVisible: true,
      editPanelVisible: false,
      desktopBgImgURL: require('../assets/background/earth.jpeg'),
      viewHeight: 610,
      viewWidth: 300,

      mainViewWidth: 300,
      mainViewHeight: 610, 

      timeOutEvent: null, // 事件延迟定时器

      startX: 0, // 触摸屏幕开始坐标x
      startY: 0, // 触摸屏幕开始坐标y
      endX: 0, // 触摸屏幕结束坐标y
      endY: 0, // 触摸屏幕结束坐标y
      startTimeStamp: 0, // 触摸屏幕开始时间戳
      endTimeStamp: 0, // 触摸屏幕结束时间戳
      touchTime: 0, // 触摸屏幕时长
      touchMinTime: 150,

      swiperCurrentPageIndex: 0,
      swiperPageTotalNum: 0,

      leftViewIsOpen: false,
      rightViewIsOpen: false,

      layout: null,
      mainView: null,
      leftView: null,
      rightView: null,
      bottomAppContainer: null,

    }
  },
  computed: {
  },
  watch: {
    'bottomAppList.length': {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal <= 4) {
          this.bottomAppContainer.style.transition = `all 2s ease-in-out 0.01s`
          this.bottomAppContainer.style.gridTemplateColumns = `repeat(${newVal}, ${gridColumnWidth}px)`
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.layout = this.$refs['layout']
    this.mainView = this.$refs['main-view']
    this.leftView = this.$refs['left-view']
    this.rightView = this.$refs['right-view']
    this.bottomAppContainer = this.$refs['bottom-app-container']

    //this.$refs['add-bt'].addEventListener('touchend')

    // this.mainView.addEventListener('touchstart', (e) => {
    //   console.log('?>>???')
    // }, { passive: false })
    // this.mainView.addEventListener('touchmove', this.touchMove(e), { passive: false })
    // this.mainView.addEventListener('touchend', this.touchEnd(e), { passive: false })
    // this.mainView.addEventListener('touchmove', (e) => {  
    //   e.preventDefault()
    //   e.stopPropagation()
    // }, { passive: false })
    // this.mainView.addEventListener('touchend', (e) => {  
    //   e.preventDefault()
    //   e.stopPropagation()
    // }, { passive: false })

    //bottomGridColumns = this.bottomAppList.length

    this.bottomAppContainer.style.gridTemplateRows = `repeat(${bottomGridRows}, ${gridRowHeight}px)`
    this.bottomAppContainer.style.gridTemplateColumns = `repeat(${bottomGridColumns}, ${gridColumnWidth}px)`
    this.bottomAppContainer.style.rowGap = `${gridRowGap}px`
    this.bottomAppContainer.style.columnGap = `${gridColumnGap}px`
  },
  methods: {
    touchStart (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.startTimeStamp = e.timeStamp
      this.startX = touch.pageX
      this.startY = touch.pageY

      this.mainView.style.transition = ''
      this.mainView.style.webkitTransition = ''

      this.leftView.style.transition = ''
      this.leftView.style.webkitTransition = ''

      this.rightView.style.transition = ''
      this.rightView.style.webkitTransition = ''

      this.timeOutEvent = setTimeout(this.longPress, 500)
      return false
    },
    touchMove (e) {
      e.stopPropagation()
      let touch = e.targetTouches[0]
      this.endX = touch.pageX
      this.endY = touch.pageY
    
      let dX = this.endX - this.startX
      let dY = this.endY - this.startY

      /* 判断处理手指怎么滑动的 */ 
      if (Math.abs(dX) > Math.abs(dY)) {
        if (dX > 0) { // 从左往右
          if (this.swiperCurrentPageIndex === 0) {
            this.leftViewLToRMove(dX) // 从左往右滑时 打开 左侧视图
          }
          if (this.swiperCurrentPageIndex === 2) {
            this.rightViewLToRMove(dX) // 从左往右滑时 关闭 右侧视图
          }
          console.log('left->right') 
        }
        if (dX < 0) { // 从右往左滑
          if (this.swiperCurrentPageIndex === 0) {
            this.leftViewRToLMove(dX) // 从右往左滑时 关闭 右侧视图
          }
          if (this.swiperCurrentPageIndex === 2) {
            this.rightViewRToLMove(dX) // 从右往左滑时 打开 右侧视图
          }
          console.log('right->left') 
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上向下滑
          this.topViewUToDMove(dY) // 从上向下滑时 打开 顶部视图
          this.bottomViewUToDMove(dY) // 从上向下滑时 关闭 低部视图
          //console.log('up->down')
        }
        if (dY < 0) { // 从下向上滑
          this.bottomViewDToUMove(dY) // 从下向上滑时 打开 低部视图
          this.topViewDToUMove(dY)  // 从下向上滑时 关闭 顶部视图
          //console.log('down->up') 
        }
      }

      clearTimeout(this.timeOutEvent)//清除定时器   
      this.timeOutEvent = null 
      //alert("手指移动事件触发")    
    },
    touchEnd (e) {
      e.stopPropagation()
      this.endTimeStamp = e.timeStamp
      this.touchTime = Math.floor(this.endTimeStamp - this.startTimeStamp)

      let dX = this.endX - this.startX
      let dY = this.endY - this.startY

      console.log('touchTime', this.touchTime, 'dX', dX, 'dY', dY)

      // 判断手指怎么滑动的
      if (Math.abs(dX) > Math.abs(dY)) {
        if (dX > 0) { // 左向右滑结束
          if (this.swiperCurrentPageIndex === 0) {
            this.leftViewLToREnd(dX, this.touchTime) // 从左向右滑结束时 进入 左侧视图 判断动画
          }
          if (this.swiperCurrentPageIndex === 2) {
            this.rightViewLToREnd(dX, this.touchTime) // 从左向右滑结束时 进入 右侧视图 判断动画
          }
        }
        if (dX < 0) { // 右向左滑结束
          if (this.swiperCurrentPageIndex === 0) {
            this.leftViewRToLEnd(dX, this.touchTime) // 从右向左滑结束时 进入 左侧侧视图 判断动画
          }
          if (this.swiperCurrentPageIndex === 2) {
            this.rightViewRToLEnd(dX, this.touchTime) // 从右向左滑结束时 进入 右侧视图 判断动画
          }
        }
      }
      if (Math.abs(dX) < Math.abs(dY)) {
        if (dY > 0) { // 从上往下滑结束
          this.topViewUToDEnd(dY, this.touchTime)

          this.bottomViewUToDEnd(dY, this.touchTime)
        }
        if (dY < 0) { // 从下往上滑结束
          this.topViewDToUEnd(dY, this.touchTime)

          this.bottomViewDToUEnd(dY, this.touchTime)
        }
      }

      clearTimeout(this.timeOutEvent) //清除定时器   
      if(this.timeOutEvent !== null) {   
        //这里写要执行的内容（尤如onclick事件）   
        //alert("手指点击，不是手指长按")   
        
        if (!this.topStatusBarVisible) {
          this.topStatusBarVisible = true
          this.editPanelVisible = false
          for (const i in this.bottomAppList) {
            this.bottomAppList[i].currentStatus = 'normal'
          }
        }
      }   
      return false   
    },
    longPress () {
      this.timeOutEvent = null   
      //执行长按要执行的内容，如弹出菜单   
      //alert("手指长按事件触发")   
      console.log('手指长按事件触发')
      this.topStatusBarVisible = false
      this.editPanelVisible = true

      for (const i in this.bottomAppList) {
        this.bottomAppList[i].currentStatus = 'edit'
      }

    },
    moveApp (e, app) {
      // for (const i in this.bottomAppList) {
      //   if (this.bottomAppList[i].id === app.id) {
      //     this.bottomAppList[i].currentStatus = 'move'
      //     break
      //   }
      // }
      //console.log('moveApp', e, 'appId', app.id)
    },
    clickApp (e, app) {

      // if (this.bottomAppList.length < 4) {
      //   this.bottomAppList.push({ 
      //     id: `${Math.random()}`,
      //     type: 'single', // 单 app
      //     currentStatus: 'normal', // normal edit move
      //     edgeVisible: false,
      //     position: 'bottom', // bottom、swiper
      //     swiperViewNum: -1, // 所在 swiper 页码
      //     gridNum: '1 * 1',
      //     badgeNum: 0,
      //     boxLabel: '电话',
      //     removeIconName: 'remove-app',
      //     bgImgFileName: 'telephone.jpeg',
      //     selectOptions: [
      //       {
      //         label: '选项一',
      //         iconName: 'remove-app'
      //       },
      //       {
      //         label: '选项二',
      //         iconName: 'remove-app'
      //       }
      //     ]
      //   })
      // }
      
      //console.log('clickApp', e, 'appId', app.id)
    },
    longPressApp (e, app) {
      //this.bottomAppList.pop()
      //console.log('longPressApp', e, 'appId', app.id)
    },
    removeSelectedApp (e, app) {
      //console.log('removeSelectedApp', e, 'appId', app.id)
    },
    // 添加组件
    addComponent (e) {
      //console.log('打开添加组件页面', e)
    },
    // 保存修改后的布局
    finishViewEdit(e) {
      this.topStatusBarVisible = true
      //this.editPanelVisible = false
      //console.log('完成编辑，退出编辑状态', )
    },
    
    /* ios 非线性动画 */
    // left-view l->r move animation
    leftViewLToRMove (distance) {
      if (!this.leftViewIsOpen) {
        this.leftView.style.left = `-${this.viewWidth - distance}px`
        //console.log('distance', distance, 'left', this.leftView.style.left)
        // 模态增长动画
        this.touchMoveMaskIncreaseAnimation(distance)
      } else {
        if (distance < 50) {
          this.leftView.style.left = `${distance}px`
        }
      } 
    },
    // left-view r->l move animation
    leftViewRToLMove (distance) {
      if (this.leftViewIsOpen) {
        this.leftView.style.left = `${0 + distance}px`
        // 模态减小动画
        this.touchMoveMaskdDecreaseAnimation(distance)
      } 
    },
    // right-view l->r move animation
    rightViewLToRMove (distance) {
      if (this.rightViewIsOpen) {
        this.rightView.style.right = `${0 - distance}px`
        // 模态减小动画
        this.touchMoveMaskdDecreaseAnimation(distance)
      } 
    },
    // right-view r->l move animation
    rightViewRToLMove (distance) {
      if (!this.rightViewIsOpen) {
        this.rightView.style.right = `-${this.viewWidth + distance}px`
        // 模态增长动画
        this.touchMoveMaskIncreaseAnimation(distance)
      } else {
        if (Math.abs(distance) < 50) { // 弹性余量 50
          this.rightView.style.right = `${Math.abs(distance)}px`
        }
      } 
    },
    // 移动时 模态 增长 动画
    touchMoveMaskIncreaseAnimation (distance) {
      if (Math.abs(distance) <= 20) {
        // main-view 进入模糊态
        this.mainView.style.filter = `blur(${Math.abs(distance)/2}px)`
        // 改变 main-view 尺寸
        this.mainView.style.height = this.mainViewHeight - Math.abs(distance) + 'px'
        this.mainView.style.width = this.mainViewWidth - Math.abs(distance) + 'px'
        // 改变 bottom-app-container 栅格尺寸
        let v = Math.abs(distance) * 5 / 20
        this.bottomAppContainer.style.gridTemplateRows = `repeat(${bottomGridRows}, ${gridRowHeight - v}px)`
        this.bottomAppContainer.style.gridTemplateColumns = `repeat(${bottomGridColumns}, ${gridColumnWidth - v}px)`
        this.bottomAppContainer.style.RowGap = `${gridRowGap - v}px`
        this.bottomAppContainer.style.ColumnGap = `${gridColumnGap - v}px`
      }
    },
    // 移动时 模态 减小 动画
    touchMoveMaskdDecreaseAnimation (distance) {
      if (Math.abs(distance) <= 20) {
        // 逐步减小 main-view 模糊态
        this.mainView.style.filter = `blur(${5 - Math.abs(distance)/2}px)`
        // 逐步还原 main-wrapper 尺寸
        this.mainView.style.height = 590 + Math.abs(distance) + 'px'
        this.mainView.style.width = 280 + Math.abs(distance) + 'px'
        // 逐步还原 bottom-app-container 栅格尺寸
        let v = Math.abs(distance) * 5 / 20
        this.bottomAppContainer.style.gridTemplateRows = `repeat(${bottomGridRows}, ${gridRowHeight - 5 + v}px)`
        this.bottomAppContainer.style.gridTemplateColumns = `repeat(${bottomGridColumns}, ${gridColumnWidth - 5 + v}px)`
        this.bottomAppContainer.style.RowGap = `${gridRowGap - 5 + v}px`
        this.bottomAppContainer.style.ColumnGap = `${gridColumnGap - 5 + v}px`
      }
    },
    // top-view up->down move animation
    topViewUToDMove (distance) {  
    },
    // top-view down->up move animation
    topViewDToUMove (distance) {
    },
    // bottom-view up->down move animation
    bottomViewUToDMove (distance) {  
    },
    // bottom-view down->up move animation
    bottomViewDToUMove (distance) {
    },
    // left-view l->r end animation
    leftViewLToREnd (distance, touchTime) {
      this.leftView.style.transition = 'left 0.25s ease 0.01s'
      if (!this.leftViewIsOpen) {
        if (distance < this.viewWidth / 3) {
          this.leftView.style.left = `-${this.viewWidth}px`
          // 退出 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 0, height: 0, filter: 0 }, 
            bottomAppContainer: { gridRowHeight: 0, gridColumnWidth: 0, gridRowGap: 0, gridColumnGap: 0 }
          })
        }
        if (distance > this.viewWidth / 3 || touchTime <= this.touchMinTime) {
          this.leftView.style.left = `0px`
          this.leftViewIsOpen = true
          // 进入 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 20, height: 20, filter: 5 }, 
            bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
          })

        }
      } else {
        this.leftView.style.left = `0px`
        // 进入 模态 动画
        this.touchEndSetMaskAttributeExecAnimation({ 
          mainView: { width: 20, height: 20, filter: 5 }, 
          bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
        })
      }
    },
    // left-view r->l end animation
    leftViewRToLEnd (distance, touchTime) {
      this.leftView.style.transition = 'left 0.25s ease 0.01s'
      if (this.leftViewIsOpen) {
        if (Math.abs(distance) < this.viewWidth / 3) {
          this.leftView.style.left = `0px`
          // 进入 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 20, height: 20, filter: 5 }, 
            bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
          })

        }
        if (Math.abs(distance) > this.viewWidth / 3 || touchTime <= this.touchMinTime) {
          this.leftView.style.left = `-${this.viewWidth}px`
          this.leftViewIsOpen = false
          // 退出 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 0, height: 0, filter: 0 }, 
            bottomAppContainer: { gridRowHeight: 0, gridColumnWidth: 0, gridRowGap: 0, gridColumnGap: 0 }
          })
        }
      }
    },
    // right-view l->r end animation
    rightViewLToREnd(distance, touchTime) {
      this.rightView.style.transition = 'right 0.25s ease 0.01s'
      if (this.rightViewIsOpen) {
        if (Math.abs(distance) < this.viewWidth / 3) {
          this.rightView.style.right = `0px`
          // 进入 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 20, height: 20, filter: 5 }, 
            bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
          })
        }
        if (Math.abs(distance) > this.viewWidth / 3 || touchTime <= this.touchMinTime) {
          this.rightView.style.right = `-${this.viewWidth}px`
          this.rightViewIsOpen = false
          // 退出 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 0, height: 0, filter: 0 }, 
            bottomAppContainer: { gridRowHeight: 0, gridColumnWidth: 0, gridRowGap: 0, gridColumnGap: 0 }
          })
        }
      }
    },
    // right-view r->l end animation
    rightViewRToLEnd (distance, touchTime) {
      this.rightView.style.transition = 'right 0.25s ease 0.01s'
      if (!this.rightViewIsOpen) {
        if (Math.abs(distance) < this.viewWidth / 3) {
          this.rightView.style.right = `-${this.viewWidth}px`
          // 退出 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 0, height: 0, filter: 0 }, 
            bottomAppContainer: { gridRowHeight: 0, gridColumnWidth: 0, gridRowGap: 0, gridColumnGap: 0 }
          })
        }
        if (Math.abs(distance) > this.viewWidth / 3 || touchTime <= this.touchMinTime) {
          this.rightView.style.right = `0px`
          this.rightViewIsOpen = true
          // 进入 模态 动画
          this.touchEndSetMaskAttributeExecAnimation({ 
            mainView: { width: 20, height: 20, filter: 5 }, 
            bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
          })
        }
      } else {
        this.rightView.style.right = `0px`
        // 进入 模态 动画
        this.touchEndSetMaskAttributeExecAnimation({ 
          mainView: { width: 20, height: 20, filter: 5 }, 
          bottomAppContainer: { gridRowHeight: 5, gridColumnWidth: 5, gridRowGap: 5, gridColumnGap: 5 }
        })
      }
    },
    // 触摸 结束时 设置模态元素属性 执行 动画
    touchEndSetMaskAttributeExecAnimation (attribute) {
      this.mainView.style.transition = 'all 0.25s ease 0.01s'
      this.bottomAppContainer.style.transition = 'all 0.25s ease 0.01s'
      // main-view 退出模糊态
      this.mainView.style.filter = `blur(${attribute.mainView.filter}px)`
      //this.mainView.style.filter = `blur(${0}px)`
      // 还原 main-view 尺寸
      this.mainView.style.width = `${this.mainViewWidth - attribute.mainView.width}px`
      this.mainView.style.height = `${this.mainViewHeight - attribute.mainView.height}px`
      // 还原 bottom-app-container 栅格尺寸
      this.bottomAppContainer.style.gridTemplateRows = `repeat(${bottomGridRows}, ${gridRowHeight - attribute.bottomAppContainer.gridRowHeight}px)`
      this.bottomAppContainer.style.gridTemplateColumns = `repeat(${bottomGridColumns}, ${gridColumnWidth - attribute.bottomAppContainer.gridColumnWidth}px)`
      // this.bottomAppContainer.style.rowGap = `${25 - attribute.bottomAppContainer.gridRowGap}px`
      // this.bottomAppContainer.style.columnGap = `${25 - attribute.bottomAppContainer.gridColumnGap}px`
      // 还原 swiper-app-container 当前页 的 栅格尺寸
    },
    // top-view up->down end animation
    topViewUToDEnd (distance, touchTime) {
    },
    // top-view down->up end animation
    topViewDToUEnd (distance, touchTime) {  
    },
    // bottom-view up->down end animation
    bottomViewUToDEnd (distance, touchTime) {
    },
    // bottom-view down->up end animation
    bottomViewDToUEnd (distance, touchTime) {  
    }
  }
}
</script>

<style lang="scss" scoped>
$deviceHeight: 610px;
$deviceWidth: 300px;

.layout {
  height: 100vh;
  width: 100vw;
  position: relative;
  touch-action: none;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 135% 110%;

  .top-status-bar {
    position: fixed;
    z-index: 999;
    height: 35px;
    width: 100%;
    background-color: rgba(144, 147, 153, 0.5);
    padding: 0px 10px;
  }

  .edit-panel {
    position: fixed;
    z-index: 999;
    height: 35px;
    width: 100%;
    // transition: display 2s ease 0.5s;
    // -webkit-transition: display 2s ease 0.5s;
    //background-color: green;
  }

  .main-view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: $deviceHeight;
    width: $deviceWidth;
    //background-color: blue;
    //padding: 10px 10px;

    .swiper-app-container {
      display: inline-block;
      position: relative;
      height: 75%;
      width: 100%;
      margin: 40px 0px 0px 0px;
      //background-color: white;
      
      .app-wrapper-1 {
        position: absolute;
        left: -300px;
        display: inline-block;
        height: 100%;
        width: 100%;
        background-color: red;
      }
      .app-wrapper-2 {
        position: absolute;
        left: 0px;
        height: 100%;
        width: 100%;
        background-color: green;
      
        display: grid;
        place-content: center;
        place-items: center;
        //justify-content: space-between;
        grid-template-rows: repeat(6, 47px);
        grid-template-columns: repeat(4, 47px);
        row-gap: 23px;
        column-gap: 23px;

        // padding: 30px 10px;
        // display: flex;
        // flex-flow: row wrap;
        // justify-content: flex-start;
        // align-items: flex-start;
        // align-content: flex-start;


      }
      .app-wrapper-3 {
        left: 300px;
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 100%;
        background-color: gray;
      }

    }

    .bottom-app-container {
      height: 12%;
      width: calc(100% - 20px);
      border-radius: 25px;
      background-color: rgba(144, 147, 153, 0.6);
      padding: 10px 10px;
      margin: 10px 10px;

      display: grid;
      place-content: center center;
      place-items: center center;
      //justify-content: space-between;

    }
  }

  .top-view {
    position: absolute;
    top: -100%;
    line-height: $deviceHeight;
    text-align: center;
    height: $deviceHeight;
    width: $deviceWidth;
    background-color: #cccccc;
  }

  .right-view {
    position: absolute;
    right: -100%;
    line-height: $deviceHeight;
    text-align: center;
    height: $deviceHeight;
    width: $deviceWidth;
    background-color: rgba(144, 147, 153, 0.6);
  }

  .bottom-view {
    position: absolute;
    bottom: -100%;
    line-height: $deviceHeight;
    text-align: center;
    height: $deviceHeight;
    width: $deviceWidth;
    background-color: #cccccc;
  }

  .left-view {
    position: absolute;
    left: -100%;
    line-height: $deviceHeight;
    text-align: center;
    height: $deviceHeight;
    width: $deviceWidth;
    background-color: rgba(144, 147, 153, 0.6);
    
  }
}

.font-color {
  color: red;
  font-weight: bold;
  font-size: 48px; 
}
</style>