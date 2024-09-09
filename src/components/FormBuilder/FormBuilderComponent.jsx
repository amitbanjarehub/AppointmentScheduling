import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "formBuilder in React",
  },
  {
    type: "paragraph",
    label: "This is a demonstration of formBuilder running in a React project.",
  },
];

const FormBuilderComponent = () => {
  const fb = useRef(null);
  const formBuilderInstance = useRef(null); // Use ref to store formBuilder instance
  const [formSchema, setFormSchema] = useState(null);

  useEffect(() => {
    formBuilderInstance.current = $(fb.current).formBuilder({
      formData,
    });
  }, []);

//   const handleSaveForm = async () => {
//     const data = formBuilderInstance.current.actions.getData("json");

//     // Default structure with formName and formData
//     const formStructure = {
//       formName: "One-to-Many", // Default form name
//       formData: JSON.parse(data), // Parsed form data
//     };

//     setFormSchema(formStructure); // Save the structured form data in state

//     console.log("Saved form data:", formStructure);

//     try {
//       const response = await fetch("http://localhost:5000/api/form_builder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([formStructure]), // Wrapping form structure in an array
//       });

//       if (response.status === 201) {
//         const result = await response.json();
//         alert(result.message); // Show custom message from backend
//         console.log("Saved form data:", result.forms); // Log the inserted forms
//       } else {
//         alert("Error saving form.");
//         console.error("Error saving form:", response.statusText);
//       }
//     } catch (error) {
//       alert("Error saving form.");
//       console.error("Error:", error);
//     }
//   };



const handleSaveForm = async () => {
    const data = formBuilderInstance.current.actions.getData("json");
  
    // Default static structure
    const formStructure = {
      form_id: "form_001",  // Static form ID
      user_id: "user_001",  // Static user ID
      project_id: "project_001",  // Static project ID
      session_id: "session_001",  // Static session ID
      created_at: "2024-09-09T12:34:56Z",  // Static created date
      last_modified: "2024-09-09T15:00:00Z",  // Static last modified date
      last_modified_by: "user_002",  // Static last modified by user ID
  
      // Components array that will hold the form components dynamically
      components: JSON.parse(data).map((component, index) => ({
        user_id: "user_001",  // Static user ID for component creator
        session_id: "session_001",  // Static session ID for component creation
        project_id: "project_001",  // Static project ID
        component_id: `component_${index + 1}`,  // Dynamically generate unique component ID
        component_type: component.type,  // Component type (from formBuilder data)
        component_subtype: component.subtype || component.type,  // Subtype of component (use type if subtype doesn't exist)
        form_id: "form_001",  // Static form ID
        created_at: "2024-09-09T12:35:00Z",  // Static component creation time
        last_modified: "2024-09-09T13:00:00Z",  // Static last modified time
        last_modified_by: "user_002",  // Static last modified by user ID
  
        formData: [
          {
            type: component.type,  // The field type (e.g., text, radio, etc.)
            subtype: component.subtype || component.type,  // Subtype of the field
            label: component.label,  // Label for the field
            placeholder: component.placeholder || "",  // Placeholder (if available)
            required: component.required || false,  // Whether the field is required
            values: component.values || [],  // Possible values (for radio, checkbox, etc.)
            access: component.access || true  // Access control (default true)
          }
        ]
      }))
    };
  
    setFormSchema(formStructure);  // Save the structured form data in state
  
    console.log("Saved form data:", formStructure);
  
    // POST request to save data in the backend
    try {
      const response = await fetch("http://localhost:5000/api/form_builder1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formStructure]),  // Wrapping form structure in an array
      });
  
      if (response.status === 201) {
        const result = await response.json();
        alert(result.message);  // Show custom message from backend
        console.log("Saved form data:", result.forms);  // Log the inserted forms
      } else {
        alert("Error saving form.");
        console.error("Error saving form:", response.statusText);
      }
    } catch (error) {
      alert("Error saving form.");
      console.error("Error:", error);
    }
  };

  

  return (
    <Container maxWidth="md">
      <Box p={4} bgcolor="grey.100">
        <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
          <Typography variant="h6" color="primary" gutterBottom>
            This is an example of how to use formBuilder with React. The JSON
            data for this form was set programmatically.
          </Typography>
          <div id="fb-editor" ref={fb} />
          <Button
            onClick={handleSaveForm}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Form
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default FormBuilderComponent;
