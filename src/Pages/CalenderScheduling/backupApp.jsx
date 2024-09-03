import { Stack, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import AppointmentForm from "./AppointmentForm"; // AppointmentForm component
import BasicDateCalendar from "./calender";
import { BiArrowBack } from "react-icons/bi";
import Calendar from "../calender/Calendar";

// import BasicDateCalendar from "./customCalender";

const App = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); // New state

  // Function to handle the 'Next' button click
  const handleShowAppointmentForm = () => {
    setShowAppointmentForm(true);
  };

  // Function to handle the 'Back' arrow click
  const handleBackClick = () => {
    setShowAppointmentForm(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          maxHeight: "700px",
          maxWidth: "1200px",
          height: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
          width: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
          border: "1px solid gray",
          display: "flex",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            height: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
            width: { xl: "40%", lg: "100%", sm: "100%", xs: "100%" },
            border: "1px solid gray",
          }}
        >
          <Stack>
            {showAppointmentForm && (
              <Stack>
                <Stack
                  sx={{
                    paddingLeft: "20px",
                    paddingTop: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handleBackClick} // Add onClick to handle back button click
                >
                  <BiArrowBack size={20} />
                </Stack>
              </Stack>
            )}
            <Typography
              sx={{
                paddingLeft: "20px",
                paddingTop: "20px",
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: 700,
                color: "rgba(26, 26, 26, 0.61)",
              }}
            >
              Atmik Bharat
            </Typography>
            <Typography
              sx={{
                paddingLeft: "20px",
                fontSize: "28px",
                lineHeight: "32px",
                fontWeight: 700,
                color: "rgb(26, 26, 26)",
              }}
            >
              Test
            </Typography>
            <Typography
              sx={{
                paddingLeft: "20px",
                paddingTop: "20px",
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: 700,
                color: "rgba(26, 26, 26, 0.61)",
              }}
            >
              <MdOutlineWatchLater size={18} />
              30 min
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            height: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
            width: { xl: "60%", lg: "100%", sm: "100%", xs: "100%" },
            border: "1px solid gray",
          
          }}
        >
          {showAppointmentForm ? (
            <AppointmentForm />
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "rgb(26, 26, 26)",
                  lineHeight: "30px",
                  paddingTop: "20px",
                  marginLeft: "20px",
                }}
              >
                Select a Date & Time
              </Typography>

              {/* <BasicDateCalendar onNextClick={handleShowAppointmentForm} /> */}
              <Calendar />
           
             
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default App;
