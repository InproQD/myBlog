import React, { MouseEventHandler } from 'react'
import './index.css'
interface SubmitBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}
const submitBtn: React.FC<SubmitBtnProps> = ({ onClick }) => {
  return (
    <button className="submit-btn" onClick={onClick}>
      Submit
    </button>
  )
}
export default submitBtn
