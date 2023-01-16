/** @format */
import axios from 'axios';
import './loginPopup.scss';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PopUp from 'components/common/PopUp/PopUp';
import updateInputs from 'functions/updateInputs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
const LoginPopUp = props => {
  document.title = `Sign In | ofwood`;
const updateUser=useUpdateUserRedux()
  //
  const history = useHistory();
  //

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
// 
  const handleInputs = ev => updateInputs(ev, setInputs);
  // 
  const handleLogin = async () => {
    try {
      console.log(inputs);
      let data  = await axios.post('/v1/users/auth/login', inputs);
      updateUser(data.data.data.token)
      history.goBack();
    } catch (error) {
      console.log(error);
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
      <Input
        classes='p-1'
        type='email'
        placeholder='E-mail'
        datalabel='email'
        value={inputs.email}
        onchange={handleInputs}
      />
      <Input
        classes='p-1'
        type='password'
        placeholder='Password'
        datalabel='password'
        value={inputs.password}
        onchange={handleInputs}
      />
      <Button
        onclick={handleLogin}
        classes='primary-button'>
        Login in
      </Button>
    </PopUp>
  );
};

export default LoginPopUp;
