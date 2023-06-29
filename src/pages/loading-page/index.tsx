import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const LoadingPage = () => {
  const [loading, setLoading] = useState(true)
  const Navigate = useNavigate()
  setTimeout(() => {
    setLoading(false)
    setTimeout(() => {
      const left = document.getElementById('open-left') as HTMLBRElement
      const right = document.getElementById('open-right') as HTMLBRElement
      left.classList.add('active')
      right.classList.add('active')
      setTimeout(() => {
        Navigate('/home')
      }, 500)
    }, 200)
  }, 1000)

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
          <div className="open-left" id="open-left"></div>
          <div className="open-right" id="open-right"></div>
        </div>
      )}
    </>
  )
}
export default LoadingPage
