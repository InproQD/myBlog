import React, { useState } from 'react'
import './index.css'
import { Input, Select, Button } from 'antd'
import { request } from '@/util/request'
import store from '@/redux/store'
const { TextArea } = Input
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

type Props = {
  parentId: number
  articleCommentId?: number
  parentName: string
  type: string
  click?: () => void
  update: () => void
}

const CommentEditor: React.FC<Props> = ({ parentId, articleCommentId, parentName, type, click, update }) => {
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('http://123.207.40.28/avatar1.png')
  const editorType = type

  const handleDelete = () => {
    if (click) {
      click()
    }
  }

  const handleFormSubmit = () => {
    request
      .post(
        'http://123.207.40.28:8083/api/set-comment',
        {
          name: userName,
          content: comment,
          avatar: avatarUrl,
          parentId: parentId || 0,
          articleId: articleCommentId || null,
          respondent: parentName || null
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'success' } })
          update()
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }

  return (
    <div
      className="form-section pa-2"
      style={editorType === 'reply' ? { border: '1px solid grey', borderRadius: 0 } : {}}
    >
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
      <div className="mt-6 d-flex justify-space-between align-center">
        <button className="comment-submit-btn" onClick={handleFormSubmit}>
          Submit
        </button>
        {editorType === 'reply' && (
          <Button type="primary" danger icon={<FontAwesomeIcon icon={faWindowClose} />} onClick={handleDelete} />
        )}
      </div>
    </div>
  )
}
export default CommentEditor
