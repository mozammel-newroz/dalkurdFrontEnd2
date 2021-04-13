import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player/youtube";
import Sidebar from "../../components/Sidebar";

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
    float: "right",
    marginTop: "-65px",
    height: 0,
    position: "relative",
  },
  styleCancel: {
    color: "#999",
  },
});

const VideosDetails = () => {
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();
  const row = location.state;
  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            View Details
          </Typography>
          <div className={classes.buttonWeraper}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonStyle}
            >
              <Link to={{ pathname: "/update-link", state: row }}>Edit</Link>
            </Button>
          </div>
          <Card>
            <CardContent className={classes.padding}>
              <div className="" style={{ float: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Back to list
                </Button>
              </div>
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
                  <Typography>{row.title_en}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.title_ar}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.title_ku}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Youtube Link
                </Grid>
                <Grid className={classes.gridCol}>
                  {/* <Typography>
                  {row.link_en}
                  </Typography> */}
                  <ReactPlayer url={row.link_en} width="100%" height={200} />
                </Grid>
                <Grid className={classes.gridCol}>
                  <ReactPlayer url={row.link_ar} width="100%" height={200} />
                </Grid>
                <Grid className={classes.gridCol}>
                  <ReactPlayer url={row.link_ku} width="100%" height={200} />
                </Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Status
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>Active</Typography>
                </Grid>
                <Grid className={classes.gridCol}></Grid>
                <Grid className={classes.gridCol}></Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideosDetails;
