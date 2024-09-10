// import React, { useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { Box, IconButton, Button, Typography } from "@mui/material";
// import {
//   Delete,
//   Edit,
//   ContentCopy,
//   ArrowUpward,
//   ArrowDownward,
// } from "@mui/icons-material";

// import DraggableField from "./DraggableField";
// import FormDesignArea from "./FormDesignArea";
// import FieldConfigForm from "./FieldConfigForm";
// import FieldRenderer from "./FieldRenderer";

// const fieldTypes = {
//   TEXT: "text",
//   TEXTAREA: "textarea",
//   PARAGRAPH: "paragraph",
//   HEADER: "header",
//   FILE_UPLOAD: "file-upload",
//   DATE: "date",
//   BUTTON: "button",
//   CHECKBOX: "checkbox",
//   RADIO: "radio",
//   SELECT: "select",
//   NUMBER: "number",
// };

// const CustomFormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [previewMode, setPreviewMode] = useState(false); // State to toggle preview mode
//   const [savedForm, setSavedForm] = useState(null); // Store saved form

//   // Add new field on drop
//   const handleDrop = (item) => {
//     setFields((prevFields) => [
//       ...prevFields,
//       { ...item, label: item.label || "Untitled Field", required: false },
//     ]);
//   };

//   // Delete a field
//   const handleDeleteField = (index) => {
//     setFields(fields.filter((_, i) => i !== index));
//   };

//   // Copy a field
//   const handleCopyField = (index) => {
//     const fieldToCopy = fields[index];
//     const newField = { ...fieldToCopy, label: `${fieldToCopy.label} (Copy)` };
//     const updatedFields = [
//       ...fields.slice(0, index + 1),
//       newField,
//       ...fields.slice(index + 1),
//     ];
//     setFields(updatedFields);
//   };

//   // Save a field after editing
//   const handleSaveField = (index, updatedField) => {
//     const updatedFields = [...fields];
//     updatedFields[index] = updatedField;
//     setFields(updatedFields);
//     setEditingIndex(null);
//   };

//   // Save the form
//   const saveForm = () => {
//     setSavedForm(fields); // Save the current form fields to state
//     alert("Form saved!");
//   };

//   // Toggle preview mode
//   const previewForm = () => {
//     setPreviewMode(!previewMode); // Toggle preview mode on or off
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Box display="flex" p={2}>
//         {/* Left Panel: List of Fields */}
//         <Box width="10%" p={2} border="1px solid gray">
//           <DraggableField type={fieldTypes.TEXT} label="Text Field" />
//           <DraggableField type={fieldTypes.TEXTAREA} label="Text Area" />
//           <DraggableField type={fieldTypes.PARAGRAPH} label="Paragraph" />
//           <DraggableField type={fieldTypes.HEADER} label="Header" />
//           <DraggableField type={fieldTypes.FILE_UPLOAD} label="File Upload" />
//           <DraggableField type={fieldTypes.DATE} label="Date Field" />
//           <DraggableField type={fieldTypes.BUTTON} label="Button" />
//           <DraggableField type={fieldTypes.NUMBER} label="Number" />
//           <DraggableField type={fieldTypes.CHECKBOX} label="Checkbox" />
//           <DraggableField type={fieldTypes.RADIO} label="Radio Button" />
//           <DraggableField type={fieldTypes.SELECT} label="Select Box" />
//         </Box>

//         {/* Right Panel: Form Design Area */}
//         <Box width="80%" p={2} border="1px solid gray">
//           {!previewMode ? (
//             <>
//               <Typography sx={{ fontSize: "20px", marginBottom: "8px" }}>
//                 Header
//               </Typography>
//               <FormDesignArea onDrop={handleDrop}>
//                 {fields.length === 0 ? (
//                   <Box>Drag fields here to design your form</Box>
//                 ) : (
//                   fields.map((field, index) => (
//                     <Box
//                       key={index}
//                       mb={2}
//                       p={1}
//                       border="1px solid lightgray"
//                       position="relative"
//                     >
//                       <FieldRenderer field={field} />
//                       <Box
//                         position="absolute"
//                         top="0"
//                         right="0"
//                         className="field-controls"
//                         sx={{ display: { xs: "flex" }, gap: "4px" }}
//                       >
//                         <IconButton
//                           size="small"
//                           onClick={() => setEditingIndex(index)}
//                         >
//                           <Edit fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleDeleteField(index)}
//                         >
//                           <Delete fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleCopyField(index)}
//                         >
//                           <ContentCopy fontSize="small" />
//                         </IconButton>
//                         <IconButton size="small">
//                           <ArrowUpward fontSize="small" />
//                         </IconButton>
//                         <IconButton size="small">
//                           <ArrowDownward fontSize="small" />
//                         </IconButton>
//                       </Box>
//                       {editingIndex === index && (
//                         <FieldConfigForm
//                           field={field}
//                           onSave={(updatedField) =>
//                             handleSaveField(index, updatedField)
//                           }
//                           onCancel={() => setEditingIndex(null)}
//                         />
//                       )}
//                     </Box>
//                   ))
//                 )}
//               </FormDesignArea>
//               {/* Buttons added below form design area */}
//               <Box mt={4} display="flex">
//                 <Button variant="contained" color="primary" onClick={saveForm}>
//                   Save Form
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={previewForm}
//                   sx={{ marginLeft: "24px" }}
//                 >
//                   Preview Form
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <Box>
//               <Typography variant="h5" mb={2}>
//                 Form Preview:
//               </Typography>
//               {fields.length === 0 ? (
//                 <Typography>No fields available to preview.</Typography>
//               ) : (
//                 fields.map((field, index) => (
//                   <FieldRenderer key={index} field={field} />
//                 ))
//               )}
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 sx={{ mt: 2 }}
//                 onClick={previewForm}
//               >
//                 Back to Edit Mode
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </DndProvider>
//   );
// };

