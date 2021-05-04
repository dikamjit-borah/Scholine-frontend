import React from "react";
import { Route, Redirect } from "react-router-dom";

import { auth } from "./../../helper/auth";
const PrivateRoute = ({
  component: Component,
  path,
}) => (
  <Route
    path
    render={(props) => {
      const currentUser = auth.currentUser;
      if (!!!currentUser) {
        return (
          <Redirect to={{pathname: "/auth/login"}} />
        );
      }
      return <Component path={path} {...props} />;
    }}
  />
);

export default PrivateRoute;
