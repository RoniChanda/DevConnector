import React, { Fragment } from "react";

function ProfileAbout(props) {
  const {
    bio,
    skills,
    user: { name },
  } = props.profile;

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill) => (
          <div className="p-1" key={skill}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
        {/* <div className="p-1">
          <i className="fa fa-check"></i> HTML
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> CSS
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> JavaScript
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> Python
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> C#
        </div> */}
      </div>
    </div>
  );
}

export default ProfileAbout;
