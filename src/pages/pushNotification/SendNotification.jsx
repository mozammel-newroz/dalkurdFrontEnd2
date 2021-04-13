import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Sidebar from "../../components/Sidebar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  fieldWrapper: {
    display: "flex",
    marginBottom: 30,
  },
  fieldName: {
    flexGrow: 1,
    marginTop: 11,
    width: 100,
  },
  fieldInput: {
    flexGrow: 3,
    width: 200,
  },
  input: {
    padding: "5px",
    height: 45,
    borderRadius: 15,
  },
  margin: {
    marginBottom: 20,
  },
  textarea: {
    borderRadius: 15,
  },
  buttonStyle: {
    padding: " 10px 30px",
    fontSize: 14,
    borderRadius: "25px",
    marginLeft: 20,
  },
  buttonWeraper: {
    marginTop: 25,
    float: "right",
  },
  styleCancel: {
    color: "#999",
  },
  padding: {
    padding: 30,
  },
  textareaHelper: {
    textAlign: "right",
  },
});

const SendNotifacation = () => {
  const classes = useStyle();
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState([]);
  const [medium, setmedium] = useState([]);
  const [type, setType] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [details, setDetails] = useState("");

  const [submitType, setSubmitType] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async () => {
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/notification-channels",
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setChannels(res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  const handleChannel = (e) => {
    if (e.target.checked) {
      channel.push(e.target.name);
    } else {
      let newChannel = channel.filter((removed) => removed != e.target.name);
      setChannel(newChannel);
    }
    setRefresh(!refresh);
  };

  const handleMedium = (e) => {
    if (e.target.checked) {
      medium.push(e.target.name);
    } else {
      let newMedum = medium.filter((removed) => removed != e.target.name);
      setmedium(newMedum);
    }
    setRefresh(!refresh);
  };

  const handleType = (e) => {
    console.log("type: ", e.target.name);
    // if (e.target.checked) {
    //   type.push(e.target.name);
    // } else {
    //   let newType = type.filter((removed) => removed != e.target.name);
    //   setType(newType);
    // }
    setType([e.target.value])
    setTypeId(e.target.value);
    setRefresh(!refresh);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("send data ", {
      title,
      subtitle,
      details,
      channel: JSON.stringify(channel),
      medium: JSON.stringify(medium),
      type: JSON.stringify(type),
    });
    try {
      let res = await axios({
        url: "/api/notifications",
        method: "post",
        data: {
          title,
          subtitle,
          details,
          channel: JSON.stringify(channel),
          medium: JSON.stringify(medium),
          type: JSON.stringify(type),
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });

        if (submitType === "addAnother") {
          setTitle("");
          setSubtitle("");
          setDetails("");
          // setChannel([]);
          // setmedium([]);
        } else if (submitType === "add") {
          history.push("/notification-list");
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    history.push("/notification-list");
  };

  useEffect(() => {
    getChannels();
  }, [refresh]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={10} lg={8}>
                <Typography variant="h4" className={classes.margin}>
                  Send Push Notification
                </Typography>
                <Card>
                  <CardContent className={classes.padding}>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">
                          Target Customer
                        </Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <Grid container>
                          <Grid item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleChannel}
                                  name={channels.personal}
                                  color="primary"
                                />
                              }
                              label="Personal"
                            />
                          </Grid>
                          <Grid item item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleChannel}
                                  name={channels.agent}
                                  color="primary"
                                />
                              }
                              label="Agent"
                            />
                          </Grid>
                          <Grid item item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleChannel}
                                  name={channels.merchant}
                                  color="primary"
                                />
                              }
                              label="Merchant"
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>

                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">
                          Type {typeId}{" "}
                        </Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <Grid container>
                          <RadioGroup
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                            }}
                            aria-label="type"
                            name="type"
                            value={typeId}
                            onChange={handleType}
                          >
                            <div>
                              <FormControlLabel
                                control={<Radio />}
                                label="Email Not Verified"
                                value="Email Not Verified"
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Radio />}
                                label="Kyc Not Verified"
                                value="Kyc Not Verified"
                              />
                            </div>
                          </RadioGroup>
                        </Grid>
                      </div>
                    </div>

                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Medium</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <Grid container>
                          <Grid item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleMedium}
                                  name="SMS"
                                  color="primary"
                                />
                              }
                              label="SMS"
                            />
                          </Grid>
                          <Grid item item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleMedium}
                                  name="Push Notification"
                                  color="primary"
                                />
                              }
                              label="Notification  "
                            />
                          </Grid>
                          <Grid item item md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleMedium}
                                  name="Email"
                                  color="primary"
                                />
                              }
                              label="Email"
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Title</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-basic"
                          placeholder="E.g. Marketing Manager"
                          variant="outlined"
                          fullWidth
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Subtitle</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Subtitle"
                          variant="outlined"
                          fullWidth
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                    </div>

                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Content</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          inputProps={{
                            maxlength: -1,
                          }}
                          helperText={`${details.length}`}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Content"
                          multiline
                          rcurrenciesows={7}
                          rows={5}
                          fullWidth
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          InputProps={{
                            className: classes.textarea,
                          }}
                          FormHelperTextProps={{
                            className: classes.textareaHelper,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {loading ? (
                  <LinearProgress style={{ marginTop: 20 }} />
                ) : (
                  <div className={classes.buttonWeraper}>
                    <Button
                      className={classes.styleCancel}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      type="submit"
                      className={classes.buttonStyle}
                      onClick={(e) => setSubmitType("addAnother")}
                    >
                      Send Another
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buttonStyle}
                      type="submit"
                      onClick={(e) => setSubmitType("add")}
                    >
                      Send Push Notification
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendNotifacation;
