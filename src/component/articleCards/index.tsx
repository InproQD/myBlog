import React from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faDotCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
const ArticleCard = (props) => {
  ArticleCard.propTypes = {
    propsInfo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      create_time: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      introduction: PropTypes.string.isRequired
    }).isRequired
  }
  const { id } = useParams()
  const { propsInfo } = props

  return (
    <Link to={`/content/${propsInfo.id}`}>
      <div className="link-card">
        {(Number(id) > Number(propsInfo.id) && (
          <div className="top-left">
            <FontAwesomeIcon icon={faAngleLeft} />
            上一篇
          </div>
        )) || <></>}
        {(id < propsInfo.id && (
          <div className="top-right">
            <FontAwesomeIcon icon={faAngleRight} />
            下一篇
          </div>
        )) || <></>}
        {(id == propsInfo.id && (
          <div className={id == 1 ? 'top-left' : 'top-right'}>
            <FontAwesomeIcon icon={faDotCircle} /> 本篇
          </div>
        )) || <></>}
        <div className="link-card-top">
          <img src={`http://123.207.40.28/card${propsInfo.id}.jpg`} className="link-card-top-img" alt={'Lodash'}></img>
          <span className="link-card-top-title pa-4 f-s-20">{propsInfo.title}</span>
        </div>
        <div className="link-card-middle px-3 py-2">
          <div className="d-flex justify-space-between pt-2">
            <div>
              <FontAwesomeIcon icon={faClock} />
              <span className="pl-2">{propsInfo.create_time}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUser} />
              <span className="pl-2">{propsInfo.author}</span>
            </div>
          </div>
        </div>
        <hr className="ma-0"></hr>
        <div className="link-card-footer d-flex align-center px-4 py-1">
          <div className="link-card-footer-tab px-2 f-s-12">{propsInfo.tag}</div>
        </div>
      </div>
    </Link>
  )
}
export default ArticleCard
