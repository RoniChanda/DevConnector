import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Input from "../../components/ui/Input";
import useProfileRequests from "../../hooks/useProfileRequests";

function AddExperience() {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDate, setToDate] = useState(false);
  const { addExpOrEdu } = useProfileRequests();
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const checkboxHandler = () => {
    setFormData((prevFormData) => {
      return { ...prevFormData, current: !current };
    });
    setToDate((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addExpOrEdu(formData, "experience").then((data) => {
      if (data) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <Input
          type="text"
          placeholder="* Job Title"
          name="title"
          onChange={inputHandler}
          value={formData.title}
        />
        <Input
          type="text"
          placeholder="* Company"
          name="company"
          onChange={inputHandler}
          value={formData.company}
        />
        <Input
          type="text"
          placeholder="Location"
          name="location"
          onChange={inputHandler}
          value={formData.location}
        />
        <Input
          type="date"
          name="from"
          label="* From Date"
          onChange={inputHandler}
          value={formData.from}
        />
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={formData.current}
              onChange={checkboxHandler}
            />{" "}
            Current Job
          </p>
        </div>
        <Input
          type="date"
          name="to"
          label="To Date"
          onChange={inputHandler}
          value={formData.to}
          disabled={toDate ? "disabled" : ""}
        />
        <Input
          element="textarea"
          name="description"
          placeholder="Job Description"
          cols="30"
          rows="5"
          onChange={inputHandler}
          value={formData.description}
        />
        <button type="submit" className="btn btn-primary my-1">
          Submit
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Container>
  );
}

export default AddExperience;
