import React, { Component } from "react";
import Header from "../Header/Header";
import Router from "../../routers/Router";
import AllProducts from "../../pages/AllProducts";
const Layout = () => {
    return (
      <>
        <Header />
        <div>
          <Router />
        </div>
      </>
    );
}

export default Layout;
