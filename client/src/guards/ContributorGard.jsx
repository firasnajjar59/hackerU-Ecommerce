/** @format */

import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ContributorGard = ({ component: Component, ...rest }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isLogged = useSelector(state => state.loggedIn.loggedIn);
  const user = useSelector(state => state.loggedUser.user);
  const isAdmin=user.role=="admin"||user.role=="contributor"


  return (
    <Route
      {...rest}
      render={props =>
        isLogged&&isAdmin ? <Component {...props} /> : <Redirect to='/signin'></Redirect>
      }
    />
  );
};

export default ContributorGard;
