import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { Add, Delete, ContentCopy } from "@mui/icons-material";

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

// Initial state for each day with time slots
const initialState = [
  { day: "SUN", available: false, slots: [] },
  { day: "MON", available: false, slots: [] },
  { day: "TUE", available: false, slots: [] },
  { day: "WED", available: false, slots: [] },
  { day: "THU", available: false, slots: [] },
  { day: "FRI", available: false, slots: [] },
  { day: "SAT", available: false, slots: [] },
];

// Helper function to get time index in 15-minute increments
const getTimeIndex = (timeString) => timeOptions.indexOf(timeString);

// Helper function to add 1 hour to a given time string
const addOneHour = (timeString) => {
  const index = getTimeIndex(timeString);
  return timeOptions[index + 4] || timeOptions[0]; // Add 4 for one hour
};

// Custom MenuProps to control dropdown styles
const customMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 100, // Set the height to 100px
      overflowY: "auto", // Make the dropdown scrollable
      marginTop: 4, // Add a gap of 4px below the TextField
    },
  },
};

const WeeklyHourSetting = () => {
  const [days, setDays] = useState(initialState);

  // Handle toggling available/unavailable
  const handleToggleAvailable = (index) => {
    const updatedDays = [...days];
    updatedDays[index].available = !updatedDays[index].available;
    if (updatedDays[index].available && updatedDays[index].slots.length === 0) {
      updatedDays[index].slots.push({ start: "09:00 AM", end: "05:00 PM" }); // Default slot
    }
    setDays(updatedDays);
  };

  // Handle adding time slots
  const handleAddSlot = (index) => {
    const updatedDays = [...days];
    const lastSlot =
      updatedDays[index].slots[updatedDays[index].slots.length - 1];
    const newStart = addOneHour(lastSlot.end);
    const newEnd = addOneHour(newStart);

    updatedDays[index].slots.push({ start: newStart, end: newEnd });
    setDays(updatedDays);
  };

  // Handle deleting a slot
  const handleDeleteSlot = (dayIndex, slotIndex) => {
    const updatedDays = [...days];

    // Check if it's the last slot being deleted
    if (updatedDays[dayIndex].slots.length === 1) {
      // If so, make the day unavailable and reset slots
      updatedDays[dayIndex].available = false;
      updatedDays[dayIndex].slots = [];
    } else {
      // Otherwise, just remove the specific slot
      updatedDays[dayIndex].slots = updatedDays[dayIndex].slots.filter(
        (_, idx) => idx !== slotIndex
      );
    }

    setDays(updatedDays);
  };

  // Handle input change for start and end times (typed input or dropdown selection)
  const handleTimeChange = (dayIndex, slotIndex, field, value) => {
    const updatedDays = [...days];

    // Allow typing without dropdown selection, but check if the typed value is valid
    updatedDays[dayIndex].slots[slotIndex][field] = value;
    setDays(updatedDays);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Weekly hours</Typography>
      {days.map((day, dayIndex) => (
        <Box key={day.day} display="flex" alignItems="center" mt={2}>
          {/* Checkbox and Day */}
          <Box display="flex" alignItems="center" width="20%">
            <Checkbox
              checked={day.available}
              onChange={() => handleToggleAvailable(dayIndex)}
            />
            <Typography>{day.day}</Typography>
          </Box>

          {/* Time slots */}
          <Box display="flex" flexDirection="column" width="60%">
            {day.available ? (
              day.slots.map((slot, slotIndex) => (
                <Box key={slotIndex} display="flex" alignItems="center" mb={1}>
                  <TextField
                    size="small"
                    value={slot.start}
                    onChange={(e) =>
                      handleTimeChange(
                        dayIndex,
                        slotIndex,
                        "start",
                        e.target.value
                      )
                    }
                    sx={{ width: "120px" }}
                    SelectProps={{ MenuProps: customMenuProps }} // Apply custom MenuProps
                    inputProps={{ spellCheck: false, placeholder: "09:00 AM" }} // Allow manual typing
                  />

                  <Typography mx={1}>-</Typography>

                  <TextField
                    size="small"
                    value={slot.end}
                    onChange={(e) =>
                      handleTimeChange(
                        dayIndex,
                        slotIndex,
                        "end",
                        e.target.value
                      )
                    }
                    sx={{ width: "120px" }}
                    SelectProps={{ MenuProps: customMenuProps }} // Apply custom MenuProps
                    inputProps={{ spellCheck: false, placeholder: "05:00 PM" }} // Allow manual typing
                  />

                  {/* Delete slot */}
                  <IconButton
                    onClick={() => handleDeleteSlot(dayIndex, slotIndex)}
                    sx={{ ml: 1 }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography>Unavailable</Typography>
            )}
          </Box>

          {/* Add and Copy Icons */}
          <Box display="flex" alignItems="center" width="20%">
            {/* Add slot button - Only enabled if the day is selected */}
            <IconButton
              onClick={() => handleAddSlot(dayIndex)}
              disabled={!day.available} // Disable the button if day is not available
            >
              <Add />
            </IconButton>

            {/* Copy slots button */}
            <IconButton
              onClick={() => {
                const copyToDays = days
                  .map((_, index) => index)
                  .filter((i) => i !== dayIndex); // List of days excluding the current one
                const toIndex = window.prompt(
                  "Enter the day number (0-6) to copy this time:",
                  copyToDays.join(", ")
                );
                if (toIndex !== null && toIndex >= 0 && toIndex < 7) {
                  // Copy time slots to another day
                  const updatedDays = [...days];
                  updatedDays[toIndex].slots = [...days[dayIndex].slots];
                  setDays(updatedDays);
                }
              }}
            >
              <ContentCopy />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyHourSetting;
