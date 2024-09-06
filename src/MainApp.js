import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitResponse from "./Pages/CalenderScheduling/SubmitResponse";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Categories from "./components/Categories";
import Sidebar from "./components/Sidebar";
import Dashboard1 from "./components/Dashboard";
import EventType from "./Pages/Events/EventType";
import EventCalender from "./components/EventScheduleCalender/EventCalender";
import MCQExam from "./Pages/test/Test";
import CreateEvent from "./Pages/Events/CreateEvent/CreateEvent";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import CompletedForm from "./components/FormBuilder2/CompletedForm";
import RenderForm from "./components/FormBuilder2/RenderForm ";

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
            <Route path="/event-calender" element={<EventCalender />} />
            <Route path="/exam" element={<MCQExam />} />
            <Route path="/create-event/:eventType" element={<CreateEvent />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/completed-form" element={<CompletedForm />} />
            <Route path="/render-form" element={<RenderForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainApp;
