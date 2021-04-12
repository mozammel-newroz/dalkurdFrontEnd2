import React, { useState } from "react";

import {  Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";

import MailOutline from "@material-ui/icons/MailOutline";
import { makeStyles } from "@material-ui/core/styles";
import loginImage from "../../assets/images/login.png";
import { Grid, Box } from "@material-ui/core";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import FormatStrikethroughOutlinedIcon from "@material-ui/icons/FormatStrikethroughOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import axios from "axios";

// import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      street,
      locality,
      region,
      postalCode: parseInt(postalCode),
      country,
    };
    console.log("data", data);
    try {
      let url = "/api/v1/public/auth/signup/";
      let res = await axios({
        url: url,
        method: "post",
        data: data,
      });
      console.log("res", res);
    } catch (error) {
      console.log("this is error message", error);
    }
  };

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
              Signup to Continue
            </Typography>

            <>
              <form onSubmit={handleSignup}>
                <Grid container spacing={3}>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutline color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone number"
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneAndroidOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <Input
                      className={classes.inputStyle}
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Locality"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountTreeOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Street"
                      startAdornment={
                        <InputAdornment position="start">
                          <FormatStrikethroughOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Region"
                      startAdornment={
                        <InputAdornment position="start">
                          <AppsOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal code"
                      startAdornment={
                        <InputAdornment position="start">
                          <DraftsOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Input
                      className={classes.inputStyle}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                      startAdornment={
                        <InputAdornment position="start">
                          <PublicOutlinedIcon color="disabled" />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonStyle}
                  disabled={loading}
                  type="submit"
                >
                  Signup
                </Button>
              </form>
              <div className={classes.bottom}>
                <div>
                  <Link to="/login" className={classes.link}>
                    Login
                  </Link>
                </div>
              </div>
            </>
          </>
        </>
      </div>
    </div>
  );
};

export default Signup;



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
    justifyContent: 'flex-end'
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
    float: 'right',
    fontFamily: "Fira Sans Condensed",
  },
  checkBoxStyle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: 5,
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
