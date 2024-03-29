import React, { useEffect, useState } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { request } from '@/util/request'
import store from '@/redux/store'
import CommentEditor from '@/component/comment-editor'
type Props = {
  articleId?: number
}
const CommentSection: React.FC<Props> = ({ articleId }) => {
  const articleCommentId = articleId
  const [comments, setComments] = useState([] as any)
  const [subComments, setSubComments] = useState([] as any)
  useEffect(() => {
    listComments()
  }, [])

  const listComments = () => {
    request
      .get(
        'http://123.207.40.28:8083/api/get-comment-list',
        null,
        (res: any) => {
          res.list.forEach((i: any) => {
            i.editorDisplay = false
          })
          if (articleCommentId) {
            setComments(res.list.filter((i: any) => i.parentId === 0 && i.articleId === articleCommentId))
            setSubComments([...res.list.filter((i: any) => i.parentId !== 0 && i.articleId === articleCommentId)])
          } else {
            setComments(res.list.filter((i: any) => i.parentId === 0 && !i.articleId))
            setSubComments([...res.list.filter((i: any) => i.parentId !== 0 && !i.articleId)])
          }
        },
        (res: any) => {
          store.dispatch({ type: 'SET_MESSAGE', value: { msg: res.msg, type: 'error' } })
        }
      )
      .then()
  }

  const handleParentReply = (id: number) => {
    setComments((preComment: any) =>
      preComment.map((item: any) =>
        item.id === id ? { ...item, editorDisplay: true } : { ...item, editorDisplay: false }
      )
    )
    setSubComments((preComment: any) => preComment.map((item: any) => ({ ...item, editorDisplay: false })))
  }
  const handleSubReply = (id: number) => {
    setSubComments((preComment: any) =>
      preComment.map((item: any) =>
        item.id === id ? { ...item, editorDisplay: true } : { ...item, editorDisplay: false }
      )
    )
    setComments((preComment: any) => preComment.map((item: any) => ({ ...item, editorDisplay: false })))
  }

  const handleSubDelete = (type: string) => {
    if (type === 'sub') {
      setSubComments((preComment: any) => preComment.map((item: any) => ({ ...item, editorDisplay: false })))
    } else {
      setComments((preComment: any) => preComment.map((item: any) => ({ ...item, editorDisplay: false })))
    }
  }
  return (
    <div>
      <div className="f-s-20">
        <FontAwesomeIcon icon={faComment} className="mr-3"></FontAwesomeIcon>
        <span className="f-w-700">评论区</span>
      </div>
      <CommentEditor
        type={'comment'}
        parentId={0}
        parentName={''}
        update={listComments}
        articleCommentId={Number(articleCommentId)}
      />

      <div className="f-s-20 f-w-700 my-5">
        {comments.length} <span className="f-w-700">评论</span>
      </div>
      <div className="mt-3">
        {comments.map((item: any, index: number) => (
          <div key={index} className="each-comment-wrap">
            <img className="each-comment-avatar" alt="avatar" src={item.avatar_url} />
            <div className="each-comment-content ml-3">
              <div>
                <span className="text-green f-w-700 f-s-16">{item.name}</span>
              </div>
              <div className="d-flex justify-space-between">
                <span className="f-s-12 mt-1">{item.time}</span>
                <span
                  className="f-s-14 text-red"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleParentReply(item.id)
                  }}
                >
                  回复
                </span>
              </div>
              <div className="py-4">{item.comment_content}</div>
              {item.editorDisplay && (
                <CommentEditor
                  type={'reply'}
                  parentId={item.id}
                  parentName={item.name}
                  update={listComments}
                  articleCommentId={Number(articleCommentId)}
                  click={() => {
                    handleSubDelete('parent')
                  }}
                />
              )}
              {[...subComments.filter((i: any) => i.parentId === item.id)].map((subItem: any, subIndex: number) => (
                <div key={subIndex} className="each-comment-wrap py-3 pl-2 border-wrap">
                  <img className="each-comment-sub-avatar mt-1" alt="avatar" src={subItem.avatar_url} />
                  <div className="each-comment-sub-content ml-3">
                    <div>
                      <span className="text-green f-w-700 f-s-14">{subItem.name}</span>
                    </div>
                    <div className="d-flex justify-space-between">
                      <span className="f-s-10 mt-1">{subItem.time}</span>
                      <span
                        className="f-s-14 text-red"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleSubReply(subItem.id)
                        }}
                      >
                        回复
                      </span>
                    </div>
                    <div className="py-4">
                      回复 @<span className="text-green">{subItem.respondent}</span>: {subItem.comment_content}
                    </div>
                    {subItem.editorDisplay && (
                      <CommentEditor
                        type={'reply'}
                        parentId={item.id}
                        parentName={subItem.name}
                        update={listComments}
                        click={() => {
                          handleSubDelete('sub')
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CommentSection
