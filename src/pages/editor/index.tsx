import React, { useEffect, useState } from 'react'
import './index.css'
import MDEditor from '@uiw/react-md-editor'
import { request } from '@/util/request'
import { useParams } from 'react-router-dom'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Editor = () => {
  const [value, setValue] = useState('')
  const { id } = useParams()
  useEffect(() => {
    request
      .get(
        'http://127.0.0.1:8083/api/get-articles',
        { id: id },
        (res: any) => {
          setValue(res.list[0].content)
        },
        (res: any) => {
          console.log(res)
        }
      )
      .then()
  }, [])
  return (
    <div className="container">
      <div className="editor-wrap">
        <MDEditor value={value} onChange={setValue} height={700} highlightEnable={true} />
      </div>
      <div className="btn-wrap mt-5">
        <button className="back-button">
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  )
}
export default Editor
