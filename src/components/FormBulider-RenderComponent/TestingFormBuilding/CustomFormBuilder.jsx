// import React, { useState, useRef } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   ContentCopy,
//   ArrowUpward,
//   ArrowDownward,
// } from "@mui/icons-material";

// import DraggableField from "./DraggableField";
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

// // Component for Draggable Form Field
// const DraggableFormField = ({ field, index, moveField, children }) => {
//   const ref = useRef(null);

//   // Drag the field
//   const [, drag] = useDrag({
//     type: "form-field",
//     item: { index },
//   });

//   // Drop the field
//   const [, drop] = useDrop({
//     accept: "form-field",
//     hover(item) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       moveField(dragIndex, hoverIndex);
//       item.index = hoverIndex; // Update the index of the dragged item
//     },
//   });

//   drag(drop(ref)); // Combine drag and drop
//   return (
//     <Box
//       ref={ref}
//       mb={2}
//       p={1}
//       border="1px solid lightgray"
//       position="relative"
//     >
//       {children}
//     </Box>
//   );
// };

// // Component for Form Design Area
// const FormDesignArea = ({ onDrop, children, onRightClick }) => {
//   const [, drop] = useDrop({
//     accept: "field",
//     drop: (item) => onDrop(item),
//   });

//   return (
//     <Box
//       ref={drop}
//       onContextMenu={onRightClick} // Capture right-click event
//       p={4}
//       border="1px dashed gray"
//       width="90%"
//       height="900px"
//       overflow="auto"
//       bgcolor="#f9f9f9"
//     >
//       {children}
//     </Box>
//   );
// };

// const CustomFormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [menuAnchor, setMenuAnchor] = useState(null); // To handle context menu

//   const handleDrop = (item) => {
//     setFields((prevFields) => [
//       ...prevFields,
//       { ...item, label: item.label || "Untitled Field", required: false },
//     ]);
//   };

//   const handleDeleteField = (index) => {
//     setFields(fields.filter((_, i) => i !== index));
//   };

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

//   const handleSaveField = (index, updatedField) => {
//     const updatedFields = [...fields];
//     updatedFields[index] = updatedField;
//     setFields(updatedFields);
//     setEditingIndex(null);
//   };

//   // Move the field in the array (drag-and-drop functionality)
//   const moveField = (fromIndex, toIndex) => {
//     const updatedFields = [...fields];
//     const [movedField] = updatedFields.splice(fromIndex, 1);
//     updatedFields.splice(toIndex, 0, movedField);
//     setFields(updatedFields);
//   };

//   const moveFieldUp = (index) => {
//     if (index === 0) return;
//     const updatedFields = [...fields];
//     const temp = updatedFields[index];
//     updatedFields[index] = updatedFields[index - 1];
//     updatedFields[index - 1] = temp;
//     setFields(updatedFields);
//   };

//   const moveFieldDown = (index) => {
//     if (index === fields.length - 1) return;
//     const updatedFields = [...fields];
//     const temp = updatedFields[index];
//     updatedFields[index] = updatedFields[index + 1];
//     updatedFields[index + 1] = temp;
//     setFields(updatedFields);
//   };

//   const handleRightClick = (event) => {
//     event.preventDefault();
//     setMenuAnchor({
//       mouseX: event.clientX - 2,
//       mouseY: event.clientY - 4,
//     });
//   };

//   const handleCloseMenu = () => {
//     setMenuAnchor(null);
//   };

//   const handleMenuItemClick = (fieldType) => {
//     handleDrop({ type: fieldType, label: fieldType });
//     setMenuAnchor(null);
//   };

//   const handleSaveForm = async () => {
//     const formStructure = {
//       form_id: "form_001",
//       user_id: "user_001",
//       project_id: "project_001",
//       session_id: "session_001",
//       created_at: "2024-09-09T12:34:56Z",
//       last_modified: "2024-09-09T15:00:00Z",
//       last_modified_by: "user_002",
//       components: fields.map((component, index) => ({
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: `component_${index + 1}`,
//         component_type: component.type,
//         component_subtype: component.subtype || component.type,
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: component.type,
//             subtype: component.subtype || component.type,
//             label: component.label,
//             placeholder: component.placeholder || "",
//             required: component.required || false,
//             values: component.values || [],
//             access: component.access || true,
//           },
//         ],
//       })),
//     };

//     console.log("Form Structure:", formStructure);

//     try {
//       const response = await fetch("http://localhost:5000/api/form_builder1", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([formStructure]),
//       });

//       if (response.status === 201) {
//         const result = await response.json();
//         alert(result.message);
//         console.log("Saved form data:", result.forms);
//       } else {
//         alert("Error saving form.");
//         console.error("Error saving form:", response.statusText);
//       }
//     } catch (error) {
//       alert("Error saving form.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Box display="flex" sx={{ width: "180%" }} p={2}>
//         {/* Left Panel: List of Fields */}
//         <Box width="10%" p={2} border="1px solid gray">
//           <Typography variant="h4" align="center" gutterBottom>
//             Header 2
//           </Typography>

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
//         <Box width="40%" p={2} border="1px solid gray">
//           <Typography variant="h4" align="center" gutterBottom>
//             Header 1
//           </Typography>

