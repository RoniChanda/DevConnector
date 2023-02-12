import React from "react";

function SocialInput(props) {
  return (
    <div className="form-group social-input">
      <i className={`fab fa-${props.name} fa-2x`}></i>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default SocialInput;
