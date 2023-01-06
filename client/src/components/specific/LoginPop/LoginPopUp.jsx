/** @format */
import './loginPopup.scss'
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PopUp from 'components/common/PopUp/PopUp';

const LoginPopUp = props => {
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
      />
      <Input
        classes='p-1'
        type='password'
        placeholder='Password'
      />
      <Button classes='primary-button'>Login in</Button>
    </PopUp>
  );
};

export default LoginPopUp;
