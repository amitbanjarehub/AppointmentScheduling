import React from "react";
import { Typography } from "@mui/material";
import moment from "moment";

const DateHeader = ({ date, label, appointments, holidayDates, weekEnd1 }) => {
  const day = date.getDay();
  const countOnDate = appointments.filter((appointment) =>
    moment(appointment.start).isSame(date, "day")
  ).length;

  const isHoliday =
    holidayDates.length > 0 &&
    holidayDates.some((holiday) => moment(holiday).isSame(date, "day"));
  
  const isWeekend =
    weekEnd1.length > 0 ? weekEnd1.includes(day) : day === 0 || day === 6;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "12px" }}>
        {label}
        {isWeekend && (
          <Typography variant="subtitle1" sx={{ color: "red", fontWeight: "bold" }}>
            Holiday
          </Typography>
        )}
        {isHoliday && (
          <Typography variant="subtitle1" sx={{ color: "red", fontWeight: "bold" }}>
            Holiday
          </Typography>
        )}
      </div>
      {countOnDate > 0 && (
        <>
          <Typography variant="h5" sx={{ color: "#D2691E", fontWeight: "bold" }}>
            {countOnDate}
          </Typography>
          <Typography variant="caption">Appointments</Typography>
        </>
      )}
    </div>
  );
};

export default DateHeader;
