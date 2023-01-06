import PopUp from 'components/common/PopUp/PopUp'
import './registerPopup.scss'

import React from 'react'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button'

const RegisterPopup = (props) => {
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
    />
    <Input
      classes='p-1'
      type='email'
      placeholder='E-mail'
    />
    <Input
      classes='p-1'
      type='password'
      placeholder='Password'
    />
    <Input
      classes='p-1'
      type='password'
      placeholder='Confirm Password'
    />
    <Input
      classes='p-1'
      type='text'
      placeholder='Phone Number'
    />
    <Input
      classes='p-1'
      type='text'
      placeholder='Address'
    />
    <Input
      classes='p-1'
      type='text'
      placeholder='Birthday'
    />
    <Button classes='primary-button'>Login in</Button>
  </PopUp>
  )
}

export default RegisterPopup