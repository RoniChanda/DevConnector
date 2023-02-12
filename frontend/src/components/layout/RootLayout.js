import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function RootLayout() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default RootLayout;
