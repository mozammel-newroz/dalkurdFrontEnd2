import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import LinearProgress from "@material-ui/core/LinearProgress";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import loginImage from "../../assets/images/login.png";
import Logo from "../../assets/images/logo2x.png";
import { AuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const { otp } = useParams();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitPassword, setSubmitPassword] = useState(false);

  const { auth, logout } = useContext(AuthContext);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: `password dos'nt match`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      return
    }
    try {
      const email = auth.email;
      const res = await axios({
        url: "/api/forgot-password/otp-verify",
        method: "post",
        data: { email, password, password_confirmation: confirmPassword, otp },
      });
      if (res.data.code === 200) {
        setSubmitPassword(true);

        // otpVerify(res.data.data);
        // history.push("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        // showConfirmButton: false,
        // timer: 2000,
        confirmButtonText: "Try agin!",
      }).then((result) => {
        if (result.isConfirmed) {
          // logout();
          history.push(`/forgot-password/${otp}`);
        }
      });

      // if(error.response.data.messages.toString() === 1){
      //   setTimeout(() => {
      //   logout()
      //   }, 3000);
      // }
    }
    setLoading(false);
  };

  const handleLogin = () => {
    logout();
    history.push("/login");
  };

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {}, [refresh]);
  return (
    <div className={classes.root}>
      <div className={classes.loginImage}>
        <img src={loginImage} alt="" style={{ maxWidth: "100%" }} />
      </div>
      <div className={classes.loginContent}>
        <>
          <img src={Logo} alt="" />

          <>
            <Typography className={classes.subtileStyle}>
              {submitPassword
                ? "Reset Password Successful"
                : "Reset your password"}
            </Typography>

            {submitPassword ? (
              <Typography variant="h6" className={classes.content}>
                Your password has been reset successfully
              </Typography>
            ) : (
              ""
            )}

            {submitPassword ? (
              <>
                {loading ? <LinearProgress /> : null}

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonStyle}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <form onSubmit={handleVerify}>
                  <div className={classes.margin}>
                    <Input
                      className={classes.inputStyle}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
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
                  <div className={classes.margin}>
                    <Input
                      className={classes.inputStyle}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
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
                  {loading ? <LinearProgress /> : null}

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.buttonStyle}
                    disabled={loading}
                    type="submit"
                  >
                    Continue
                  </Button>
                </form>
              </>
            )}
          </>
        </>
      </div>
    </div>
  );
};

export default ForgotPassword;

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
    fontSize: "1.8rem",
    color: "#29335C",
    fontWeight: 500,
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
    fontSize: 20,
    width: "100%",
  },
  inputVerify: {
    fontSize: 40,
    // width: "100%",
  },
  buttonStyle: {
    padding: " 10px",
    fontSize: 18,
    borderRadius: "50px",
    marginTop: 25,
    width: "100%",
  },

  "@media (max-width: 1500px)": {
    loginContent: {
      paddingLeft: 50,
      paddingRight: 50,
    },
    root: {
      padding: "0 100px",
    },
  },
}));
