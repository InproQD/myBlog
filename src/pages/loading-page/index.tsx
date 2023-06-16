import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const LoadingPage = () => {
  const Navigate = useNavigate()
  setTimeout(() => {
    Navigate('/home')
  }, 2000)

  return (
    <>
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
      {/*{!loading && (*/}
      {/*  <div className="open-wrap">*/}
      {/*    <div className="open-left"></div>*/}
      {/*    <div className="open-right"></div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  )
}
export default LoadingPage
