import React, { useState } from "react";
import { TextField, Box, Typography, Autocomplete } from "@mui/material";

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

const Categories = () => {
  const [timeValue, setTimeValue] = useState("09:00 AM"); // Set default time

  // Handle input change for both dropdown and manual typing
  const handleInputChange = (event, newValue) => {
    setTimeValue(newValue || ""); // Use newValue from Autocomplete or empty string if cleared
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Time Input with Dropdown and Manual Typing
      </Typography>
      <Autocomplete
        value={timeValue}
        onChange={handleInputChange}
        options={timeOptions} // Options for the Autocomplete dropdown
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select or Type Time"            
            helperText="You can either type or select from the dropdown"
            fullWidth
          />
        )}
        sx={{ width: "200px" }}
        disableClearable // Disable the "X" clear button
      />
    </Box>
  );
};

export default Categories;
