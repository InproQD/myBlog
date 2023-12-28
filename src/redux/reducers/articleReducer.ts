const initState = {
  id: null,
  articleObject: {
    id: null,
    content: '',
    author: '',
    tag: '',
    title: ''
  }
}
const articleReducer = (state = initState, action: any) => {
  // state 是状态也是数据
  // action是一个对象，由actionCreators发送过来的动作
  // authReducer一定要有返回值
  // state不可更改，所以返回的新状态，一定是state的拷贝, 也可以用Json.parse和Json.Stringify来拷贝
  switch (action.type) {
    case 'SET_ARTICLE_ID':
      return {
        ...state,
        id: action.value
      }
    case 'SET_EDITOR_CONTENT':
      return {
        ...state,
        articleObject: Object.assign(action.value)
      }
    default:
      return state
  }
}
export default articleReducer
