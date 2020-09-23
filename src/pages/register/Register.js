import React, { useEffect, useState } from "react";
import "./Register.css";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/formInput/FormInput";
import { RegisterAsync } from "../../redux/authRedux/authActions";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@material-ui/icons";

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setValidationErrors({
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
    });
  };

  const handleConfirmPassword = (event) => {
    if (event.target.value !== form.password) {
      setValidationErrors({
        ...validationErrors,
        passwordAgain: "Passwords do not match!",
      });
    } else {
      setValidationErrors({ ...validationErrors, passwordAgain: "" });
    }
  };

  useEffect(() => {
    if (error !== null) {
      if (error.split(" ")[0] === `"name"`) {
        setValidationErrors({ ...validationErrors, name: error });
      } else if (error.split(" ")[0] === `"email"`) {
        setValidationErrors({ ...validationErrors, email: error });
      } else if (error.split(" ")[0] === `"password"`) {
        setValidationErrors({ ...validationErrors, password: error });
      }
    }
  }, [error]);

  const handleSend = (e) => {
    e.preventDefault();
    dispatch(RegisterAsync(form));
  };

  return (
    <div className="register">
      <div className="registerTitle">
        <span className="registerTitleItem">Register</span>
      </div>
      <div className="registerForms">
        <form>
          <FormInput
            label="Username"
            type="text"
            name="name"
            onChange={onChange}
            placeholder="Enter your username"
            small="Username must be min 3 character"
            error={validationErrors.name}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Enter an email"
            error={validationErrors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Enter a password"
            small="Password must be min 6 character"
            error={validationErrors.password}
          />
          <FormInput
            label="Password Again"
            type="password"
            name="passwordAgain"
            onChange={handleConfirmPassword}
            placeholder="Repeat your password"
            error={validationErrors.passwordAgain}
          />
          <button
            type="submit"
            className="registerSubmitButton"
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
            Sign Up
          </button>
        </form>
      </div>
      <div className="registerLinks">
        <Link to="/" className="RegisterLink">
          <HomeOutlined />
        </Link>
        <Link to="login">
          <button className="registerLoginButton">Allready member</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
