import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoMdAdd } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";

// Generate 24-hour time options in 15-minute intervals (same as in WeeklyHourSetting)
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

const SpecialDateSetting = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [dateSpecificHours, setDateSpecificHours] = useState([]); // To store all selected dates and time slots

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          date: selectedDate,
          slots: timeSlots,
        },
      ]);
    }
    handleClose(); // Close the dialog after applying
  };

  const handleDeleteDate = (index) => {
    const updatedHours = dateSpecificHours.filter((_, i) => i !== index);
    setDateSpecificHours(updatedHours);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Date-specific hours
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#666", marginBottom: "16px" }}
        >
          Override your availability for specific dates when your hours differ
          from your regular weekly hours.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "400",
          }}
          onClick={handleClickOpen}
        >
          + Add date-specific hours
        </Button>

        {/* Render the list of date-specific hours */}
        <Stack mt={3}>
          {dateSpecificHours.map((entry, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "8px 16px",
                marginTop: "8px",
              }}
            >
              <Typography>
                {entry.date.format("MMM D, YYYY")} -{" "}
                {entry.slots
                  .map((slot) => `${slot.start} to ${slot.end}`)
                  .join(", ")}
              </Typography>
              <IconButton onClick={() => handleDeleteDate(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Select the date(s) you want to assign specific hours
          </DialogTitle>
          <DialogContent>
            <DateCalendar
              value={selectedDate}
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
              onClick={handleClose}
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
      </Box>
    </LocalizationProvider>
  );
};

export default SpecialDateSetting;
