
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  TextField,
  Checkbox,
  Radio,
  Select,
  MenuItem,
  IconButton,
  Button,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import {
  Delete,
  Edit,
  ArrowUpward,
  ArrowDownward,
  ContentCopy,
} from "@mui/icons-material";

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

// Field configuration form component

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
      {field.type !== fieldTypes.PARAGRAPH && (
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
      {/* Additional elements based on field type */}
      {field.type === fieldTypes.FILE_UPLOAD && (
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
      {field.type === fieldTypes.BUTTON && (
        <TextField
          label="Style"
          variant="outlined"
          fullWidth
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      {(field.type === fieldTypes.NUMBER || field.type === fieldTypes.DATE) && (
        <>
          <TextField
            label="Min"
            variant="outlined"
            fullWidth
            value={min}
            onChange={(e) => setMin(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Max"
            variant="outlined"
            fullWidth
            value={max}
            onChange={(e) => setMax(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Step"
            variant="outlined"
            fullWidth
            value={step}
            onChange={(e) => setStep(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      )}
      {(field.type === fieldTypes.CHECKBOX ||
        field.type === fieldTypes.RADIO ||
        field.type === fieldTypes.SELECT) && (
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

// Draggable field component
const DraggableField = ({ type, label }) => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type, label },
  }));

  return (
    <Box ref={drag} p={2} mb={2} border="1px solid gray">
      {label}
    </Box>
  );
};

// Form design area for dropping fields
const FormDesignArea = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: "field",
    drop: (item) => onDrop(item),
  });

  return (
    <Box
      ref={drop}
      p={4}
      border="1px dashed gray"
      width="40%"
      height="800px"
      overflow="auto"
      bgcolor="#f9f9f9"
      // sx={{ border: "1px solid red" }}
    >
      {children}
    </Box>
  );
};

const CustomFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDrop = (item) => {
    setFields((prevFields) => [
      ...prevFields,
      { ...item, label: item.label || "Untitled Field", required: false },
    ]);
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleCopyField = (index) => {
    const fieldToCopy = fields[index];
    const newField = { ...fieldToCopy, label: `${fieldToCopy.label} (Copy)` };
    const updatedFields = [
      ...fields.slice(0, index + 1),
      newField,
      ...fields.slice(index + 1),
    ];
    setFields(updatedFields);
  };

  const handleSaveField = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
    setEditingIndex(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex" p={0}>
        {/* Right Panel: List of Fields */}
        <Box width="10%" p={2} border="1px solid gray">
          <DraggableField type={fieldTypes.TEXT} label="Text Field" />
          <DraggableField type={fieldTypes.TEXTAREA} label="Text Area" />
          <DraggableField type={fieldTypes.PARAGRAPH} label="Paragraph" />
          <DraggableField type={fieldTypes.HEADER} label="Header" />
          <DraggableField type={fieldTypes.FILE_UPLOAD} label="File Upload" />
          <DraggableField type={fieldTypes.DATE} label="Date Field" />
          <DraggableField type={fieldTypes.BUTTON} label="Button" />
          <DraggableField type={fieldTypes.NUMBER} label="Number" />
          <DraggableField type={fieldTypes.CHECKBOX} label="Checkbox" />
          <DraggableField type={fieldTypes.RADIO} label="Radio Button" />
          <DraggableField type={fieldTypes.SELECT} label="Select Box" />
        </Box>

        {/* Left Panel: Form Design Area */}
        <Box width="80%" p={0}>
          <FormDesignArea onDrop={handleDrop} p={0}>
            {fields.length === 0 ? (
              <Box>Drag fields here to design your form</Box>
            ) : (
              fields.map((field, index) => (
                <Box
                  key={index}
                  mb={2}
                  p={1}
                  border="1px solid lightgray"
                  position="relative"
                >
                  <FieldRenderer field={field} />
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    display="none"
                    className="field-controls"
                    sx={{ display: { xs: "flex" }, gap: "4px" }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setEditingIndex(index)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteField(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleCopyField(index)}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <ArrowUpward fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <ArrowDownward fontSize="small" />
                    </IconButton>
                  </Box>
                  {editingIndex === index && (
                    <FieldConfigForm
                      field={field}
                      onSave={(updatedField) =>
                        handleSaveField(index, updatedField)
                      }
                      onCancel={() => setEditingIndex(null)}
                    />
                  )}
                </Box>
              ))
            )}
          </FormDesignArea>
        </Box>
      </Box>
    </DndProvider>
  );
};

// Render field based on type
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

export default CustomFormBuilder;
