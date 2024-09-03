import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomDateCalendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          mx: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select a Date & Time
        </Typography>
        <DateCalendar
          sx={{
            "& .MuiCalendarPicker-root": {
              width: "100%",
            },
            "& .MuiPickersCalendarHeader-root": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            "& .MuiPickersArrowSwitcher-root": {
              order: -1,
              "& .MuiIconButton-root": {
                color: "black",
              },
            },
            "& .MuiTypography-caption": {
              fontSize: "14px",
              color: "black",
            },
            "& .MuiPickersDay-root": {
              fontSize: "14px",
              backgroundColor: "#F0F4FF",
              color: "black",
              "&.Mui-selected": {
                backgroundColor: "#1E88E5",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#BBDEFB",
              },
            },
            "& .MuiPickersDay-root.Mui-disabled": {
              backgroundColor: "#F5F5F5",
              color: "#BDBDBD",
            },
            "& .MuiPickersDay-root:focus": {
              backgroundColor: "#64B5F6",
              color: "white",
            },
          }}
          showDaysOutsideCurrentMonth
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateCalendar;
