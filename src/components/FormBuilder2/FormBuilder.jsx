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

const FormBuilder = () => {
  const fb = useRef(null);
  const formBuilderInstance = useRef(null); // Use ref to store formBuilder instance
  const [formSchema, setFormSchema] = useState(null);

  useEffect(() => {
    formBuilderInstance.current = $(fb.current).formBuilder({
      formData,
    });
  }, []);

  const handleSaveForm = async () => {
    const data = formBuilderInstance.current.actions.getData("json");

    // Default structure with formName and formData
    const formStructure = {
      formName: "One-to-Many", // Default form name
      formData: JSON.parse(data), // Parsed form data
    };

    setFormSchema(formStructure); // Save the structured form data in state

    console.log("Saved form data:", formStructure);

    try {
      const response = await fetch("http://localhost:5000/api/form_builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formStructure]), // Wrapping form structure in an array
      });

      if (response.status === 201) {
        const result = await response.json();
        alert(result.message); // Show custom message from backend
        console.log("Saved form data:", result.forms); // Log the inserted forms
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

export default FormBuilder;
