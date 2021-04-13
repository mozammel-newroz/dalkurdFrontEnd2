import React, { useState, useContext } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LinearProgress from "@material-ui/core/LinearProgress";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import SideBar from "../../components/SideBar";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles({
  title: {
    textAlign: "left",
  },
  fieldWrapper: {
    display: "flex",
    marginBottom: 30,
  },
  fieldName: {
    flexGrow: 1,
    marginTop: 20,
    width: 100,
  },
  fieldInput: {
    flexGrow: 3,
    width: 200,
  },
  input: {
    // padding: "5px",
    // height: 45,
    // borderRadius: 15,
  },
  buttonStyle: {
    padding: " 10px 25px",
    fontSize: "1rem",
    borderRadius: "50px",
    // marginTop: 25,
    // width: "100%",
    lineHeight: "1.2rem",
    float: "right",
  },
  icon_button: {
    background: '#ddd',
    marginRight: 10
  }
});

const SubscriptionCreate = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, seTtitle] = useState("");
  const [benefits, setBenefits] = useState("");
  const [fee, setFee] = useState("");
  const [currency, setCurrency] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { dalkurd_auth, login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    let token = await refreshToken();
    console.log("tested token", token);
    let newFee = parseInt(fee);
    let data = { title, benefits, fee: newFee, currency, frequency };
    console.log("submit", data);
    try {
      let url = `/api/v1/private/subscription/membership`;
      let res = await axios({
        url: url,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Data successfully saved!!!");
      setMessageType("success");
      seTtitle("");
      setBenefits("");
      setFee("");
      setCurrency("");
      setFrequency("");
    } catch (error) {
      console.log("my error", error.response);
      setMessage(error.response.data.message);
      setMessageType("error");
    }
    setLoading(false);
  };

  const refreshToken = async () => {
    let token = dalkurd_auth.access_token;
    let decodedToken = jwt.decode(token, { complete: true });
    let decodedTokenTime = decodedToken.payload.exp * 1000;
    let dateNow = new Date();

    if (decodedToken && decodedTokenTime > dateNow.getTime()) {
      console.log("my access token", token);
      return token;
    } else {
      let data = {
        grant_type: "my refresh_token",
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
      console.log("refresh token", res.data.data.access_token);
      return res.data.data.access_token;
    }
  };

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          <IconButton onClick={() => history.push("/subscription")} className={classes.icon_button} >
            <ArrowBackIcon />
          </IconButton>
          New Subcription
        </Typography>

        <Grid container spacing={3}>
          <Grid item lg={8}>
            <Card>
              {loading ? <LinearProgress /> : null}
              {message ? (
                <Alert
                  variant="filled"
                  severity={messageType}
                  className={classes.error}
                >
                  {message}
                </Alert>
              ) : null}
              <CardContent>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Title</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <TextField
                      required
                      // placeholder="E.g. Marketing Manager"
                      label="Title"
                      // variant="outlined"
                      fullWidth
                      value={title}
                      onChange={(e) => seTtitle(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Benefits</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <TextareaAutosize
                      style={{ width: "100%", padding: 10 }}
                      aria-label="minimum height"
                      rowsMin={3}
                      placeholder="Benefits"
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                    />

                    {/* <TextField
                      required
                      // placeholder="E.g. Marketing Manager"
                      label="Benefits"
                      type="textarea"
                      // variant="outlined"
                      fullWidth
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    /> */}
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Fee</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <TextField
                      required
                      // placeholder="E.g. Marketing Manager"
                      label="Fee"
                      // variant="outlined"
                      fullWidth
                      type="number"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Currency</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <Select
                      fullWidth
                      style={{ marginTop: 14 }}
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">Select Currency</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="BDT">BDT</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Frequency</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <Select
                      fullWidth
                      style={{ marginTop: 14 }}
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">Select Frequency</MenuItem>
                      <MenuItem value="MONTHLY">MONTHLY</MenuItem>
                      <MenuItem value="YEARLY">YEARLY</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1"></Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={loading ? true : false}
                      className={classes.buttonStyle}
                      onClick={handleSubmit}
                    >
                      Create Subcription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SubscriptionCreate;
