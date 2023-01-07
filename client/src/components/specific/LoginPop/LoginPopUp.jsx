/** @format */
import axios from 'axios';
import './loginPopup.scss'
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PopUp from 'components/common/PopUp/PopUp';
import updateInputs from 'functions/updateInputs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHidden } from 'store/popupHandler';
import { setLogIn } from 'store/loggedIn';

const LoginPopUp = props => {
  const dispatch=useDispatch()
  const [inputs,setInputs]=useState({
email:"",
password:"",
  })
  const handleInputs=(ev)=>updateInputs(ev,setInputs)
  const handleLogin=async()=>{
    try {
      let {data}=await axios.post("/v1/users/auth/login",inputs)
      localStorage.setItem("token",data.data.token)
      dispatch(setHidden("loginHidden"))
      dispatch(setLogIn())
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PopUp
      onclick={props.onclick}
      classes={`gap-3 ${props.classes}`}
      popupClasses='login-popup'>
      <MaterialIcon
        classes='d-flex justify-content-center fs-1 icon-color-login-popup'
        title='person'
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
      <Button onclick={handleLogin} classes='primary-button'>Login in</Button>
    </PopUp>
  );
};

export default LoginPopUp;
