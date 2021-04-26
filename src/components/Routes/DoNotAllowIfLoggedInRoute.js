import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { iceCreamAuth } from '../../firebase';


const DoNotAllowIfLoggedInRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(iceCreamAuth);
  if (loading) {
    return <div>loading...</div>;
  }
  if (!user) {
    return <Route {...rest} render={(props) => (
      <Component {...rest} {...props} />
    )} />
  }
  return <Route>
    <Redirect to="/" />
  </Route>
}

export default DoNotAllowIfLoggedInRoute;