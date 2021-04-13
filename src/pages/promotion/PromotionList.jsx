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

import active from "../../assets/images/active.png";
import inactive from "../../assets/images/inactive.svg";
import edit from "../../assets/images/edit.png";
import eye from "../../assets/images/eye.png";
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
    width: 500,
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

const PromotionList = () => {
  const classes = useStyle();
  const [offers, setOffers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [is_bundle_offer, set_is_bundle_offer] = useState("")

  const { auth } = useContext(AuthContext);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPromotions = async () => {
    setLoading(true);
    try {
      let url = `/api/promotional-offers?page=${
        page + 1
      }&forward_to=${category}&status=${status}&bundle_offer=${is_bundle_offer}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setOffers(res.data.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    getPromotions();
    console.log("get faq");
  };

  const handleCancel = () => {
    setCategory("");
    setStatus("");
  };
  const handleCategory = (e) => {
    console.log("cat", e.target.value);
    setCategory(e.target.value);
  };

  useEffect(() => {
    getPromotions();
    getCategory();
  }, [page]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Promotions List
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
                  <MenuItem value="">Forwarded to</MenuItem>
                  {categories.map((item, index) => (
                    <MenuItem value={item.id} key={index} >{item.name}</MenuItem>
                  ))}
                </Select>
                <Select
                  style={{ marginLeft: 10, width: 130 }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Status</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
                <Select
                  style={{ marginLeft: 50, background: 'red' }}
                  value={is_bundle_offer}
                  onChange={(e) => set_is_bundle_offer(e.target.value)}
                  style={{ width: 100, marginLeft: 10 }}
                  displayEmpty
                >
                  <MenuItem value="">Is Bundle</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                  <MenuItem value="0">No</MenuItem>
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
              <Link to="/create-promotion">Create New Promotion</Link>
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
                        <TableCell>Title</TableCell>
                        <TableCell>Forwarded to</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Is bundle offer</TableCell>
                        <TableCell align="right"  width='100px'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {offers.length > 0 ? (
                        offers.map((row) => (
                          <TableRow key={row.id}>
                            {loading ? (
                              <>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  animation="wave"
                                >
                                  <Skeleton />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  animation="wave"
                                >
                                  <Skeleton />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  animation="wave"
                                >
                                  <Skeleton />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  animation="wave"
                                >
                                  <Skeleton />
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell component="th" scope="row">
                                  {row.title}
                                </TableCell>
                                <TableCell>{row.forward_to.text}</TableCell>
                                <TableCell>
                                  {row.status === 1 ? (
                                    <img src={active} alt="" />
                                  ) : (
                                    <img src={inactive} alt="" />
                                  )}
                                </TableCell>
                                <TableCell>
                                  {row.is_bundle_offer === 1 ? (
                                    <img src={active} alt="" />
                                  ) : (
                                    <img src={inactive} alt="" />
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  <Link
                                    to={{
                                      pathname: "/promotion-details",
                                      state: row,
                                    }}
                                  >
                                    <img
                                      src={eye}
                                      alt=""
                                      style={{ marginRight: 20 }}
                                    />
                                  </Link>
                                  <Link
                                    to={{
                                      pathname: "/update-promotion",
                                      state: row,
                                    }}
                                  >
                                    <img src={edit} alt="" />
                                  </Link>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))
                      ) : (
                        <>
                          <tr>
                            {loading ? (
                              <td colSpan="4">
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
                              </td>
                            ) : (
                              <td colSpan="4" align="center">
                                {" "}
                                No record found{" "}
                              </td>
                            )}
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
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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

export default PromotionList;
