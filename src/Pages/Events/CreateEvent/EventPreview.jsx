import React from "react";
import { Box, Paper, Stack, Typography, Divider } from "@mui/material";
import { FaCaretRight } from "react-icons/fa6";

const EventPreview = ({ eventName, duration, location }) => {
  return (
    <Box
      sx={{ padding: "20px", width: "80%", height: "60%", margin: "0 auto" }}
    >
      <Box sx={{ backgroundColor: "#333", color: "white", padding: "10px" }}>
        <Typography variant="subtitle1" align="center">
          <strong>This is a preview.</strong> To book an event, share the link
          with your invitees.
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{ marginTop: "10px", padding: "20px", height: "80%" }}
      >
        <Stack direction="row" spacing={4}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Atmik Bharat</Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              {eventName ? eventName : "Event name here"}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <FaCaretRight />
              <Typography variant="body1">
                {duration ? duration : "Duration here"}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ marginTop: "10px" }}
            >
              <FaCaretRight />
              <Typography variant="body2" color="textSecondary">
                {location && location.length > 0
                  ? location.join(", ")
                  : "Add a location for it to show here"}
              </Typography>
            </Stack>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              A preview of your availability will show on the next step
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EventPreview;
