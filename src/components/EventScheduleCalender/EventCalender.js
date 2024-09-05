import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EventCalender = () => {
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);

  // Dynamic time slots array for admin
  const timeSlotsArray = [
    {
      date: "2024-09-05",
      minTime: "09:00",
      maxTime: "17:00",
      step: 15,
      breakDuration: 15,
    }, // 15 min step with 15 min break
    {
      date: "2024-09-06",
      minTime: "09:00",
      maxTime: "17:00",
      step: 30,
      breakDuration: 15,
    }, // 30 min step with 15 min break
    {
      date: "2024-09-07",
      minTime: "09:00",
      maxTime: "17:00",
      step: 60,
      breakDuration: 15,
    }, // 60 min step with 30 min break
  ];

  // Appointment array with name, date, and time
  const appointmentsArray = [
    { name: "Anil", date: "2024-09-05", time: "10:15" },
    { name: "Anita", date: "2024-09-05", time: "11:30" },
    { name: "Ramesh", date: "2024-09-05", time: "14:45" },
    { name: "Gita", date: "2024-09-06", time: "09:30" },
    { name: "Babita", date: "2024-09-06", time: "13:30" },
    { name: "Laura", date: "2024-09-06", time: "15:30" },
    { name: "Sita", date: "2024-09-07", time: "10:00" },
    { name: "John", date: "2024-09-07", time: "12:30" },
    { name: "Rahul", date: "2024-09-07", time: "13:30" },
    { name: "Priya", date: "2024-09-07", time: "15:00" },
    { name: "Rohan", date: "2024-09-07", time: "11:00" },
    { name: "Kiran", date: "2024-09-07", time: "16:00" },
  ];

  // Function to get the dynamic time slots based on the selected date
  const getTimeSlotForDate = (date) => {
    const foundSlot = timeSlotsArray.find((slot) =>
      moment(date).isSame(slot.date, "day")
    );

    if (foundSlot) {
      const minTime = new Date();
      const [minHour, minMinute] = foundSlot.minTime.split(":");
      minTime.setHours(minHour, minMinute, 0);

      const maxTime = new Date();
      const [maxHour, maxMinute] = foundSlot.maxTime.split(":");
      maxTime.setHours(maxHour, maxMinute, 0);

      return {
        minTime,
        maxTime,
        step: foundSlot.step,
        breakDuration: foundSlot.breakDuration,
      };
    } else {
      const minTime = new Date();
      minTime.setHours(9, 0, 0);

      const maxTime = new Date();
      maxTime.setHours(17, 0, 0);

      return { minTime, maxTime, step: 15, breakDuration: 15 }; // Default 15 minute step with 15 minute break
    }
  };

  // Convert appointments to events based on admin time slot step
  const getAppointmentsAsEvents = () => {
    return appointmentsArray.flatMap((appointment) => {
      const { step, breakDuration } = getTimeSlotForDate(appointment.date);
      const start = moment(
        `${appointment.date} ${appointment.time}`,
        "YYYY-MM-DD HH:mm"
      ).toDate();
      const end = moment(start).add(step, "minutes").toDate(); // Adjust appointment length as per the admin's time slot step

      // Create break time after appointment
      const breakStart = end;
      const breakEnd = moment(breakStart)
        .add(breakDuration, "minutes")
        .toDate();

      return [
        {
          title: `${appointment.name}'s Appointment`,
          start,
          end,
        },
        {
          title: "Break Time",
          start: breakStart,
          end: breakEnd,
          allDay: false,
          isBreak: true,
        },
      ];
    });
  };

  const [calendarEvents, setCalendarEvents] = useState(
    getAppointmentsAsEvents()
  );

  // Get dynamic time slots for the current day
  const { minTime, maxTime, step } = getTimeSlotForDate(new Date());

  // Function to handle date selection and display appointments
  const handleDateClick = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    const appointmentsForSelectedDate = appointmentsArray.filter(
      (appointment) => moment(appointment.date).isSame(selectedDate, "day")
    );
    setSelectedDateAppointments(appointmentsForSelectedDate);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEvents} // Use the dynamic events array
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
        step={step}
        timeslots={1}
        defaultView="month" // Set default view to 'month'
        min={minTime}
        max={maxTime}
        selectable={true}
        onSelectSlot={handleDateClick} // Handle date click
        eventPropGetter={(event) => {
          const backgroundColor = event.isBreak ? "green" : "blue"; // Green for break time, blue for appointments
          return { style: { backgroundColor, color: "white" } }; // White text color for visibility
        }}
      />
      <div style={{ marginTop: "20px" }}>
        {selectedDateAppointments.length > 0 ? (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Break Time</th>
              </tr>
            </thead>
            <tbody>
              {selectedDateAppointments.map((appointment, index) => {
                const { step, breakDuration } = getTimeSlotForDate(
                  appointment.date
                );
                const start = moment(
                  `${appointment.date} ${appointment.time}`,
                  "YYYY-MM-DD HH:mm"
                );
                const end = moment(start).add(step, "minutes");
                const breakEnd = moment(end).add(breakDuration, "minutes");
                return (
                  <tr key={index}>
                    <td>{appointment.name}</td>
                    <td>{start.format("HH:mm")}</td>
                    <td>{end.format("HH:mm")}</td>
                    <td>
                      {end.format("HH:mm")} - {breakEnd.format("HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No appointments for the selected date</p>
        )}
      </div>
    </div>
  );
};

export default EventCalender;

