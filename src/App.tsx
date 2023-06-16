import './App.css'
import React from 'react'
import Home from './pages/home'
import LoadingPage from '@/pages/loading-page'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<LoadingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Navigate to="/loading" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
