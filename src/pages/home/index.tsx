import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import NavigationLayout from '@/layouts/navigation-layout/index'
import './index.css'
import { request } from '@/util/request'
import Typed from 'typed.js'
import store from '@/redux/store'

function Home() {
  const [cardItems, setCardItems] = useState([
    {
      id: '',
      title: '',
      content: '',
      create_time: '',
      author: '',
      tag: '',
      introduction: ''
    }
  ])

  const cardRef = useRef(null)
  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles-list',
        {},
        (res: any) => {
          setCardItems(res)
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }, [])

  const typeText = React.useRef(null)
  React.useEffect(() => {
    const typed = new Typed(typeText.current, {
      strings: ["Not Everything that counts can be counted, and not everything that's counted truly counts."],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 500,
      startDelay: 1000,
      loop: true
    })

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy()
    }
  }, [])

  return (
    <NavigationLayout>
      <div
        className="header-content"
        style={{
          backgroundImage: `url('http://123.207.40.28/banner${Number(
            new Date().getDate().toString().slice(1, 2)
          )}.jpg')`
        }}
      >
        <div className="f-s-32">There is no tomorrow</div>
        <div>
          <span className="f-s-16" ref={typeText}></span>
        </div>
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
              <div key={index} className="card" ref={cardRef}>
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
