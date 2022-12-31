/** @format */
import './humburgerMenu.scss';
import NavBarLink from 'components/common/NavLink/NavLink';
import PopUp from 'components/common/PopUp/PopUp';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Ul from '../sideSortComponent/List/Ul/Ul';
import Li from '../sideSortComponent/List/Li/Li';
import navLinks from 'data/navLinks';
import LoginWidget from 'components/common/LoginWidget/LoginWidget';

const HumburgerMenu = props => {
  const handlePopupsInHumburgerNenu=(propsFunction)=>()=>{
    props.onclick()
    propsFunction()
  }
  return (
    <PopUp
      onclick={props.onclick}
      classes={`gap-3 ${props.classes}`}
      popupClasses='humburger-popup'
      childrenClasses='humburger-children-popup'>
        <div className="login-widget-wrapper">
      <LoginWidget onclickLogin={handlePopupsInHumburgerNenu(props.onclickLogin)} classes='login-widget'/>
        </div>
      <SearchBar />
      <Ul classes='py-3 humburger-ul'>
      {navLinks.map((item,indx)=><Li onclick={props.onclick} classes="fs-Menu" key={indx} title={  <NavBarLink
        path={item.path}
        label={item.label}
      />}/>)}
      </Ul>

    </PopUp>
  );
};

export default HumburgerMenu;
