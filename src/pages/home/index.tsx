import React, { useState, useRef } from 'react'
import './index.css'
import NavigationLayout from '@/layouts/navigation-layout/index'
import { Card } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

function Home() {
  const [cardItems] = useState([
    {
      title: 'Lodash',
      imgUrl: '../../../public/card2.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card1.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card4.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card3.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card2.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card1.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card4.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      imgUrl: '../../../public/card3.jpg',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    }
  ])

  const cardRef = useRef(null)

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
      <div className="header-content"></div>
      <div className="main-content">
        <Card className="text-center width-100" title={'Always In Progress'} bordered={false}>
          Not Everything that can be counted counts, and not everything that counts can be counted.
        </Card>

        <div className="cards-wrap">
          {cardItems.map((items, index) => (
            <div key={index} className="card" ref={cardRef}>
              <div className="card-top">
                <img src={items.imgUrl} className="card-top-img" alt={'Lodash'}></img>
                <span className="card-top-title pa-4 f-s-20">{items.title}</span>
              </div>
              <div className="card-middle pa-4">
                <div className="card-middle-content f-s-16">{items.content}</div>
                <div className="d-flex justify-space-between pt-2">
                  <div>
                    <FontAwesomeIcon icon={faClock} />
                    <span className="pl-2">{items.createAt}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="pl-2">{items.author}</span>
                  </div>
                </div>
              </div>
              <hr className="ma-0"></hr>
              <div className="card-footer d-flex align-center px-4">
                <div className="card-footer-tab px-2 f-s-12">{items.tab}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NavigationLayout>
  )
}
export default Home