// export default CustomFormBuilder;

//==================================================================XXXXXXXXXXXXXXXXXXXXX=====================================================================

// import React, { useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import {
//   Box,
//   IconButton,
//   Button,
//   Typography,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import {
//   Delete,
//   Edit,
//   ContentCopy,
//   ArrowUpward,
//   ArrowDownward,
// } from "@mui/icons-material";

// import DraggableField from "./DraggableField";
// import FormDesignArea from "./FormDesignArea";
// import FieldConfigForm from "./FieldConfigForm";
// import FieldRenderer from "./FieldRenderer";

// const fieldTypes = {
//   TEXT: "text",
//   TEXTAREA: "textarea",
//   PARAGRAPH: "paragraph",
//   HEADER: "header",
//   FILE_UPLOAD: "file-upload",
//   DATE: "date",
//   BUTTON: "button",
//   CHECKBOX: "checkbox",
//   RADIO: "radio",
//   SELECT: "select",
//   NUMBER: "number",
// };

// const CustomFormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [previewMode, setPreviewMode] = useState(false); // State to toggle preview mode
//   const [savedForm, setSavedForm] = useState(null); // Store saved form

//   const [contextMenu, setContextMenu] = useState(null); // Context menu for right-click

//   // Handle right-click to open the context menu
//   const handleContextMenu = (event) => {
//     event.preventDefault();
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX - 2,
//             mouseY: event.clientY - 4,
//           }
//         : null
//     );
//   };

//   // Handle closing the context menu
//   const handleCloseContextMenu = () => {
//     setContextMenu(null);
//   };

//   // Handle selecting a field from the context menu
//   const handleFieldSelection = (type, label) => {
//     // Add selected field to the form
//     setFields((prevFields) => [
//       ...prevFields,
//       { type, label: label || "Untitled Field", required: false },
//     ]);
//     handleCloseContextMenu(); // Close the menu after selection
//   };

//   // Save the form
//   const saveForm = () => {
//     setSavedForm(fields); // Save the current form fields to state
//     alert("Form saved!");
//   };

//   // Toggle preview mode
//   const previewForm = () => {
//     setPreviewMode(!previewMode); // Toggle preview mode on or off
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Box display="flex" p={2}>
//         {/* Left Panel: List of Fields */}
//         <Box width="10%" p={2} border="1px solid gray">
//           <DraggableField type={fieldTypes.TEXT} label="Text Field" />
//           <DraggableField type={fieldTypes.TEXTAREA} label="Text Area" />
//           <DraggableField type={fieldTypes.PARAGRAPH} label="Paragraph" />
//           <DraggableField type={fieldTypes.HEADER} label="Header" />
//           <DraggableField type={fieldTypes.FILE_UPLOAD} label="File Upload" />
//           <DraggableField type={fieldTypes.DATE} label="Date Field" />
//           <DraggableField type={fieldTypes.BUTTON} label="Button" />
//           <DraggableField type={fieldTypes.NUMBER} label="Number" />
//           <DraggableField type={fieldTypes.CHECKBOX} label="Checkbox" />
//           <DraggableField type={fieldTypes.RADIO} label="Radio Button" />
//           <DraggableField type={fieldTypes.SELECT} label="Select Box" />
//         </Box>

