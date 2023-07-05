import React, { useState, useEffect } from 'react'
import { Progress } from 'antd'

const ProgressBar = () => {
  const [percent, setPercent] = useState(0)
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100
    setPercent(percentage)
  }
  useEffect(() => {
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Progress
      percent={percent}
      showInfo={false}
      strokeLinecap="butt"
      size="small"
      style={{ position: 'fixed', bottom: -6, background: 'transparent' }}
      className="ma-0"
    />
  )
}

export default ProgressBar
