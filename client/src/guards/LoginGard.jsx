/** @format */

import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const LoginGard = ({ component: Component, ...rest }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isLogged = useSelector(state => state.loggedIn.loggedIn);

  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? <Component {...props} /> : <Redirect to='/'></Redirect>
      }
    />
  );
};

export default LoginGard;
