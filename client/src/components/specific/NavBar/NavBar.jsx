/** @format */

import LogoAndProfile from 'components/specific/LogoAndProfile/LogoAndProfile';
import './navBar.scss';
import SearchBar from 'components/specific/SearchBar/SearchBar';
import NavBarLink from 'components/common/NavLink/NavLink';
import navLinks from 'data/navLinks';
import LoginPopUp from 'components/specific/LoginPop/LoginPopUp';
import { useState } from 'react';
import HumburgerMenu from '../HumburgerMenu/HumburgerMenu';
import { useSelector } from 'react-redux';
const NavBar = props => {
  const theme=useSelector(state=>state.theme.theme)
  const [displayPopup,setDisplayPopup]=useState({
    loginHidden:true,
    cartHidden:true,
    hamburgerMenuHidden:true
  })
  const handlePopup=(state)=>()=>{
    setDisplayPopup(prev => {
      prev[state]?prev[state]=false:prev[state]=true
      return {
        ...prev
      };
    })
  }
  return (
    <>
    <LoginPopUp onclick={handlePopup("loginHidden")} classes={displayPopup.loginHidden?"hidden":"fade-In"}/>
    <HumburgerMenu onclickLogin={handlePopup("loginHidden")} onclick={handlePopup("hamburgerMenuHidden")} classes={displayPopup.hamburgerMenuHidden?"hidden":"fade-In"}/>
    <LogoAndProfile onclickHamburger={handlePopup("hamburgerMenuHidden")} onclickLogin={handlePopup("loginHidden")} src={theme=="theme-dark"?"../assets/logo/White on Transparent.png":'../assets/logo/OriginalonTransparent.png'} />
      <hr />
      <div className='navBarWrapper '>
        <SearchBar value="" onchange={()=>{}}/>
        <div className='navLinks'>
          {navLinks.map((item,indx)=><NavBarLink key={indx}
            path={item.path}
            label={item.label}/>)}
        </div>
      </div>
    </>
  );
};

export default NavBar;