//           <FormDesignArea onDrop={handleDrop} onRightClick={handleRightClick}>
//             {fields.length === 0 ? (
//               <Typography>
//                 Drag fields here or right-click to add fields
//               </Typography>
//             ) : (
//               fields.map((field, index) => (
//                 <DraggableFormField
//                   key={index}
//                   index={index}
//                   field={field}
//                   moveField={moveField}
//                 >
//                   <FieldRenderer field={field} />
//                   <Box
//                     position="absolute"
//                     top="0"
//                     right="0"
//                     className="field-controls"
//                     sx={{ display: { xs: "flex" }, gap: "4px" }}
//                   >
//                     <Button size="small" onClick={() => setEditingIndex(index)}>
//                       <Edit fontSize="small" />
//                     </Button>
//                     <Button
//                       size="small"
//                       onClick={() => handleDeleteField(index)}
//                     >
//                       <Delete fontSize="small" />
//                     </Button>
//                     <Button size="small" onClick={() => handleCopyField(index)}>
//                       <ContentCopy fontSize="small" />
//                     </Button>
//                     <Button size="small" onClick={() => moveFieldUp(index)}>
//                       <ArrowUpward fontSize="small" />
//                     </Button>
//                     <Button size="small" onClick={() => moveFieldDown(index)}>
//                       <ArrowDownward fontSize="small" />
//                     </Button>
//                   </Box>
//                   {editingIndex === index && (
//                     <FieldConfigForm
//                       field={field}
//                       onSave={(updatedField) =>
//                         handleSaveField(index, updatedField)
//                       }
//                       onCancel={() => setEditingIndex(null)}
//                     />
//                   )}
//                 </DraggableFormField>
//               ))
//             )}
//           </FormDesignArea>

//           {/* Buttons below the form design area */}
//           <Box display="flex" mt={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveForm} // Trigger handleSaveForm on click
//             >
//               Save
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{ marginLeft: "32px" }}
//             >
//               Preview
//             </Button>
//           </Box>

//           {/* Context Menu for right-click action */}
//           <Menu
//             anchorReference="anchorPosition"
//             anchorPosition={
//               menuAnchor !== null
//                 ? { top: menuAnchor.mouseY, left: menuAnchor.mouseX }
//                 : undefined
//             }
//             open={Boolean(menuAnchor)}
//             onClose={handleCloseMenu}
//           >
//             {Object.keys(fieldTypes).map((key) => (
//               <MenuItem
//                 key={key}
//                 onClick={() => handleMenuItemClick(fieldTypes[key])}
//               >
//                 {key.charAt(0).toUpperCase() + key.slice(1)} Field
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//       </Box>
//     </DndProvider>
//   );
// };

// export default CustomFormBuilder;

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

// Component for Draggable Form Field
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

// Component for Form Design Area
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

const CustomFormBuilder = ({ onPreview }) => {
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

  const moveField = (fromIndex, toIndex) => {
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, movedField);
    setFields(updatedFields);
  };

  // Move field up in the list
  const moveFieldUp = (index) => {
    if (index === 0) return; // If it's already the first field, do nothing
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index - 1];
    updatedFields[index - 1] = temp;
    setFields(updatedFields); // Update the state with the new order
  };

  // Move field down in the list
  const moveFieldDown = (index) => {
    if (index === fields.length - 1) return; // If it's already the last field, do nothing
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index + 1];
    updatedFields[index + 1] = temp;
    setFields(updatedFields); // Update the state with the new order
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setMenuAnchor({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleMenuItemClick = (fieldType) => {
    handleDrop({ type: fieldType, label: fieldType });
    setMenuAnchor(null);
  };

  const handleSaveForm = async () => {
    const formStructure = {
      form_id: "form_001",
      user_id: "user_001",
      project_id: "project_001",
      session_id: "session_001",
      created_at: "2024-09-09T12:34:56Z",
      last_modified: "2024-09-09T15:00:00Z",
      last_modified_by: "user_002",
      components: fields.map((component, index) => ({
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: `component_${index + 1}`,
        component_type: component.type,
        component_subtype: component.subtype || component.type,
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: component.type,
            subtype: component.subtype || component.type,
            label: component.label,
            placeholder: component.placeholder || "",
            required: component.required || false,
            values: component.values || [],
            access: component.access || true,
          },
        ],
      })),
    };

    console.log("Form Structure:", formStructure);

    try {
      const response = await fetch("http://localhost:5000/api/form_builder1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formStructure]),
      });

      if (response.status === 201) {
        const result = await response.json();
        alert(result.message);
        console.log("Saved form data:", result.forms);
      } else {
        alert("Error saving form.");
        console.error("Error saving form:", response.statusText);
      }
    } catch (error) {
      alert("Error saving form.");
      console.error("Error:", error);
    }
  };

  // Call this when preview button is clicked
  const handlePreviewClick = () => {
    onPreview(fields); // Pass current fields to parent
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex" sx={{ width: "180%" }} p={2}>
        <Box width="10%" p={2} border="1px solid gray">
          <Typography variant="h4" align="center" gutterBottom>
            Feild Area
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
           Form Design Area
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveForm} // Trigger handleSaveForm on click
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: "32px" }}
              onClick={handlePreviewClick} // Trigger handlePreviewClick on click
            >
              Preview
            </Button>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default CustomFormBuilder;
