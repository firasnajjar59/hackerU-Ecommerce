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
    <LogoAndProfile src={theme=="theme-dark"?"White on Transparent.png":'OriginalonTransparent.png'} />
      <hr />
      <div className='navBarWrapper '>
        <SearchBar/>
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
