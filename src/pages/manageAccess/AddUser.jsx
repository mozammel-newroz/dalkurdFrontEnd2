import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
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
  fieldName: {
    flexGrow: 1,
    marginTop: 11,
    width: 100,
  },
  fieldInput: {
    flexGrow: 2,
    width: 200,
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
  textarea: {
    borderRadius: 15,
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
  styleCancel: {
    color: "#999",
  },
  padding: {
    padding: 30,
  },
});

const AddUser = () => {
  const classes = useStyle();
  const history = useHistory();
  const [roles, set_roles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role_name, setRoleName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, set_password_confirmation] = useState(
    "12345678"
  );
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  const getRoles = async () => {
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/roles",
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      set_roles(res.data.data);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/create-user",
        method: "post",
        data: {
          name,
          email,
          role_name,
          password,
          password_confirmation,
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
        history.push("/view-user");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      console.log("response", res);
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

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Add User
          </Typography>
          <form onSubmit={handleCreate}>
            <Grid container>
              <Grid item md={7}>
                <Card>
                  <CardContent className={classes.padding}>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Name</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Enter user name"
                          variant="outlined"
                          fullWidth
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                    </div>

                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Email</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-basic"
                          type="email"
                          placeholder="Enter email"
                          variant="outlined"
                          fullWidth
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                    </div>

                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Role</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-select-currency"
                          select
                          // value={currency}
                          // onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          required
                          value={role_name}
                          onChange={(e) => setRoleName(e.target.value)}
                          InputProps={{
                            className: classes.select,
                          }}
                        >
                          {roles.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
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
                      type="submit"
                      className={classes.buttonStyle}
                    >
                      Add User
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
