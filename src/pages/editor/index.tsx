import React, { useEffect, useState } from 'react'
import './index.css'
import MDEditor from '@uiw/react-md-editor'
import { request } from '@/util/request'
import { useParams } from 'react-router-dom'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Editor = () => {
  const [value, setValue] = useState({
    author: '',
    title: '',
    content: '',
    tag: ''
  })
  const { id } = useParams()
  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles', //todo
        { id: id },
        (res: any) => {
          setValue(res.list[0])
        },
        (res: any) => {
          console.log(res)
        }
      )
      .then()
  }, [])
  const handleSubmit = () => {
    request
      .post(
        'http://123.207.40.28:8083/api/modify-article', //todo
        value,
        (res: any) => {
          console.log(res)
        },
        (res: any) => {
          console.log(res)
        }
      )
      .then()
  }
  return (
    <div className="container">
      <div className="editor-wrap">
        <div className="top-panel">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
          <input placeholder="Enter your title" className="input" name="text" type="text" value={value.title} />
          <input placeholder="Enter your tag" className="input" name="text" type="text" value={value.tag} />
          <input placeholder="Enter your name" className="input" name="text" type="text" value={value.author} />

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <MDEditor
          value={value.content}
          onChange={(val: string) => {
            const newValue = { ...value, content: val }
            setValue(newValue)
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
