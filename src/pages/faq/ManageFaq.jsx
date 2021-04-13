import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
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
  rearrange: {
    padding: " 5px 20px",
    fontSize: 14,
    borderRadius: "25px",
    marginLeft: 20,
    position: "fixed",
    right: 35,
    bottom: 5,
    zIndex: 9,
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
    width: 450,
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
  const [rearrange, setRearrange] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [appFor, setAppFor] = useState("");

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
      let url = `/api/faqs?category=${category}&status=${status}&app_for=${appFor}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFaq(res.data.data);
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
      setCategories(res.data.data);
      // setCategories(res.data)
    } catch (error) {
      console.log(error.response.data.messages);
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getFaq();
  };

  const handleCancel = () => {
    setCategory("");
    setStatus("");
    setAppFor("");
  };

  const handleRearrange = async () => {
    setLoading(true);
    const faq_data_json = [];
    faq.map((e) => {
      let list = {};
      list.faq_id = parseInt(e.id);
      list.serial = parseInt(e.serial_no);
      faq_data_json.push(list);
    });

    try {
      let url = `/api/faqs-serial-update`;
      let res = await axios({
        url: url,
        method: "post",
        data: { faq_data_json: JSON.stringify(faq_data_json) },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });
        setRearrange(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(faq);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    let serial = 0;
    items.map((e) => {
      serial += 1;
      e.serial_no = serial;
      return e;
    });

    setFaq(items);
    setRearrange(true);
  }

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
          {rearrange ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.rearrange}
              onClick={handleRearrange}
            >
              Re-Arrange FAQ
            </Button>
          ) : null}
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
                  value={category}
                  onChange={handleCategory}
                  displayEmpty
                  style={{ width: 100, marginRight: 10 }}
                >
                  <MenuItem value="">Category</MenuItem>
                  {categories.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={status}
                  onChange={(e) => setAppFor(e.target.value)}
                  style={{ width: 300, marginRight: 10 }}
                  displayEmpty
                >
                  <MenuItem value="">App for</MenuItem>
                  <MenuItem value="sr">SR</MenuItem>
                  <MenuItem value="agent">Agent</MenuItem>
                  <MenuItem value="merchant">Merchant</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                </Select>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: 130, marginLeft: 10 }}
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
                <div className="" style={{ display: "flex" }}></div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>App for</TableCell>
                        <TableCell>Qusetion</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right" width="100px">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="characters">
                        {(provided) => (
                          <TableBody
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {faq.length > 0 ? (
                              faq.map((row, index) => (
                                <Draggable
                                  key={row.id}
                                  draggableId={`faq${row.id}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <TableRow
                                      key={row.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <TableCell width="100px">
                                        {!loading ? (
                                          row.category.text
                                        ) : (
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {!loading ? (
                                          row.app_for
                                        ) : (
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {!loading ? (
                                          row.ques_en
                                        ) : (
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
                                        )}
                                      </TableCell>

                                      <TableCell>
                                        {!loading ? (
                                          row.ans_en
                                        ) : (
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
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
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {!loading ? (
                                          <>
                                            <Link
                                              to={{
                                                pathname: "view-faq",
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
                                                pathname: "update-faq",
                                                state: row,
                                              }}
                                            >
                                              <img src={edit} alt="" />
                                            </Link>
                                          </>
                                        ) : (
                                          <Skeleton
                                            animation="wave"
                                            height="50px"
                                          />
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Draggable>
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
                        )}
                      </Droppable>
                    </DragDropContext>
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
