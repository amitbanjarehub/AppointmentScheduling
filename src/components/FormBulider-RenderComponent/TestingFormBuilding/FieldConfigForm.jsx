import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

const FieldConfigForm = ({ field, onSave, onCancel }) => {
  const [label, setLabel] = useState(field.label || "");
  const [helpText, setHelpText] = useState(field.helpText || "");
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [className, setClassName] = useState(field.className || "form-control");
  const [name, setName] = useState(field.name || "");
  const [access, setAccess] = useState(field.access || false);
  const [required, setRequired] = useState(field.required || false);
  const [multiple, setMultiple] = useState(field.multiple || false);
  const [min, setMin] = useState(field.min || "");
  const [max, setMax] = useState(field.max || "");
  const [step, setStep] = useState(field.step || "");
  const [options, setOptions] = useState(field.options || []);
  const [style, setStyle] = useState(field.style || "");

  const addOption = () => setOptions([...options, { label: "", value: "" }]);

  const updateOption = (index, newOption) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? newOption : opt
    );
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    onSave({
      ...field,
      label,
      helpText,
      placeholder,
      className,
      name,
      access,
      required,
      multiple,
      min,
      max,
      step,
      options,
      style,
    });
  };

  return (
    <Box p={2} border="1px solid lightgray" mb={2}>
      <FormControlLabel
        control={
          <Checkbox
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
        }
        label="Required"
      />
      <TextField
        label="Label"
        variant="outlined"
        fullWidth
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Help Text"
        variant="outlined"
        fullWidth
        value={helpText}
        onChange={(e) => setHelpText(e.target.value)}
        sx={{ mb: 2 }}
      />
      {field.type !== "paragraph" && (
        <TextField
          label="Placeholder"
          variant="outlined"
          fullWidth
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      <TextField
        label="Class"
        variant="outlined"
        fullWidth
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={access}
            onChange={(e) => setAccess(e.target.checked)}
          />
        }
        label="Limit access to one or more of the following roles"
      />
      {field.type === "file-upload" && (
        <FormControlLabel
          control={
            <Checkbox
              checked={multiple}
              onChange={(e) => setMultiple(e.target.checked)}
            />
          }
          label="Allow users to upload multiple files"
        />
      )}

      {(field.type === "checkbox" ||
        field.type === "radio" ||
        field.type === "select") && (
        <>
          <Box mb={2}>
            {options.map((option, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <TextField
                  label="Option Label"
                  variant="outlined"
                  fullWidth
                  value={option.label}
                  onChange={(e) =>
                    updateOption(index, {
                      ...option,
                      label: e.target.value,
                    })
                  }
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Option Value"
                  variant="outlined"
                  fullWidth
                  value={option.value}
                  onChange={(e) =>
                    updateOption(index, {
                      ...option,
                      value: e.target.value,
                    })
                  }
                />
              </Box>
            ))}
            <Button onClick={addOption} variant="contained">
              Add Option
            </Button>
          </Box>
        </>
      )}

      <Box mt={2}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default FieldConfigForm;
