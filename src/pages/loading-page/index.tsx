import React, { useState, useEffect } from 'react'
import './index.css'
const LoadingPage = () => {
  const [loading, setLoading] = useState(true)
  setInterval(() => {
    setLoading(false)
  }, 2000)
  return (
    <>
      {loading && (
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
      {!loading && (
        <div className="open-wrap">
          <div className="open-left"></div>
          <div className="open-right"></div>
        </div>
      )}
    </>
  )
}
export default LoadingPage
