import React, { useState, useContext } from "react";
import axios from "axios";
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
  const [message, setMesage] = useState("");

  const { dalkurd_auth } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
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
          Authorization: `Bearer ${dalkurd_auth.access_token}`,
        },
      });
      setMesage("Data successfully saved!!!");
    } catch (error) {
      console.log("my error", error.response);
      setMesage(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          <IconButton onClick={() => history.push("/subscription")}>
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
                  variant="outlined"
                  severity="error"
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
                    <TextField
                      required
                      // placeholder="E.g. Marketing Manager"
                      label="Currency"
                      // variant="outlined"
                      fullWidth
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </div>
                </div>
                <div className={classes.fieldWrapper}>
                  <div className={classes.fieldName}>
                    <Typography variant="subtitle1">Frequency</Typography>
                  </div>
                  <div className={classes.fieldInput}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      style={{ marginTop: 14 }}
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
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
