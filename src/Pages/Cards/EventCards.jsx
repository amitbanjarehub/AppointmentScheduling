// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import axios from "axios"; // You can also use fetch

// const EventCards = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/all_events"
//         );
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {events.map((event) => (
//         <Card
//           key={event._id}
//           sx={{
//             maxWidth: 365,
//             borderRadius: "8px",
//             boxShadow: 2,
//             marginLeft: "80px",
//             mb: 2,
//           }}
//         >
//           {/* Top Bar with Border and Settings Icon */}
//           <Box sx={{ height: "5px", backgroundColor: "#9c27b0" }} />
//           <CardContent>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="flex-start"
//             >
//               {/* Event Info */}
//               <Box>
//                 <Typography variant="h6">{event.event_name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {event.event_duration}, One-on-One
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "blue",
//                     textDecoration: "underline",
//                     cursor: "pointer",
//                     mt: 1,
//                   }}
//                 >
//                   View booking page
//                 </Typography>
//               </Box>
//               {/* Settings Icon */}
//               <IconButton>
//                 <SettingsIcon />
//               </IconButton>
//             </Stack>
//           </CardContent>
//           <Box sx={{ borderTop: "1px solid #e0e0e0", padding: "8px 16px" }}>
//             <Stack direction="row" justifyContent="space-between">
//               <Button
//                 variant="outlined"
//                 startIcon={<ContentCopyIcon />}
//                 sx={{ textTransform: "none" }}
//               >
//                 Copy link
//               </Button>
//               <Button variant="outlined" sx={{ textTransform: "none" }}>
//                 Share
//               </Button>
//             </Stack>
//           </Box>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default EventCards;
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

const EventCards = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/all_events"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: "16px" }}>
      {events.map((event) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3} // 4 cards per row on lg and above (desktop)
          key={event._id}
        >
          <Card
            sx={{
              maxWidth: 365,
              borderRadius: "8px",
              boxShadow: 2,
              margin: "auto", // Center the cards horizontally
            }}
          >
            {/* Top Bar with Border and Settings Icon */}
            <Box sx={{ height: "5px", backgroundColor: "#9c27b0" }} />
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                {/* Event Info */}
                <Box>
                  <Typography variant="h6">{event.event_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.event_duration}, One-on-One
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                      mt: 1,
                    }}
                  >
                    View booking page
                  </Typography>
                </Box>
                {/* Settings Icon */}
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Stack>
            </CardContent>
            <Box sx={{ borderTop: "1px solid #e0e0e0", padding: "8px 16px" }}>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Copy link
                </Button>
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Share
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventCards;
