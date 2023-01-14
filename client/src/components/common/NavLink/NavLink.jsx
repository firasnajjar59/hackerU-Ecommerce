/** @format */
import { NavLink } from "react-router-dom";
import "./navlink.scss"
const NavBarLink = props => {
  return (
    // <li className="nav-item">
    <NavLink
    onClick={props.onclick?props.onclick:()=>{}}
      isActive={match => match && match.isExact}
      className={isActive =>
        'navLink ' + `${props.classes} ` + (!isActive ? ' ' : ' active-NavLink')
      }
      to={props.path}>
      {props.label}
    </NavLink>
    // {/* </li> */}
  );
};

export default NavBarLink;
