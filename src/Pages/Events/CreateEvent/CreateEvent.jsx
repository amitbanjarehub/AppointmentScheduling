import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa6";
import axios from "axios";

const CreateEvent = () => {
  const { eventType } = useParams();

  const [duration, setDuration] = useState("30 min");
  const [location, setLocation] = useState([]);
  const [eventName, setEventName] = useState("");

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value); // Ensure it stores an array
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const creator_id = "Admin001";
    const creator_name = "Admin";
    const create_date = "2024-09-05T12:34:56Z";

    const eventData = {
      eventName,
      duration,
      location,
      eventType,
      creator_id,
      creator_name,
      create_date,
    };
    console.log("add_events:----->>>", eventData);
    try {
      // API request to save data in the database
      const response = await axios.post(
        "http://localhost:5000/api/add_events",
        eventData
      );

      if (response.status === 200) {
        console.log("Event successfully created:", response.data);
        alert("Form submitted successfully!"); // Show alert on success
      } else {
        console.log("Something went wrong:", response.status);
      }
    } catch (error) {
      console.error("Error while creating event:", error);
      alert("Error while submitting the form."); // Show alert on failure
    }
  };
  return (
    <Stack>
      <Stack
        sx={{
          border: "1px solid red",
          height: "90vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Stack
          sx={{
            border: "1px solid blue",
            height: "100%",
            width: "40%",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              width: "80%",

              margin: "0 auto",
            }}
          >
            {/* Back Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <IconButton sx={{ color: "blue" }}>
                <FaCaretRight />
              </IconButton>
              <Typography sx={{ color: "blue" }}>Cancel</Typography>
            </Box>

            {/* Title */}
            <Typography variant="h5" gutterBottom>
              New Event Type
            </Typography>

            {/* Form */}
            <Paper sx={{ padding: "20px" }} elevation={3}>
              <Box component="form" onSubmit={handleSubmit}>
                {/* Event Name */}
                <Typography variant="subtitle1" gutterBottom>
                  Event name *
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Name your event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <IconButton sx={{ marginRight: "8px" }}>
                        <FaCaretRight sx={{ color: "purple" }} />
                      </IconButton>
                    ),
                  }}
                />

                {/* Duration */}
                <Typography
                  variant="subtitle1"
                  sx={{ marginTop: "20px" }}
                  gutterBottom
                >
                  Duration *
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="duration-label">Duration</InputLabel>
                  <Select
                    labelId="duration-label"
                    value={duration}
                    onChange={handleDurationChange}
                    label="Duration"
                  >
                    <MenuItem value="15 min">15 min</MenuItem>
                    <MenuItem value="30 min">30 min</MenuItem>
                    <MenuItem value="45 min">45 min</MenuItem>
                    <MenuItem value="1 hour">1 hour</MenuItem>
                  </Select>
                </FormControl>

                {/* Location */}
                <Typography
                  variant="subtitle1"
                  sx={{ marginTop: "20px" }}
                  gutterBottom
                >
                  Location *
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    value={location} // Value must be an array
                    onChange={handleLocationChange}
                    label="Location"
                    multiple // Allow multiple selection
                  >
                    <MenuItem value="Phone call">Phone call</MenuItem>
                    <MenuItem value="Google meet">Google meet</MenuItem>
                    <MenuItem value="Zoom meet">Zoom meet</MenuItem>
                  </Select>
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Stack>

        <Stack
          sx={{
            border: "1px solid blue",
            height: "100%",
            width: "60%",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              width: "80%",
              height: "60%",
              margin: "0 auto",
              //   border: "1px solid red",
            }}
          >
            {/* Preview Banner */}
            <Box
              sx={{
                backgroundColor: "#333",
                color: "white",
                padding: "10px",
              }}
            >
              <Typography variant="subtitle1" align="center">
                <strong>This is a preview.</strong> To book an event, share the
                link with your invitees.
              </Typography>
            </Box>

            {/* Event Card */}
            <Paper
              elevation={3}
              sx={{ marginTop: "10px", padding: "20px", height: "80%" }}
            >
              <Stack direction="row" spacing={4}>
                {/* Left Section */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">Atmik Bharat</Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    Event name here
                  </Typography>

                  {/* Duration */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FaCaretRight />
                    <Typography variant="body1">30 min</Typography>
                  </Stack>

                  {/* Location */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ marginTop: "10px" }}
                  >
                    <FaCaretRight />
                    <Typography variant="body2" color="textSecondary">
                      Add a location for it to show here
                    </Typography>
                  </Stack>
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Right Section */}
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    A preview of your availability will show on the next step
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateEvent;
