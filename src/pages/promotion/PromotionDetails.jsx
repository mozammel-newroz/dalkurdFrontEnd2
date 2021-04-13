import React, {useState, useEffect, useContext} from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";

import Sidebar from "../../components/Sidebar";
import placeholder from "../../assets/images/placeholder.png";
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
    flexGrow: 2,
    width: 200,
    marginTop: 11,
  },

  margin: {
    marginBottom: 20,
  },

  padding: {
    padding: 30,
  },
  active: {
    color: "#27ae60",
  },
  inactive: {
    color: "#e74c3c",
  },
});

const CreatePromotion = () => {
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();
  const row = location.state;
  const { auth } = useContext(AuthContext);


  const [operator, setOperator] = useState('')
  const [bundle, setBundle] = useState('')
  const [loading, setLoading] = useState(false);


  const getOperator = async () => {
    setLoading(true)
    try {
      let url = `/api/operator/show-single/${row.operator_id}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("ddd", res.data.data);
      setOperator(res.data.data.name);
      // setCategories(res.data)
    } catch (error) {
      console.log(error.response.data.messages);
    }
    setLoading(false)

  }; 

  const getBundle = async () => {
    setLoading(true)
    try {
      let url = `/api/bundle/show-single/${row.bundle_id}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("ddd", res.data.data);
      setBundle(res.data.data.name);
      // setCategories(res.data)
    } catch (error) {
      console.log(error.response.data.messages);
    }
    setLoading(false)

  }; 

  useEffect(() => {
    getOperator()
    getBundle()
  },[])

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Grid container>
            <Grid item md={7}>
              <Typography variant="h4" className={classes.margin}>
                Promotional Offer Details
              </Typography>
              <Card>
                  {loading ? <LinearProgress /> : null}
                <CardContent className={classes.padding}>
                  <div className="" style={{ textAlign: "right" }}>
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
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Title</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>{row.title}</Typography>
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Bannar</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      {row.banner ? (
                        <img
                          src={row.banner}
                          style={{ height: "100px" }}
                          alt=""
                        />
                      ) : (
                        <img
                          src={placeholder}
                          alt=""
                          style={{ height: "100px" }}
                        />
                      )}
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Details</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>{row.details}</Typography>
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Status</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>
                        {row.status === 1 ? (
                          <span className={classes.active}>Active</span>
                        ) : (
                          <span className={classes.inactive}>Inactive</span>
                        )}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Forward to</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>{row.forward_to.text}</Typography>
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Operator</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>{operator}</Typography>
                    </div>
                  </div>
                  <div className={classes.fieldWrapper}>
                    <div className={classes.fieldName}>
                      <Typography variant="subtitle1">Bundle Offer</Typography>
                    </div>
                    <div className={classes.fieldInput}>
                      <Typography>{bundle}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CreatePromotion;
