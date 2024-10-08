import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  DialogContent,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"; // Import adapter for Moment.js
import { IoMdAdd } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";

// Generate 24-hour time options in 15-minute intervals
const generateTimeOptions = () => {
  const times = [];
  let startTime = new Date();
  startTime.setHours(0, 0, 0, 0);

  for (let i = 0; i < 96; i++) {
    const timeString = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    times.push(timeString);
    startTime.setMinutes(startTime.getMinutes() + 15);
  }

  return times;
};

const timeOptions = generateTimeOptions();

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment()); // Current displayed month
  const [selectedDate, setSelectedDate] = useState(null); // Selected date
  const [open, setOpen] = useState(false); // Dialog state
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [dateSpecificHours, setDateSpecificHours] = useState([]); // To store all selected dates and time slots

  // Get the start and end of the current month
  const startOfMonth = currentDate.clone().startOf("month").startOf("week"); // Start from Sunday
  const endOfMonth = currentDate.clone().endOf("month").endOf("week"); // End at Saturday

  const days = []; // Array to store days in the month

  // Fill the days array with the days for the current month
  let day = startOfMonth.clone().subtract(1, "day");
  while (day.isBefore(endOfMonth, "day")) {
    days.push(day.add(1, "day").clone());
  }

  const handleOpen2Click = () => {
    setOpen2(true); // Open dialog
  };
  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpen(true); // Open dialog
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };
  
  const onClose = () => {
    setOpen2(false);
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setTimeSlots([]); // Reset time slots when dialog is closed
  };

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { start: "09:00 AM", end: "05:00 PM" }]);
  };

  const handleDeleteSlot = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const handleApply = () => {
    // Save the selected date and corresponding time slots
    if (selectedDate && timeSlots.length > 0) {
      setDateSpecificHours([
        ...dateSpecificHours,
        {
          date: selectedDate.clone(),
          slots: timeSlots,
        },
      ]);
    }
    handleClose1(); // Close the dialog after applying
    handleClose();
  };

  // Function to render the time slots in the custom calendar
  const renderTimeSlotsForDate = (date) => {
    const specificDay = dateSpecificHours.find((entry) =>
      date.isSame(entry.date, "day")
    );
    if (specificDay) {
      return specificDay.slots.map((slot, index) => (
        <Typography key={index} variant="caption">
          {slot.start} - {slot.end}
        </Typography>
      ));
    }
    return null;
  };

  console.log("renderTimeSlotsForDate: ======>>", renderTimeSlotsForDate(day));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {/* Wrap with LocalizationProvider */}
      <Box sx={{ padding: 2, width: "100%", maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {currentDate.format("MMMM YYYY")}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Calendar Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}
        >
          {/* Weekday names */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Typography
                key={index}
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "10px 0",
                  backgroundColor: "#f7f7f7",
                }}
              >
                {day}
              </Typography>
            )
          )}

          {/* Days */}
          {days.map((day, index) => (
            <Box key={index}>
              <Button
                onClick={() => handleDateClick(day)}
                sx={{
                  backgroundColor: day.isSame(moment(), "day")
                    ? "#f0f4ff"
                    : day.isSame(selectedDate, "day")
                    ? "#e0e7ff"
                    : "white",
                  color: day.isSame(currentDate, "month")
                    ? "black"
                    : "lightgray",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                  padding: "20px 0",
                  fontSize: "16px",
                  height: "160px",
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // Align items to the top
                  justifyContent: "flex-start", // Align items to the left
                  paddingTop: "12px", // Adjust padding to move date closer to top left
                  paddingLeft: "12px",
                  boxShadow: day.isSame(selectedDate, "day")
                    ? "0 0 0 2px #3f51b5"
                    : "none",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {day.date()}
                </Typography>

                {/* Show time slots for specific dates */}
                <Box
                  sx={{
                    paddingTop: "12px",
                    paddingLeft: 1,
                    paddingRight: 1,
                    display: "flex",
                    flexDirection: "column", // Ensures time slots stack vertically
                    width: "100%", // Makes sure it takes the full width
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {renderTimeSlotsForDate(day)}
                </Box>
              </Button>
            </Box>
          ))}
        </Box>

        {/* Dialog for selected date */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedDate ? selectedDate.format("MMMM Do, YYYY") : ""}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClickOpen}>Edit date(s)</Button>

            {/* Check if the selected date has time slots */}
            {dateSpecificHours.some(
              (entry) => selectedDate && selectedDate.isSame(entry.date, "day")
            ) ? (
              <Button
                onClick={() => {
                  // Remove the selected date's time slots
                  const updatedHours = dateSpecificHours.filter(
                    (entry) => !selectedDate.isSame(entry.date, "day")
                  );
                  setDateSpecificHours(updatedHours);
                  handleClose(); // Close the dialog after removing
                }}
              >
                Remove Dates
              </Button>
            ) : (
              <Button onClick={() => handleOpen2Click()}>
                Edit all {selectedDate ? selectedDate.format("dddd") : ""}
              </Button>
            )}
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Time Slots Dialog */}
        <Dialog open={open1} onClose={handleClose1} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Select the date(s) you want to assign specific hours
          </DialogTitle>
          <DialogContent>
            <DateCalendar
              value={selectedDate || null}
              onChange={(newDate) => setSelectedDate(newDate)}
            />

            {/* Conditionally render additional fields when a date is selected */}
            {selectedDate && (
              <Box mt={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  What hours are you available?
                </Typography>

                {timeSlots.length === 0 && (
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                    Unavailable
                  </Typography>
                )}

                {/* List of time slots */}
                {timeSlots.map((slot, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mt={1}
                  >
                    <Autocomplete
                      value={slot.start}
                      onChange={(event, newValue) =>
                        handleTimeChange(index, "start", newValue)
                      }
                      options={timeOptions}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          sx={{ width: "130px" }}
                        />
                      )}
                    />
                    <Typography>to</Typography>
                    <Autocomplete
                      value={slot.end}
                      onChange={(event, newValue) =>
                        handleTimeChange(index, "end", newValue)
                      }
                      options={timeOptions}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          sx={{ width: "130px" }}
                        />
                      )}
                    />
                    <IconButton onClick={() => handleDeleteSlot(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleAddSlot}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: "400",
                      mt: 2,
                    }}
                  >
                    <IoMdAdd /> Add hours
                  </Button>
                </Stack>
              </Box>
            )}
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-between", padding: "16px" }}
          >
            <Button
              variant="outlined"
              onClick={handleClose1}
              sx={{ borderRadius: "24px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{
                backgroundColor: "#0061f2",
                color: "#fff",
                borderRadius: "24px",
                textTransform: "none",
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open2} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Wednesday availability
          </DialogTitle>
          <DialogContent dividers>
            {/* <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                What hours are you available?
              </Typography>
              {timeSlots.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Unavailable
                  <IconButton onClick={handleAddSlot}>+</IconButton>
                </Typography>
              ) : (
                <Stack direction="row" spacing={1}>
                 
                </Stack>
              )}
            </Box> */}
            {selectedDate && (
              <Box mt={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  What hours are you available?
                </Typography>

                {timeSlots.length === 0 && (
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                    Unavailable
                  </Typography>
                )}

                {/* List of time slots */}
                {timeSlots.map((slot, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mt={1}
                  >
                    <Autocomplete
                      value={slot.start}
                      onChange={(event, newValue) =>
                        handleTimeChange(index, "start", newValue)
                      }
                      options={timeOptions}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          sx={{ width: "130px" }}
                        />
                      )}
                    />
                    <Typography>to</Typography>
                    <Autocomplete
                      value={slot.end}
                      onChange={(event, newValue) =>
                        handleTimeChange(index, "end", newValue)
                      }
                      options={timeOptions}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          sx={{ width: "130px" }}
                        />
                      )}
                    />
                    <IconButton onClick={() => handleDeleteSlot(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleAddSlot}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: "400",
                      mt: 2,
                    }}
                  >
                    <IoMdAdd /> Add hours
                  </Button>
                </Stack>
              </Box>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Button
              variant="outlined"
                onClick={onClose}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
                onClick={onClose}
              sx={{
                backgroundColor: "#0061f2",
                color: "#fff",
                borderRadius: "24px",
                textTransform: "none",
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
