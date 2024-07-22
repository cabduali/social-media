// src/Pages/Pages.jsx
import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Regsiter"; 
import Reset from "./Reset";
import FriendProfile from "./FriendProfile";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
        <Route path="/profile/:id" element={<FriendProfile />}></Route>
      </Routes>
    </div>
  );
};

export default Pages;
