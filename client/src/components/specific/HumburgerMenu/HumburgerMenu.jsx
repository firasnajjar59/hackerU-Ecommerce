/** @format */
import './humburgerMenu.scss';
import NavBarLink from 'components/common/NavLink/NavLink';
import PopUp from 'components/common/PopUp/PopUp';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Ul from '../FilterByElement/List/Ul/Ul';
import Li from '../FilterByElement/List/Li/Li';
import navLinks from 'data/navLinks';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';
import DarkThemeBtn from 'components/common/DarkThemeBtn/DarkThemeBtn';

const HumburgerMenu = props => {
 

  return (
    <PopUp
      onclick={props.onclick}
      classes={`gap-3 ${props.classes}`}
      popupClasses='humburger-popup'
      childrenClasses='humburger-children-popup'>
      <div className='hunburger-theme-wrapper'>
        <p className='theme-p'>Theme:</p>
        <DarkThemeBtn />
      </div>
      <div className='login-widget-wrapper'>
        <LoginWidget
          classes='login-widget'
        />
      </div>
      <SearchBar />
      <Ul classes='py-3 humburger-ul'>
        {navLinks.map((item, indx) => (
          <Li
            onclick={props.onclick}
            classes='fs-Menu'
            key={indx}
            title={
              <NavBarLink
                path={item.path}
                label={item.label}
              />
            }
          />
        ))}
      </Ul>
    </PopUp>
  );
};

export default HumburgerMenu;
