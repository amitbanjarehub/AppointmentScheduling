import React, { useState } from "react";
import "./style.css";
import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";
import { Stack, Button, Typography } from "@mui/material";

const Calendar = ({ onNextClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getDaysArray = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const blanks = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(
      null
    );
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...days];
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const timeSlots = [
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
  };

  const isPastDate = (date) => {
    const today = new Date();
    const dateToCheck = new Date(currentYear, currentMonth, date);
    return dateToCheck < today;
  };

  const isSunday = (date) => {
    return new Date(currentYear, currentMonth, date).getDay() === 0;
  };

  return (
    <>
      <div
        className="calendar-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          transition: "width 0.3s ease",
          width: showTimeSlots ? "100%" : "90%",
          marginBottom: "200px",
        //   border: "1px solid red",
        }}
      >
        <div
          className="calendar"
          style={{
            height: "100%",
            width: "100%",
            transition: "width 0.3s ease",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              className="calendar-header"
              sx={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: {
                  xl: "40%",
                  lg: "40%",
                  md: "40%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            >
              <button onClick={prevMonth}>
                <PiLessThanBold />
              </button>
              <span>
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentYear}
              </span>
              <button onClick={nextMonth}>
                <PiGreaterThanBold />
              </button>
            </Stack>
          </Stack>
          <div className="calendar-body">
            <div className="calendar-days">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day-name">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-dates">
              {getDaysArray().map((date, index) => (
                <div
                  key={index}
                  className={`calendar-date ${
                    date ? (date === selectedDate ? "selected" : "") : "blank"
                  } ${
                    date && (isPastDate(date) || isSunday(date)) ? "gray" : ""
                  }`}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showTimeSlots && (
          <div
            className="time-slots"
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderLeft: "1px solid lightgray",
              paddingLeft: "20px",
              // height: "400px",
              // overflowY: "auto",
            }}
          >
            <h3>
              {new Date(currentYear, currentMonth, selectedDate).toLocaleString(
                "default",
                { weekday: "long", month: "long", day: "numeric" }
              )}
            </h3>
            <div
              className="time-slot-buttons"
              style={{
                height: "400px",
                overflowY: "auto",
              }}
            >
              {timeSlots.map((time, index) => (
                <div key={index} style={{ width: "80%", marginBottom: "10px" }}>
                  {selectedTimeSlot === time ? (
                    <Stack direction="row" spacing={2}>
                      <Typography
                        sx={{
                          backgroundColor: "gray",
                          color: "white",
                          textAlign: "center",
                          borderRadius: "4px",
                        }}
                      >
                        {selectedTimeSlot}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={onNextClick}
                      >
                        Next
                      </Button>
                    </Stack>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                      onClick={() => handleTimeSlotClick(time)}
                    >
                      {time}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
