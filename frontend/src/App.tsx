import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className=" w-screen h-screen">
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>\{" "}
      </Routes>
    </div>
  );
}
