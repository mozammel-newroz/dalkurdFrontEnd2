import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SideBar from "../../components/SideBar";

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
    float: 'right'
  },
});

const BlogCreate = () => {
  const classes = useStyles();

  const handleSubmit = () => {
    console.log('submit')
    // return <RefreshToken />
  }

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          New Blog
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <Card>
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
                      // value={title}
                      // onChange={(e) => set_title(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </div>
                </div>
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
                      // value={title}
                      // onChange={(e) => set_title(e.target.value)}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </div>
                </div>
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
                      // value={title}
                      // onChange={(e) => set_title(e.target.value)}
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
                      className={classes.buttonStyle}
                      onClick={handleSubmit}
                    >
                      Create Promotional Offer
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

export default BlogCreate;
