import React, { useEffect, useState } from 'react'
import './index.css'
import NavigationLayout from '@/layouts/navigation-layout/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { Input, Select } from 'antd'
import { request } from '@/util/request'
import store from '@/redux/store'
const { TextArea } = Input

const CommentPage = () => {
  const [comments, setComments] = useState([] as any)
  const [subComments, setSubComments] = useState([] as any)
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('http://123.207.40.28/avatar1.png')

  useEffect(() => {
    listComments()
  }, [])

  const listComments = () => {
    request
      .get(
        'http://127.0.0.1:8083/api/get-comment-list',
        null,
        (res: any) => {
          setComments(res.list.filter((i) => i.parentId === 0))
          setSubComments([...res.list.filter((i) => i.parentId !== 0)])
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }

  const handleFormSubmit = () => {
    request
      .post(
        'http://127.0.0.1:8083/api/set-comment',
        { name: userName, content: comment, avatar: avatarUrl, parentId: 0 },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'success' } })
          listComments()
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }

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
        <div className="f-s-20">
          <FontAwesomeIcon icon={faComment} className="mr-3"></FontAwesomeIcon>
          <span className="f-w-700">评论区</span>
        </div>
        <div className="form-section pa-2">
          <div className="base-info mb-2">
            <Input
              placeholder="name"
              size={'large'}
              value={userName}
              style={{ width: '45%' }}
              onChange={(res) => {
                setUserName(res.target.value)
              }}
            />
            <Input type="email" placeholder="email" size={'large'} style={{ width: '45%' }} />
          </div>
          <div className="d-flex align-center">
            <div className="ml-2 mr-3">Avatar:</div>
            <Select
              placeholder="avatar"
              defaultValue="lucy"
              size={'large'}
              style={{ width: 200 }}
              options={
                [
                  {
                    value: 'http://123.207.40.28/avatar1.png',
                    label: 'Lucy'
                  },
                  { value: 'http://123.207.40.28/avatar2.png', label: 'Andy' },
                  {
                    value: 'http://123.207.40.28/avatar3.png',
                    label: 'Tom'
                  },
                  { value: 'http://123.207.40.28/avatar5.png', label: 'Atom' }
                ] as any
              }
              onChange={(res) => {
                setAvatarUrl(res)
              }}
            />
            <img className="each-comment-avatar ml-3" src={avatarUrl} alt={'avatar'}></img>
          </div>
          <TextArea
            showCount
            maxLength={100}
            value={comment}
            onChange={(res) => {
              setComment(res.target.value)
            }}
            placeholder="input your comment here"
            style={{ height: 150, resize: 'none' }}
            className="mt-4"
          />
          <div className="mt-4 d-flex">
            <button className="comment-submit-btn" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="list-comment">
        <div className="f-s-20">
          {comments.length} <span className="f-w-700">评论</span>
        </div>
        <div className="mt-3">
          {comments.map((item, index) => (
            <div key={index} className="each-comment-wrap">
              <img className="each-comment-avatar" alt="avatar" src={item.avatar_url} />
              <div className="each-comment-content ml-3">
                <div>
                  <span className="text-green f-w-700 f-s-16">{item.name}</span>
                </div>
                <div className="d-flex justify-space-between">
                  <span className="f-s-12 mt-1">{item.time}</span>
                  <span className="f-s-14 text-red" style={{ cursor: 'pointer' }}>
                    回复
                  </span>
                </div>
                <div className="py-4">{item.comment_content}</div>
                {[...subComments.filter((i) => i.parentId === item.id)].map((subItem, subIndex) => (
                  <div key={subIndex} className="each-comment-wrap py-3 pl-2 border-wrap">
                    <img className="each-comment-sub-avatar mt-1" alt="avatar" src={subItem.avatar_url} />
                    <div className="each-comment-sub-content ml-3">
                      <div>
                        <span className="text-green f-w-700 f-s-14">{subItem.name}</span>
                      </div>
                      <div className="d-flex justify-space-between">
                        <span className="f-s-10 mt-1">{subItem.time}</span>
                        <span className="f-s-14 text-red" style={{ cursor: 'pointer' }}>
                          回复
                        </span>
                      </div>
                      <div className="py-4">
                        回复 @<span className="text-green">{subItem.respondent}</span>: {subItem.comment_content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </NavigationLayout>
  )
}
export default CommentPage
