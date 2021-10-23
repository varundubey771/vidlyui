import React, { Component } from "react";
import Input from "./input";
import Joi, { errors } from "joi-browser";
import Form from "./form";
import { auth } from "../../services/userService";
class LoginForm extends Form {
  //initialize state
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Usr name"),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    //call server save changes redirect user
    try {
      await auth(this.state.data);
      console.log("submitted");
    } catch (ex) {
      var errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {this.renderInput("password", "Password", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
