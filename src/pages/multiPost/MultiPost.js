import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { GetUserByIdAsync } from "../../redux/userRedux/userActions";
import "./MultiPost.css";

const MultiPost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const { users, isFetching, error } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(GetUserByIdAsync(path));
  }, []);

  console.log(users)

  return (
    <div className="container">
      <div className="writerSection">
        Posts, written by <b className="writerSectionName">{users && users[0].name}</b>
      </div>
      <div className="multiPost">
        <Posts userId={path} />
        <Sidebar />
      </div>
    </div>
  );
};

export default MultiPost;
