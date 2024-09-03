import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { MdOutlineCheckCircle } from "react-icons/md";

const SubmitResponse = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "8px",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <MdOutlineCheckCircle size={48} color="green" />
        <Typography variant="h5" sx={{ marginTop: "16px", fontWeight: 700 }}>
          You are scheduled
        </Typography>
        <Typography sx={{ marginTop: "8px", color: "rgba(26, 26, 26, 0.61)" }}>
          A calendar invitation has been sent to your email address.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "24px" }}
        >
          Open Invitation
        </Button>
        <Box
          sx={{
            marginTop: "24px",
            padding: "16px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">test</Typography>
          <Typography variant="body1">Atmik Bharat</Typography>
          <Typography variant="body1">
            11:00am - 11:30am, Friday, September 27, 2024
          </Typography>
          <Typography variant="body1">India Standard Time</Typography>
          <Typography variant="body1">
            atmikbharat@gmail.com, khioeh@gmail.com, jbiep@gmail.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmitResponse;
