import React, { useState, useContext, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

// import LinearProgress from "@material-ui/core/LinearProgress";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import loginImage from "../../assets/images/login.png";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, dalkurd_auth } = useContext(AuthContext);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let data = {
        email,
        password,
        grant_type: "password",
        client_id: "mobile-app",
        scope: "openid profile",
        client_secret: "c5fab6c3-4262-4e3d-a032-d3e3dc3d73b0",
      };
      let res = await axios({
        url: "/api/v1/public/auth/signin/",
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res", res);
      if (res.data.code === 200) {
        login(res.data.data);
        history.push("/");
      }
    } catch (error) {
      console.log("error", error.response);
      setMessage(error.response.data.errors.toString());
    }
  };

  useEffect(() => {
    if (dalkurd_auth.access_token) {
      history.push("/");
    }
  }, []);

  return (
    <div className={classes.root}>
      <Box className={classes.loginImage} display={{ xs: "none", md: "block" }}>
        <img src={loginImage} alt="" style={{ maxWidth: "100%" }} />
      </Box>
      <div className={classes.loginContent}>
        <>
          {/* <img src={Logo} alt="" /> */}
          <Typography className={classes.title} color="primary">
            Welcome to DalKurd FF
          </Typography>

          <>
            <Typography className={classes.subtileStyle}>
              Login to Continue
            </Typography>
            {message ? (
              <Alert
                variant="outlined"
                severity="error"
                className={classes.error}
              >
                {message}
              </Alert>
            ) : null}

            <>
              <form onSubmit={handleLogin}>
                <div className={classes.margin}>
                  <div className={classes.margin}>
                    <Input
                      className={classes.inputStyle}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutline color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </div>
                </div>
                <div className={classes.margin}>
                  <div className={classes.margin}>
                    <Input
                      className={classes.inputStyle}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      label="Standard"
                      type={passwordVisible ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {passwordVisible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonStyle}
                  disabled={loading}
                  type="submit"
                >
                  Login
                </Button>
                
              </form>

              {/* <div className={classes.bottom}>
                <div>
                  <Link to="/forgot-password" className={classes.link}>
                    Forgot password
                  </Link>
                  <Link to="/signup" className={classes.link}>
                    Signup
                  </Link>
                </div>
              </div> */}
            </>
          </>
        </>
      </div>
    </div>
  );
};

export default Login;

const GreenCheckbox = withStyles({
  root: {
    color: "#999",
    fontSize: 30,
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 300px",
  },
  subtileStyle: {
    fontSize: "1.5rem",
    color: "#666",
    fontWeight: 600,
  },
  title: {
    fontSize: "2.5rem",
    // color: "#40739e",
    fontWeight: 600,
  },
  loginImage: {
    // maxWidth: '200px'
    flexGrow: 1,
    width: 100,
    padding: "0 50px",
  },
  loginContent: {
    flexGrow: 1,
    width: 100,
    padding: "0 50px",
    height: 370,

    // paddingLeft: 200
  },
  content: {
    color: "#29335C",
    maxWidth: 330,
    fontWeight: 400,
    marginTop: 10,
  },
  margin: {
    marginTop: 25,
  },
  inputStyle: {
    fontSize: "1.2rem",
    width: "100%",
  },
  inputVerify: {
    fontSize: 40,
    // width: "100%",
  },
  buttonStyle: {
    padding: " 10px 55px",
    fontSize: "1rem",
    borderRadius: "50px",
    marginTop: 25,
    // width: "100%",
    lineHeight: "1.2rem",
    float: "right",
  },
  bottom: {
    display: "flex",
    marginTop: 7,
    justifyContent: "flex-end",
  },
  bottomLeft: {
    flexGrow: 1,
    fontSize: "1.3rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "1rem",
    color: "#666",
    marginTop: 30,
    marginRight: 30,
    display: "inline-block",
    float: "right",
    fontFamily: "Fira Sans Condensed",
  },
  checkBoxStyle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: 5,
  },
  error: {
    marginTop: 15,
  },
  otpWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  otpStyle: {
    flexGrow: 1,
    width: 50,
    fontSize: "2rem",
    textAlign: "center",
    margin: 10,
    borderRight: 0,
    borderLeft: 0,
    borderTop: 0,
    borderBottom: "1px solid #999",
    background: "rgba(0,0,0,0)",
    "&:focus": {},
  },
  "@media (max-width: 1500px)": {
    loginContent: {
      paddingLeft: 50,
      paddingRight: 50,
    },
    root: {
      padding: "0 20px",
    },
  },
}));
