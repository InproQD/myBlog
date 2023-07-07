import React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/home'
import ArticlePage from '@/pages/article'
import ProgressBar from '@/component/pageProgress/index'
import LoadingPage from '@/component/loading-open'
import './App.css'
import '@/component/loading-open/index.css'
import './global.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/*<Route path="/loading" element={<LoadingPage />}></Route>*/}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content" element={<ArticlePage />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>

      <LoadingPage />
      <ProgressBar />
    </HashRouter>
  )
}

export default App
