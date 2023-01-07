import PopUp from 'components/common/PopUp/PopUp'
import './registerPopup.scss'

import React, { useState } from 'react'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button'
import updateInputs from 'functions/updateInputs'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setHidden } from 'store/popupHandler'

const RegisterPopup = (props) => {
  const dispatch=useDispatch()
  const [inputs,setInputs]=useState({
    name:"",
    userName:"",
email:"",
password:"",
passwordConfirm:"",
phone:"",
address:"",
birthday:"",
  })
  const handleInputs=(ev)=>updateInputs(ev,setInputs)
  const handleRegister=async()=>{
    try {
      let {data}=await axios.post("/v1/users/auth/signup",inputs)
      localStorage.setItem("token",data.data.token)
      dispatch(setHidden("registerHidden"))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PopUp
    onclick={props.onclick}
    classes={`gap-3 ${props.classes}`}
    popupClasses='register-popup'>
    <MaterialIcon
      classes='d-flex justify-content-center fs-1 icon-color-register-popup'
      title='app_registration'
    />
    <Input
      classes='p-1'
      type='text'
      placeholder='Full Name'
      datalabel="name"
      value={inputs.name}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='text'
      placeholder='User Name'
      datalabel="userName"
      value={inputs.userName}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='email'
      placeholder='E-mail'
      datalabel="email"
      value={inputs.email}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='password'
      placeholder='Password'
      datalabel="password"
      value={inputs.password}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='password'
      placeholder='Confirm Password'
      datalabel="passwordConfirm"
      value={inputs.passwordConfirm}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='text'
      placeholder='Phone Number'
      datalabel="phone"
      value={inputs.phone}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='text'
      placeholder='Address'
      datalabel="address"
      value={inputs.address}
      onchange={handleInputs}
      />
    <Input
      classes='p-1'
      type='text'
      placeholder='Birthday'
      datalabel="birthday"
      value={inputs.birthday}
      onchange={handleInputs}
      />
    <Button onclick={handleRegister} classes='primary-button register-button'>Login in</Button>
  </PopUp>
  )
}

export default RegisterPopup