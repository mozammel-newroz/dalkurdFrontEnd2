import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../assets/images/logo.png";
import IconMenu from "../assets/images/menu.png";
import Avatar from "../assets/images/avatar.png";
import { AuthContext } from "../context/AuthContext";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 9,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
    marginTop: 7,
  },
  appBarStyele: {
    background: "#fff",
    color: "#333",
  },
  menuItem: {
    borderBottom: "1px solid #eee",
    cursor: "default",
  },
}));

export default function Topbar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { logout, auth } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setAnchorEl(null);
    logout();
  };

  const changePassword = () => {
    history.push("/change-password");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarStyele} elevation={3}>
        <Toolbar>
          <IconButton
            disabled
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={IconMenu} alt="" />
          </IconButton>
          <div className={classes.logo}>
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ height: 0, backgroundColor: "transparent" }}
          >
            <img src={Avatar} alt="" />
          </Button>
          {/* <button onClick={handleClick} style={{ margin: 0, padding: 0, border: '0 solid #ddd' }}>
          <img src={Avatar} alt="" />
          </button> */}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <img src={Avatar} alt="" />
              <Typography>{auth.user.name} </Typography>
            </MenuItem>
            <MenuItem onClick={changePassword}>Change Password</MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
