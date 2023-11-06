import { debounce, throttle } from 'lodash-es'

export const Tool = {
  isNotEmpty(value: any): boolean {
    return (
      value !== undefined &&
      value !== '' &&
      value !== null &&
      value !== 'N/A' &&
      JSON.stringify(value) !== '{}' &&
      JSON.stringify(value) !== '[]'
    )
  },

  isEmpty(value: any): boolean {
    return (
      value === undefined ||
      value === null ||
      value === 'N/A' ||
      value === '' ||
      JSON.stringify(value) === '{}' ||
      JSON.stringify(value) === '[]'
    )
  },

  // 防抖函数，就是在某段时间内，不管触发多少次函数，只认最后一次
  lodashDebounce(func: any, wait: number, options?: object): void {
    // func是需要执行的函数， wait是指定的时间内， option对象一般接收两个属性:leading（默认为false，用来设置function是否在延迟开始之前调用）,trailing（默认为true，用来设置function是否在延迟结束后调用）
    debounce(func, wait, options)
  },

  // 节流函数就是在定义的一段时间内，不管触发多少次函数，只执行一次回调（只认第一次触发）
  lodashThrottle(func: any, wait: number, options?: object): void {
    // options只有两个选项：leading、trailing，默认都为true
    throttle(func, wait, options)
  }
}
