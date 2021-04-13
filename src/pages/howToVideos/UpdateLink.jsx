import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
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
  const location = useLocation();
  const row = location.state;

  const { auth } = useContext(AuthContext);

  const [title_en, set_title_en] = useState("");
  const [link_en, set_link_en] = useState("");
  const [title_ar, set_title_ar] = useState("");
  const [link_ar, set_link_ar] = useState("");
  const [title_ku, set_title_ku] = useState("");
  const [link_ku, set_link_ku] = useState("");
  const [status, set_status] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/update-how-to-videos",
        method: "post",
        data: {
          title_en,
          link_en,
          title_ar,
          link_ar,
          title_ku,
          link_ku,
          how_to_video_id: row.id,
          status,
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
        history.push("/how-to-videos");
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
    history.push("/how-to-videos");
  };

  const initialState = () => {
    set_title_en(row.title_en);
    set_title_ar(row.title_ar);
    set_title_ku(row.title_en);
    set_link_en(row.link_en);
    set_link_ar(row.link_ar);
    set_link_ku(row.link_ku);
    set_status(row.status);
  };

  useEffect(() => {
    initialState();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Update Link
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
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Title
                </Grid>
                <Grid className={classes.gridCol}>
                  <TextField
                    placeholder="en"
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
                    placeholder="ar"
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
                    placeholder="ku"
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
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Youtube Link
                </Grid>
                <Grid className={classes.gridCol}>
                  <TextField
                    placeholder="en"
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
                    placeholder="ar"
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
                    placeholder="ku"
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
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Status
                </Grid>
                <Grid className={classes.gridCol}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Active"
                    name="status"
                    checked={status == 1}
                    onChange={(e) => set_status(e.target.value)}
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="DeActive"
                    name="status"
                    checked={status == 0}
                    onChange={(e) => set_status(e.target.value)}
                  />
                </Grid>
                <Grid className={classes.gridCol}></Grid>
                <Grid className={classes.gridCol}></Grid>
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
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreate}
                className={classes.buttonStyle}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
