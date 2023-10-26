import React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/login'
import Home from './pages/home'
import ArticlePage from '@/pages/article'
import MediaPage from '@/pages/media'
import Editor from '@/pages/editor'
import ProgressBar from '@/component/pageProgress/index'
import LoadingPage from '@/component/loading-open'
import './App.css'
import '@/component/loading-open/index.css'
import './global.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content/:id" element={<ArticlePage />}></Route>
        <Route path="/video" element={<MediaPage />}></Route>
        <Route path="/edit/:id" element={<Editor />}></Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>

      <LoadingPage />
      <ProgressBar />
    </HashRouter>
  )
}

export default App
