import './App.css'
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
