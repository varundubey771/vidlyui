import React, { Component } from "react";
const Heart = (props) => {
  let classn = "fa fa-heart";

  if (!props.liked) {
    classn += "-o";
  }

  return (
    <i
      style={{ cursor: "progress" }}
      onClick={props.onClick}
      className={classn}
    ></i>
  );
};

export default Heart;
