import React, { ReactNode, useState, useEffect } from 'react'
import { Modal, Drawer, Avatar, Tooltip, Input } from 'antd'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faQq } from '@fortawesome/free-brands-svg-icons'
import { faWeixin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import './index.css'
import Jarvis from '@/component/jarvis'
import { useSelector } from 'react-redux'

//-----------类型定义写外面（如果写在函数里面，那么每次render都会重新定义给值）
interface NavigationLayoutProps {
  children: ReactNode
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'meting-js': any
    }
  }
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
    { title: 'Home', link: '/home', icon: faHouse },
    { title: 'About', link: '/about', icon: faTag },
    { title: 'Comment', link: '/comment', icon: faComment },
    { title: 'Video', link: '/video', icon: faCirclePlay }
  ]

  const contactItem = [
    { text: 'contact me with QQ：296682284', link: 'https://im.qq.com/index/', icon: faQq },
    { text: 'contact me with WeChat：Inpro', link: '', icon: faWeixin },
    { text: 'My Github', link: 'https://github.com/InproQD', icon: faGithub },
    { text: 'To CSDN', link: 'https://blog.csdn.net/m0_49909696?spm=1000.2115.3001.5343', icon: faCopyright }
  ]

  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSearch = () => {
    setSearchOpen(true)
  }
  const isLogin = useSelector((state: any) => state.auth.administratorRight)

  return (
    <>
      <div className={isTop ? 'bg-transparent topNavigation' : 'topNavigation'}>
        <div className="navigation-title px-5">
          <img src={'http://123.207.40.28/logo.png'} width={50} height={50} />
          <span className="f-s-20 f-w-700 ml-2">InproQD</span>
        </div>
        <div className="navigator-wrap">
          {navItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div className="navigator-tab px-4">
                <FontAwesomeIcon icon={item.icon} className="pr-2"></FontAwesomeIcon>
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
          <div
            className="navigator-tab px-4"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSearch()
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div>
        <main className="pb-12" style={{ background: 'linear-gradient(to right, #F5F5F5 80%, #EDB65B 100%)' }}>
          {children}
        </main>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div>
            <div>
              备案号：
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
                蜀ICP备2023015762号-1
              </a>
            </div>
            公安部备案号：51011402000629
          </div>
          <div className="d-flex">
            {contactItem.map((item, index) => (
              <Link to={item.link} key={index}>
                <div className="pr-5">
                  <Tooltip title={item.text}>
                    <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
                  </Tooltip>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="aside-navigator-left">
        <Jarvis></Jarvis>
      </div>

      <div className="aside-navigator-right">
        <Avatar
          size={64}
          className="avatar-wrap"
          icon={<FontAwesomeIcon icon={faMusic} className="pr-1"></FontAwesomeIcon>}
          onClick={() => {
            setDrawerOpen(true)
          }}
        />
        {isLogin && (
          <Link to={'/create'}>
            <Avatar
              size={64}
              className="mt-5 avatar-wrap"
              icon={<FontAwesomeIcon icon={faPencil} className="pr-1"></FontAwesomeIcon>}
            />
          </Link>
        )}
      </div>
      <Modal
        centered
        open={searchOpen}
        width={1000}
        footer={''}
        onCancel={() => {
          setSearchOpen(false)
        }}
      >
        <div className="f-s-20">
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          <span className="pl-3">Search</span>
        </div>
        <div className="mt-2">
          <Input placeholder="Please enter the key word" />
        </div>
      </Modal>

      {/*音乐播放器抽屉*/}
      <Drawer
        placement="right"
        closable={false}
        onClose={() => {
          setDrawerOpen(false)
        }}
        width={500}
        open={drawerOpen}
      >
        <meting-js
          id="3778678"
          server="netease"
          type="playlist"
          autoplay="true"
          loop="all"
          order="random"
          preload="auto"
          list-folded="ture"
          list-max-height="600px"
          lrc-type="1"
        ></meting-js>
      </Drawer>
    </>
  )
}
export default NavigationLayout
