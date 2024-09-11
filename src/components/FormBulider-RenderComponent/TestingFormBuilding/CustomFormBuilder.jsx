import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import {
  Edit,
  Delete,
  ContentCopy,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

import DraggableField from "./DraggableField";
import FieldConfigForm from "./FieldConfigForm";
import FieldRenderer from "./FieldRenderer";

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

// Custom hook for dragging and dropping fields in the form design area
const DraggableFormField = ({ field, index, moveField, children }) => {
  const ref = useRef(null);

  // Drag the field
  const [, drag] = useDrag({
    type: "form-field",
    item: { index },
  });

  // Drop the field
  const [, drop] = useDrop({
    accept: "form-field",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex; // Update the index of the dragged item
    },
  });

  drag(drop(ref)); // Combine drag and drop
  return (
    <Box
      ref={ref}
      mb={2}
      p={1}
      border="1px solid lightgray"
      position="relative"
    >
      {children}
    </Box>
  );
};

const FormDesignArea = ({ onDrop, children, onRightClick }) => {
  const [, drop] = useDrop({
    accept: "field",
    drop: (item) => onDrop(item),
  });

  return (
    <Box
      ref={drop}
      onContextMenu={onRightClick} // Capture right-click event
      p={4}
      border="1px dashed gray"
      width="90%"
      height="900px"
      overflow="auto"
      bgcolor="#f9f9f9"
    >
      {children}
    </Box>
  );
};

const CustomFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null); // To handle context menu

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

  // Move the field in the array (drag-and-drop functionality)
  const moveField = (fromIndex, toIndex) => {
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, movedField);
    setFields(updatedFields);
  };

  const moveFieldUp = (index) => {
    if (index === 0) return;
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index - 1];
    updatedFields[index - 1] = temp;
    setFields(updatedFields);
  };

  const moveFieldDown = (index) => {
    if (index === fields.length - 1) return;
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index + 1];
    updatedFields[index + 1] = temp;
    setFields(updatedFields);
  };

  // Handle right-click to open the context menu at the mouse cursor position
  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default right-click menu
    setMenuAnchor({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    }); // Set the position of the custom context menu
  };

  // Close context menu
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  // Add field to form on clicking in the context menu
  const handleMenuItemClick = (fieldType) => {
    handleDrop({ type: fieldType, label: fieldType });
    setMenuAnchor(null); // Close the menu after selecting a field
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex" p={2}>
        {/* Left Panel: List of Fields */}
        <Box width="10%" p={2} border="1px solid gray">
          <Typography variant="h4" align="center" gutterBottom>
            Header 2
          </Typography>

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

        {/* Right Panel: Form Design Area */}
        <Box width="40%" p={2} border="1px solid gray">
          <Typography variant="h4" align="center" gutterBottom>
            Header 1
          </Typography>

          <FormDesignArea onDrop={handleDrop} onRightClick={handleRightClick}>
            {fields.length === 0 ? (
              <Typography>
                Drag fields here or right-click to add fields
              </Typography>
            ) : (
              fields.map((field, index) => (
                <DraggableFormField
                  key={index}
                  index={index}
                  field={field}
                  moveField={moveField}
                >
                  <FieldRenderer field={field} />
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    className="field-controls"
                    sx={{ display: { xs: "flex" }, gap: "4px" }}
                  >
                    <Button size="small" onClick={() => setEditingIndex(index)}>
                      <Edit fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteField(index)}
                    >
                      <Delete fontSize="small" />
                    </Button>
                    <Button size="small" onClick={() => handleCopyField(index)}>
                      <ContentCopy fontSize="small" />
                    </Button>
                    <Button size="small" onClick={() => moveFieldUp(index)}>
                      <ArrowUpward fontSize="small" />
                    </Button>
                    <Button size="small" onClick={() => moveFieldDown(index)}>
                      <ArrowDownward fontSize="small" />
                    </Button>
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
                </DraggableFormField>
              ))
            )}
          </FormDesignArea>

          {/* Buttons below the form design area */}
          <Box display="flex" mt={2}>
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: "32px" }}
            >
              Preview
            </Button>
          </Box>

          {/* Context Menu for right-click action */}
          <Menu
            anchorReference="anchorPosition"
            anchorPosition={
              menuAnchor !== null
                ? { top: menuAnchor.mouseY, left: menuAnchor.mouseX }
                : undefined
            }
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
          >
            {Object.keys(fieldTypes).map((key) => (
              <MenuItem
                key={key}
                onClick={() => handleMenuItemClick(fieldTypes[key])}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Field
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default CustomFormBuilder;
