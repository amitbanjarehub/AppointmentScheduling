
import React, { useState } from "react";
import CalendarDays from "./CalendarDays";
import "./calendar.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Calendar = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // State management using useState hook
  const [currentDay, setCurrentDay] = useState(new Date());

  // Change the current day based on the selected day
  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  // Move to the next month
  const nextMonth = () => {
    const nextMonthDate = new Date(currentDay);
    nextMonthDate.setMonth(currentDay.getMonth() + 1);
    setCurrentDay(nextMonthDate);
  };

  // Move to the previous month
  const previousMonth = () => {
    const prevMonthDate = new Date(currentDay);
    prevMonthDate.setMonth(currentDay.getMonth() - 1);
    setCurrentDay(prevMonthDate);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>
            {months[currentDay.getMonth()]} {currentDay.getFullYear()}
          </h2>
        </div>
        <div className="tools">
          <button onClick={previousMonth}>
            <MdArrowBackIosNew />
          </button>
          <p>
            {months[currentDay.getMonth()].substring(0, 3)}{" "}
            {currentDay.getDate()}
          </p>
          <button onClick={nextMonth}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
      <div className="calendar-body" >
        <div className="table-header">
          {weekdays.map((weekday) => (
            <div className="weekday" key={weekday}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        {/* Pass currentDay and changeCurrentDay as props to CalendarDays component */}
        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  );
};

export default Calendar;
