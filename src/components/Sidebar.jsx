import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
// import { Memu } from "@material-ui/icons/Menu";
import Topbar from "./Topbar";
import "../assets/css/sidebar.css";

import { makeStyles } from "@material-ui/core/styles";
import myHome from "../assets/images/home.svg";
import gift from "../assets/images/gift.png";
import edit2 from "../assets/images/edit2.png";
import list from "../assets/images/list.png";
import manage_role from "../assets/images/manage_role.png";
import view_role from "../assets/images/view_role.png";
import create_role from "../assets/images/create_role.png";
import lock from "../assets/images/lock.svg";
import userAdd from "../assets/images/userAdd.svg";
import faq from "../assets/images/faq.png";
import notificationList from "../assets/images/notificationList.png";
import send from "../assets/images/send.png";
import video from "../assets/images/video.svg";
import bell from "../assets/images/bell.png";

const useStyles = makeStyles((theme) => ({
  iconHome: {
    // background: "url({IconMenu})",
  },
  iconImage: {
    position: "relative",
    top: 0,
    width: 22,
  marginRight: 10,
    paddingLeft: 7,
  },
  iconImageSub: {
    position: "relative",
    top: 5,
    width: 20,
    marginRight: 15,
    paddingLeft: 7,
  },
  active: {
    color: '#999 !important'
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation()
  const path = location.pathname
  return (
    <div>
      <Topbar />
      <ProSidebar >
        <Menu iconShape="square">
          <MenuItem
            icon={<img src={myHome} alt="" className={classes.iconImage} />}
          >
            <Link to="/" className={ path === '/' ? classes.active : '' } >Home</Link>
          </MenuItem>
          <SubMenu
            title="Promotions"
            icon={<img src={gift} alt="" className={classes.iconImage} />}
            className={ path === '/create-promotion' || path === '/promotion-list' ? classes.active : '' }
          >
            <MenuItem>
              <Link to="/create-promotion">
                <img src={edit2} alt="" className={classes.iconImageSub} />{" "}
                Create Promotions
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/promotion-list">
                <img src={list} alt="" className={classes.iconImageSub} />
                Promotions List
              </Link>
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Push Notifications"
            icon={<img src={bell} alt="" className={classes.iconImage} />}
            className={ path === '/send-notification' || path === '/notification-list' ? classes.active : '' }
            
          >
            <MenuItem>
              <Link to="/send-notification">
                <img src={send} alt="" className={classes.iconImageSub} /> Send
                Notification
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/notification-list">
                <img
                  src={notificationList}
                  alt=""
                  className={classes.iconImageSub}
                />
                Notification List
              </Link>
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Manage Role"
            icon={
              <img src={manage_role} alt="" className={classes.iconImage} />
            }
            className={ path === '/create-role' || path === '/view-role' ? classes.active : '' }
          >
            <MenuItem>
              <Link to="/create-role">
                <img
                  src={create_role}
                  alt=""
                  className={classes.iconImageSub}
                />{" "}
                Create Role
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/view-role">
                <img src={view_role} alt="" className={classes.iconImageSub} />
                View Role
              </Link>
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Manage Access"
            icon={<img src={lock} alt="" className={classes.iconImage} />}
            className={ path === '/add-user' || path === '/view-user' ? classes.active : '' }
            
          >
            <MenuItem>
              <Link to="/add-user">
                <img src={userAdd} alt="" className={classes.iconImageSub} />{" "}
                Add User
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/view-user">
                <img src={view_role} alt="" className={classes.iconImageSub} />
                View User
              </Link>
            </MenuItem>
          </SubMenu>
          
          <MenuItem
            icon={<img src={faq} alt="" className={classes.iconImage} />}
          >
            <Link to="/manage-faq" className={ path === '/manage-faq' ? classes.active : '' } >Manage FAQ</Link>
          </MenuItem>
          <MenuItem
            icon={<img src={video} alt="" className={classes.iconImage} />}
          >
            <Link to="/how-to-videos" className={ path === '/how-to-videos' ? classes.active : '' } >How to Videos</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
