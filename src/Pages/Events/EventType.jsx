import React from "react";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OnetoOne from "./one_on_one.png";
import Group from "./group.png";
import Collective from "./collective.png";
import RoundRobin from "./round_robin.png";

const EventType = () => {
  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <IconButton sx={{ color: "blue" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ color: "blue" }}>Back</Typography>
      </Box>

      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Create New Event Type
      </Typography>

      {/* Event Type Options */}
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {/* Event Type Cards */}
          {[
            {
              img: OnetoOne,
              title: "One-on-One",
              description: "One host with one invitee",
              details: "Good for: coffee chats, 1:1 interviews, etc.",
            },
            {
              img: Group,
              title: "Group",
              description: "One host with group of invitees",
              details: "Good for: webinars, online classes, etc.",
            },
            {
              img: Collective,
              title: "Collective",
              description: "More than one host with one invitee",
              details: "Good for: panel interviews, group sales calls, etc.",
            },
            {
              img: RoundRobin,
              title: "Round Robin",
              description: "One rotating host with one invitee",
              details: "Good for: distributing incoming sales leads",
            },
          ].map((event, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                //   border: "1px solid red",
                }}
              >
                <Box
                  sx={{
                    // border: "1px solid yellow",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    sx={{
                      height: "100px",
                      width: "120px",
                    //   border: "1px solid red",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={event.img}
                      alt={event.img}
                      style={{ height: "92px", width: "100px" }}
                    />
                  </Stack>

                  <Stack>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="subtitle1">
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.details}
                    </Typography>
                  </Stack>
                </Box>
                <ArrowForwardIosIcon />
              </Box>
              {index !== 3 && <Divider sx={{ my: 2 }} />}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* More Ways to Meet */}
      <Typography variant="h5" sx={{ marginTop: "30px" }}>
        More ways to meet
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {/* One-off meeting */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{ padding: "20px", textAlign: "center", borderRadius: "8px" }}
          >
            <Typography variant="h6">One-off meeting</Typography>
            <Typography variant="body2" color="textSecondary">
              Invite someone to pick a time to meet with you without creating an
              Event Type.
            </Typography>
            <Button variant="contained" sx={{ marginTop: "20px" }}>
              Create
            </Button>
          </Paper>
        </Grid>

        {/* Meeting Poll */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{ padding: "20px", textAlign: "center", borderRadius: "8px" }}
          >
            <Typography variant="h6">Meeting poll</Typography>
            <Typography variant="body2" color="textSecondary">
              Let your group of invitees vote on a time that works for everyone.
            </Typography>
            <Button variant="contained" sx={{ marginTop: "20px" }}>
              Create
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventType;
