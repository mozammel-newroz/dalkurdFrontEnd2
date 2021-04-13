import React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/GroupOutlined";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

import SideBar from "../components/SideBar";

const useStyle = makeStyles({
  title: {
    textAlign: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(95, 39, 205, 0.2)",
    padding: 30,
    borderLeft: "5px solid rgba(95, 39, 205,1.0)",
  },
  right: {
    paddingLeft: 20,
    color: "rgba(95, 39, 205,1.0)",
  },
  icon: {
    fontSize: 90,
    color: "rgba(95, 39, 205,1.0)",
  },
});

const Home = () => {
  const classes = useStyle();
  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          Quick Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Box className={classes.box}>
              <div className="left">
                <GroupIcon className={classes.icon} />
              </div>
              <div className={classes.right}>
                <Typography variant="h5">Total Subscription</Typography>
                <Typography variant="h5">500+</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.box}>
              <div className="left">
                <DescriptionIcon className={classes.icon} />
              </div>
              <div className={classes.right}>
                <Typography variant="h5">Number of Blogs</Typography>
                <Typography variant="h5">100+</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.box}>
              <div className="left">
                <BookmarksOutlinedIcon className={classes.icon} />
              </div>
              <div className={classes.right}>
                <Typography variant="h5">Valued Partners</Typography>
                <Typography variant="h5">900+</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.box}>
              <div className="left">
                <EmailOutlinedIcon className={classes.icon} />
              </div>
              <div className={classes.right}>
                <Typography variant="h5">Open Issues</Typography>
                <Typography variant="h5">150+</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
