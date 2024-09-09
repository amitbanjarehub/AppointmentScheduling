

import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const RenderForm = () => {
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      const response = await fetch("http://localhost:5000/api/form_builder");
      const data = await response.json();
      setFormData(data[0]?.formData);
    };

    fetchFormData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formValues:--------->>", formValues);
    
  };

  const renderFields = () => {
    if (!formData) return null; 
    return formData.map((field, index) => {
      switch (field.type) {
        case "header":
          return (
            <Typography key={index} variant={field.subtype || "h6"}>
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
              name={field.name} 
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[field.name] || ""} 
            />
          );
        case "button":
          return (
            <Button
              key={index}
              variant={field.style === "primary" ? "contained" : "outlined"}
              color={field.style || "primary"}
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
    <div>
      <form onSubmit={handleSubmit}>{renderFields()}</form>
    </div>
  );
};

export default RenderForm;
