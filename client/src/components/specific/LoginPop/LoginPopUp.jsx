/** @format */
import axios from 'axios';
import './loginPopup.scss';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PopUp from 'components/common/PopUp/PopUp';
import updateInputs from 'functions/updateInputs';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import validate from 'validations/validate';
import loginSchema from 'validations/loginSchema';
import Error from 'components/common/Errors/Error';
import emailSchema from 'validations/emailSchema';
import { useDispatch } from 'react-redux';
import { resetMessage, setMessage } from 'store/toast';
const LoginPopUp = props => {
  document.title = `Sign In | ofwood`;
const updateUser=useUpdateUserRedux()
const dispatch=useDispatch()
  //
  const history = useHistory();
  //
  const [loaded, setLoaded] = useState(false)
  const [forget, setForget] = useState(false)
  const [serverError, setServerError] = useState("")
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState({
    email: '',
  });
  // 
  useEffect(()=>{
    setLoaded(true)
  },[])
  // 
  const [error, setError] = useState({
    email: [],
    password: [],
  });
// 
  useEffect(()=>{
    if(loaded){
      const {error}=validate(inputs,loginSchema)
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
  useEffect(()=>{
    if(loaded){
      const {error}=validate(email,emailSchema)
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
  },[email])
// 
  const handleInputs = ev => updateInputs(ev, setInputs);
  const handleEmail = ev => updateInputs(ev, setEmail);
  // 
  const handleLogin = async () => {
    try {
      const {error}=validate(inputs,loginSchema)
      console.log(error);
      if(error)  throw(error) 
      let data  = await axios.post('/v1/users/auth/login', inputs);
      updateUser(data.data.data.token)
      history.goBack();
    } catch (error) {
      if(error.error&&error.error.name=="ValidationError"){
        console.log(error);
        setServerError("Please check the login fields")
      }else{
        // console.log(error);
        setServerError(error.response.data.message)
      }
    }
  };
  const handleForgetPassword = async () => {
    try {
      const {error}=validate(email,emailSchema)
      console.log(error);
      if(error)  throw(error) 
      let data  = await axios.post('/v1/users/auth/forgotpassword', email);
      dispatch(setMessage("Check your email inbox."))
      setTimeout(()=>{
        dispatch(resetMessage())
      },2000)
      history.push("/resetpassword");
    } catch (error) {
      if(error.error&&error.error.name=="ValidationError"){
        console.log(error);
        setServerError("Please check the login fields")
      }else{
        console.log(error);
        setServerError(error.response.data.message)
        dispatch(setMessage(error.response.data.message))
        setTimeout(()=>{
          dispatch(resetMessage())
        },2000)
      }
    }
  };
  return (
    <PopUp
      onclick={props.onclick}
      classes={`gap-3 ${props.classes}`}
      popupClasses='login-popup'>
      <MaterialIcon
        classes='d-flex justify-content-center fs-1 icon-color-login-popup'
        title='person'
      />
        {serverError.length>0&&<Error>{serverError}</Error>}
      <Input
        classes='p-1'
        type='email'
        placeholder='E-mail'
        datalabel='email'
        value={forget?email.email:inputs.email}
        onchange={forget?handleEmail:handleInputs}
      />
      {error.email.length>0&&<Error>{error.email[0]}</Error>}
      {!forget&&<Input
        classes='p-1'
        type='password'
        placeholder='Password'
        datalabel='password'
        value={inputs.password}
        onchange={handleInputs}
        />}
        {error.password.length>0&&<Error>{error.password[0]}</Error>}
        <p onClick={()=>{forget?setForget(false):setForget(true)}} className='forget-password'>Forget your password?</p>
      <Button
        onclick={forget?handleForgetPassword:handleLogin}
        classes='primary-button'>
        {forget?"Send rest E-mail":"Login"}
      </Button>
    </PopUp>
  );
};

export default LoginPopUp;
