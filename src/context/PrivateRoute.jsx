import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { dalkurd_auth, login, logout } = useContext(AuthContext);
  const history = useHistory();
  const [isExpired, setIsExpired] = useState(true);

  const getRfrestToken = async () => {
    // setIsExpired(true);
    let data = {
      grant_type: "refresh_token",
      client_id: "mobile-app",
      client_secret: "c5fab6c3-4262-4e3d-a032-d3e3dc3d73b0",
      refresh_token: dalkurd_auth.refresh_token,
    };
    let res = await axios({
      url: "/api/v1/public/auth/refresh-token/",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    login(res.data.data);
    // setIsExpired(false);
  };

  const getToken = () => {
    let token = dalkurd_auth.access_token;
    let decodedToken = jwt.decode(token, { complete: true });
    let decodedTokenTime = decodedToken.payload.exp * 1000;
    let dateNow = new Date();

    if (decodedToken && decodedTokenTime > dateNow.getTime()) {
      console.log("access token");

      setIsExpired(false);
      history.push("/");
    } else {
      console.log("refresh token");
      getRfrestToken();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          !isExpired ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
}
