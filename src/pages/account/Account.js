import React, { useEffect, useState } from "react";
import "./Account.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import S3 from "react-aws-s3";
import {
  DeleteUserAsync,
  UpdateUserAsync,
} from "../../redux/userRedux/userActions";
import { ChangeProfile } from "../../redux/authRedux/authActions";
import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Account = () => {
  const [open, setOpen] = React.useState(false);
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
  });

  const { currentUser } = useSelector((store) => store.auth);
  const { isFetching } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const S3URL = process.env.REACT_APP_S3_URL_KEY;

  const config = {
    bucketName: "react-blog-app",
    region: "eu-west-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };
  const s3Client = new S3(config);

  useEffect(() => {
    file && setPhoto(URL.createObjectURL(file));
  }, [file]);

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(Date.now() + e.target.files[0].name);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = currentUser.token;
    const { name, email, password } = user;
    const updatedUser = {};
    Object.assign(
      updatedUser,
      name && { name },
      email && { email },
      password && { password },
      fileName && { profilePicture: fileName }
    );

    file && currentUser?.profilePicture !== "noAvatar.png"
      ? await s3Client.deleteFile(currentUser?.profilePicture).then(
          await s3Client
            .uploadFile(file, fileName.split(".")[0])
            .then((response) =>
              dispatch(UpdateUserAsync(currentUser._id, token, updatedUser))
            )
            .catch((err) => console.error(err))
        )
      : await s3Client
          .uploadFile(file, fileName.split(".")[0])
          .then((response) =>
            dispatch(UpdateUserAsync(currentUser._id, token, updatedUser))
          )
          .catch((err) => console.error(err));

    dispatch(ChangeProfile(updatedUser));
    setOpen(true);
  };

  const handleDelete = () => {
    currentUser?.profilePicture !== "noAvatar.png"
      ? s3Client
          .deleteFile(currentUser?.profilePicture)
          .then(dispatch(DeleteUserAsync(currentUser?._id, currentUser?.token)))
          .catch((err) => console.error(err))
      : dispatch(DeleteUserAsync(currentUser?._id, currentUser?.token));
  };

  return (
    <div className="account">
      <div className="accountArea">
        <div className="accountTitle">
          <span className="accountTitleUpdate">Update Your Account</span>
          <span className="accountTitleDelete" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form onSubmit={handleSubmit} className="accountForm">
          <label>Profile Picture</label>
          <div className="accountPP">
            <img
              src={
                photo
                  ? photo
                  : currentUser?.profilePicture === "noAvatar.png"
                  ? require("../../assets/noAvatar.png")
                  : `${S3URL}/${currentUser.profilePicture}`
              }
              alt=""
            />
            <label htmlFor="file-input">
              <div className="accountPPButton">Change</div>
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              className="accountPPInput"
              onChange={onChangeFile}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={currentUser.name}
            name="name"
            onChange={onChangeUser}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={currentUser.email}
            name="email"
            onChange={onChangeUser}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeUser}
          />
          <label>Password Again</label>
          <input type="password" placeholder="Password Again" />
          <button className="accountSubmitButton" type="submit">
            {isFetching && (
              <CircularProgress className="accountProgress" size={20} />
            )}
            Update
          </button>
        </form>
      </div>
      <Sidebar />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Account updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Account;
