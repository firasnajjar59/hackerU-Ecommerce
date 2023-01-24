import { useHistory } from 'react-router-dom'
import './comment.scss'
import React, { useEffect, useState } from 'react'
import updateInputs from 'functions/updateInputs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useOfwoodErrorhandler from '../Errors/errorhandler'
import Button from '../Button/Button'

const AddComment = (props) => {
  const history=useHistory()
  const loggedIn=useSelector(state=>state.loggedIn.loggedIn)
const ofwoodErrorhandler=useOfwoodErrorhandler()
const user=useSelector(state=>state.loggedUser.user)
const {id:productId}=props.id
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
      if(inputs.reviewValue.length==0)throw ({message:"empty review"})
      await axios.post("/v1/reviews",inputs)
      let {data:reviews}=await axios.get(`/v1/products/product/${props.id}/reviews`)
      props.onAddReview(reviews.doc)
      setInputs(prev=>{
        prev.reviewValue=""
        return {...prev}
      })
    } catch (error) {
      if(error.message=="empty review"){
        ofwoodErrorhandler(error)
      }else{
        ofwoodErrorhandler(error.response.data)
      }
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
            {loggedIn?<div className="comment-add-inp-btn">
              <textarea value={inputs.reviewValue} onChange={handleInputs} data-label="reviewValue" placeholder='Add comment' className="comment-textarea" />
              <div className="btn-wrapper">
              <Button onclick={handleSendComment} classes="primary-button">Send</Button>
              </div>
            </div>:<div className='d-flex align-items-center gap-1 justify-content-center flex-column'>
              <p>To leave comment please login</p>
              <Button classes="primary-button w-auto" onclick={()=>{history.push("/signin")}}>Login</Button>
              </div>}
          </div>
          
        </div>
  )
}

export default AddComment