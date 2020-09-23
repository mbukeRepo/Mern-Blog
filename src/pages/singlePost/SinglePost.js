import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SinglePost.css";
import { Create, Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  DeletePostAsync,
  GetPostByIdAsync,
  UpdatePostAsync,
} from "../../redux/postRedux/postActions";
import Popup from "reactjs-popup";
import S3 from "react-aws-s3";
import { CircularProgress } from "@material-ui/core";
import TextareaAutosize from "react-textarea-autosize";
import { format } from "timeago.js";

const SinglePost = () => {
  const [updateMod, setUpdateMod] = useState(false);
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const { currentUser } = useSelector((store) => store.auth);
  const { isFetching, posts } = useSelector((store) => store.post);
  const { categories } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const inputRef = useRef();
  const S3URL = process.env.REACT_APP_S3_URL_KEY;
  const [updatedPost, setUpdatedPost] = useState({
    title: posts[0]?.title,
    desc: posts[0]?.desc,
    categories: posts[0]?.categories,
  });

  const config = {
    bucketName: "react-blog-app",
    region: "eu-west-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };
  const s3Client = new S3(config);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(UpdatePostAsync({id:path, post:updatedPost, token:currentUser?.token}));
  };

  const handleDelete = async () => {
    posts[0].photo !== "noPhoto"
      ? await s3Client
          .deleteFile(posts[0].photo)
          .then((response) =>
            dispatch(DeletePostAsync(posts[0]?._id, currentUser.token))
          )
          .catch((err) => console.error(err))
      : dispatch(DeletePostAsync(posts[0]?._id, currentUser.token));
  };

  useEffect(() => {
    dispatch(GetPostByIdAsync(path));
  }, []);

  useEffect(() => {
    setUpdatedCategories(posts[0].categories);
  }, [posts]);

  useEffect(() => {
    inputRef.current.focus();
  }, [updateMod]);

  const handleCategory = (name) => {
    updatedCategories.includes(name)
      ? setUpdatedCategories(updatedCategories.filter((u) => u !== name))
      : setUpdatedCategories([...updatedCategories, name]);
  };

  useEffect(() => {
    setUpdatedPost({ ...updatedPost, categories: updatedCategories });
  }, [updatedCategories]);

  return (
    <div className="singlePost">
      <div className="post">
        {posts[0].photo !== "noPhoto" && (
          <img src={`${S3URL}/${posts[0]?.photo}`} alt={posts[0]?.title} />
        )}
        <span
          className="postTitle"
          style={{ display: updateMod ? "none" : "" }}
        >
          {posts[0]?.title}
          {posts[0]?.user?.id === currentUser._id && (
            <div className="postIcons">
              <Create onClick={() => setUpdateMod(true)} />
              <Popup trigger={<Delete />} modal closeOnDocumentClick>
                {(close) => (
                  <div className="postSure">
                    Are you sure to delete this post?
                    <div className="postSureButtons">
                      <button className="postSureButton" onClick={handleDelete}>
                        Delete
                      </button>
                      <button className="postSureButton" onClick={close}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          )}
        </span>
        <input
          className="postTitle postTitleUpdate"
          autoFocus
          type="text"
          placeholder={posts[0]?.title}
          style={{ display: updateMod ? "" : "none" }}
          ref={inputRef}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, title: e.target.value })
          }
        />
        <p className="postDesc" style={{ display: updateMod ? "none" : "" }}>
          {posts[0]?.desc}
        </p>
        <div className="postAuthorInfo">
          <span>
            Author:{" "}
            <Link
              to={`/user/${posts[0]?.user?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <b>{posts[0]?.user?.name}</b>
            </Link>
          </span>
          <span>
            <b>{format(posts[0]?.createdAte)}</b>
          </span>
        </div>
        <TextareaAutosize
          className="postDescUpdate"
          style={{ display: updateMod ? "" : "none" }}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, desc: e.target.value })
          }
        >
          {posts[0]?.desc}
        </TextareaAutosize>
        <div
          className="postUpdateCategories"
          style={{ display: updateMod ? "" : "none" }}
        >
          <ul className="postUpdateList">
            {categories.map((c) => (
              <li
                className="postUpdateListItem"
                style={{
                  backgroundColor: updatedCategories.includes(c.name)
                    ? "teal"
                    : "lightcoral",
                }}
                onClick={() => handleCategory(c.name)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="postUpdateButtons"
          style={{ display: updateMod ? "" : "none" }}
        >
          <button className="postUpdateButton update" onClick={handleUpdate}>
            {isFetching && (
              <CircularProgress className="progress" size="20px" />
            )}
            Update
          </button>
          <button className="postUpdateButton">Cancel</button>
        </div>
      </div>
      <Sidebar />
      <div></div>
    </div>
  );
};

export default SinglePost;
