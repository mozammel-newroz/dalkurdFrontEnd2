import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
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
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
    },
    padding: "3px",
    height: 30,
    borderRadius: 5,
  },
});

const User = ({ row, pageRefresh, loading, refresh, setRefresh }) => {
  const classes = useStyle();
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(0);
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState("");
  // const [refresh, setRefresh] = useState(false)

  const { auth } = useContext(AuthContext);

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
    } catch (error) {}
  };

  const updateStatus = async (e) => {
    let value = e.target.checked;
    setStatus(value);
    let userStatus = "";
    if (value) {
      userStatus = "Active";
    } else {
      userStatus = "Inactive";
    }
    try {
      let res = await axios({
        url: "/api/update-user-status",
        method: "post",
        data: { status: userStatus, user_id: row.id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Updated",
          showConfirmButton: false,
          timer: 1000,
        });
        pageRefresh();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {}
  };

  const handleRole = async (value, id) => {
    setRole(value);
    try {
      let res = await axios({
        url: "/api/update-user-role",
        method: "post",
        data: { role_name: value, user_id: id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Updated",
          showConfirmButton: false,
          timer: 1000,
        });
        pageRefresh();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {}
  };

  const getStatus = () => {
    console.log("status", row.status);
    if (row.status === "Active") {
      setStatus(true);
    } else if (row.status === "Inactive") {
      setStatus(false);
    }
  };

  useEffect(() => {
    getRoles();
    // getStatus();
    setStatus(row.status);
  }, []);

  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {!loading ? row.name : <Skeleton animation="wave" height="50px" />}
      </TableCell>
      <TableCell>
        {!loading ? row.email : <Skeleton animation="wave" height="50px" />}
      </TableCell>
      <TableCell>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          fullWidth
        >
          {!loading ? (
            <Select
              className={classes.select}
              value={role === 0 ? row.roles.name : role}
              onChange={(e) => handleRole(e.target.value, row.id)}
            >
              {roles.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Skeleton animation="wave" height="50px" />
          )}
        </FormControl>
      </TableCell>
      <TableCell>
        {!loading ? (
          moment(row.created_at).format("DD-MM-Y")
        ) : (
          <Skeleton animation="wave" height="50px" />
        )}
      </TableCell>
      <TableCell>
        {!loading ? (
          <Switch
            checked={row.status}
            onChange={updateStatus}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          // <ButtonGroup
          //   disableElevation
          //   variant="outlined"
          //   color="primary"
          //   size="small"
          // >
          //   {row.status}
          //   <Button
          //     disabled={row.status === "Active" ? true : ""}
          //     value="Active"
          //     onClick={(e) => {
          //       updateStatus("Active", row.id);
          //     }}
          //   >
          //     Inactive
          //   </Button>
          //   <Button
          //     disabled={row.status === "Inactive" ? true : ""}
          //     value="Inactive"
          //     onClick={(e) => {
          //       updateStatus("Inactive", row.id);
          //     }}
          //   >

          //     Active
          //   </Button>
          // </ButtonGroup>
          <Skeleton animation="wave" height="50px" />
        )}
      </TableCell>
    </TableRow>
  );
};

export default User;
