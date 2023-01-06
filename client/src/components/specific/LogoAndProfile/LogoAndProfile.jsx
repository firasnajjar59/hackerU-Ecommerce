/** @format */

import './logoAndProfile.scss';
import LogoImg from 'components/specific/LogoImg/LogoImg';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';
import DarkThemeBtn from 'components/common/DarkThemeBtn/DarkThemeBtn';
import HumburgerMenu from '../HumburgerMenu/HumburgerMenu';
import { setHidden, setShow } from 'store/popupHandler';
import { useDispatch, useSelector } from 'react-redux';

const LogoAndProfile = props => {
  const hamburgerMenuHidden=useSelector(state=>state.popupHandler.hamburgerMenuHidden)
 
  const dispatch=useDispatch()
  return (
    <div className='logoAndMemberSection'>
      <HumburgerMenu classes={hamburgerMenuHidden?"hidden":""} onclick={()=>{dispatch(setHidden('hamburgerMenuHidden'))}} />
      <LoginWidget classes="memberSection-opacity" onclickLogin={props.onclickLogin}/>
      <LogoImg src={props.src} />
      <span onClick={()=>{dispatch(setShow('hamburgerMenuHidden'))}} className='material-symbols-rounded hamburger'>menu</span>
      <DarkThemeBtn classes="theme-wrapper-sm"/>
    </div>
  );
};

export default LogoAndProfile;
