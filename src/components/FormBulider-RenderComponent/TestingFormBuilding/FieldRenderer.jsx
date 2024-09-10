import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Radio,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@mui/material";

const fieldTypes = {
  TEXT: "text",
  TEXTAREA: "textarea",
  PARAGRAPH: "paragraph",
  HEADER: "header",
  FILE_UPLOAD: "file-upload",
  DATE: "date",
  BUTTON: "button",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SELECT: "select",
  NUMBER: "number",
};

const FieldRenderer = ({ field }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  switch (field.type) {
    case fieldTypes.TEXT:
      return (
        <TextField
          label={field.label || "Text Field"}
          variant="outlined"
          fullWidth
          required={field.required}
          placeholder={field.placeholder || ""}
          className={field.className || ""}
          name={field.name || ""}
          helperText={field.helpText || ""}
          value={field.value || ""}
          type={field.type || "text"}
          inputProps={{ maxLength: field.maxLength || "" }}
        />
      );
    case fieldTypes.NUMBER:
      return (
        <TextField
          label={field.label || "Number"}
          variant="outlined"
          fullWidth
          type="number"
          required={field.required}
          placeholder={field.placeholder || ""}
          className={field.className || ""}
          name={field.name || ""}
          helperText={field.helpText || ""}
          value={field.value || ""}
          inputProps={{
            min: field.min || "",
            max: field.max || "",
            step: field.step || "",
          }}
        />
      );

    case fieldTypes.CHECKBOX:
      return (
        <Box>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <Box display={field.inline ? "inline-flex" : "block"}>
            {field.options && field.options.length > 0 ? (
              field.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={option.checked} />}
                  label={option.label}
                />
              ))
            ) : (
              <FormControlLabel control={<Checkbox />} label="Option 1" />
            )}
          </Box>
          {field.enableOther && (
            <FormControlLabel control={<Checkbox />} label="Other" />
          )}
          {field.helpText && <FormHelperText>{field.helpText}</FormHelperText>}
        </Box>
      );

    case fieldTypes.RADIO:
      return (
        <Box>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <RadioGroup row={field.inline}>
            {field.options && field.options.length > 0 ? (
              field.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio />}
                  label={option.label}
                  value={option.value}
                />
              ))
            ) : (
              <FormControlLabel control={<Radio />} label="Option 1" />
            )}
          </RadioGroup>
          {field.enableOther && (
            <FormControlLabel control={<Radio />} label="Other" />
          )}
          {field.helpText && <FormHelperText>{field.helpText}</FormHelperText>}
        </Box>
      );

    case fieldTypes.SELECT:
      return (
        <Box>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <Select
            multiple={field.allowMultiple}
            displayEmpty
            placeholder={field.placeholder || "Select..."}
            fullWidth
          >
            {field.options && field.options.length > 0 ? (
              field.options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Option 1</MenuItem>
            )}
          </Select>
          {field.helpText && <FormHelperText>{field.helpText}</FormHelperText>}
        </Box>
      );

    case fieldTypes.TEXTAREA:
      return (
        <TextField
          label={field.label || "Text Area"}
          variant="outlined"
          fullWidth
          required={field.required}
          placeholder={field.placeholder || ""}
          multiline
          rows={4}
        />
      );

    case fieldTypes.PARAGRAPH:
      return (
        <p>
          {field.label ||
            "This is a paragraph. Edit the content in the config form."}
        </p>
      );

    case fieldTypes.HEADER:
      const HeaderTag = field.type || "h1";
      return (
        <HeaderTag className={field.className}>
          {field.label || "Header"}
        </HeaderTag>
      );

    case fieldTypes.FILE_UPLOAD:
      return (
        <Box>
          <Button variant="contained" component="label">
            {field.label || "Upload File"}
            <input
              type="file"
              hidden
              multiple={field.multiple}
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && <span>{selectedFile.name}</span>}
        </Box>
      );

    case fieldTypes.DATE:
      return (
        <TextField
          label={field.label || "Date Field"}
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={field.value || ""}
          InputProps={{
            min: field.min || "",
            max: field.max || "",
            step: field.step || "",
          }}
        />
      );
    case fieldTypes.BUTTON:
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Button clicked!")}
        >
          {field.label || "Submit"}
        </Button>
      );
    default:
      return null;
  }
};

export default FieldRenderer;
