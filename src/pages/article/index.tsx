import React, { useEffect, useState, useRef } from 'react'
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
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileText } from '@fortawesome/free-solid-svg-icons'
import ArticleCard from '@/component/articleCards'
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
  const [catalogue, setCatalogue] = useState([])
  const editDisplay = useSelector((state: any) => state.auth.administratorRight)
  const { id } = useParams()
  const [achieveTop, setIsAchieveTop] = useState(false)
  const catalogRef = useRef(null)
  const [preArticle, setPreArticle] = useState({
    id: '',
    title: '',
    content: '',
    create_time: '',
    author: '',
    tag: '',
    introduction: ''
  })
  const [nextArticle, setNextArticle] = useState({
    id: '',
    title: '',
    content: '',
    create_time: '',
    author: '',
    tag: '',
    introduction: ''
  })
  useEffect(() => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-articles',
        { id: id },
        (res: any) => {
          setMarkdown(res.list[0].content)
          store.dispatch({
            type: 'SET_EDITOR_CONTENT',
            value: res.list[0]
          })
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
    request
      .get(
        'http://127.0.0.1:8083/api/get-pre-articles',
        { id: id },
        (res: any) => {
          setPreArticle(res.list[0])
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
    request
      .get(
        'http://127.0.0.1:8083/api/get-next-articles',
        { id: id },
        (res: any) => {
          setNextArticle(res.list[0])
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }, [id])

  const markdownToHtml = marked(markdown)

  useEffect(() => {
    const md = setTimeout(() => {
      const articleElement = document.getElementById('article')
      if (articleElement) {
        articleElement.innerHTML = markdownToHtml
        handleCatalogArray(articleElement)
      }
    }, 1000)
    return () => {
      clearTimeout(md)
    }
  }, [markdown])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const top = scrollTop >= 330
      setIsAchieveTop(top)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 获取目录内容
  const handleCatalogArray = (element) => {
    const titleArray = element.querySelectorAll('h1, h2, h3')
    const catalogueArray = []

    let level = titleArray[0].tagName.charAt(1)
    Array.from(titleArray).forEach((i) => {
      const realLevel = parseInt(i.tagName.charAt(1))
      if (level >= realLevel) {
        level = realLevel
        catalogueArray.push({ text: i.textContent, childList: [] })
      } else if (level < realLevel) {
        catalogueArray[catalogueArray.length - 1].childList.push({ text: i.textContent, childList: [] })
      }
    })
    setCatalogue(catalogueArray)
  }
  // 店里目录跳转
  const handleListEvent = (text) => {
    const elements = Array.from(document.getElementById('article').querySelectorAll('h1, h2, h3')).filter((element) =>
      element.innerText?.includes(text)
    )

    if (elements.length > 0) {
      // 获取第一个匹配的元素
      const targetElement = elements[0]

      // 将页面滚动到目标元素所在位置，并添加偏移量
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <NavigationLayout>
      <div
        className="header"
        style={{
          backgroundImage: `url('http://123.207.40.28/card${id}.jpg')`
        }}
      ></div>
      <div className="row">
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
        <div className="footer-card">
          <ArticleCard propsInfo={preArticle}></ArticleCard>
          <ArticleCard propsInfo={nextArticle}></ArticleCard>
        </div>
        <div className={`catalog ${achieveTop ? 'catalog-after' : 'catalog-before'}`} ref={catalogRef}>
          <div className="f-s-20 f-w-700">
            <FontAwesomeIcon icon={faFileText} className="pr-3"></FontAwesomeIcon>
            目录
          </div>
          <ol className="catalog-list">
            {catalogue.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => {
                    handleListEvent(item.text)
                  }}
                >
                  {item.text}
                </a>
                {(
                  <ul style={{ listStyle: 'none' }}>
                    {item.childList.map((childItem, childIndex) => (
                      <li key={childIndex}>
                        <a
                          onClick={() => {
                            handleListEvent(childItem.text)
                          }}
                        >
                          {childItem.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) || <div></div>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </NavigationLayout>
  )
}
export default ArticlePage
