import { Button, TextField, Typography, Box, Container } from "@mui/material";
import React, { useState } from "react";

const RenderFormComponent = () => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formValues:--------->>", formValues);
  };

  const formData = {
    _id: "66dec17f0a1a85d758130570",
    form_id: "form_001",
    user_id: "user_001",
    project_id: "project_001",
    session_id: "session_001",
    created_at: "2024-09-09T12:34:56Z",
    last_modified: "2024-09-09T15:00:00Z",
    last_modified_by: "user_002",
    components: [
      {
        component_id: "component_1",
        component_type: "header",
        component_subtype: "h1",
        formData: [
          {
            type: "header",
            subtype: "h1",
            label: "Header name",
          },
        ],
      },
      {
        component_id: "component_2",
        component_type: "paragraph",
        component_subtype: "p",
        formData: [
          {
            type: "paragraph",
            subtype: "p",
            label: "Header description",
          },
        ],
      },
      {
        component_id: "component_3",
        component_type: "text",
        component_subtype: "email",
        formData: [
          {
            type: "text",
            subtype: "email",
            label: "Email",
            placeholder: "Enter your email",
          },
        ],
      },
      {
        component_id: "component_4",
        component_type: "text",
        component_subtype: "password",
        formData: [
          {
            type: "text",
            subtype: "password",
            label: "Password",
            placeholder: "Enter your password",
          },
        ],
      },
      {
        component_id: "component_5",
        component_type: "button",
        component_subtype: "button",
        formData: [
          {
            type: "button",
            subtype: "button",
            label: "Login",
          },
        ],
      },
    ],
  };

  const renderFields = () => {
    if (!formData.components) return null;

    return formData.components.map((component, index) => {
      const field = component.formData[0];
      switch (field.type) {
        case "header":
          return (
            <Typography
              key={index}
              variant={field.subtype || "h6"}
              gutterBottom
            >
              {field.label}
            </Typography>
          );
        case "paragraph":
          return (
            <Typography key={index} paragraph>
              {field.label}
            </Typography>
          );
        case "text":
          return (
            <TextField
              key={index}
              type={field.subtype || "text"}
              label={field.label}
              placeholder={field.placeholder}
              name={field.label.toLowerCase()}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[field.label.toLowerCase()] || ""}
            />
          );
        case "button":
          return (
            <Button
              key={index}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              {field.label}
            </Button>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Container
      sx={{
        height: "76%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "92%",
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit} style={{ height: "100%", width: "100%" }}>
          {renderFields()}
        </form>
      </Box>
    </Container>
  );
};

export default RenderFormComponent;
