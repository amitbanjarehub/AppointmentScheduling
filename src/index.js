import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/CalenderScheduling/App";
import AppointmentForm from "./Pages/CalenderScheduling/AppointmentForm";
import MainApp from "./MainApp";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);
