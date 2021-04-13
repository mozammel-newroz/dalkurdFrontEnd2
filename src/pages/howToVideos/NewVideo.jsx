import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  padding: {
    padding: 30,
  },
  margin: {
    marginBottom: 20,
  },
  input: {
    padding: "5px",
    height: 45,
    borderRadius: 15,
  },
  gridRow: {
    display: "flex",
  },
  gridCol: {
    flexGrow: 2,
    margin: "20px 20px 20px 0",
    width: 200,
  },
  gridCol1: {
    flexGrow: 1,
    margin: "20px 20px 20px 0",
    width: 100,
  },
  title: {
    marginTop: 30,
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
});

const NewVideo = () => {
  const classes = useStyle();
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const [title_en, set_title_en] = useState("");
  const [link_en, set_link_en] = useState("");
  const [title_ar, set_title_ar] = useState("");
  const [link_ar, set_link_ar] = useState("");
  const [title_ku, set_title_ku] = useState("");
  const [link_ku, set_link_ku] = useState("");
  const [submitType, setSubmitType] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    history.push("/how-to-videos");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/how-to-videos",
        method: "post",
        data: { title_en, link_en, title_ar, link_ar, title_ku, link_ku },
        headers: {
          // crossorigin: true,
          Authorization: `Bearer ${auth.token}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      if (submitType === "addAnother") {
        set_title_en("");
        set_title_ar("");
        set_title_ku("");
        set_link_en("");
        set_link_ar("");
        set_link_ku("");
      } else if (submitType === "add") {
        history.push("/how-to-videos");
      }

      console.log("response", res);
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

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <form onSubmit={handleCreate}>
            <Typography variant="h4" className={classes.margin}>
              Create New Link
            </Typography>
            <Card>
              <CardContent className={classes.padding}>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1}>Language</Grid>
                  <Grid className={classes.gridCol}>English</Grid>
                  <Grid className={classes.gridCol}>Arabic</Grid>
                  <Grid className={classes.gridCol}>Kurdish</Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={[classes.gridCol1, classes.title]}>
                    Title
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={title_en}
                      onChange={(e) => set_title_en(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={title_ar}
                      onChange={(e) => set_title_ar(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={title_ku}
                      onChange={(e) => set_title_ku(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={[classes.gridCol1, classes.title]}>
                    Youtube Link
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={link_en}
                      onChange={(e) => set_link_en(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={link_ar}
                      onChange={(e) => set_link_ar(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={link_ku}
                      onChange={(e) => set_link_ku(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {loading ? (
              <LinearProgress style={{ marginTop: 20 }} />
            ) : (
              <div className={classes.buttonWeraper}>
                <Button className={classes.styleCancel} onClick={handleCancel}>
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
                  Create & add another
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.buttonStyle}
                  onClick={(e) => setSubmitType("add")}
                >
                  Create Link
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
