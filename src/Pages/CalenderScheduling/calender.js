
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Stack, Button, Box, Typography } from "@mui/material";

export default function BasicDateCalendar({ onNextClick }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={4} sx={{ width: "100%" }}>
        <DateCalendar
          sx={{
            border: "2px solid red",
            width: "50%",
            height: "800px",
            "& .MuiPickersCalendarHeader-root": {
              height: "15%", // Header height
            },
            "& .MuiDayCalendar-root": {
              height: "85%", // Calendar days height
            },
            "& .MuiTypography-root": {
              fontSize: "1.2rem", // Day names (S, M, T, etc.)
            },
            "& .MuiPickersDay-root": {
              fontSize: "1.5rem", // Date numbers (1, 2, 3, etc.)
            },
          }}
          onChange={handleDateChange}
        />
        {selectedDate && (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h6" gutterBottom>
              Select a Time
            </Typography>
            <Stack spacing={2}>
              {["9:00am", "9:30am", "10:00am", "10:30am", "11:00am"].map(
                (time) => (
                  <Stack direction="row" spacing={2} key={time}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor:
                          time === selectedTime ? "gray" : "white",
                        color: time === selectedTime ? "white" : "black",
                        "&:hover": {
                          backgroundColor:
                            time === selectedTime ? "gray" : "lightgray",
                        },
                        minWidth: time === selectedTime ? "100px" : "auto",
                        justifyContent:
                          time === selectedTime ? "center" : "flex-start",
                      }}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </Button>
                    {time === selectedTime && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onNextClick}
                      >
                        Next
                      </Button>
                    )}
                  </Stack>
                )
              )}
            </Stack>
          </Box>
        )}
      </Stack>
    </LocalizationProvider>
  );
}
