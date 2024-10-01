import React from "react";

const CustomEventWrapper = ({ children, view }) => {
  if (view === "month") {
    return <div style={{ display: "none" }}>{children}</div>; // Hide events in month view
  }
  return <div>{children}</div>; // Show events in week and day views
};

export default CustomEventWrapper;
