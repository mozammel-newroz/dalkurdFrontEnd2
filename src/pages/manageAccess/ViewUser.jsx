import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "@material-ui/lab/Skeleton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";

import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import User from "./User";

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
  buttonWeraper: {
    float: "right",
    marginTop: "-65px",
    height: 0,
    position: "relative",
  },
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
    },
    padding: "3px",
    height: 30,
    borderRadius: 5,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

const ViewUser = () => {
  const classes = useStyle();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [roleId, setRoleId] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const { auth } = useContext(AuthContext);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      let url = `/api/users?page=${page + 1}&role_id=${roleId}&status=${userStatus}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      let resData = res.data.data.map(item => {
        if(item.status === "Active"){
          item.status = 1
        } else if(item.status === "Inactive"){
          item.status = 0
        }
        return item
      })

      setUsers(resData);
      console.log('users: ',resData);
      setTotalRows(res.data.total_rows);
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

  const getRoles = async () => {
    try {
      let url = `/api/roles`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setRoles(res.data.data);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        // timer: 2000,
      });
    }
  };

  const pageRefresh = () => {
    setRefresh(!refresh);
  };

  const handleRole = (e) => {
    setRoleId(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getUsers();
    setRefresh(!refresh)
  };

  const handleCancel = () => {
    setRoleId("");
    setUserStatus("");
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, [page, refresh]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Users List
          </Typography>
          <div className={classes.buttonWeraper}>
            <div className="" style={{ display: "flex" }}>
              <Paper
                component="form"
                className={classes.root}
                style={{ marginLeft: "auto" }}
              >
                <IconButton className={classes.iconButton} aria-label="menu">
                  <ListOutlinedIcon />
                </IconButton>
                <Select
                  style={{ marginLeft: 10 }}
                  value={roleId}
                  onChange={handleRole}
                  displayEmpty
                  style={{ width: 130, marginRight: 10 }}
                >
                  <MenuItem value="">Assigned Role</MenuItem>
                  {roles.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
                <Select
                  style={{ marginLeft: 10 }}
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                  style={{ width: 130 }}
                  displayEmpty
                >
                  <MenuItem value="">Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="directions"
                  onClick={handleCancel}
                >
                  <CancelIcon />
                </IconButton>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonStyle}
              >
                <Link to="/add-user">Add New User</Link>
              </Button>
            </div>
          </div>
          <Grid container>
            <Grid item md={12}>
              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Assigned Role</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((row, index) => (
                          <User
                            key={index}
                            row={row}
                            pageRefresh={pageRefresh}
                            loading={loading}
                            refresh={refresh}
                            setRefresh={setRefresh}
                          />
                        ))
                      ) : (
                        <>
                          <tr>
                            {loading ? <td colSpan="5">
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                              <Skeleton
                                width="100%"
                                animation="wave"
                                height="50px"
                              />
                            </td> : <td colSpan="5" align="center" >No record found</td> }
                          </tr>
                        </>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={totalRows}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
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

export default ViewUser;
