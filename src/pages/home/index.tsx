import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import NavigationLayout from '@/layouts/navigation-layout/index'
import './index.css'
import { request } from '@/util/request.js'

function Home() {
  const [cardItems, setCardItems] = useState([
    {
      title: 'Lodash',
      imgUrl: 'http://123.207.40.28/card1.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins',
      link: '/content'
    }
  ])

  const cardRef = useRef(null)
  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles-list',
        {},
        (res) => {
          console.log(res)
          setCardItems(res)
        },
        (res) => {
          console.log(res)
        }
      )
      .then()
  }, [])
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const cardElement = cardRef.current
  //     // console.log(cardElement)
  //     if (!cardElement) return
  //     const cardRect = cardElement.getBoundingClientRect()
  //     const scrollTop = window.scrollY
  //     console.log(cardRect.top, scrollTop)
  //     const windowHeight = document.documentElement.clientHeight
  //     console.log(windowHeight)
  //     // 计算卡片一半的高度
  //     const cardHalfHeight = cardRect.height / 2
  //     console.log(cardHalfHeight)
  //     if (cardRect.top - scrollTop < windowHeight - cardHalfHeight && cardRect.bottom > cardHalfHeight) {
  //       // 滚动到卡片一半高度时添加动画效果
  //       // console.log('2112')
  //       cardElement.classList.add('card-visible')
  //     } else {
  //       // 向上滚动或高度小于一半时移除动画效果
  //       cardElement.classList.remove('card-visible')
  //     }
  //   }
  //
  //   // 监听滚动事件
  //   window.addEventListener('scroll', handleScroll)
  //
  //   return () => {
  //     // 移除滚动事件监听
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  return (
    <NavigationLayout>
      <div className="header-content">
        <div className="f-s-32">There is no tomorrow</div>
      </div>
      <div className="main-content">
        <div className="text-center width-100 dream-card">
          <p className="f-s-32 f-w-700">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
            Always In Progress
          </p>
          <p className="f-s-16">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Not Everything that counts can be counted, and not everything that's counted truly counts.
          </p>
        </div>

        <div className="cards-wrap">
          {cardItems.map((items, index) => (
            <Link to={`/content/${items.id}`} key={index}>
              <div key={index} className="card animate__animated animate__bounceIn" ref={cardRef}>
                <div className="card-top">
                  <img src={`http://123.207.40.28/card${items.id}.jpg`} className="card-top-img" alt={'Lodash'}></img>
                  <span className="card-top-title pa-4 f-s-20">{items.title}</span>
                </div>
                <div className="card-middle pa-4">
                  <div className="card-middle-content f-s-16">{items.introduction}</div>
                  <div className="d-flex justify-space-between pt-2">
                    <div>
                      <FontAwesomeIcon icon={faClock} />
                      <span className="pl-2">{items.create_time}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUser} />
                      <span className="pl-2">{items.author}</span>
                    </div>
                  </div>
                </div>
                <hr className="ma-0"></hr>
                <div className="card-footer d-flex align-center px-4">
                  <div className="card-footer-tab px-2 f-s-12">{items.tag}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </NavigationLayout>
  )
}

export default Home
