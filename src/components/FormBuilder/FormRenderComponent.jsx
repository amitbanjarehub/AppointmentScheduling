// import { Button, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";

// const RenderFormComponent = () => {
//   const [formValues, setFormValues] = useState({});

//   // useEffect(() => {
//   //   const fetchFormData = async () => {
//   //     const response = await fetch("http://localhost:5000/api/form_builder1");
//   //     const data = await response.json();
//   //     console.log("rtrt:=======>>", data);

//   //       // setFormData(data?.forms[0]);
//   //   };

//   //   fetchFormData();
//   // }, []);

//   console.log("formData:=======>>", formData);
//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("formValues:--------->>", formValues);
//   };

//   const formData = {
//     _id: "66dec17f0a1a85d758130570",
//     form_id: "form_001",
//     user_id: "user_001",
//     project_id: "project_001",
//     session_id: "session_001",
//     created_at: "2024-09-09T12:34:56Z",
//     last_modified: "2024-09-09T15:00:00Z",
//     last_modified_by: "user_002",
//     components: [
//       {
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: "component_1",
//         component_type: "header",
//         component_subtype: "h1",
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: "header",
//             subtype: "h1",
//             label: "Header name",
//             placeholder: "",
//             required: false,
//             values: [],
//             access: true,
//           },
//         ],
//       },
//       {
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: "component_2",
//         component_type: "paragraph",
//         component_subtype: "p",
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: "paragraph",
//             subtype: "p",
//             label: "Header description",
//             placeholder: "",
//             required: false,
//             values: [],
//             access: true,
//           },
//         ],
//       },
//       {
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: "component_3",
//         component_type: "text",
//         component_subtype: "email",
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: "text",
//             subtype: "email",
//             label: "Email",
//             placeholder: "Enter your email",
//             required: false,
//             values: [],
//             access: true,
//           },
//         ],
//       },
//       {
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: "component_4",
//         component_type: "text",
//         component_subtype: "password",
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: "text",
//             subtype: "password",
//             label: "Password",
//             placeholder: "Enter your password.",
//             required: false,
//             values: [],
//             access: true,
//           },
//         ],
//       },
//       {
//         user_id: "user_001",
//         session_id: "session_001",
//         project_id: "project_001",
//         component_id: "component_5",
//         component_type: "button",
//         component_subtype: "button",
//         form_id: "form_001",
//         created_at: "2024-09-09T12:35:00Z",
//         last_modified: "2024-09-09T13:00:00Z",
//         last_modified_by: "user_002",
//         formData: [
//           {
//             type: "button",
//             subtype: "button",
//             label: "Login",
//             placeholder: "",
//             required: false,
//             values: [],
//             access: true,
//           },
//         ],
//       },
//     ],
//   };

//   const renderFields = () => {
//     if (!formData) return null;
//     return formData.map((field, index) => {
//       switch (field.type) {
//         case "header":
//           return (
//             <Typography key={index} variant={field.subtype || "h6"}>
//               {field.label}
//             </Typography>
//           );
//         case "paragraph":
//           return (
//             <Typography key={index} paragraph>
//               {field.label}
//             </Typography>
//           );
//         case "text":
//           return (
//             <TextField
//               key={index}
//               type={field.subtype || "text"}
//               label={field.label}
//               placeholder={field.placeholder}
//               name={field.name}
//               fullWidth
//               margin="normal"
//               onChange={handleInputChange}
//               value={formValues[field.name] || ""}
//             />
//           );
//         case "button":
//           return (
//             <Button
//               key={index}
//               variant={field.style === "primary" ? "contained" : "outlined"}
//               color={field.style || "primary"}
//               type="submit"
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               {field.label}
//             </Button>
//           );
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>{renderFields()}</form>
//     </div>
//   );
// };

// export default RenderFormComponent;

import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const RenderFormComponent = () => {
  const [formValues, setFormValues] = useState({});

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

  // Form data (as per your example)
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
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: "component_1",
        component_type: "header",
        component_subtype: "h1",
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: "header",
            subtype: "h1",
            label: "Header name",
            placeholder: "",
            required: false,
            values: [],
            access: true,
          },
        ],
      },
      {
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: "component_2",
        component_type: "paragraph",
        component_subtype: "p",
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: "paragraph",
            subtype: "p",
            label: "Header description",
            placeholder: "",
            required: false,
            values: [],
            access: true,
          },
        ],
      },
      {
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: "component_3",
        component_type: "text",
        component_subtype: "email",
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: "text",
            subtype: "email",
            label: "Email",
            placeholder: "Enter your email",
            required: false,
            values: [],
            access: true,
          },
        ],
      },
      {
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: "component_4",
        component_type: "text",
        component_subtype: "password",
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: "text",
            subtype: "password",
            label: "Password",
            placeholder: "Enter your password.",
            required: false,
            values: [],
            access: true,
          },
        ],
      },
      {
        user_id: "user_001",
        session_id: "session_001",
        project_id: "project_001",
        component_id: "component_5",
        component_type: "button",
        component_subtype: "button",
        form_id: "form_001",
        created_at: "2024-09-09T12:35:00Z",
        last_modified: "2024-09-09T13:00:00Z",
        last_modified_by: "user_002",
        formData: [
          {
            type: "button",
            subtype: "button",
            label: "Login",
            placeholder: "",
            required: false,
            values: [],
            access: true,
          },
        ],
      },
    ],
  };

  // Render form fields dynamically
  const renderFields = () => {
    if (!formData.components) return null;

    return formData.components.map((component, index) => {
      const field = component.formData[0]; // Access the first formData element
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
              name={field.label.toLowerCase()} // Use label as name for simplicity
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
    <div>
      <form onSubmit={handleSubmit}>{renderFields()}</form>
    </div>
  );
};

export default RenderFormComponent;
