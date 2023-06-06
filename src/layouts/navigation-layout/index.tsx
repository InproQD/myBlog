import React, { ReactNode } from 'react'
import './index.css'

//-----------类型定义写外面（如果写在函数里面，那么每次render都会重新定义给值）
interface NavigationLayoutProps {
  children: ReactNode
}

// 一般函数组件+ts的规范写法，需要定义 props 类型方便检查
const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="topNavigation">
        <div className="navigation-title">InproQD</div>
      </div>
      <div>
        <main className="pb-12">{children}</main>
      </div>
    </>
  )
}
export default NavigationLayout
