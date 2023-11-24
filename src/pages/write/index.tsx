import React, { useState } from 'react'
import './index.css'
import MDEditor from '@uiw/react-md-editor'
import { request } from '@/util/request'
import store from '@/redux/store'
import BackBtn from '@/component/buttons/backBtn'
import { Link } from 'react-router-dom'

const Editor = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    tag: ''
  })
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    const input = { ...formData, content: content }
    request
      .post(
        'http://123.207.40.28:8083/api/add-article',
        input,
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'success' } })
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className="container">
      <div className="editor-wrap">
        <div className="top-panel">
          <Link to={'/home'}>
            <BackBtn></BackBtn>
          </Link>
          <input
            placeholder="Enter your title"
            className="input"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            placeholder="Enter your tag"
            className="input"
            name="tag"
            type="text"
            value={formData.tag}
            onChange={handleInputChange}
          />
          <input
            placeholder="Enter your name"
            className="input"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleInputChange}
          />

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <MDEditor
          value={content}
          onChange={(val: any) => {
            setContent(val)
          }}
          height={700}
          highlightEnable={true}
          data-color-mode={'dark'}
        />
      </div>
    </div>
  )
}
export default Editor
