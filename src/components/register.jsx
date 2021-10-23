import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";

class Register extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Usr name"),
    password: Joi.string().required(),
    name: Joi.string().required(),
  };

  doSubmit = async () => {
    //call server save changes redirect user
    try {
      await register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        console.log("dosub", errors.username);
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("register")}
        </form>
      </div>
    );
  }
}

export default Register;
