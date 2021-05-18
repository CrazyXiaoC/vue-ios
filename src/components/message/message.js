
import Vue from 'vue'

// 直接将Vue组件作为Vue.extend的参数,在这里注意，高版本的vue-loader要添加.default
const NoticeConstructor = Vue.extend(require('./message.vue').default) 

// let message = require('./message.vue')

// console.log('message', message)

let index = 0
 
const Message = (options) => {
  index++
  //let id = 'notice-' + index++
  options = options || {}
  // if (typeof options === 'string') {//如果只传入字符串，将其设置为显示的信息
  //   options = {
  //     message: options//这里的message就是message.vue中data中的message
  //   }
  // }
 
  // const NoticeInstance = new NoticeConstructor({// 实例化一个带有content内容的Notice
  //   data: options//在这里将你传过来的参数匹配到message.vue组件的data
  // }) 
  options = {
    ...options,
    index: index
  }

  const NoticeInstance = new NoticeConstructor({ data: options })

  //NoticeInstance.id = id
  NoticeInstance.visible = true   //这里修改message.vue数据中的visible,这样message组件就显示出来
  NoticeInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例


  NoticeInstance.$el.style.top = (index) * (35 + 5) - 40 - 35 + 'px'
  NoticeInstance.$el.transition = 'top 1s ease-in-out 0.01s'
  setTimeout(() => {
    NoticeInstance.$el.style.top = (index) * (35 + 5) + 'px'
  }, 1000)
  
  // setTimeout(() => {
  // }, 3000)
 
  NoticeInstance.$el.style.zIndex = index + 1000
  

  document.body.appendChild(NoticeInstance.$el)
  // console.log('1', NoticeInstance)
  // console.log(NoticeInstance.$el)

  return NoticeInstance
}

// ['success', 'warning', 'info', 'error'].forEach(type => {//同element-ui一样，在给Message绑定四个方法，直接调用
//   Message[type] = options => {
//     if (typeof options === 'string') {
//       options = {
//         message: options
//       }
//     }
//     options.type = type
//     return Message(options)
//   };
// });
 
export default  Message