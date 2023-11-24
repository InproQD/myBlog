import React, { useEffect, useState } from 'react'
import './index.css'
import MDEditor from '@uiw/react-md-editor'
import { request } from '@/util/request'
import { useParams } from 'react-router-dom'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import { Tool } from '@/util/tool'

const Editor = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    tag: ''
  })
  const [content, setContent] = useState('')

  const article = useSelector((state: any) => state.article.articleObject)
  useEffect(() => {
    if (Tool.isNotEmpty(article)) {
      setFormData(article)
      setContent(article.content)
    }
  }, [])

  const { id } = useParams()
  const refreshData = () => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles',
        { id: id },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: 'refresh success', type: 'success' } })
          setFormData(res.list[0])
          setContent(res.list[0].content)
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }
  const handleSubmit = () => {
    const input = { ...formData, content: content }
    request
      .post(
        'http://123.207.40.28:8083/api/modify-article',
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
    <div className="editor-container">
      <div className="editor-wrap">
        <div className="top-panel">
          <button className="back-button" onClick={refreshData}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
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
