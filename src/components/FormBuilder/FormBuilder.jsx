
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";


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

  useEffect(() => {
    $(fb.current).formBuilder({ formData });
  }, []);

  return (
    <Container maxWidth="md">
      <Box p={4} bgcolor="grey.100">
        <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
          <Typography variant="h6" color="primary" gutterBottom>
            This is an example of how to use formBuilder with React. The JSON
            data for this form was set programmatically.
          </Typography>
          <div id="fb-editor" ref={fb} />
        </Paper>
      </Box>
    </Container>
  );
};

export default FormBuilder;
