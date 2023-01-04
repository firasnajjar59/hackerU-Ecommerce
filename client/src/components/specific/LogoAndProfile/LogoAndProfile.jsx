/** @format */

import './logoAndProfile.scss';
import LogoImg from 'components/specific/LogoImg/LogoImg';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';
import DarkThemeBtn from 'components/common/DarkThemeBtn/DarkThemeBtn';

const LogoAndProfile = props => {
  return (
    <div className='logoAndMemberSection'>
      <LoginWidget onclickLogin={props.onclickLogin}/>
      <LogoImg src={props.src} />
      <span onClick={props.onclickHamburger} className='material-symbols-rounded hamburger'>menu</span>
      <DarkThemeBtn classes="theme-wrapper-sm"/>
    </div>
  );
};

export default LogoAndProfile;
