import React, { useEffect, useState } from 'react'
import './index.css'
import MDEditor from '@uiw/react-md-editor'
import { request } from '@/util/request'
import { useParams } from 'react-router-dom'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import store from '@/redux/store'

const Editor = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    tag: ''
  })
  const [content, setContent] = useState('')
  const { id } = useParams()

  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles',
        { id: id },
        (res: any) => {
          setFormData(res.list[0])
          setContent(res.list[0].content)
        },
        (res: any) => {
          console.log(res)
        }
      )
      .then()
  }, [])
  const handleSubmit = () => {
    const input = { ...formData, content: content }
    request
      .post(
        'http://123.207.40.28:8083/api/modify-article',
        input,
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: res })
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: res })
        }
      )
      .then()
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className="container">
      <div className="editor-wrap">
        <div className="top-panel">
          <button className="back-button">
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
