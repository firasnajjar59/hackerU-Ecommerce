/** @format */

import PopUp from 'components/common/PopUp/PopUp';
import './registerPopup.scss';
import React, { useEffect, useState } from 'react';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import updateInputs from 'functions/updateInputs';
import axios from 'axios';
import validate from 'validations/validate';
import registerSchema from 'validations/registerSchema';
import Error from 'components/common/Errors/Error';

const RegisterPopup = props => {
  document.title = `Register | ofwood`;
  const [loaded, setLoaded] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
    birthday: '',
  });
  const [serverError, setServerError] = useState("")
  const [error, setError] = useState({
    email: [],
    password: [],
    name: [],
    userName: [],
    passwordConfirm: [],
    phone: [],
    address: [],
    birthday: [],
  });
  const handleInputs = ev => updateInputs(ev, setInputs);
  const handleRegister = async () => {
    try {
      const {error}=validate(inputs,registerSchema)
      if(error)  throw(error) 
      let { data } = await axios.post('/v1/users/auth/signup', inputs);
      localStorage.setItem('token', data.data.token);
    } catch (error) {
      if(error.error&&error.error.name=="ValidationError"){
        console.log(error);
        setServerError("Please check the User fields")
      }else{
        console.log(error);
        setServerError(error.response.data.message)
      }
    }
  };
   // 
   useEffect(()=>{
    setLoaded(true)
  },[])
  useEffect(()=>{
    if(loaded){
      const {error}=validate(inputs,registerSchema)
           setServerError("")
          setError(prev=>{
            prev[document.activeElement.dataset.label]=[]
            if(error){
              for (let err of error.details){
                if(err.path[0]==document.activeElement.dataset.label){
                  prev[document.activeElement.dataset.label].push(err.message)
                }
              }

            }
            return{
              ...prev
            }
          })
    }
  },[inputs])
  return (
    <PopUp
      classes={`gap-2 ${props.classes}`}
      popupClasses='register-popup'>
      <MaterialIcon
        classes='d-flex justify-content-center fs-1 icon-color-register-popup'
        title='app_registration'
      />
        {serverError.length>0&&<Error>{serverError}</Error>}
      <Input
        classes='p-1'
        type='text'
        placeholder='Full Name'
        datalabel='name'
        value={inputs.name}
        onchange={handleInputs}
      />
            {error.name.length>0&&<Error>{error.name[0]}</Error>}
      <Input
        classes='p-1'
        type='text'
        placeholder='User Name'
        datalabel='userName'
        value={inputs.userName}
        onchange={handleInputs}
        />
        {error.userName.length>0&&<Error>{error.userName[0]}</Error>}
      <Input
        classes='p-1'
        type='email'
        placeholder='E-mail'
        datalabel='email'
        value={inputs.email}
        onchange={handleInputs}
        />
        {error.email.length>0&&<Error>{error.email[0]}</Error>}
      <Input
        classes='p-1'
        type='password'
        placeholder='Password'
        datalabel='password'
        value={inputs.password}
        onchange={handleInputs}
        />
        {error.password.length>0&&<Error>{error.password[0]}</Error>}
      <Input
        classes='p-1'
        type='password'
        placeholder='Confirm Password'
        datalabel='passwordConfirm'
        value={inputs.passwordConfirm}
        onchange={handleInputs}
        />
        {error.passwordConfirm.length>0&&<Error>{error.passwordConfirm[0]}</Error>}
      <Input
        classes='p-1'
        type='text'
        placeholder='Phone Number'
        datalabel='phone'
        value={inputs.phone}
        onchange={handleInputs}
        />
        {error.phone.length>0&&<Error>{error.phone[0]}</Error>}
      <Input
        classes='p-1'
        type='text'
        placeholder='Address'
        datalabel='address'
        value={inputs.address}
        onchange={handleInputs}
        />
        {error.address.length>0&&<Error>{error.address[0]}</Error>}
      <Input
        classes='p-1'
        type='date'
        datalabel='birthday'
        value={inputs.birthday}
        onchange={handleInputs}
        />
        {error.birthday.length>0&&<Error>{error.birthday[0]}</Error>}
      <Button
        onclick={handleRegister}
        classes='primary-button register-button'>
        Register
      </Button>
    </PopUp>
  );
};

export default RegisterPopup;
