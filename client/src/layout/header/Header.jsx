/** @format */

import './header.scss';
const Header = props => {
  return <div className={`header ${props.classes}`}>{props.children}</div>;
};

export default Header;
