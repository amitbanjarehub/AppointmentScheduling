import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";

// Initialize moment localizer
const localizer = momentLocalizer(moment);

// Custom event wrapper to hide all events by setting `display: none`

const CalenderIntegration = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("month"); // Default view is "month"
  const [appointments, setAppointments] = useState([]);
  const [holidayDates1, setHolidayDates1] = useState([]);
  const [weekEnd1, setWeekEnd1] = useState([]);
  const [workingTime1, setWorkingTime1] = useState([]);
  const [adminSettings, setAdminSettings] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );

        // Convert start and end to Date objects without converting them to strings
        const updatedAppointments = response.data.map((appointment) => {
          return {
            ...appointment,
            start: new Date(appointment.start),
            end: new Date(appointment.end),
          };
        });

        // Store the updated appointments in state
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    // Fetch the admin settings when the component is mounted
    const fetchAdminSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin_setting/12345"
        );

        // Convert holidayDates from ISO string to Date objects
        const updatedHolidayDates = response.data.holidayDates.map(
          (date) => new Date(date)
        );

        // Update the adminSettings with the new holidayDates
        setAdminSettings({
          ...response.data,
          holidayDates: updatedHolidayDates,
        });
        setWorkingTime1(response.data.workingTime);
        setHolidayDates1(updatedHolidayDates);
        setWeekEnd1(response?.data?.weekendDays);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error if any
        setLoading(false); // Set loading to false
      }
    };
    fetchAdminSettings();
    fetchAppointments(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Dynamic array to store `min`, `max`, `step`, and `timeslots` for each day
  const daywiseTimesConfig = [
    { day: 0, min: 8, max: 17, step: 15, timeslots: 1 }, // Sunday
    { day: 1, min: 9, max: 17, step: 30, timeslots: 1 }, // Monday
    { day: 2, min: 10, max: 17, step: 15, timeslots: 1 }, // Tuesday
    { day: 3, min: 10, max: 17, step: 60, timeslots: 1 }, // Wednesday
    { day: 4, min: 9, max: 17, step: 15, timeslots: 1 }, // Thursday
    { day: 5, min: 8, max: 17, step: 30, timeslots: 1 }, // Friday
    { day: 6, min: 10, max: 17, step: 10, timeslots: 1 }, // Saturday
  ];

  // Function to get dynamic min, max, step, and timeslots for the current day
  const getDynamicTimes = (currentDate) => {
    const currentDay = moment(currentDate).day(); // Get current day of the week (0 - Sunday, 6 - Saturday)

    // Find the configuration for the current day
    // const dayConfig = daywiseTimesConfig.find(
    const dayConfig = workingTime1.find((config) => config.day === currentDay);

    if (dayConfig) {
      return {
        min: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          dayConfig.min,
          0
        ),
        max: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          dayConfig.max,
          0
        ),
        step: dayConfig.step,
        timeslots: dayConfig.timeslots,
      };
    }
    return {
      min: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        9,
        0
      ),
      max: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        17,
        0
      ),
      step: 30,
      timeslots: 1,
    };
  };

  const handleViewChange = (newView) => {
    setView(newView); // Set the current view
  };

  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);

  const CustomEventWrapper = ({ children, view }) => {
    if (view === "month") {
      return <div style={{ display: "none" }}>{children}</div>; // Hide events in month view
    }
    return <div>{children}</div>; // Show events in week and day views
  };

  // Event style customizer to highlight weekends and special holidays
  const dayStyleGetter = (date) => {
    const day = date.getDay();
    // const isWeekend = day === 0 || day === 6; // 0 for Sunday, 6 for Saturday

    // const isWeekend = weekEnd1.includes(day);
    // Check if weekEnd1 is empty, if so, use default weekends (Sunday = 0, Saturday = 6)
    const isWeekend =
      weekEnd1.length > 0 ? weekEnd1.includes(day) : day === 0 || day === 6;

    // const isHoliday = holidayDates1.some((holiday) =>
    //   moment(holiday).isSame(date, "day")
    // );

    const isHoliday =
      holidayDates1.length > 0 &&
      holidayDates1.some((holiday) => moment(holiday).isSame(date, "day"));
    let style = {};

    if (isWeekend) {
      style = {
        backgroundColor: "lightyellow",
      };
    }
    if (isHoliday) {
      style = {
        backgroundColor: "#FFCCCC", // Light red background for holidays
      };
    }

    return {
      style,
    };
  };

  // Customizing the dateHeader component
  const dateHeader = ({ date, label }) => {
    const day = date.getDay();
    const countOnDate = appointments.filter((appointment) =>
      moment(appointment.start).isSame(date, "day")
    ).length;

    
    // Safely check if it's a holiday, only if holidayDates1 contains data
    const isHoliday =
      holidayDates1.length > 0 &&
      holidayDates1.some((holiday) => moment(holiday).isSame(date, "day"));
    // Check if weekEnd1 is empty, if so, use default weekends (Sunday = 0, Saturday = 6)
    const isWeekend =
      weekEnd1.length > 0 ? weekEnd1.includes(day) : day === 0 || day === 6;

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "12px" }}>
          {label}
          {/* Check if it's a weekend (Sunday/Saturday) and display 'Holiday' */}
          {isWeekend ? (
            <Typography
              variant="subtitle1"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Holiday
            </Typography>
          ) : null}
          {/* Display 'Holiday' for holiday dates */}
          {isHoliday && (
            <Typography
              variant="subtitle1"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Holiday
            </Typography>
          )}
        </div>
        {countOnDate > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ color: "#D2691E", fontWeight: "bold" }}
            >
              {countOnDate}
            </Typography>
            <Typography variant="caption">Appointments</Typography>
          </>
        )}
      </div>
    );
  };

  // Handle date click to open popup with appointment details
  const handleDateClick = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const appointmentsOnDate = appointments.filter((appointment) =>
      moment(appointment.start).isSame(clickedDate, "day")
    );

    setSelectedDateAppointments(appointmentsOnDate);
    setOpen(true); // Open dialog
  };

  const [dynamicTimes, setDynamicTimes] = useState({
    min: new Date(2024, 9, 2, 9, 0), // Default 09:00 AM
    max: new Date(2024, 9, 2, 17, 0), // Default 05:00 PM
    step: 15,
    timeslots: 1,
  });

  // Update dynamic times when the view changes
  useEffect(() => {
    const today = new Date();
    const fetchedTimes = getDynamicTimes(today);
    setDynamicTimes(fetchedTimes);
  }, [view]);

  const handleRangeChange = (dates, newView) => {
    let currentDate;

    // If the dates is an array (e.g., in 'week' view), take the first date
    if (Array.isArray(dates)) {
      currentDate = dates[0];
    } else {
      // For 'day' view or when a single date is passed
      currentDate = dates;
    }

    if (currentDate instanceof Date && !isNaN(currentDate)) {
      const fetchedTimes = getDynamicTimes(currentDate);
      setDynamicTimes(fetchedTimes); // Update dynamic times
    } else {
      console.error("Invalid date provided");
    }
  };
  console.log("appointments:======>>>", appointments);
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
        onView={handleViewChange} // Track the view changes
        components={{
          month: {
            dateHeader: dateHeader, // Use the custom dateHeader component
          },
          eventWrapper: (props) => (
            <CustomEventWrapper {...props} view={view} />
          ), // Pass the view prop
        }}
        selectable
        onSelectSlot={handleDateClick}
        dayPropGetter={dayStyleGetter} // Apply the custom day style for weekends and holidays
        onRangeChange={handleRangeChange} // Handle range change
        step={dynamicTimes.step} // Dynamic step
        timeslots={dynamicTimes.timeslots} // Dynamic timeslots
        min={dynamicTimes.min} // Dynamic min time
        max={dynamicTimes.max} // Dynamic max time
      />

      {/* Popup Dialog to show appointments in a table */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Appointments on Selected Date</DialogTitle>
        <DialogContent>
          {selectedDateAppointments.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Time</strong>
                  </TableCell>
                  <TableCell>
                    <strong>User</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDateAppointments.map((appointment) => (
                  <TableRow key={appointment.appointment_id}>
                    <TableCell>{appointment.title}</TableCell>
                    <TableCell>
                      {moment(appointment.start).format("hh:mm A")} -{" "}
                      {moment(appointment.end).format("hh:mm A")}
                    </TableCell>
                    <TableCell>{appointment.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No appointments on this date.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalenderIntegration;
