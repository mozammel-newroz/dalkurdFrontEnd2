import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Swal from "sweetalert2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import activeIcon from "../../assets/images/active.png";
import inactive from "../../assets/images/inactive.svg";
import edit from "../../assets/images/edit.png";
import eye from "../../assets/images/eye.png";
import { Link } from "react-router-dom";
import PageviewIcon from "@material-ui/icons/Pageview";
import IconButton from "@material-ui/core/IconButton";

import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import CancelIcon from "@material-ui/icons/Cancel";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";

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
  // buttonWeraper: {
  //   float: "right",
  //   marginTop: "-65px",
  //   height: 0,
  //   position: "relative",
  // },
  buttonWeraper: {
    float: "right",
    marginTop: "-65px",
    height: 0,
    position: "relative",
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

const ManageFaq = () => {
  const classes = useStyle();
  const [faq, setFaq] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const { auth } = useContext(AuthContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFaq = async () => {
    setLoading(true);
    try {
      let url = `/api/faqs?category=${category}&status=${status}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFaq(res.data.data);
      console.log("faq data", res.data.data);
      // setTotalRows(res.data.total_rows);
      setTotalRows(res.data.total_rows);
      let list = res.data.data.map((row) => row.ans_en);
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

  const getCategory = async () => {
    try {
      let url = `/api/categories`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("ddd", res.data.data);
      setCategories(res.data.data);
      // setCategories(res.data)
    } catch (error) {
      console.log(error.response.data.messages);
    }
  };

  const handleCategory = (e) => {
    console.log("cat", e.target.value);
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getFaq();
    console.log("get faq");
  };

  const handleCancel = () => {
    setCategory("");
    setStatus("");
  };

  useEffect(() => {
    getFaq();
    getCategory();
  }, [page]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            FAQ List
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
                  value={category}
                  onChange={handleCategory}
                  displayEmpty
                  style={{ width: 130, marginRight: 10 }}
                >
                  <MenuItem value="">Category</MenuItem>
                  {categories.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
                <Select
                  style={{ marginLeft: 10 }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: 130 }}
                  displayEmpty
                >
                  <MenuItem value="">Status</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
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
                <Link to="/new-faq">Create New</Link>
              </Button>
            </div>
          </div>
          <Grid container>
            <Grid item md={12}>
              <div>
                <div className="" style={{ display: "flex" }}>
                  {/* <Paper component="form" className={classes.root} style={{ marginLeft: 'auto' }} >
                  <IconButton className={classes.iconButton} aria-label="menu">
                    <ListOutlinedIcon />
                  </IconButton>
                  <Select
                      style={{ marginLeft: 10 }}
                      value={category}
                      onChange={handleCategory}
                      displayEmpty
                      style={{ width: 140, marginRight: 10 }}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {categories.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <Select
                      style={{ marginLeft: 10 }}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={{ width: 140 }}
                      displayEmpty
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
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
                </Paper> */}
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Qusetion</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right" width="100px" >Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {faq.length > 0 ? (
                        faq.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {!loading ? (
                                row.ques_en
                              ) : (
                                <Skeleton animation="wave" height="50px" />
                              )}
                            </TableCell>
                            <TableCell>
                              {!loading ? (
                                row.category.text
                              ) : (
                                <Skeleton animation="wave" height="50px" />
                              )}
                            </TableCell>
                            <TableCell>
                              {!loading ? (
                                row.ans_en
                              ) : (
                                <Skeleton animation="wave" height="50px" />
                              )}
                            </TableCell>
                            <TableCell>
                              {!loading ? (
                                <>
                                  {row.status === 1 ? (
                                    <img src={activeIcon} alt="" />
                                  ) : (
                                    <img src={inactive} alt="" />
                                  )}
                                </>
                              ) : (
                                <Skeleton animation="wave" height="50px" />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {!loading ? (
                                <>
                                  <Link
                                    to={{ pathname: "view-faq", state: row }}
                                  >
                                    <img
                                      src={eye}
                                      alt=""
                                      style={{ marginRight: 20 }}
                                    />
                                  </Link>
                                  <Link
                                    to={{ pathname: "update-faq", state: row }}
                                  >
                                    <img src={edit} alt="" />
                                  </Link>
                                </>
                              ) : (
                                <Skeleton animation="wave" height="50px" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <>
                          <tr>
                            {loading ? (
                              <td colSpan="5">
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
                              </td>
                            ) : (
                              <td colSpan="5" align="center">
                                No record found
                              </td>
                            )}
                          </tr>
                        </>
                      )}
                    </TableBody>
                  </Table>
                  {/* <TablePagination
                    component="div"
                    count={totalRows}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10]}
                  /> */}
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ManageFaq;
