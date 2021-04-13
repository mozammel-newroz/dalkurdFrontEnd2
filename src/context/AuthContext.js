import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const history = useHistory();
  const [auth, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem("auth");
    return localData ? JSON.parse(localData) : {};
  });
  const otpGenerate = async (email, password) => {
    dispatch({
      type: "OTP_GENERATE",
      payload: {
        otpGenerate: true,
        email: email,
        password: password,
      },
    });
  };

  const otpVerify = async (data) => {
    dispatch({
      type: "OTP_GENERATE",
      payload: data,
    });
  };

  const logout = () => {
    localStorage.setItem("timer", "");
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
  };

  const signup = async (name, email, password) => {
    const token = await axios.post("http://localhost:4000/api/user/register", {
      name,
      email,
      password,
    });
    if (token.data.error) {
      localStorage.setItem("error", token.data.error);
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          token: token.data,
        },
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [otpGenerate, otpVerify]);

  return (
    <AuthContext.Provider value={{ otpGenerate, auth, otpVerify, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
