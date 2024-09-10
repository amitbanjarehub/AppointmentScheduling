// import $ from "jquery";
// import React, { useEffect, useRef } from "react";
// import { Container, Typography, Paper, Box } from "@mui/material";

// window.jQuery = $;
// window.$ = $;

// require("jquery-ui-sortable");
// require("formBuilder");

// const formData = [
//   {
//     type: "header",
//     subtype: "h1",
//     label: "formBuilder in React",
//   },
//   {
//     type: "paragraph",
//     label: "This is a demonstration of formBuilder running in a React project.",
//   },
// ];

// const FormBuilder = () => {
//   const fb = useRef(null);

//   useEffect(() => {
//     $(fb.current).formBuilder({ formData });
//   }, []);

//   return (
//     <Container maxWidth="md">
//       <Box p={4} bgcolor="grey.100">
//         <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
//           <Typography variant="h6" color="primary" gutterBottom>
//             This is an example of how to use formBuilder with React. The JSON
//             data for this form was set programmatically.
//           </Typography>
//           <div id="fb-editor" ref={fb} />
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default FormBuilder;

import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

const formElements = [
  { id: 1, label: "Text Field", type: "text" },
  { id: 2, label: "Date Field", type: "date" },
  { id: 3, label: "Select", type: "select" },
  { id: 4, label: "Checkbox", type: "checkbox" },
  { id: 5, label: "Radio Button", type: "radio" },
];

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);

  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  const handleDrop = () => {
    if (draggedElement) {
      setFormFields([...formFields, draggedElement]);
      setDraggedElement(null);
    }
  };

  const handleSave = () => {
    const formData = JSON.stringify(formFields, null, 2);
    console.log("Saved Form Data: ", formData);
    // You can send this formData to the backend/database
  };

  return (
    <Box display="flex" justifyContent="space-between" p={3}>
      <Box>
        <Typography variant="h6">Drag Fields:</Typography>
        {formElements.map((element) => (
          <Paper
            key={element.id}
            onDragStart={() => handleDragStart(element)}
            draggable
            sx={{ p: 2, my: 1, cursor: "grab" }}
          >
            {element.label}
          </Paper>
        ))}
      </Box>

      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          width: "70%",
          minHeight: "300px",
          border: "2px dashed gray",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Form Build Area</Typography>
        {formFields.length === 0 && (
          <Typography>Drag a field from the right to this area</Typography>
        )}
        {formFields.map((field, index) => (
          <Box key={index} my={2}>
            {field.type === "text" && (
              <input type="text" placeholder="Text Field" />
            )}
            {field.type === "date" && <input type="date" />}
            {field.type === "select" && (
              <select>
                <option value="">Select an option</option>
              </select>
            )}
            {field.type === "checkbox" && <input type="checkbox" />}
            {field.type === "radio" && <input type="radio" />}
          </Box>
        ))}
      </Box>

      <Box display="flex" flexDirection="column">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Form
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => console.log("Preview the form")}
        >
          Preview Form
        </Button>
      </Box>
    </Box>
  );
};

export default FormBuilder;
