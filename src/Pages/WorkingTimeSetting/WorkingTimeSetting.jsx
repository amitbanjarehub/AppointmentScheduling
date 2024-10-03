import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";

import WeeklyHourSetting from "./WeeklyHourSetting";
import SpecialDateSetting from "./SpecialDateSetting";

// Initialize moment localizer for the calendar
const localizer = momentLocalizer(moment);

const WorkingTimeSetting = () => {
  const [view, setView] = useState("month");
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeZone, setTimeZone] = useState("India Standard Time");
  const [eventTypes, setEventTypes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog box
  const [scheduleName, setScheduleName] = useState(""); // State for schedule name input

  // Calendar event data (can be replaced with dynamic data)
  const events = [];

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  // Open the dialog when clicking "Create schedule"
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle the creation of a schedule
  const handleCreateSchedule = () => {
    console.log("Schedule created:", scheduleName);
    // Reset the input field and close the dialog
    setScheduleName("");
    handleCloseDialog();
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Availability
      </Typography>

      {/* Tabs */}
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Schedules" />
          <Tab label="Holidays" />
        </Tabs>
      </AppBar>

      {/* Schedule Controls */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" size="small">
            Working hours
          </Button>
          {/* <Button variant="outlined" size="small">
            Appointment
          </Button>
          <Button variant="outlined" size="small">
            Testing
          </Button> */}
          <Button variant="outlined" size="small" onClick={handleOpenDialog}>
            Create schedule
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Active on</Typography>
          <Button variant="text">{eventTypes.length} Event Types</Button>

          <FormControl>
            <Select value={timeZone} onChange={handleTimeZoneChange}>
              <MenuItem value="India Standard Time">
                India Standard Time
              </MenuItem>
              <MenuItem value="GMT">GMT</MenuItem>
              {/* Add more time zones as required */}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(event, nextView) => handleViewChange(nextView)}
          >
            <ToggleButton value="list">List view</ToggleButton>
            <ToggleButton value="month">Calendar view</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Conditional rendering based on the view */}
      <Box sx={{ marginTop: 3 }}>
        {view === "month" ? (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month"]}
            style={{ height: 500 }}
          />
        ) : (
          // <WeeklyHourSetting />
          <Stack
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ width: "50%", border: "1px solid gray" }}>
              <WeeklyHourSetting />
            </Stack>
            <Stack sx={{ width: "50%", border: "1px solid gray" }}>
              <SpecialDateSetting />
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Dialog for creating a schedule */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new schedule.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Schedule name"
            type="text"
            fullWidth
            variant="outlined"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleCreateSchedule}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkingTimeSetting;
