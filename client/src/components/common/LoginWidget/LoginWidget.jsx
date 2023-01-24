/** @format */

import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './loginWidget.scss';
import { Link } from 'react-router-dom';
import useLogoutUser from 'hooks/useLogoutUser';

const LoginWidget = props => {
  const user = useSelector(state => state.loggedUser.user);
  const cart = useSelector(state => state.cart.cart);
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);
  const logout=useLogoutUser()
  const handleLogout=()=>{
    logout()
  }

  return (
    <>
      <div className={`memberSection ${props.classes}`}>
        {loggedIn && user ? (
          <>
            {<Link to="/profile"><img
              src={`${process.env.REACT_APP_SERVER_URL}/images/users/${user.userImg}`}
              alt=''
            /></Link>}
            <p className='user-name'>{user.userName}</p>
          </>
        ) : (
          ''
        )}

        {!loggedIn ? (
          <Link to={{ pathname: `/signin`, state: { modal: true } }}>
            <MaterialIcon title='login' />
          </Link>
        ) : (
          ''
        )}

        {loggedIn ? (
          <Link
            onClick={handleLogout}
            to='/'>
            <MaterialIcon title='logout' />
          </Link>
        ) : (
          ''
        )}

        {!loggedIn ? (
          <Link to={{ pathname: `/register`, state: { modal: true } }}>
            <MaterialIcon title='app_registration' />
          </Link>
        ) : (
          ''
        )}

        <Link to='/wishlist'>
          <div className='cart-number-wrapper'>{wishlist.length}</div>
        <MaterialIcon title='favorite' />
        </Link>
        <Link to='/cart'>
          <div className='cart-number-wrapper'>{cart.length}</div>
          <MaterialIcon title='shopping_cart' />
        </Link>
      </div>
    </>
  );
};

export default LoginWidget;
