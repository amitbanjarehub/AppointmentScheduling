

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const EventCalender = () => {
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [availabilities, setAvailbility] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {   
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );

        const response1 = await axios.get(
          "http://localhost:5000/api/availabilities"
        );
        setAppointments(response?.data); 
        setAvailbility(response1?.data[0]?.availability); 
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Convert appointments to events based on admin time slot step
    const getAppointmentsAsEvents = () => {
      return appointments
        .map((appointment) => {
          const foundSlot = availabilities.find((slot) =>
            moment(appointment.date).isSame(slot.date, "day")
          );

          if (foundSlot) {
            const step = foundSlot.step;
            const breakDuration = foundSlot.breakDuration;
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
          }

          return [];
        })
        .flat();
    };

    if (appointments.length > 0 && availabilities.length > 0) {
      const events = getAppointmentsAsEvents();
      setCalendarEvents(events);
    }
  }, [appointments, availabilities]);

  // Get dynamic time slots for the current day
  const getTimeSlotForDate = (date) => {
    const foundSlot = availabilities.find((slot) =>
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

  // Function to handle date selection and display appointments
  const handleDateClick = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    const appointmentsForSelectedDate = appointments.filter((appointment) =>
      moment(appointment.date).isSame(selectedDate, "day")
    );
    setSelectedDateAppointments(appointmentsForSelectedDate);
  };

  // Get dynamic time slots for the current day
  const { minTime, maxTime, step } = getTimeSlotForDate(new Date());

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
