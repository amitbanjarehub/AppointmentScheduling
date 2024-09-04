import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitResponse from "./Pages/CalenderScheduling/SubmitResponse";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";



const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard/>} />
        <Route path="/calender" element={<Layout />} />
        <Route path="/submit-response" element={<SubmitResponse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
