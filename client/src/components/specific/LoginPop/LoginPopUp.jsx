/** @format */
import axios from 'axios';
import './loginPopup.scss';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PopUp from 'components/common/PopUp/PopUp';
import updateInputs from 'functions/updateInputs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import validate from 'validations/validate';
import loginSchema from 'validations/loginSchema';
import Error from 'components/common/Errors/Error';
const LoginPopUp = props => {
  document.title = `Sign In | ofwood`;
const updateUser=useUpdateUserRedux()
  //
  const history = useHistory();
  //
  const [loaded, setLoaded] = useState(false)
  const [serverError, setServerError] = useState("")
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
// 
  const handleInputs = ev => updateInputs(ev, setInputs);
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
      <Button
        onclick={handleLogin}
        classes='primary-button'>
        Login
      </Button>
    </PopUp>
  );
};

export default LoginPopUp;
