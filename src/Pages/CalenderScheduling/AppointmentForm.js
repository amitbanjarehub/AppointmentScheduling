import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";


const AppointmentForm = () => {
  const [guestEmails, setGuestEmails] = useState([]);
  const [guestEmailInput, setGuestEmailInput] = useState("");

  const handleAddGuestEmail = () => {
    if (guestEmailInput && !guestEmails.includes(guestEmailInput)) {
      setGuestEmails([...guestEmails, guestEmailInput]);
      setGuestEmailInput("");
    }
  };

  const handleDeleteGuestEmail = (emailToDelete) => () => {
    setGuestEmails(guestEmails.filter((email) => email !== emailToDelete));
  };

  const navigate = useNavigate(); // Initialize useNavigate

  const handleScheduleEvent = () => {
    navigate("/submit-response"); // Navigate to SubmitResponse component
  };

  return (
    <Container maxWidth="md">
      <Grid item xs={12} md={7}>
        <Typography variant="h6" gutterBottom>
          Enter Details
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="Sazal Malhotra"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="atmikbharat@gmail.com"
        />
        <TextField
          label="Guest Email(s)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={guestEmailInput}
          onChange={(e) => setGuestEmailInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddGuestEmail();
              e.preventDefault();
            }
          }}
        />
        <Box mb={2}>
          {guestEmails.map((email) => (
            <Chip
              key={email}
              label={email}
              onDelete={handleDeleteGuestEmail(email)}
              sx={{ margin: "4px" }}
            />
          ))}
        </Box>
        <TextField
          label="Please share anything that will help prepare for our meeting."
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          defaultValue="your services"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleScheduleEvent} // Trigger navigation on click
        >
          Schedule Event
        </Button>
      </Grid>
    </Container>
  );
};

export default AppointmentForm;
