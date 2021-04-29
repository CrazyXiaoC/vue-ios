export function bottomAppList () {
  return [
    { 
      id: 'f-1',
      type: 'single', // 单 app
      currentStatus: 'normal', // normal edit move
      edgeVisible: false,
      position: 'bottom', // bottom、swiper
      swiperViewNum: -1, // 所在 swiper 页码
      gridNum: '1 * 1',
      badgeNum: 0,
      boxLabel: 'safari',
      removeIconName: 'remove-app',
      bgImgFileName: 'safari.jpeg',
      selectOptions: [
        {
          label: '选项一',
          iconName: 'remove-app'
        },
        {
          label: '选项二',
          iconName: 'remove-app'
        }
      ]
    },
    { 
      id: 'f-2',
      type: 'single', // 单 app
      currentStatus: 'normal', // normal edit move
      edgeVisible: false,
      position: 'bottom', // bottom、swiper
      swiperViewNum: -1, // 所在 swiper 页码
      gridNum: '1 * 1',
      badgeNum: 0,
      boxLabel: '照片',
      removeIconName: 'remove-app',
      bgImgFileName: 'photoAlbum.jpeg',
      selectOptions: [
        {
          label: '选项一',
          iconName: 'remove-app'
        },
        {
          label: '选项二',
          iconName: 'remove-app'
        }
      ]
    },
    { 
      id: 'f-3',
      type: 'single', // 单 app
      currentStatus: 'normal', // normal edit move
      edgeVisible: false,
      position: 'bottom', // bottom、swiper
      swiperViewNum: -1, // 所在 swiper 页码
      gridNum: '1 * 1',
      badgeNum: 3,
      boxLabel: '信息',
      removeIconName: 'remove-app',
      bgImgFileName: 'message.jpeg',
      selectOptions: [
        {
          label: '选项一',
          iconName: 'remove-app'
        },
        {
          label: '选项二',
          iconName: 'remove-app'
        }
      ]
    },
    { 
      id: 'f-4',
      type: 'single', // 单 app
      currentStatus: 'normal', // normal edit move
      edgeVisible: false,
      position: 'bottom', // bottom、swiper
      swiperViewNum: -1, // 所在 swiper 页码
      gridNum: '1 * 1',
      badgeNum: 0,
      boxLabel: '电话',
      removeIconName: 'remove-app',
      bgImgFileName: 'telephone.jpeg',
      selectOptions: [
        {
          label: '选项一',
          iconName: 'remove-app'
        },
        {
          label: '选项二',
          iconName: 'remove-app'
        }
      ]
    }
  ]
}

export function carouselAppList () {
  return [
    [ 
      { 
        id: '1',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '2 * 2',
        badgeNum: 0,
        boxLabel: '时钟',
        removeIconName: 'remove-app',
        bgImgFileName: 'clock.jpeg',
      },
      { 
        id: '2',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '2 * 2',
        badgeNum: 0,
        boxLabel: '天气',
        removeIconName: 'remove-app',
        bgImgFileName: 'weather.jpeg',
      },
      { 
        id: '3',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '邮件',
        removeIconName: 'remove-app',
        bgImgFileName: 'email.jpeg',
      },
      { 
        id: '4', 
        type: 'group', // app 组
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        boxLabel: '实用工具',
        removeIconName: 'remove-app',
        groupAppList: [
          { 
            id: '4-1',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: 'QQ',
            removeIconName: 'remove-app',
            bgImgFileName: 'qq.jpeg',
          },
          { 
            id: '4-2',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: '微信',
            removeIconName: 'remove-app',
            bgImgFileName: 'wechat.jpeg',
          },
          { 
            id: '4-3',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: 'wps',
            removeIconName: 'remove-app',
            bgImgFileName: 'wps.jpeg',
          },
          { 
            id: '4-4',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: '图书',
            removeIconName: 'remove-app',
            bgImgFileName: 'books.jpeg',
          },
          { 
            id: '4-5',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: 'Numbers表格',
            removeIconName: 'remove-app',
            bgImgFileName: 'numbers.jpeg',
          },
          { 
            id: '4-6',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: '日历',
            removeIconName: 'remove-app',
            bgImgFileName: 'calendar.jpeg',
          },
          { 
            id: '4-7',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: 'page文稿',
            removeIconName: 'remove-app',
            bgImgFileName: 'page.jpeg',
          },
          { 
            id: '4-8',
            type: 'single', // 单 app
            currentStatus: 'normal', // normal edit move
            edgeVisible: false,
            position: 'swiper', // bottom、swiper
            gridNum: '1 * 1',
            badgeNum: 0,
            boxLabel: '视频',
            removeIconName: 'remove-app',
            bgImgFileName: 'video.jpeg',
          }
        ]
      }
    ],
    [
      { 
        id: '5',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '计算器',
        removeIconName: 'remove-app',
        bgImgFileName: 'cumputed.jpeg',
      },
      { 
        id: '6',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '地图',
        removeIconName: 'remove-app',
        bgImgFileName: 'map.jpeg',
      },
      { 
        id: '7',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 1,
        boxLabel: 'App Store',
        removeIconName: 'remove-app',
        bgImgFileName: 'appStore.jpeg',
      },
      { 
        id: '8',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '图书',
        removeIconName: 'remove-app',
        bgImgFileName: 'books.jpeg',
      },
      { 
        id: '9',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '通讯录',
        removeIconName: 'remove-app',
        bgImgFileName: 'addressbook.jpeg',
      },
      { 
        id: '10',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '提醒事项',
        removeIconName: 'remove-app',
        bgImgFileName: 'memo.jpeg',
      }
    ],
    [
      { 
        id: '11',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '备忘录',
        removeIconName: 'remove-app',
        bgImgFileName: 'memo.jpeg',
      },
      { 
        id: '12',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '音乐',
        removeIconName: 'remove-app',
        bgImgFileName: 'music.jpeg',
      },
      { 
        id: '13',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '相机',
        removeIconName: 'remove-app',
        bgImgFileName: 'camera.jpeg',
      },
      { 
        id: '14',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 1,
        boxLabel: '设置',
        shakeStatus: false,
        removeIconName: 'remove-app',
        bgImgFileName: 'setting.jpeg',
      },
      { 
        id: '15',
        type: 'single', // 单 app
        currentStatus: 'normal', // normal edit move
        edgeVisible: false,
        position: 'swiper', // bottom、swiper
        gridNum: '1 * 1',
        badgeNum: 0,
        boxLabel: '视频',
        removeIconName: 'remove-app',
        bgImgFileName: 'video.jpeg',
      }
    ]
  ]
}