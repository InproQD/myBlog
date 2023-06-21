import './App.css'
import React from 'react'
import Home from './pages/home'
import LoadingPage from '@/pages/loading-page'
import ArticlePage from '@/pages/article'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './global.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/loading" element={<LoadingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/content" element={<ArticlePage />}></Route>
        <Route path="/" element={<Navigate to="/loading" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
