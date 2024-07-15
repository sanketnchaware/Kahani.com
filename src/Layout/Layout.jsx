import React, { Children } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className=" w-11/12 m-auto ">
      <Navbar />

      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;