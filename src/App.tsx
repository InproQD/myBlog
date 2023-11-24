import React, { useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import ArticlePage from '@/pages/article'
import MediaPage from '@/pages/media'
import Editor from '@/pages/editor'
import Write from '@/pages/write'
import ProgressBar from '@/component/pageProgress/index'
import LoadingPage from '@/component/loading-open'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import './App.css'
import '@/component/loading-open/index.css'
import './global.css'

function App() {
  const messageStore = useSelector((state: any) => state.notification)
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (messageStore.popupVisible) {
      messageApi.open({
        type: messageStore.popupType,
        content: messageStore.popupMessage,
        duration: 2
      })
      const ms = setTimeout(() => {
        store.dispatch({ type: 'SET_VISIBLE', value: false })
      }, 2000)
      return () => {
        clearTimeout(ms)
      }
    }
  }, [messageStore.popupVisible])

  return (
    <HashRouter>
      {contextHolder}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content/:id" element={<ArticlePage />}></Route>
        <Route path="/video" element={<MediaPage />}></Route>
        <Route path="/edit/:id" element={<Editor />}></Route>
        <Route path="/create" element={<Write />}></Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>

      <LoadingPage />
      <ProgressBar />
    </HashRouter>
  )
}

export default App
