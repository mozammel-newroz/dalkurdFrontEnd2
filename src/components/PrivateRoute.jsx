import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useContext(AuthContext);
  const history = useHistory()

  // useEffect(() => {
  //   if(auth.token){
  //     history.push('/')
  //   }
  // })

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          auth.token ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
}
