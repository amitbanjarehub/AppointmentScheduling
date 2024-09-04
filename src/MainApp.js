import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitResponse from "./Pages/CalenderScheduling/SubmitResponse";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Categories from "./components/Categories";
import Sidebar from "./components/Sidebar";
import Dashboard1 from "./components/Dashboard";
import EventType from "./Pages/Events/EventType";

const MainApp = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calender" element={<Layout />} />
            <Route path="/submit-response" element={<SubmitResponse />} />
          </Routes>

          <Routes>
            <Route path="/dashboard1" element={<Dashboard1 />} />
            <Route path="/event-type" element={<EventType />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Categories />} />
            <Route path="/customers" element={<Categories />} />
            <Route path="/settings" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainApp;
