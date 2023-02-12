import React from "react";

function Input(props) {
  return (
    <div className="form-group">
      {props.label && <h4>{props.label}</h4>}
      {props.element !== "textarea" ? (
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={!!props.required}
          minLength={props.minLength}
          disabled={props.disabled}
        />
      ) : (
        <textarea
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={!!props.required}
          minLength={props.minLength}
          cols={props.cols}
          rows={props.rows}
        />
      )}
      {props.text && <small className="form-text">{props.text}</small>}
    </div>
  );
}

export default Input;
