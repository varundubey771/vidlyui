import React from "react";
const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.name}> {props.label}</label>
      <input
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        errors={props.errors}
        type={props.type}
        className="form-control"
      ></input>
      {props.errors && <div className="alert alert-danger">{props.errors}</div>}
    </div>
  );
};

export default Input;
