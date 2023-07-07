import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'

const LoadingPage = () => {
  const [loading, setLoading] = useState(true)
  const [activeOpen, setActiveOpen] = useState(true)

  const LoadingFunction = () => {
    const loadingTimeOut = setTimeout(() => {
      // 切换为双开门效果
      setActiveOpen(false)
      // 等待200ms再添加动画，给标签绑定动态属性留一定时间
      const animationTimeOut = setTimeout(() => {
        const left = document.getElementById('open-left') as HTMLBRElement
        const right = document.getElementById('open-right') as HTMLBRElement
        if (left) left.classList.add('active')
        if (right) right.classList.add('active')
        const deleteTimeOut = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => {
          clearTimeout(deleteTimeOut)
        }
      }, 200)
      return () => {
        clearTimeout(animationTimeOut)
      }
    }, 2000)
    return () => {
      clearTimeout(loadingTimeOut)
    }
  }

  const location = useLocation()
  useEffect(() => {
    // 通过监听路由来触发loading动画
    setLoading(true)
    setActiveOpen(true)
    LoadingFunction()
  }, [location])

  return (
    <>
      {loading && activeOpen && (
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
      {loading && !activeOpen && (
        <div className="open-wrap">
          <div className="open-left" id="open-left"></div>
          <div className="open-right" id="open-right"></div>
        </div>
      )}
    </>
  )
}
export default LoadingPage
