import React from 'react'
import './index.css'
import NavigationLayout from '@/layouts/navigation-layout/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import CommentSection from '@/component/comment-section'

const CommentPage = () => {
  return (
    <NavigationLayout>
      <div className="top-background"></div>
      <div className="hot-comment-tab">
        <div className="f-s-32">
          <FontAwesomeIcon icon={faComment} className="mr-4"></FontAwesomeIcon>
          <span className="f-w-700">留言板</span>
        </div>
        <div className="hot-comment">
          <div className="hot-comment-top-left"></div>
          <div className="hot-comment-top-right"></div>
          <div className="hot-comment-title">热评</div>
          <div className="f-s-20 py-4">趁着年轻，勇敢试错。 ---- 【小h同学】</div>
        </div>
      </div>
      <div className="edit-comment">
        <CommentSection></CommentSection>
      </div>
    </NavigationLayout>
  )
}
export default CommentPage
