import React from "react";
import "./FormInput.css";

const FormInput = ({ label, type, name, onChange, placeholder, small, error }) => {
  return (
    <>
      <div className="form">
        <label className="formLabel">{label}</label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          className="formInput"
          placeholder={placeholder}
        />
        {small && <small className="formSmall">({small})</small>}
      </div>
      {error && (
        <div className="formAlert" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default FormInput;
