// import React, { useMemo } from 'react';

// const CalendarDays = ({ day, changeCurrentDay }) => {
//   // Generate the days for the calendar
//   const currentDays = useMemo(() => {
//     const days = [];
//     const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
//     const weekdayOfFirstDay = firstDayOfMonth.getDay();

//     for (let currentDay = 0; currentDay < 42; currentDay++) {
//       if (currentDay === 0 && weekdayOfFirstDay === 0) {
//         firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
//       } else if (currentDay === 0) {
//         firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (currentDay - weekdayOfFirstDay));
//       } else {
//         firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
//       }

//       let calendarDay = {
//         currentMonth: firstDayOfMonth.getMonth() === day.getMonth(),
//         date: new Date(firstDayOfMonth),
//         month: firstDayOfMonth.getMonth(),
//         number: firstDayOfMonth.getDate(),
//         selected: firstDayOfMonth.toDateString() === day.toDateString(),
//         year: firstDayOfMonth.getFullYear(),
//       };

//       days.push(calendarDay);
//     }
//     return days;
//   }, [day]);

//   // Render the days for the calendar
//   return (
//     <div className="table-content">
//       {currentDays.map((calendarDay) => (
//         <div
//           key={calendarDay.date.toISOString()}
//           className={
//             "calendar-day" +
//             (calendarDay.currentMonth ? " current" : "") +
//             (calendarDay.selected ? " selected" : "")
//           }
//           onClick={() => changeCurrentDay(calendarDay)}
//         >
//           <p>{calendarDay.number}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CalendarDays;
import React, { useMemo } from "react";

const CalendarDays = ({ day, changeCurrentDay }) => {
  // Generate the days for the calendar
  const currentDays = useMemo(() => {
    const days = [];
    const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    for (let currentDay = 0; currentDay < 42; currentDay++) {
      // 42 slots for 6 rows of 7 days
      if (currentDay === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (currentDay === 0) {
        firstDayOfMonth.setDate(
          firstDayOfMonth.getDate() + (currentDay - weekdayOfFirstDay)
        );
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: firstDayOfMonth.getMonth() === day.getMonth(),
        date: new Date(firstDayOfMonth),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: firstDayOfMonth.toDateString() === day.toDateString(),
        year: firstDayOfMonth.getFullYear(),
      };

      days.push(calendarDay);
    }
    return days;
  }, [day]);

  // Render the days for the calendar
  return (
    <div className="table-content">
      {currentDays.map((calendarDay) => (
        <div
          key={calendarDay.date.toISOString()}
          className={`calendar-day ${
            calendarDay.currentMonth ? "current" : ""
          } ${calendarDay.selected ? "selected" : ""}`}
          onClick={() => changeCurrentDay(calendarDay)}
        >
          <p>{calendarDay.number}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
