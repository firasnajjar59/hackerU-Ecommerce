/** @format */

import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './loginWidget.scss';
import LoginPopUp from 'components/specific/LoginPop/LoginPopUp';
import { setHidden, setShow } from 'store/popupHandler';
import RegisterPopup from 'components/specific/RegisterPopup/RegisterPopup';
import { useHistory } from 'react-router-dom';

const LoginWidget = props => {
  const history=useHistory()
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);
  const loginHidden = useSelector(state => state.popupHandler.loginHidden);
  const registerHidden = useSelector(
    state => state.popupHandler.registerHidden
  );
  const dispatch = useDispatch();
  const openPopup = whitchPopp => () => {
    if (props.closeParentPopup) props.closeParentPopup();
    dispatch(setShow(whitchPopp));
  };
  const switchPage = url => () => {
    if (props.closeParentPopup) props.closeParentPopup();
    history.push(`/${url}`)
  };
  return (
    <>
      <RegisterPopup
        onclick={() => {
          dispatch(setHidden('registerHidden'));
        }}
        classes={registerHidden ? 'hidden' : ''}
      />
      <LoginPopUp
        onclick={() => {
          dispatch(setHidden('loginHidden'));
        }}
        classes={loginHidden ? 'hidden' : ''}></LoginPopUp>
      <div className={`memberSection ${props.classes}`}>
        <MaterialIcon
          onclick={openPopup('loginHidden')}
          title={loggedIn ? 'logout' : 'login'}
        />
        <MaterialIcon
          onclick={openPopup('registerHidden')}
          title={loggedIn ? 'account_circle' : 'app_registration'}
        />
        <MaterialIcon onclick={switchPage("cart")} title='shopping_cart' />
        {loggedIn?<MaterialIcon title='favorite' />:""}
      </div>
    </>
  );
};

export default LoginWidget;
