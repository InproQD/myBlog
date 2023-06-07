import React, { useState } from 'react'
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
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    },
    {
      title: 'Lodash',
      content:
        'lodash是一个JS库，一个让javascript使用起来更简单的工具，它可以对Number, String, Object, Array等进行简单或复杂的操作，减少代码量',
      createAt: '2023-02-34',
      author: 'Peter Q',
      tab: 'JS Plugins'
    }
  ])
  return (
    <NavigationLayout>
      <div className="header-content"></div>
      <div className="main-content">
        <Card className="text-center width-100" title={'Always In Progress'} bordered={false}>
          Not Everything that can be counted counts, and not everything that counts can be counted.
        </Card>

        <div className="cards-wrap">
          {cardItems.map((items, index) => (
            <div key={index} className="card mr-2">
              <div className="card-top">
                <img src={'../../../public/card4.jpg'} className="card-top-img" alt={'Lodash'}></img>
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
