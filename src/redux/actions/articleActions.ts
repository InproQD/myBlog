// 这里书写auth相关模块数据的所有action操作
const setArticleId = () => {
  return {
    type: 'SET_ARTICLE_ID',
    value: null
  }
}
const setEditorContent = () => {
  return {
    type: 'SET_EDITOR_CONTENT',
    value: {}
  }
}

export default { setArticleId, setEditorContent }
