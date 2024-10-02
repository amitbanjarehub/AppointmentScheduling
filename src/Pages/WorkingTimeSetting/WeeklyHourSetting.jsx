import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  Popper,
  Paper,
  Button,
  FormGroup,
  FormControlLabel,
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

const WeeklyHourSetting = () => {
  const [days, setDays] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null); // For handling the popper
  const [selectedDays, setSelectedDays] = useState([]); // Selected days for copying
  const [currentDay, setCurrentDay] = useState(""); // Store the current day

  // Handle toggling available/unavailable
  const handleToggleAvailable = (index) => {
    const updatedDays = [...days];
    updatedDays[index].available = !updatedDays[index].available;
    if (updatedDays[index].available && updatedDays[index].slots.length === 0) {
      updatedDays[index].slots.push({ start: "09:00 AM", end: "05:00 PM" }); // Default slot
    }
    setDays(updatedDays);
  };

  const getTimeIndex = (timeString) => timeOptions.indexOf(timeString);

  // Helper function to add 1 hour to a given time string
  const addOneHour = (timeString) => {
    const index = getTimeIndex(timeString);
    return timeOptions[index + 4] || timeOptions[0]; // Add 4 for one hour
  };

  // Handle adding time slots
  const handleAddSlot = (index) => {
    const updatedDays = [...days];
    const lastSlot =
      updatedDays[index].slots[updatedDays[index].slots.length - 1];
    const newStart = addOneHour(lastSlot?.end || "09:00 AM");
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
    updatedDays[dayIndex].slots[slotIndex][field] = value;
    setDays(updatedDays);
  };

  // Handle opening the Popper when the copy icon is clicked
  const handleCopyClick = (event, day) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setCurrentDay(day); // Set the current day that is clicked
    setSelectedDays([day]); // Auto-select the current day and make it non-uncheckable
  };

  const handleDaySelection = (day) => {
    if (day !== currentDay) {
      const updatedSelectedDays = selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day];
      setSelectedDays(updatedSelectedDays);
    }
  };

  const handleApplyCopy = () => {
    if (selectedDays.length > 0) {
      // Apply the logic to copy the times to the selected days
      const updatedDays = [...days];
      const currentDayData = updatedDays.find((d) => d.day === currentDay);

      selectedDays.forEach((day) => {
        const targetDayIndex = updatedDays.findIndex((d) => d.day === day);
        if (targetDayIndex !== -1) {
          updatedDays[targetDayIndex].slots = [...currentDayData.slots];
          updatedDays[targetDayIndex].available = currentDayData.available;
        }
      });

      setDays(updatedDays);
      setAnchorEl(null); // Close the popper after applying
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Weekly hours</Typography>
      {days.map((day, dayIndex) => (
        <Box
          key={day?.day || dayIndex}
          display="flex"
          alignItems="center"
          mt={2}
        >
          {/* Checkbox and Day */}
          <Box display="flex" alignItems="center" width="20%">
            <Checkbox
              checked={day.available}
              onChange={() => handleToggleAvailable(dayIndex)}
            />
            <Typography>{day?.day || "Day"}</Typography>
          </Box>

          {/* Time slots */}
          <Box display="flex" flexDirection="column" width="60%">
            {day.available ? (
              day.slots.map((slot, slotIndex) => (
                <Box key={slotIndex} display="flex" alignItems="center" mb={1}>
                  <Autocomplete
                    value={slot.start}
                    onChange={(event, newValue) =>
                      handleTimeChange(dayIndex, slotIndex, "start", newValue)
                    }
                    options={timeOptions} // Options for the Autocomplete dropdown
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined" // Remove label and helper text
                        sx={{ width: "130px" }}
                      />
                    )}
                    disableClearable
                  />

                  <Typography mx={1}>-</Typography>

                  <Autocomplete
                    value={slot.end}
                    onChange={(event, newValue) =>
                      handleTimeChange(dayIndex, slotIndex, "end", newValue)
                    }
                    options={timeOptions} // Options for the Autocomplete dropdown
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined" // Remove label and helper text
                        sx={{ width: "130px" }}
                      />
                    )}
                    disableClearable
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
            <IconButton onClick={(event) => handleCopyClick(event, day?.day)}>
              <ContentCopy />
            </IconButton>

            {/* Popper for day selection */}
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
              <Paper sx={{ p: 2, width: "200px" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Copy times to...
                </Typography>
                <FormGroup>
                  {days.map((d) => (
                    <FormControlLabel
                      key={d.day}
                      control={
                        <Checkbox
                          checked={selectedDays.includes(d.day)}
                          onChange={() => handleDaySelection(d.day)}
                          disabled={d.day === currentDay} // Disable unchecking the current day
                        />
                      }
                      label={d.day}
                    />
                  ))}
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApplyCopy}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Apply
                </Button>
              </Paper>
            </Popper>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyHourSetting;
