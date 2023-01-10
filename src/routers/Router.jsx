import React from "react";

import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/productDetails" element={<ProductDetails/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/addProduct" element={<AddProduct/>}/>
            <Route path="/allProducts" element={<AllProducts/>}/>
            <Route path={`/product/:id`} element={<ProductDetails/>}/>
        </Routes>
    );
}

export default Router;
