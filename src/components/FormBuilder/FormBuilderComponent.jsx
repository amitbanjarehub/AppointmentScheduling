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
  const formBuilderInstance = useRef(null);
  const [formSchema, setFormSchema] = useState(null);

  useEffect(() => {
    // Initialize formBuilder only if it's not already initialized
    if (!formBuilderInstance.current) {
      formBuilderInstance.current = $(fb.current).formBuilder({
        formData,
      });
    }
  }, []); // Empty dependency array ensures this only runs once

  const handleSaveForm = async () => {
    const data = formBuilderInstance.current.actions.getData("json");

    const formStructure = {
      form_id: "form_001",
      user_id: "user_001",
      project_id: "project_001",
      session_id: "session_001",
      created_at: "2024-09-09T12:34:56Z",
      last_modified: "2024-09-09T15:00:00Z",
      last_modified_by: "user_002",

      components: JSON.parse(data).map((component, index) => ({
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: `component_${index + 1}`,
        component_type: component.type,
        component_subtype: component.subtype || component.type,
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",

        formData: [
          {
            type: component.type,
            subtype: component.subtype || component.type,
            label: component.label,
            placeholder: component.placeholder || "",
            required: component.required || false,
            values: component.values || [],
            access: component.access || true,
          },
        ],
      })),
    };

    setFormSchema(formStructure);

    console.log("Saved form data:", formStructure);

    try {
      const response = await fetch("http://localhost:5000/api/form_builder1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formStructure]),
      });

      if (response.status === 201) {
        const result = await response.json();
        alert(result.message);
        console.log("Saved form data:", result.forms);
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
      <Box p={4} >
      <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
        <Typography variant="h6" color="primary" gutterBottom>
          This is an example of how to use formBuilder with React. The JSON data
          for this form was set programmatically.
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
