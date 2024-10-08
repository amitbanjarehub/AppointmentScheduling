
import React, { useState } from "react";
import { Stack, Box, IconButton, Typography } from "@mui/material";
import { FaCaretRight } from "react-icons/fa6";
import CreateEventForm from "./CreateEventForm";
import EventPreview from "./EventPreview";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState("30 min");
  const [location, setLocation] = useState([]);

  return (
    <Stack sx={{ height: "90vh", flexDirection: "row" }}>
      <Stack sx={{ width: "40%" }}>
        <Box sx={{ padding: "20px", width: "80%", margin: "0 auto" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <IconButton sx={{ color: "blue" }}>
              <FaCaretRight />
            </IconButton>
            <Typography sx={{ color: "blue" }}>Cancel</Typography>
          </Box>

          <Typography variant="h5" gutterBottom>
            New Event Type anik
          </Typography>

          <CreateEventForm
            eventName={eventName}
            setEventName={setEventName}
            duration={duration}
            setDuration={setDuration}
            location={location}
            setLocation={setLocation}
          />
        </Box>
      </Stack>

      <Stack sx={{ width: "60%" }}>
        <EventPreview
          eventName={eventName}
          duration={duration}
          location={location}
        />
      </Stack>
    </Stack>
  );
};

export default CreateEvent;
