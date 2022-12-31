/** @format */
import { NavLink } from "react-router-dom";
import "./navlink.scss"
const NavBarLink = props => {
  return (
    // <li className="nav-item">
    <NavLink
      isActive={match => match && match.isExact}
      className={isActive =>
        'navLink' + (!isActive ? ' ' : ' active-NavLink')
      }
      to={props.path}>
      {props.label}
    </NavLink>
    // {/* </li> */}
  );
};

export default NavBarLink;
