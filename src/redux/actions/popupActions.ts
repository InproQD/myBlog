// 这里书写auth相关模块数据的所有action操作
const popupAction = () => {
  return {
    type: 'SET_MESSAGE',
    value: ''
  }
}
const hidePopupAction = () => {
  return {
    type: 'SET_VISIBLE',
    value: ''
  }
}
export default { popupAction, hidePopupAction }
