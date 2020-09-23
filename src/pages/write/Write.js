import React, { useRef, useState } from "react";
import "./Write.css";
import { Add } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AddPostAsync } from "../../redux/postRedux/postActions";
import S3 from "react-aws-s3";

const Write = () => {
  const [title, setTitle] = useState("");
  const [titleAdd, setTitleAdd] = useState(true);
  const [desc, setDesc] = useState("");
  const [descAdd, setDescAdd] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const config = {
    bucketName: "react-blog-app",
    region: "eu-west-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };
  const s3Client = new S3(config);

  const { isFetching, error } = useSelector((store) => store.post);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(Date.now() + e.target.files[0].name);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const token = currentUser.token;
    const post = {
      title,
      desc,
      photo: fileName ? fileName : "noPhoto",
      categories: ["cat1,cat2"],
      user: { id: currentUser._id, name: currentUser.name },
    };

    file
      ? await s3Client
          .uploadFile(file, fileName.split(".")[0])
          .then((response) => dispatch(AddPostAsync(post, token)))
          .catch((err) => console.error(err))
      : dispatch(AddPostAsync(post, token));
  };

  return (
    <div className="write">
      <form onSubmit={handleSend} className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="file-input">
            <Add
              style={{ visibility: titleAdd ? "" : "hidden" }}
              className="writeFormGroupAddIcon"
            />
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={onChangeFile}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onFocus={() => {
              setTitleAdd(true);
              setDescAdd(false);
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <Add
            style={{ visibility: descAdd ? "" : "hidden" }}
            className="writeFormGroupAddIcon"
          />
          <textarea
            className="writeText"
            placeholder="Tell your story..."
            type="text"
            onFocus={() => {
              setDescAdd(true);
              setTitleAdd(false);
            }}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmitButton" type="submit">
          {isFetching && (
            <CircularProgress
              className="writeSpine"
              size="20"
              color="inherit"
            />
          )}
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
