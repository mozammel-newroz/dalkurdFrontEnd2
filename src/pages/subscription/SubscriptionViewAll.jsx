import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useHistory, Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    textAlign: "left",
  },
  icon_button: {
    background: "#ddd",
    marginRight: 10,
  },
});

const SubscriptionViewAll = () => {
  const classes = useStyles();
  const history = useHistory();
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlog = async () => {
    setLoading(true);
    try {
      let url = "/api/v1/public/subscription/membership";
      console.log("url", url);
      let res = await axios({
        url: url,
        method: "get",
        data: null,
      });

      console.log("data", res.data.data);
      setSub(res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getBlog();
    console.log("base url", process.env.REACT_APP_BASE_URL);
  }, []);

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          <IconButton
            onClick={() => history.push("/subscription-create")}
            className={classes.icon_button}
          >
            <AddOutlinedIcon />
          </IconButton>
          Subscription / Membership List
        </Typography>

        {!loading && sub.length < 1 ? (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            No record found
          </Typography>
        ) : null}

        {!loading ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>Fee</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Card</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sub.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.fee}</TableCell>
                    <TableCell>{row.currency}</TableCell>
                    <TableCell>{row.frequency}</TableCell>
                    <TableCell>
                      <img src={row.card} width="100px" alt="" />
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" >
                      <Link to={{ pathname: "/subscription-update", row: row }}>
                        Update
                      </Link>
                      </Button>
                      <br/>
                      <br/>
                      <Button variant="outlined" size="small" >
                      <Link to={{ pathname: "/subscription-image-update", id: row.membershipId }}>
                        Update Image
                      </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionViewAll;
