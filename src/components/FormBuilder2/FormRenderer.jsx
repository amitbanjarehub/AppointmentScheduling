import React from "react";
import { TextField, Button, Typography } from "@mui/material";

const GeneratedForm = ({ formSchema }) => {
  const renderFormFields = () => {
    return formSchema.map((field, index) => {
      if (field.type === "header") {
        return (
          <Typography key={index} variant={field.subtype || "h6"}>
            {field.label}
          </Typography>
        );
      } else if (field.type === "paragraph") {
        return (
          <Typography key={index} paragraph>
            {field.label}
          </Typography>
        );
      } else if (field.type === "text") {
        return (
          <TextField
            key={index}
            label={field.label}
            fullWidth
            margin="normal"
          />
        );
      }
      // Add cases for other field types like radio, checkbox, etc.
      return null;
    });
  };

  return (
    <form>
      {renderFormFields()}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default GeneratedForm;
