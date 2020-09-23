import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../postItem/PostItem";
import "./Posts.css";
import { GetAllPostsAsync } from "../../redux/postRedux/postActions";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Posts = ({ userId }) => {
  const [allPosts, setAllPosts] = useState([]);
  const { posts, isFetching, error } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllPostsAsync());
  }, []);

  useEffect(() => {
    userId
      ? setAllPosts(posts.filter((p) => p.user.id === userId))
      : setAllPosts(posts);
  }, [posts]);

  return (
    <div className="posts">
      <div className="postsItems">
        {isFetching ? (
          <CircularProgress className="postsSpinner" />
        ) : error ? (
          <div className="postsError">
            {error}!<span className="postsErrorBelow">Please Try Later</span>
          </div>
        ) : (
          allPosts?.map((p) => (
            <Link
              to={`/post/${p._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <PostItem
                key={p._id}
                id={p._id}
                title={p.title}
                desc={p.desc}
                photo={p.photo}
                user={p.user}
                categories={p.categories}
                createdAt={p.createdAt}
              />
            </Link>
          ))
        )}
      </div>
      <hr />
      <div className="postsPagination">
        <span className="postsPaginationText">&#8810; NEW POSTS</span>
        <span className="postsPaginationNumber">1</span>
        <span className="postsPaginationText active">OLDER POSTS &#8811;</span>
      </div>
    </div>
  );
};

export default Posts;
