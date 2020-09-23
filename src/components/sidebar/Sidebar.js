import React, { useEffect } from "react";
import "./Sidebar.css";
import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  SearchOutlined,
  Menu,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategoriesAsync } from "../../redux/categoryRedux/categoryActions";
import { CircularProgress } from "@material-ui/core";

const Sidebar = () => {
  const { categories, isFetching, error } = useSelector(
    (store) => store.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCategoriesAsync());
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarItemTitle">ABOUT US</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItemTitle">CATEGORIES</span>
        <ul className="sidebarItemList">
          {isFetching ? (
            <CircularProgress />
          ) : (
            categories.map((c) => (
              <li className="sidebarItemListItem">{c.name.toUpperCase()}</li>
            ))
          )}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItemTitle">FOLLOW US</span>
        <div className="sidebarItemSocial">
          <Facebook />
          <Twitter />
          <Pinterest />
          <Instagram />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
