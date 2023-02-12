import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Input from "../../components/ui/Input";
import useProfileRequests from "../../hooks/useProfileRequests";

function AddEducation() {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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
    addExpOrEdu(formData, "education").then((data) => {
      if (data) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <Input
          type="text"
          placeholder="* School or Bootcamp"
          name="school"
          onChange={inputHandler}
          value={formData.school}
        />
        <Input
          type="text"
          placeholder="* Degree or Certificate"
          name="degree"
          onChange={inputHandler}
          value={formData.degree}
        />
        <Input
          type="text"
          placeholder="* Field of Study"
          name="fieldofstudy"
          onChange={inputHandler}
          value={formData.fieldofstudy}
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
            Current School or Bootcamp
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
          placeholder="Program Description"
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

export default AddEducation;
