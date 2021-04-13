import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";

import LinearProgress from "@material-ui/core/LinearProgress";

import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import MailOutline from "@material-ui/icons/MailOutline";
import { makeStyles } from "@material-ui/core/styles";
import loginImage from "../../assets/images/login.png";
import Logo from "../../assets/images/logo2x.png";
import { AuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);
  const submitRef = useRef(null);

  const { otpGenerate, auth, logout } = useContext(AuthContext);
  const [otp, setOtp] = useState('')

  const handleOne = (e) => {
    setOne(e.target.value);
    twoRef.current.focus();
  };

  const handleTwo = (e) => {
    setTwo(e.target.value);
    threeRef.current.focus();
  };

  const handleThree = (e) => {
    setThree(e.target.value);
    fourRef.current.focus();
  };

  const handleFour = (e) => {
    setFour(e.target.value);
    fiveRef.current.focus();
  };

  const handleFive = (e) => {
    setFive(e.target.value);
    sixRef.current.focus();
  };

  const handleSix = (e) => {
    setSix(e.target.value);
    submitRef.current.focus();
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios({
        url: "/api/forgot-password/otp-generate",
        method: "post",
        data: { email },
      });
      if (res.data.code === 200) {
        otpGenerate(email, password);
        setTimeout(() => {
          logout()
        }, res.data.data.expires_in);
      } else if (res.code !== 200) {
        Swal.fire({
          icon: "warning",
          title: "Please Try Again",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setRefresh(!refresh);
    setLoading(false);
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    let newOtp = one + two + three + four + five + six;
    setOtp(newOtp)
    history.push(`/reset-password/${newOtp}`);
  };

  useEffect(() => {
    if (oneRef.current) {
      oneRef.current.focus();
    }
    if (auth.token) {
      history.push("/");
    }
  }, [refresh]);
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
              {auth.otpGenerate
                ? "Verify your identity"
                : "Verify your identity"}
            </Typography>

            {auth.otpGenerate ? (
              <Typography variant="h6" className={classes.content}>
                We have sent 6 digits verification code to your email address.
              </Typography>
            ) : (
              ""
            )}

            {auth.otpGenerate ? (
              <>
                <form onSubmit={otpSubmit}>
                  <div className={classes.margin}>
                    <div className={classes.otpWrapper}>
                      <input
                        type="password"
                        value={one}
                        onChange={handleOne}
                        ref={oneRef}
                        className={classes.otpStyle}
                      />
                      <input
                        type="password"
                        value={two}
                        onChange={handleTwo}
                        ref={twoRef}
                        className={classes.otpStyle}
                      />
                      <input
                        type="password"
                        value={three}
                        onChange={handleThree}
                        ref={threeRef}
                        className={classes.otpStyle}
                      />
                      <input
                        type="password"
                        value={four}
                        onChange={handleFour}
                        ref={fourRef}
                        className={classes.otpStyle}
                      />
                      <input
                        type="password"
                        value={five}
                        onChange={handleFive}
                        ref={fiveRef}
                        className={classes.otpStyle}
                      />
                      <input
                        type="password"
                        value={six}
                        onChange={handleSix}
                        ref={sixRef}
                        className={classes.otpStyle}
                      />
                    </div>
                  </div>
                  {loading ? <LinearProgress /> : null}

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.buttonStyle}
                    ref={submitRef}
                    disabled={loading}
                    type="submit"
                  >
                    Continue
                  </Button>
                </form>
              </>
            ) : (
              <>
                <form onSubmit={handleOtp}>
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
