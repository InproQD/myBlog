import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { request } from '@/util/request'
import 'highlight.js/styles/monokai-sublime.css'
// import axios from 'axios'
import NavigationLayout from '@/layouts/navigation-layout'
import './index.css'
import './markdown.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

// 配合highlight实现代码高亮
const renderer = new marked.Renderer()

const options: any = {
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code: any) {
    return hljs.highlightAuto(code).value
  }
}

marked.setOptions(options)

const ArticlePage = () => {
  const [markdown, setMarkdown] = useState('')
  const [editDisplay, setEditDisplay] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles', //todo
        { id: id },
        (res: any) => {
          setMarkdown(res.list[0].content)
          setEditDisplay(res.editRight)
        },
        (res: any) => {
          console.log(res)
        }
      )
      .then()
  }, [])

  const markdownToHtml = marked(markdown)

  useEffect(() => {
    const md = setTimeout(() => {
      const articleElement = document.getElementById('article')
      if (articleElement) {
        articleElement.innerHTML = markdownToHtml
      }
    }, 1000)
    return () => {
      clearTimeout(md)
    }
  }, [markdown])

  return (
    <NavigationLayout>
      <div className="header"></div>
      <div className="content-panel">
        {editDisplay && (
          <div className="function-panel">
            <Link to={`/edit/${id}`}>
              <span className="edit">Edit</span>
            </Link>
          </div>
        )}
        <div id="article"></div>
      </div>
    </NavigationLayout>
  )
}
export default ArticlePage
