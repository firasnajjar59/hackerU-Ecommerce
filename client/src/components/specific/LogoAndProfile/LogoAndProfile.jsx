/** @format */

import './logoAndProfile.scss';
import LogoImg from 'components/specific/LogoImg/LogoImg';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';
import DarkThemeBtn from 'components/common/DarkThemeBtn/DarkThemeBtn';
import { Link } from 'react-router-dom';

const LogoAndProfile = props => {
 
  return (
    <div className='logoAndMemberSection'>
      <LoginWidget classes="memberSection-opacity" onclickLogin={props.onclickLogin}/>
      <LogoImg src={props.src} />
      <div>
      <Link to={{pathname:"/menu", state:{modal:true}}}><span className='material-symbols-rounded hamburger'>menu</span></Link>
      <DarkThemeBtn classes="theme-wrapper-sm"/>
      </div>
    </div>
  );
};

export default LogoAndProfile;
