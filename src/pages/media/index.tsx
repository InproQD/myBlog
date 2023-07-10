import React from 'react'
import NavigationLayout from '@/layouts/navigation-layout'
import './index.css'

const MediaPage = () => {
  return (
    <NavigationLayout>
      <div className="header-wrap"></div>
      <div className="content-wrap">
        <p className="f-s-32 f-w-700">Follow your own pace</p>
        <iframe
          style={{ width: '900px', height: '500px' }}
          src="//player.bilibili.com/player.html?aid=668862997&bvid=BV1pa4y1a73j&cid=212249869&page=1"
          scrolling="no"
          border="0"
          frameBorder="no"
          allowfullscreen="true"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        ></iframe>
      </div>
    </NavigationLayout>
  )
}
export default MediaPage
