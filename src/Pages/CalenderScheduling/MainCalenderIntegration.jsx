import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import AppointmentDialog from "./AppointmentDialog";
import DateHeader from "./DateHeader";
import CustomEventWrapper from "./CustomEventWrapper";
import { GetDynamicTimes } from "./GetDynamicTimes ";

const localizer = momentLocalizer(moment);

const MainCalenderIntegration = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("month");
  const [appointments, setAppointments] = useState([]);
  const [holidayDates1, setHolidayDates1] = useState([]);
  const [weekEnd1, setWeekEnd1] = useState([]);
  const [workingTime1, setWorkingTime1] = useState([]);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
  const [dynamicTimes, setDynamicTimes] = useState({
    min: new Date(2024, 9, 2, 9, 0),
    max: new Date(2024, 9, 2, 17, 0),
    step: 15,
    timeslots: 1,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        const updatedAppointments = response.data.map((appointment) => ({
          ...appointment,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
        }));
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchAdminSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin_setting/12345"
        );
        const updatedHolidayDates = response.data.holidayDates.map(
          (date) => new Date(date)
        );
        setWorkingTime1(response.data.workingTime);
        setHolidayDates1(updatedHolidayDates);
        setWeekEnd1(response?.data?.weekendDays);
      } catch (err) {
        console.error("Error fetching admin settings:", err);
      }
    };

    fetchAdminSettings();
    fetchAppointments();
  }, []);

  useEffect(() => {
    const today = new Date();
    const fetchedTimes = GetDynamicTimes(today, workingTime1);
    setDynamicTimes(fetchedTimes);
  }, [view]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleDateClick = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const appointmentsOnDate = appointments.filter((appointment) =>
      moment(appointment.start).isSame(clickedDate, "day")
    );
    setSelectedDateAppointments(appointmentsOnDate);
    setOpen(true);
  };

  const handleRangeChange = (dates) => {
    const currentDate = Array.isArray(dates) ? dates[0] : dates;
    const fetchedTimes = GetDynamicTimes(currentDate, workingTime1);
    setDynamicTimes(fetchedTimes);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={appointments.length > 0 ? appointments : []}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        views={["month", "week", "day"]}
        view={view}
        onView={handleViewChange}
        components={{
          month: {
            dateHeader: (props) => (
              <DateHeader
                {...props}
                appointments={appointments}
                holidayDates={holidayDates1}
                weekEnd1={weekEnd1}
              />
            ),
          },
          eventWrapper: (props) => (
            <CustomEventWrapper {...props} view={view} />
          ),
        }}
        selectable
        onSelectSlot={handleDateClick}
        dayPropGetter={(date) => ({
          style: {
            backgroundColor:
              weekEnd1.length > 0
                ? weekEnd1.includes(date.getDay())
                  ? "lightyellow"
                  : ""
                : date.getDay() === 0 || date.getDay() === 6
                ? "lightyellow"
                : "",
          },
        })}
        onRangeChange={handleRangeChange}
        step={dynamicTimes.step}
        timeslots={dynamicTimes.timeslots}
        min={dynamicTimes.min}
        max={dynamicTimes.max}
      />
      <AppointmentDialog
        open={open}
        onClose={() => setOpen(false)}
        selectedDateAppointments={selectedDateAppointments}
      />
    </div>
  );
};

export default MainCalenderIntegration;
