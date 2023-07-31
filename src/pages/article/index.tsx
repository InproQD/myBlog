import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
// import axios from 'axios'
import NavigationLayout from '@/layouts/navigation-layout'
import './index.css'
import './markdown.css'

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

  // 通过fetch来获取项目下的md文件
  useEffect(() => {
    fetch('../../../public/source/MomentJS.md')
      .then((response) => response.text())
      .then((data) => setMarkdown(data))
      .catch((error) => console.log(error))
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
      <div className="content-panel" id="article"></div>
    </NavigationLayout>
  )
}
export default ArticlePage
