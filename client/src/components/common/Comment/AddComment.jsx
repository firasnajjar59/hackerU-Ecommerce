import Button from '../Button/Button'
import './comment.scss'
import React from 'react'

const AddComment = (props) => {
  return (
    <div className='comment'>
          <div className='comment-img'>
            <img
              src='../../../../assets/logo/OriginalonTransparent.png'
              alt=''
            />
          </div>
          <div className='comment-add'>
            <p className='commet-user-name'>Firas Najjar</p>
            <div className="comment-add-inp-btn">
              <textarea placeholder='Add comment' className="comment-textarea" />
              <div className="btn-wrapper">
              <Button classes="primary-button">Send</Button>
              </div>
            </div>
          </div>
          
        </div>
  )
}

export default AddComment