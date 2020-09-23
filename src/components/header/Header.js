import React, { useState } from "react";
import "./Header.css";
import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  SearchOutlined,
} from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/authRedux/authActions";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const currentUser = useSelector((store) => store.auth.currentUser);
  const dispatch = useDispatch();
  const S3URL = process.env.REACT_APP_S3_URL_KEY;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Facebook />
        <Twitter />
        <Pinterest />
        <Instagram />
      </div>
      <div className="headerCenter">
        <ul className="headerCenterList">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="headerCenterListItem">HOME</li>
          </Link>
          <li className="headerCenterListItem">ABOUT</li>
          <li className="headerCenterListItem">CONTACT</li>
          <Link
            to="/write"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="headerCenterListItem">WRITE</li>
          </Link>
          {currentUser ? (
            <li
              className="headerCenterListItem"
              onClick={() => dispatch(Logout())}
            >
              LOGOUT
            </li>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="headerCenterListItem">LOGIN</li>
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="headerCenterListItem">SIGN UP</li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="headerRight">
        {currentUser && (
          <>
            <img
              src={
                currentUser?.profilePicture === "noAvatar.png"
                  ? require("../../assets/noAvatar.png")
                  : `${S3URL}/${currentUser.profilePicture}`
              }
              alt=""
              className="headerAvatar"
              onClick={handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to={`/user/${currentUser._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link
                to={"/account"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>My account</MenuItem>
              </Link>
              <MenuItem onClick={() => dispatch(Logout())}>Logout</MenuItem>
            </Menu>
          </>
        )}
        <SearchOutlined className="headerSearchIcon" />
        <Menu className="headerMenuIcon" />
      </div>
    </div>
  );
};

export default Header;
