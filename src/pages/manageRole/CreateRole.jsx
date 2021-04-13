import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { Skeleton } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  fieldWrapper: {
    display: "flex",
    marginBottom: 30,
  },
  input: {
    padding: "5px",
    height: 45,
    borderRadius: 15,
  },
  margin: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  subtitleStyle2: {
    paddingBottom: 3,
    borderBottom: "1px solid #ddd",
  },
  buttonStyle: {
    padding: " 10px 30px",
    fontSize: 14,
    borderRadius: "25px",
    marginLeft: 20,
  },
  buttonWeraper: {
    marginTop: 25,
    float: "right",
  },
  subtitleStyle: {
    fontSize: "1.22rem",
    marginBottom: 7,
  },
  checkBoxList: {
    marginLeft: 20,
    color: "#666",
  },
  headline: {
    margin: "30px 0 0 30px",
  },
  padding30: {
    padding: 30,
  },
  listHeader: {
    color: "#333",
  },
});

const CreateRole = () => {
  const classes = useStyle();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [role_name, set_role_name] = useState("");
  const [myList, setMylist] = useState([]);
  const [roles, set_roles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

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
      let listData = res.data.data;
      set_roles(listData);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        // timer: 2000,
      });
    }
  };

  const getPermissions = async () => {
    setLoading(true);
    try {
      let url = `/api/module-permissions`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      let listData = res.data.data;
      myArray(listData);
      setRefresh(!refresh);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let list = formatMyList();
    console.log("permission", list);
    try {
      let res = await axios({
        url: "/api/role",
        method: "post",
        data: {
          role_name,
          permissions: list,
        },
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
        set_role_name("");
        history.push("/view-role");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1000,
        });
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

  const myArray = (allData) => {
    let list = [];
    Object.keys(allData).map((parent) => {
      let inner = [];
      allData[parent].map((child) => {
        inner.push({
          function_name: child.function_name,
          select: false,
          module_name: child.module_name,
          id: child.id,
        });
      });
      list.push({ parent: parent, child: inner });
      setMylist(list);
    });
  };

  const handleCheckList = (checked, name, parent) => {
    let mylist2 = [];
    myList.forEach((e) => {
      if (e.parent === parent) {
        e.child.map((item) => {
          if (item.function_name === name) {
            item.select = checked;
          }
          return item;
        });
      }
      mylist2.push(e);
    });
    setMylist(mylist2);
  };

  const handleCheckListHeader = (checked, parent) => {
    let mylist2 = [];
    myList.forEach((e) => {
      if (e.parent === parent) {
        e.child.map((item) => {
          item.select = checked;
          return item;
        });
      }
      mylist2.push(e);
    });
    setMylist(mylist2);
  };

  const formatMyList = () => {
    let formatList = [];
    myList.forEach((e) => {
      e.child.map((item) => {
        if (item.select) {
          return formatList.push(item.function_name);
        }
      });
    });
    return formatList;
  };

  useEffect(() => {
    getPermissions();
    getRoles();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Create New Role
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid md={9} item>
                <div>
                  <Card>
                    <CardContent className={classes.padding30}>
                      <Typography
                        variant="subtitle1"
                        className={classes.subtitleStyle}
                      >
                        Role Name
                      </Typography>
                      <div>
                        <TextField
                          required
                          id="outlined-basic"
                          placeholder="E.g. Marketing Manager"
                          variant="outlined"
                          fullWidth
                          value={role_name}
                          onChange={(e) => set_role_name(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                      <Typography
                        variant="subtitle1"
                        className={
                          classes.subtitleStyle +
                          " " +
                          classes.marginTop +
                          " " +
                          classes.subtitleStyle2
                        }
                      >
                        Select Permissions
                      </Typography>
                      <Grid container>
                        {loading ? (
                          <>
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
                          </>
                        ) : (
                          myList.map((list, index) => (
                            <Grid item md={4} key={index}>
                              <FormControlLabel
                                className={classes.listHeader}
                                control={
                                  <Checkbox
                                    onChange={(e) => {
                                      handleCheckListHeader(
                                        e.target.checked,
                                        e.target.name
                                      );
                                    }}
                                    color="primary"
                                    name={list.parent}
                                    value={list.parent}
                                  />
                                }
                                label={
                                  <span style={{ fontSize: "1.15rem" }}>
                                    {list.parent}
                                  </span>
                                }
                              />
                              <br />
                              {list.child.map((child, index2) => (
                                <div key={index2}>
                                  <FormControlLabel
                                    className={classes.checkBoxList}
                                    control={
                                      <Checkbox
                                        onChange={(e) =>
                                          handleCheckList(
                                            e.target.checked,
                                            e.target.name,
                                            list.parent
                                          )
                                        }
                                        color="primary"
                                        name={child.function_name}
                                        value={child.function_name}
                                        checked={child.select}
                                      />
                                    }
                                    label={
                                      <span style={{ fontSize: "1.0rem" }}>
                                        {child.function_name}
                                      </span>
                                    }
                                  />
                                  <br />
                                </div>
                              ))}
                            </Grid>
                          ))
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                  {loading ? (
                    <LinearProgress style={{ marginTop: 20 }} />
                  ) : (
                    <div className={classes.buttonWeraper}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.buttonStyle}
                        type="submit"
                      >
                        Create Role
                      </Button>
                    </div>
                  )}
                </div>
              </Grid>

              <Grid md={3} item>
                <div className={classes.contentRoot}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        className={
                          classes.subtitleStyle + " " + classes.subtitleStyle2
                        }
                      >
                        Existing roles
                      </Typography>

                      {roles.map((role, index) => (
                        <div key={index}>
                          <Typography
                            variant="subtitle1"
                            className={
                              classes.subtitleStyle + " " + classes.marginTop
                            }
                          >
                            <Link
                              style={{ color: "#333" }}
                              to={{ pathname: "/view-role", state: role.id }}
                            >
                              {role.name}
                            </Link>
                          </Typography>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
