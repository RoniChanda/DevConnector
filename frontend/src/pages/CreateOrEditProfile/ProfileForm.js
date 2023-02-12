import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Spinner from "../../components/ui/Spinner";
import useProfileRequests from "../../hooks/useProfileRequests";
import SocialInput from "./SocialInput";

function ProfileForm(props) {
  const { profile, isLoading } = useSelector((state) => state.profile);
  const { loadProfile } = useProfileRequests();
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        company: profile.company ? profile.company : "",
        website: profile.website ? profile.website : "",
        location: profile.location ? profile.location : "",
        status: profile.status ? profile.status : "",
        skills: profile.skills ? profile.skills.join(",") : "",
        githubusername: profile.githubusername ? profile.githubusername : "",
        bio: profile.bio ? profile.bio : "",
        twitter: profile.social.twitter ? profile.social.twitter : "",
        facebook: profile.social.facebook ? profile.social.facebook : "",
        linkedin: profile.social.linkedin ? profile.social.linkedin : "",
        youtube: profile.social.youtube ? profile.social.youtube : "",
        instagram: profile.social.instagram ? profile.social.instagram : "",
      });
    }
  }, [profile, loadProfile]);

  const inputHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const socialInputsHandler = () => {
    setDisplaySocialInputs((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(formData, props.edit);
  };

  const socialInputs = (
    <Fragment>
      <SocialInput
        type="text"
        placeholder="Twitter URL"
        name="twitter"
        onChange={inputHandler}
        value={formData.twitter}
      />
      <SocialInput
        type="text"
        placeholder="Facebook URL"
        name="facebook"
        onChange={inputHandler}
        value={formData.facebook}
      />
      <SocialInput
        type="text"
        placeholder="Youtube URL"
        name="youtube"
        onChange={inputHandler}
        value={formData.youtube}
      />
      <SocialInput
        type="text"
        placeholder="Linkedin URL"
        name="linkedin"
        onChange={inputHandler}
        value={formData.linkedin}
      />
      <SocialInput
        type="text"
        placeholder="Instagram URL"
        name="instagram"
        onChange={inputHandler}
        value={formData.instagram}
      />
    </Fragment>
  );

  return isLoading === "pending" ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">
        {`${profile ? "Update" : "Create"} Your Profile`}{" "}
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <select name="status" onChange={inputHandler} value={formData.status}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <Input
          type="text"
          placeholder="Company"
          name="company"
          onChange={inputHandler}
          value={formData.company}
          text="Could be your own company or one you work for"
        />
        <Input
          type="text"
          placeholder="Website"
          name="website"
          onChange={inputHandler}
          value={formData.website}
          text="Could be your own or a company website"
        />
        <Input
          type="text"
          placeholder="Location"
          name="location"
          onChange={inputHandler}
          value={formData.location}
          text="City & state suggested (eg. Boston, MA)"
        />
        <Input
          type="text"
          placeholder="* Skills"
          name="skills"
          onChange={inputHandler}
          value={formData.skills}
          text="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
        />
        <Input
          type="text"
          placeholder="Github Username"
          name="githubusername"
          onChange={inputHandler}
          value={formData.githubusername}
          text="If you want your latest repos and a Github link, include your
          username"
        />
        <Input
          element="textarea"
          placeholder="A short bio of yourself"
          name="bio"
          onChange={inputHandler}
          value={formData.bio}
          text="Tell us a little about yourself"
        />

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={socialInputsHandler}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && socialInputs}
        <button type="submit" className="btn btn-primary my-1">
          {profile ? "Update" : "Create"}
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}

export default ProfileForm;
