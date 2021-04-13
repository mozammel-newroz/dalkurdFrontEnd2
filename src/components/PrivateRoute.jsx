import React, { useContext, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { dalkurd_auth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // if (dalkurd_auth.access_token) {
    //   history.push("/");
    // }
  },[]);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          dalkurd_auth.access_token ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </div>
  );
}
