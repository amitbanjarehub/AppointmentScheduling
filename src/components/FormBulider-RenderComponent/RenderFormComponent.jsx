import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

const RenderFormComponent = ({ formSchema }) => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: checked,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Values: ", formValues);
  };

  const renderFields = () => {
    if (!formSchema || !formSchema.length) return null;

    return formSchema.map((component, index) => {
      switch (component.type) {
        case "header":
          return (
            <Typography
              key={index}
              variant={component.subtype || "h6"}
              gutterBottom
            >
              {component.label}
            </Typography>
          );
        case "paragraph":
          return (
            <Typography key={index} paragraph>
              {component.label}
            </Typography>
          );

        case "select":
          return (
            <FormControl fullWidth key={index} margin="normal">
              <Typography variant="body1">{component.label}</Typography>
              <select
                name={component.label.toLowerCase()}
                onChange={handleInputChange}
                value={formValues[component.label.toLowerCase()] || ""}
              >
                {(component.values || []).map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormControl>
          );

        case "radio":
          return (
            <FormControl key={index} component="fieldset" margin="normal">
              <Typography variant="body1" gutterBottom>
                {component.label}
              </Typography>
              <RadioGroup
                name={component.label.toLowerCase()}
                onChange={handleInputChange}
              >
                {(component.values || []).map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          );

        case "checkbox":
          return (
            <FormControl key={index} component="fieldset" margin="normal">
              <Typography variant="body1" gutterBottom>
                {component.label}
              </Typography>
              {(component.values || []).map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      checked={formValues[option.value] || false}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          [option.value]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormControl>
          );

        case "text":
          return (
            <TextField
              key={index}
              type={component.subtype || "text"}
              label={component.label}
              placeholder={component.placeholder}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[component.label.toLowerCase()] || ""}
            />
          );

        case "date":
          return (
            <TextField
              key={index}
              type="date"
              label={component.label}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[component.label.toLowerCase()] || ""}
            />
          );

        // Add support for File upload
        case "file":
          return (
            <TextField
              key={index}
              type="file"
              label={component.label}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
          );

        // Add support for TextArea
        case "textarea":
          return (
            <TextField
              key={index}
              label={component.label}
              placeholder={component.placeholder}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              onChange={handleInputChange}
              value={formValues[component.label.toLowerCase()] || ""}
            />
          );

        case "file-upload":
          return (
            <TextField
              key={index}
              type="file"
              label={component.label}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
          );

        // For number field
        case "number":
          return (
            <TextField
              key={index}
              type="number"
              label={component.label}
              name={component.label.toLowerCase()}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[component.label.toLowerCase()] || ""}
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
              {component.label}
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
        height: "80vh", // Increase height
        width: "100%", // Ensure it takes up the full width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%", // Full width for the form
          height: "100%", // Full height for the form
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
        <Typography variant="h4" align="center" gutterBottom>
           Form Preview Area
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ height: "100%", width: "100%" }}>
          {renderFields()}
        </form>
      </Box>
    </Container>
  );
};

export default RenderFormComponent;
