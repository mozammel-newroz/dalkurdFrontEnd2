import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import back from "../../assets/images/back.png";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton } from "@material-ui/lab";

const useStyle = makeStyles({
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper_inner: {
    height: 400,
    width: 500,
    background: "#fff",
    padding: 30,
  },
  header: {
    marginBottom: 15,
  },
  inputStyle: {
    marginTop: 15,
    fontSize: 18,
    padding: "7px 0",
  },
  back: {
    marginBottom: 15,
    width: 18,
    height: 18,
    padding: "29px 28px 25px 27px",
    boxShadow: "1px 2px  5px #ddd",
  },
  buttonStyle: {
    padding: " 10px",
    fontSize: 18,
    borderRadius: "50px",
    marginTop: 25,
    width: "100%",
  },
  login: {
    color: "#333",
  },
});

const ChangePassword = () => {
  const classes = useStyle();
  const history = useHistory();
  const [old_password, set_old_password] = useState("");
  const [password, set_password] = useState("");
  const [password_confirmation, set_password_confirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await axios({
        url: "/api/change-password",
        method: "post",
        data: {
          old_password,
          password,
          password_confirmation,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.code === 200) {
        logout();
        Swal.fire({
          icon: "success",
          title: "Password  successfully Updated",
          showConfirmButton: false,
          timer: 2000,

          // footer:
          //   "<a className='black_link' style='color: #333'  href='/login'>Login</a>",
        });
        set_old_password("");
        set_password_confirmation("");
        set_password_confirmation("");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper_inner}>
        <IconButton aria-label="delete" className={classes.back}>
          <Link to="/">
            <img src={back} alt="" />
          </Link>
        </IconButton>
        <Typography variant="h5" className={classes.header}>
          Reset your password
        </Typography>
        <form onSubmit={handleSubmit}>
          <>
            <Input
              className={classes.inputStyle}
              value={old_password}
              onChange={(e) => set_old_password(e.target.value)}
              placeholder="Old Password"
              type="password"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon color="disabled" />
                </InputAdornment>
              }
            />
            <Input
              className={classes.inputStyle}
              value={password}
              onChange={(e) => set_password(e.target.value)}
              placeholder="Enter New Password"
              type="password"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon color="disabled" />
                </InputAdornment>
              }
            />
            <Input
              className={classes.inputStyle}
              value={password_confirmation}
              onChange={(e) => set_password_confirmation(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon color="disabled" />
                </InputAdornment>
              }
            />
            {loading ? <LinearProgress /> : null}
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonStyle}
              type="submit"
              disabled={loading}
            >
              Continue
            </Button>
          </>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
