import React from "react";
import Alert from "./Alert";

function Container(props) {
  return (
    <section className={`container ${props.className}`}>
      <Alert />
      {props.children}
    </section>
  );
}

export default Container;
