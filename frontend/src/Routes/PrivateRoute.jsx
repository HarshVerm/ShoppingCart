import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { getToken } from "../Utils/localstorage";
function PrivateRoute({ Component, ...rest }) {
  const token = useSelector((state) => state.users.token);
  React.useEffect(() => {}, [token]);
  return token ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/account/login" />
  );
}

export default PrivateRoute;
