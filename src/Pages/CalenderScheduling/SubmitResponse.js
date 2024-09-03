import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
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
        // border: "1px solid red",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "8px",
          maxWidth: "1060px",
          maxHeight: "700px",
          textAlign: "center",
          height: { xl: "100%", lg: "100%" },
          width: { xl: "100%", lg: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MdOutlineCheckCircle size={48} color="green" />
          <Typography variant="h5" sx={{ marginTop: "16px", fontWeight: 700 }}>
            You are scheduled
          </Typography>
          <Typography
            sx={{ marginTop: "8px", color: "rgba(26, 26, 26, 0.61)" }}
          >
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
              // border: "1px solid red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                marginTop: "24px",
                // padding: "16px",
                border: "1px solid gray",
                borderRadius: "8px",
                width: { xl: "100%", lg: "100%" },
              }}
            >
              <Stack sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Typography variant="h6">test</Typography>
                <Typography variant="body1">Atmik Bharat</Typography>
                <Typography variant="body1">
                  11:00am - 11:30am, Friday, September 27, 2024
                </Typography>
                <Typography variant="body1">India Standard Time</Typography>
                <Typography variant="body1">
                  atmikbharat@gmail.com, khioeh@gmail.com, jbiep@gmail.com
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            fontSize: "20px",
            fontWeight: 400,
            color: "blue",
          }}
        >
          Cookie Setting
        </Stack>
      </Box>
    </Box>
  );
};

export default SubmitResponse;
