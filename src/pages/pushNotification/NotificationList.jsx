import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "../../assets/css/table_next.css";
import Skeleton from "@material-ui/lab/Skeleton";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import moment from "moment";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  margin: {
    marginBottom: 20,
  },
  buttonStyle: {
    padding: " 10px 30px",
    fontSize: 14,
    borderRadius: "25px",
    marginLeft: 20,
  },
  details: {
    fontWeight: 500,
    color: "#3498db",
    cursor: "pointer",
  },
  less: {
    fontWeight: 500,
    color: "#c0392b",
    cursor: "pointer",
  },
  buttonWeraper: {
    float: "right",
    marginTop: "-65px",
    height: 0,
    position: "relative",
  },
});

const NotificationList = () => {
  const classes = useStyle();

  const [notifications, setNotifications] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getNotification = async () => {
    setLoading(true);
    try {
      let url = `/api/notifications?page=${page + 1}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      let response = res.data.data;
      let formatedData = response.map((e) => {
        let formated = e.medium;
        let newNoti = JSON.parse(formated);
        let items = newNoti.map((item, index) => (
          <Chip
            key={index}
            size="small"
            label={item}
            style={{
              marginRight: 5,
              color: "#3A51B2",
              border: "1px solid #666",
              background: "rgba(0,0,0,0)",
            }}
          />
        ));
        e.medium = items;
        return e;
      });
      setNotifications(formatedData);
      setTotalRows(res.data.total_rows);
      console.log('data:', formatedData)
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        // timer: 2000,
      });
    }
    setLoading(false);
  };

  const columns = [
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "subtitle",
      text: "Subtitle",
    },
    {
      dataField: "medium",
      text: "Medium",
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        <p>Date : {moment(row.created_at).format("DD-MM-Y")}</p>
        <p>Subtitle: {row.subtitle}</p>
        <p>Details: {row.details}</p>
        <p>Type: { JSON.parse(row.type) }</p>
      </div>
    ),
    showExpandColumn: true,
    expandColumnPosition: "right",
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <span className={classes.less}>Less All</span>;
      }
      return <span className={classes.details}>Details All</span>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <span className={classes.less}>Less</span>;
      }
      return <span className={classes.details}>Details</span>;
    },
  };

  useEffect(() => {
    getNotification();
  }, [page]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Push Notification List
          </Typography>
          <div className={classes.buttonWeraper}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonStyle}
            >
              <Link to="/send-notification">Create New Push Notification</Link>
            </Button>
          </div>

          <Grid container>
            <Grid item md={12}>
              <div>
                <TableContainer component={Paper}>
                  { notifications.length > 0 || loading ? null : <p style={{ textAlign: 'center', padding: 7 }}>No record found</p> }
                  {loading && notifications.length < 1 ? (
                    <>
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                      <Skeleton width="100%" animation="wave" height="50px" />
                    </>
                  ) : (
                    <BootstrapTable
                      keyField="id"
                      data={notifications}
                      columns={columns}
                      expandRow={expandRow}
                    />
                  )}
                  <TablePagination
                    component="div"
                    count={totalRows}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10]}
                  />
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
