/* 时间戳转标准时间 */
export function formatDate(timeStamp) {
  const time = new Date(timeStamp)
  const year = time.getFullYear()
  const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  const date = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()
  const hour = time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours()
  const minute = time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes()
  const second = time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

/* 标准时间转时间戳 */
export function toTimeStamp(strTime) {
  return new Date(strTime).getTime() // new Date(strTime).valueOf() or Date.parse(strTime)
}

/* *
  *  把传入的时间戳与当前时间比较,计算几分钟前、几小时前、几天前，以及几分钟后、几小时后、几天前后
  *  unixtime 需要计算的时间戳，保留到秒
* */
export function getDateTimeFormat(unixtime) {
  const currTime = Date.parse(new Date())
  let time = ((parseInt(currTime) / 1000) - parseInt(Math.round(unixtime) / 1000))
  let minuies, hours, days, months, years
  if (time < 0) {
    // 少于一分钟
    if (time < 60) {
      return '等等'
    }
    // 秒转分钟
    minuies = time / 60
    if (minuies < 60) {
      return Math.floor(minuies) + '分钟后'
    }
    // 秒转小时
    hours = time / 3600
    if (hours < 24) {
      return Math.floor(hours) + '小时后'
    }
    // 秒转天数
    days = time / 3600 / 24
    if (days < 30) {
      return Math.floor(days) + '天后'
    }
    // 秒转月
    months = time / 3600 / 24 / 30
    if (months < 12) {
      return Math.floor(months) + '月后'
    }
    // 秒转年
    years = time / 3600 / 24 / 30 / 12
    return Math.floor(years) + '年后'
  } else {
    time = Math.abs(time)
    // 少于一分钟
    if (time < 60) {
      return '现在'
    }
    // 秒转分钟
    minuies = time / 60
    if (minuies < 60) {
      return Math.floor(minuies) + '分钟前'
    }
    // 秒转小时
    hours = time / 3600
    if (hours < 24) {
      return Math.floor(hours) + '小时前'
    }
    // 秒转天数
    days = time / 3600 / 24
    if (days < 30) {
      return Math.floor(days) + '天前'
    }
    // 秒转月
    months = time / 3600 / 24 / 30
    if (months < 12) {
      return Math.floor(months) + '月前'
    }
    // 秒转年
    years = time / 3600 / 24 / 30 / 12
    return Math.floor(years) + '年前'
  }
}

/* 验证日期格式 yyy-mm-dd，并且验证日期合法性 */
export function validatorDate(str) {
  if (['', null].indexOf(str) !== -1) {
    return false
  }
  const reg = /^(\d{4})-(\d{2})-(\d{2})$/
  if (reg.test(str)) { // 正则校验格式
    // 校验日期是否合法
    const A = str.split('-')
    const y = Number(A[0])
    const m = Number(A[1])
    const d = Number(A[2])
    const B = new Date(y, m - 1, d)
    // 判断 A 和 B 的年月日是否全部相等
    if (y === B.getFullYear() && m === (B.getMonth() + 1) && d === B.getDate()) {
      return true // 全部相等，被校验日期合法
    } else {
      return false // 不全部相等，被校验日期的年、月、日至少有一个错误。
    }
  } else {
    return false // 格式不为 yyyy-mm-dd
  }
}
/**
 * 将秒转换为 分:秒
 * s int 秒数
*/
export function s_to_ms(s) {
  // 计算分钟
  // 将秒数除以60，然后下舍入，既得到分钟数
  let m = Math.floor(s / 60)
  // 计算秒
  // 取得秒%60的余数，既得到秒数
  s = s % 60
  // 将变量转换为字符串
  m += ''
  s += ''
  // 如果只有一位数，前面增加一个0
  m = (m.length === 1) ? '0' + m : m
  s = (s.length === 1) ? '0' + s : s
  return m + ':' + s
}

// 获取格式化月日时分秒
export function formatTime(timeStamp) {
  const time = new Date(timeStamp)
  const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  const date = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()
  const hour = time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours()
  const minute = time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes()
  return month + '-' + date + ' ' + hour + ':' + minute
}
