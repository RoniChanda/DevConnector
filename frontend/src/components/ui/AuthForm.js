import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import Input from "../ui/Input";

function AuthForm({ isRegister, onSubmit }) {
  let initialFormData;
  if (isRegister) {
    initialFormData = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  } else {
    initialFormData = {
      email: "",
      password: "",
    };
  }
  const [formData, setFormData] = useState(initialFormData);

  const inputHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">{isRegister ? "Sign Up" : "Login"}</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        {`${isRegister ? " Create" : " Login"} Your Account`}
      </p>
      <form className="form" onSubmit={submitHandler}>
        {isRegister && (
          <Input
            type="text"
            placeholder="Name"
            name="name"
            onChange={inputHandler}
            value={formData.name}
          />
        )}
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          text={
            isRegister &&
            `This site uses Gravatar so if you want a profile image, use a
          Gravatar email`
          }
          onChange={inputHandler}
          value={formData.email}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={inputHandler}
          value={formData.password}
        />
        {isRegister && (
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={inputHandler}
            value={formData.confirmPassword}
          />
        )}
        <button type="submit" className="btn btn-primary">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p className="my-1">
        {`${isRegister ? "Already" : "Don't"} have an account?`}
        <Link to={isRegister ? "/Login" : "/Register"}>
          {isRegister ? " Sign In" : " Sign Up"}
        </Link>
      </p>
    </Fragment>
  );
}

export default AuthForm;
