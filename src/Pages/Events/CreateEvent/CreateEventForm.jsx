// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { FaCaretRight } from "react-icons/fa6";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const CreateEventForm = ({
//   eventName,
//   setEventName,
//   duration,
//   setDuration,
//   location,
//   setLocation,
// }) => {
//   const { eventType } = useParams();
//   const navigate = useNavigate();

//   const handleDurationChange = (event) => {
//     setDuration(event.target.value);
//   };

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value); // Ensure it stores an array
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const creator_id = "Admin001";
//     const creator_name = "Admin";
//     const create_date = "2024-09-05T12:34:56Z";

//     const eventData = {
//       eventName,
//       duration,
//       location,
//       eventType,
//       creator_id,
//       creator_name,
//       create_date,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/add_events",
//         eventData
//       );

//       if (response.status === 201) {
//         alert("Form submitted successfully!");
//         navigate("/");
//       } else {
//         console.log("Something went wrong:", response.status);
//       }
//     } catch (error) {
//       console.error("Error while creating event:", error);
//       alert("Error while submitting the form.");
//     }
//   };

//   return (
//     <Paper sx={{ padding: "20px" }} elevation={3}>
//       <Box component="form" onSubmit={handleSubmit}>
//         <Typography variant="subtitle1" gutterBottom>
//           Event name *
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Name your event"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <IconButton sx={{ marginRight: "8px" }}>
//                 <FaCaretRight sx={{ color: "purple" }} />
//               </IconButton>
//             ),
//           }}
//         />

//         <Typography variant="subtitle1" sx={{ marginTop: "20px" }} gutterBottom>
//           Duration *
//         </Typography>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="duration-label">Duration</InputLabel>
//           <Select
//             labelId="duration-label"
//             value={duration}
//             onChange={handleDurationChange}
//             label="Duration"
//           >
//             <MenuItem value="15 min">15 min</MenuItem>
//             <MenuItem value="30 min">30 min</MenuItem>
//             <MenuItem value="45 min">45 min</MenuItem>
//             <MenuItem value="1 hour">1 hour</MenuItem>
//           </Select>
//         </FormControl>

//         <Typography variant="subtitle1" sx={{ marginTop: "20px" }} gutterBottom>
//           Location *
//         </Typography>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="location-label">Location</InputLabel>
//           <Select
//             labelId="location-label"
//             value={location}
//             onChange={handleLocationChange}
//             label="Location"
//             multiple
//           >
//             {/* <MenuItem value="Phone call">Phone call</MenuItem> */}
//             <MenuItem value="Google meet">Google meet</MenuItem>
//             {/* <MenuItem value="Zoom meet">Zoom meet</MenuItem> */}
//           </Select>
//         </FormControl>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: "20px" }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default CreateEventForm;
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { FaCaretRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateEventForm = ({
  eventName,
  setEventName,
  duration,
  setDuration,
  location,
  setLocation,
}) => {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const [meetLink, setMeetLink] = useState("");

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);

    // If "Google meet" is selected, create a dummy Google Meet link
    if (selectedLocation.includes("Google meet")) {
      const generatedLink = `https://meet.google.com/${Math.random()
        .toString(36)
        .substring(2, 12)}`;
      setMeetLink(generatedLink);
    } else {
      setMeetLink(""); // Clear link if Google meet is not selected
    }
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
      meetLink, // Include the Google Meet link if generated
      eventType,
      creator_id,
      creator_name,
      create_date,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add_events",
        eventData
      );

      if (response.status === 201) {
        alert("Form submitted successfully!");
        navigate("/");
      } else {
        console.log("Something went wrong:", response.status);
      }
    } catch (error) {
      console.error("Error while creating event:", error);
      alert("Error while submitting the form.");
    }
  };

  return (
    <Paper sx={{ padding: "20px" }} elevation={3}>
      <Box component="form" onSubmit={handleSubmit}>
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

        <Typography variant="subtitle1" sx={{ marginTop: "20px" }} gutterBottom>
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

        <Typography variant="subtitle1" sx={{ marginTop: "20px" }} gutterBottom>
          Location *
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            multiple
          >
            <MenuItem value="Phone call">Phone call</MenuItem>
            <MenuItem value="Google meet">Google meet</MenuItem>
            <MenuItem value="Zoom meet">Zoom meet</MenuItem>
          </Select>
        </FormControl>

        {/* Display the Google Meet link if generated */}
        {meetLink && (
          <Typography
            variant="subtitle1"
            sx={{ marginTop: "20px", color: "green" }}
          >
            Google Meet Link: <a href={meetLink}>{meetLink}</a>
          </Typography>
        )}

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
  );
};

export default CreateEventForm;
