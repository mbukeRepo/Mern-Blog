import React, { useEffect, useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/formInput/FormInput";
import { LoginAsync } from "../../redux/authRedux/authActions";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@material-ui/icons";

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log(isFetching);

  const [validationError, setValidationError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setValidationError("");
  };

  useEffect(() => {
    if (error !== null) {
      setValidationError("Wrong email or password!");
    }
  }, [error]);

  const handleSend = (e) => {
    e.preventDefault();
    dispatch(LoginAsync(form));
  };

  return (
    <div className="login">
      <div className="loginTitle">
        <span className="loginTitleItem">Login</span>
      </div>
      <div className="loginForms">
        <form>
          <FormInput
            label="Email"
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Enter you email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            small="Password must be min 6 character"
          />
          {validationError && (
            <div className="loginAlert" role="alert">
              {validationError}
            </div>
          )}
          <button
            type="submit"
            className="loginSubmitButton"
            onClick={handleSend}
            style={
              isFetching
                ? {
                    pointerEvents: "none",
                    backgroundColor: "rgb(241, 160, 160)",
                  }
                : {}
            }
          >
            {isFetching && <div className="loader">Loading...</div>}
            Login
          </button>
        </form>
      </div>
      <div className="loginLinks">
        <Link to="/" className="loginLink">
          <HomeOutlined />
        </Link>
        <Link to="register">
          <button className="loginRegisterButton">Want to be an author</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
