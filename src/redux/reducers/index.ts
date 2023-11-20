// 用于打造rootReducer
import { combineReducers } from 'redux'
import popupReducer from '@/redux/reducers/popupReducer'

// 用于统一处理项目中的所有reducer
// rootReducer是所有的数据，而combineReducers是划分出来的每一部分数据
const rootReducer = combineReducers({
  // 数据名： reducer
  auth: popupReducer
})
export default rootReducer
