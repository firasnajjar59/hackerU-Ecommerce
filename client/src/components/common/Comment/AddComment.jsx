import { useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import './comment.scss'
import React, { useEffect, useState } from 'react'
import updateInputs from 'functions/updateInputs'
import { useSelector } from 'react-redux'
import axios from 'axios'

const AddComment = (props) => {
const user=useSelector(state=>state.loggedUser.user)
const {id:productId}=useLocation().state
const [inputs,setInputs]=useState({
  reviewValue:"",
  productId:productId,
  user_id:""
})
useEffect(()=>{
  if(user?.id){
    setInputs(prev=>{
      prev.user_id=user?.id
      return {...prev}
    })
  }
},[user])

const handleSendComment=async ()=>{
    try {
      let {data:res}=await axios.post("/v1/reviews",inputs)
      let {data:reviews}=await axios.get(`/v1/products/product/${props.id}/reviews`)
      props.onAddReview(reviews.doc)
      setInputs(prev=>{
        prev.reviewValue=""
        return {...prev}
      })
      
      console.log(reviews);
    } catch (error) {
      console.log(error);
    }

}
const handleInputs=(ev)=>updateInputs(ev,setInputs)
  return (
    <div className='comment'>
          <div className='comment-img'>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/images/users/${user?.userImg||`default.jpg`}`}
              alt=''
            />
          </div>
          <div className='comment-add'>
            <p className='commet-user-name'>{user?.userName||`Guest`}</p>
            <div className="comment-add-inp-btn">
              <textarea value={inputs.reviewValue} onChange={handleInputs} data-label="reviewValue" placeholder='Add comment' className="comment-textarea" />
              <div className="btn-wrapper">
              <Button onclick={handleSendComment} classes="primary-button">Send</Button>
              </div>
            </div>
          </div>
          
        </div>
  )
}

export default AddComment