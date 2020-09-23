import React from "react";
import "./PostItem.css";
import { format } from "timeago.js";

const PostItem = ({ id, title, desc, photo, user, categories, createdAt }) => {
  const S3URL = process.env.REACT_APP_S3_URL_KEY;
  return (
    <div className="postItem">
      <img
        src={
          photo === "noPhoto"
            ? require("../../assets/bg/loginBG.jpeg")
            : `${S3URL}/${photo}`
        }
        alt={title}
      />
      <div className="postItemInfo">
        <span className="postItemInfoCategory">
          {categories.map(
            (c, index) =>
              `${c.toUpperCase()}${index < categories.length - 1 ? "/" : ""}`
          )}
        </span>
        <span className="postItemInfoTitle">{title}</span>
        <hr />
        <span className="postItemInfoDate">{format(createdAt)}</span>
      </div>
      <p className="postItemDesc">{desc}</p>
    </div>
  );
};

export default PostItem;
