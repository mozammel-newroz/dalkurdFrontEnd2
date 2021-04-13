import React, { useState, useContext, useEffect } from "react";
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
import { useHistory, useLocation } from "react-router-dom";

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
    background: "#ddd",
    marginRight: 10,
  },
});

const SubscriptionImageUpdate = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const row = location.row;
  // const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { dalkurd_auth, login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    let token = await refreshToken();
    console.log("tested token", token);
    let data = {  };
    console.log("submit", data);
    try {
      let url = `/api/v1/private/subscription/membership/${row.membershipId}`;
      let res = await axios({
        url: url,
        method: "put",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Data successfully Updated!!!");
      setMessageType("success");
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

  const initialState = () => {
    // setTitle(row.title);
  };

  useEffect(() => {
    initialState();
  }, []);

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          <IconButton
            onClick={() => history.push("/subscription")}
            className={classes.icon_button}
          >
            <ArrowBackIcon />
          </IconButton>
          Update Subcription Image
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
                    <Typography variant="subtitle1">Image</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <TextField
                      required
                      // placeholder="E.g. Marketing Manager"
                      // label="Title"
                      // variant="outlined"
                      fullWidth
                      // value={title}
                      // onChange={(e) => setTitle(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
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
                      Update Subcription Image
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

export default SubscriptionImageUpdate;
