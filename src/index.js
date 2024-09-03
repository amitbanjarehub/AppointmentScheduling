import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/CalenderScheduling/App";
import BasicDateCalendar from "./Pages/CalenderScheduling/calender";
import AppointmentForm from "./Pages/CalenderScheduling/AppointmentForm";
import MainApp from "./MainApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
