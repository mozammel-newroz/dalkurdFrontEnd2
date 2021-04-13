import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useLocation, Link, useHistory } from "react-router-dom";
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
  active: {
    color: "#27ae60",
    fontSize: "1.3rem",
  },
  inactive: {
    color: "#e74c3c",
    fontSize: "1.3rem",
  },
});

const ViewFaq = () => {
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory()
  const row = location.state;
  useEffect(() => {}, []);
  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            View FAQ
          </Typography>
          <div className={classes.buttonWeraper}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonStyle}
            >
              <Link to={{ pathname: "/update-faq", state: row }}>
              Edit FAQ
              </Link>
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
                <Grid className={classes.gridCol1}>Catetory</Grid>
                <Grid className={classes.gridCol}>{row.category.text}</Grid>
                <Grid className={classes.gridCol}></Grid>
                <Grid className={classes.gridCol}></Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1}>Language</Grid>
                <Grid className={classes.gridCol}>English</Grid>
                <Grid className={classes.gridCol}>Arabic</Grid>
                <Grid className={classes.gridCol}>Kurdish</Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Topic Name
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.topic_name_en}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.topic_name_ar}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.topic_name_ku}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Question
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ques_en}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ques_ar}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ques_ku}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Answer
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ans_en}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ans_ar}</Typography>
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>{row.ans_ku}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  App for
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>
                   {row.app_for}
                  </Typography>
                </Grid>
                <Grid className={classes.gridCol}></Grid>
                <Grid className={classes.gridCol}></Grid>
              </Grid>
              <Grid className={classes.gridRow}>
                <Grid className={classes.gridCol1 + " " + classes.title}>
                  Status
                </Grid>
                <Grid className={classes.gridCol}>
                  <Typography>
                    {row.status === 1 ? (
                      <span className={classes.active}>Active</span>
                    ) : (
                      <span className={classes.inactive}>Inactive</span>
                    )}
                  </Typography>
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

export default ViewFaq;
