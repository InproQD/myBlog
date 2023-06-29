import './App.css'
import '@/pages/loading-page/index.css'
import React, { useState } from 'react'
import Home from './pages/home'
// import LoadingPage from '@/pages/loading-page'
import ArticlePage from '@/pages/article'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './global.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [activeOpen, setActiveOpen] = useState(true)

  setTimeout(() => {
    // 切换为双开门效果
    setActiveOpen(false)
    // 等待200ms再添加动画，给标签绑定动态属性留一定时间
    setTimeout(() => {
      const left = document.getElementById('open-left') as HTMLBRElement
      const right = document.getElementById('open-right') as HTMLBRElement
      left.classList.add('active')
      right.classList.add('active')
      setTimeout(() => {
        // 取消整个loading的动画
        setLoading(false)
      }, 1500)
    }, 200)
  }, 2000)

  return (
    <HashRouter>
      <Routes>
        {/*<Route path="/loading" element={<LoadingPage />}></Route>*/}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content" element={<ArticlePage />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>

      <>
        {loading && activeOpen && (
          <div className="loading-wrap">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="mt-12 text-white">加载中...</div>
          </div>
        )}
        {loading && !activeOpen && (
          <div className="open-wrap">
            <div className="open-left" id="open-left"></div>
            <div className="open-right" id="open-right"></div>
          </div>
        )}
      </>
    </HashRouter>
  )
}

export default App
