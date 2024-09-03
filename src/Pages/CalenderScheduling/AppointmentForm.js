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
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            paddingTop: "20px",
            fontSize: {
              xl: "20px",
              lg: "20px",
              md: "20px",
              sm: "16px",
              xs: "16px",
            },
            lineHeight: {
              xl: "24px",
              lg: "24px",
              md: "24px",
              sm: "20px",
              xs: "20px",
            },
            fontWeight: 700,
            color: "black",
            marginBottom: "20px",
          }}
        >
          Enter Details
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="Enter your name"
          InputLabelProps={{
            sx: {
              fontSize: {
                xl: "20px",
                lg: "20px",
                md: "20px",
                sm: "16px",
                xs: "16px",
              },
              lineHeight: {
                xl: "24px",
                lg: "24px",
                md: "24px",
                sm: "20px",
                xs: "20px",
              },
              fontWeight: 700,
              color: "black",
            },
          }}
          sx={{
            width: {
              xl: "500px",
              lg: "450px",
              md: "400px",
              sm: "100%",
              xs: "100%",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="example@gmail.com"
          InputLabelProps={{
            sx: {
              fontSize: {
                xl: "20px",
                lg: "20px",
                md: "20px",
                sm: "16px",
                xs: "16px",
              },
              lineHeight: {
                xl: "24px",
                lg: "24px",
                md: "24px",
                sm: "20px",
                xs: "20px",
              },
              fontWeight: 700,
              color: "black",
            },
          }}
          sx={{
            width: {
              xl: "500px",
              lg: "450px",
              md: "400px",
              sm: "100%",
              xs: "100%",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
          }}
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
          InputLabelProps={{
            sx: {
              fontSize: {
                xl: "16px",
                lg: "16px",
                md: "16px",
                sm: "16px",
                xs: "16px",
              },
              lineHeight: {
                xl: "24px",
                lg: "24px",
                md: "24px",
                sm: "20px",
                xs: "20px",
              },
              fontWeight: 700,
              color: "black",
            },
          }}
          sx={{
            width: {
              xl: "500px",
              lg: "450px",
              md: "400px",
              sm: "100%",
              xs: "100%",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
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
          InputLabelProps={{
            sx: {
              fontSize: {
                xl: "20px",
                lg: "20px",
                md: "20px",
                sm: "16px",
                xs: "16px",
              },
              lineHeight: {
                xl: "24px",
                lg: "24px",
                md: "24px",
                sm: "20px",
                xs: "20px",
              },
              fontWeight: 700,
              color: "black",
            },
          }}
          sx={{
            width: {
              xl: "500px",
              lg: "450px",
              md: "300px",
              sm: "100%",
              xs: "100%",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
          }}
        />
        <Typography
          sx={{
            marginTop: "80px",
            width: {
              xl: "400px",
              lg: "350px",
              md: "300px",
              sm: "250px",
              xs: "200px",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
            borderRadius: "12px",
          }}
        >
          <p>
            By proceeding, you confirm that you have read and agree to{" "}
            <span style={{ color: "blue" }}>Calendly's Terms of Use</span> and{" "}
            <span style={{ color: "blue" }}>Privacy Notice.</span>
          </p>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleScheduleEvent} // Trigger navigation on click
          sx={{
            marginTop: "20px",
            width: {
              xl: "400px",
              lg: "350px",
              md: "300px",
              sm: "250px",
              xs: "200px",
            },
            height: {
              xl: "60px",
              lg: "55px",
              md: "50px",
              sm: "45px",
              xs: "40px",
            },
            borderRadius: "12px",
          }}
        >
          Schedule Event
        </Button>
      </Grid>
    </Container>
  );
};

export default AppointmentForm;
