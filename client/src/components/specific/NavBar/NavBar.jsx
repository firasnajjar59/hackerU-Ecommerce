/** @format */

import LogoAndProfile from 'components/specific/LogoAndProfile/LogoAndProfile';
import './navBar.scss';
import SearchBar from 'components/specific/SearchBar/SearchBar';
import NavBarLink from 'components/common/NavLink/NavLink';
import navLinks from 'data/navLinks';
import { useSelector } from 'react-redux';
const NavBar = props => {
  const theme=useSelector(state=>state.theme.theme)

  return (
    <>
    <LogoAndProfile src={theme=="theme-dark"?"http://localhost:3000/assets/logo/White on Transparent.png":'http://localhost:3000/assets/logo/OriginalonTransparent.png'} />
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
