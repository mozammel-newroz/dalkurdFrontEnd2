import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import { useLocation } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
    },
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
    float: "right",
    marginTop: "-4px",
    height: 0,
    position: "relative",
  },
  subtitleStyle: {
    fontSize: "1.22rem",
    marginBottom: 7,
  },
  checkBoxList: {
    marginLeft: 20,
  },
  headline: {
    margin: "30px 0 0 30px",
  },
  padding30: {
    padding: 30,
  },
  listHeader: {
    fontSize: "1.2rem",
  },
});

const ViewRole = () => {
  const classes = useStyle();
  const location = useLocation();
  const roleId = location.state;
  const { auth } = useContext(AuthContext);
  const [role_id, set_role_id] = useState(0);
  const [role_name, set_role_name] = useState("");
  const [permissions, set_permissions] = useState([]);
  const [permission, set_permission] = useState([]);
  const [roles, set_roles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRoles = async () => {
    setLoading(true);
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
      console.log("roles", listData);
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
  const getPermissions = async (id) => {
    setLoading(true);
    try {
      let url = `/api/role/${id}`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      set_permissions(res.data.data.permissions);
      console.log("permission", res.data.data.permissions);
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

  const handleChangeRole = (e) => {
    set_role_id(e.target.value);
    getPermissions(e.target.value);
    let roleName = roles.filter((item) => item.id === e.target.value);
    console.log("role name", roleName[0].name);
    set_role_name(roleName[0].name);
  };

  useEffect(() => {
    getRoles();
    if (roleId) {
      set_role_id(roleId);
      getPermissions(roleId);
    }
  }, [refresh]);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <div className={classes.buttonWeraper}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonStyle}
            >
              <Link to="/create-role">Create Role</Link>
            </Button>
          </div>
          <Typography variant="h4" className={classes.margin}>
            View Role
          </Typography>

          <Grid container spacing={4}>
            <Grid md="12" item>
              <div>
                <Card>
                  <CardContent className={classes.padding30}>
                    <Typography
                      variant="subtitle1"
                      className={classes.subtitleStyle}
                    >
                      Select role to view details
                    </Typography>
                    <div>
                      <TextField
                        id="outlined-select-currency"
                        select
                        // value={currency}
                        onChange={handleChangeRole}
                        // value={forward_to_id}
                        // onChange={(e) => set_forward_to_id(e.target.value)}
                        variant="outlined"
                        fullWidth
                        required
                        value={role_id}
                        InputProps={{
                          className: classes.select,
                        }}
                      >
                        {roles.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <Typography
                      variant="subtitle1"
                      className={[
                        classes.subtitleStyle,
                        classes.marginTop,
                        classes.subtitleStyle2,
                      ]}
                    >
                      {/* {role_name ? <>{role_name} have access to:</> : null} */}
                      {role_name ? <>{role_name} have access to</> : null}
                    </Typography>
                    <Grid container>
                      {Object.keys(permissions).map((parent, key) => (
                        <Grid item md={4}>
                          <Typography className={classes.listHeader}>
                            {!loading ? (
                              parent
                            ) : (
                              <Skeleton animation="wave" height="50px" />
                            )}
                          </Typography>
                          {permissions[parent].map((chield) => (
                            <Typography className={classes.chield}>
                              <ul>
                                <li>
                                  {!loading ? (
                                    chield.function_name
                                  ) : (
                                    <Skeleton animation="wave" height="50px" />
                                  )}
                                </li>
                              </ul>
                            </Typography>
                          ))}
                        </Grid>
                      ))}
                      {loading ? (
                        <>
                          <Skeleton height="50px" width="100%" />
                          <Skeleton height="50px" width="100%" />
                        </>
                      ) : null}
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ViewRole;
