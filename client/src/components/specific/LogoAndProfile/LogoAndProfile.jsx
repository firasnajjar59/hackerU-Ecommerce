/** @format */

import './logoAndProfile.scss';
import LogoImg from 'components/specific/LogoImg/LogoImg';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';

const LogoAndProfile = props => {
  return (
    <div className='logoAndMemberSection'>
      <LoginWidget onclickLogin={props.onclickLogin}/>
      <LogoImg src={props.src} />
      <span onClick={props.onclickHamburger} className='material-symbols-rounded hamburger'>menu</span>
    </div>
  );
};

export default LogoAndProfile;