//         {/* Right Panel: Form Design Area */}
//         <Box
//           width="80%"
//           p={2}
//           border="1px solid gray"
//           onContextMenu={handleContextMenu}
//         >
//           {!previewMode ? (
//             <>
//               <FormDesignArea fields={fields}>
//                 {fields.length === 0 ? (
//                   <Box>Drag fields here to design your form</Box>
//                 ) : (
//                   fields.map((field, index) => (
//                     <Box
//                       key={index}
//                       mb={2}
//                       p={1}
//                       border="1px solid lightgray"
//                       position="relative"
//                     >
//                       <FieldRenderer field={field} />
//                       <Box
//                         position="absolute"
//                         top="0"
//                         right="0"
//                         className="field-controls"
//                         sx={{ display: { xs: "flex" }, gap: "4px" }}
//                       >
//                         <IconButton
//                           size="small"
//                           onClick={() => setEditingIndex(index)}
//                         >
//                           <Edit fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() =>
//                             setFields(fields.filter((_, i) => i !== index))
//                           }
//                         >
//                           <Delete fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => setFields([...fields, { ...field }])}
//                         >
//                           <ContentCopy fontSize="small" />
//                         </IconButton>
//                       </Box>
//                       {editingIndex === index && (
//                         <FieldConfigForm
//                           field={field}
//                           onSave={(updatedField) =>
//                             setFields(
//                               fields.map((f, i) =>
//                                 i === index ? updatedField : f
//                               )
//                             )
//                           }
//                           onCancel={() => setEditingIndex(null)}
//                         />
//                       )}
//                     </Box>
//                   ))
//                 )}
//               </FormDesignArea>

//               {/* Buttons added below form design area */}
//               <Box mt={4} display="flex">
//                 <Button variant="contained" color="primary" onClick={saveForm}>
//                   Save Form
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={previewForm}
//                   sx={{ marginLeft: "32px" }}
//                 >
//                   Preview Form
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <Box>
//               <Typography variant="h5" mb={2}>
//                 Form Preview:
//               </Typography>
//               {fields.length === 0 ? (
//                 <Typography>No fields available to preview.</Typography>
//               ) : (
//                 fields.map((field, index) => (
//                   <FieldRenderer key={index} field={field} />
//                 ))
//               )}
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 sx={{ mt: 2 }}
//                 onClick={previewForm}
//               >
//                 Back to Edit Mode
//               </Button>
//             </Box>
//           )}

//           {/* Right-click context menu for adding fields */}
//           <Menu
//             open={contextMenu !== null}
//             onClose={handleCloseContextMenu}
//             anchorReference="anchorPosition"
//             anchorPosition={
//               contextMenu !== null
//                 ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
//                 : undefined
//             }
//           >
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.TEXT, "Text Field")
//               }
//             >
//               Text Field
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.TEXTAREA, "Text Area")
//               }
//             >
//               Text Area
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.PARAGRAPH, "Paragraph")
//               }
//             >
//               Paragraph
//             </MenuItem>
//             <MenuItem
//               onClick={() => handleFieldSelection(fieldTypes.HEADER, "Header")}
//             >
//               Header
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.FILE_UPLOAD, "File Upload")
//               }
//             >
//               File Upload
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.DATE, "Date Field")
//               }
//             >
//               Date Field
//             </MenuItem>
//             <MenuItem
//               onClick={() => handleFieldSelection(fieldTypes.BUTTON, "Button")}
//             >
//               Button
//             </MenuItem>
//             <MenuItem
//               onClick={() => handleFieldSelection(fieldTypes.NUMBER, "Number")}
//             >
//               Number
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.CHECKBOX, "Checkbox")
//               }
//             >
//               Checkbox
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.RADIO, "Radio Button")
//               }
//             >
//               Radio Button
//             </MenuItem>
//             <MenuItem
//               onClick={() =>
//                 handleFieldSelection(fieldTypes.SELECT, "Select Box")
//               }
//             >
//               Select Box
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Box>
//     </DndProvider>
//   );
// };

// export default CustomFormBuilder;
//==================================================================XXXXXXXXXXXXXXXXXXXXX=====================================================================

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
      height="800px"
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

  // Handle right-click to open the context menu
  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default right-click menu
    setMenuAnchor(event.currentTarget); // Open our custom context menu
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
          <FormDesignArea onDrop={handleDrop} onRightClick={handleRightClick}>
            {fields.length === 0 ? (
              <Typography>
                Drag fields here or right-click to add fields
              </Typography>
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
                    <Button size="small">
                      <ArrowUpward fontSize="small" />
                    </Button>
                    <Button size="small">
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
                </Box>
              ))
            )}
          </FormDesignArea>

          {/* Context Menu for right-click action */}
          <Menu
            anchorEl={menuAnchor}
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
