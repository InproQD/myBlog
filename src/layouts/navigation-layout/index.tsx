import React, { ReactNode, useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import Jarvis from '@/component/jarvis'

//-----------类型定义写外面（如果写在函数里面，那么每次render都会重新定义给值）
interface NavigationLayoutProps {
  children: ReactNode
}

// 一般函数组件+ts的规范写法，需要定义 props 类型方便检查
const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrolled = scrollTop <= 70
      setIsTop(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const navItems = [
    { title: 'Home', link: '/', icon: faHouse },
    { title: 'About', link: '/about', icon: faTag },
    { title: 'Contact', link: '/contact', icon: faComment },
    {
      title: '',
      link: '',
      icon: faMagnifyingGlass
    }
  ]

  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearch = (t: any) => {
    if (t === '') {
      setSearchOpen(true)
    }
  }

  return (
    <>
      <div className={isTop ? 'bg-transparent topNavigation' : 'topNavigation'}>
        <div className="navigation-title px-5">
          <img src={'http://123.207.40.28/logo.png'} width={50} height={50} />
          InproQD
        </div>
        <div className="navigator-wrap">
          {navItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              onClick={() => {
                handleSearch(item.title)
              }}
            >
              <div className="navigator-tab px-4">
                <FontAwesomeIcon icon={item.icon} className="pr-2"></FontAwesomeIcon>
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <main className="pb-12" style={{ background: 'linear-gradient(to right, #F5F5F5 80%, #EDB65B 100%)' }}>
          {children}
        </main>
      </div>
      <div className="footer"></div>
      <div className="aside-navigator">
        <Jarvis></Jarvis>
      </div>
      <Modal title="Modal 1000px width" centered open={searchOpen} width={1000}>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}
export default NavigationLayout
