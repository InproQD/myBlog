import './App.css'
import '@/component/loading-open/index.css'
import React from 'react'
import Home from './pages/home'
// import LoadingPage from '@/pages/loading-open'
import ArticlePage from '@/pages/article'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './global.css'
import ProgressBar from '@/component/pageProgress/index'
import LoadingPage from '@/component/loading-open'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/*<Route path="/loading" element={<LoadingPage />}></Route>*/}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content" element={<ArticlePage />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>

      <LoadingPage></LoadingPage>
      <ProgressBar></ProgressBar>
    </HashRouter>
  )
}

export default App
