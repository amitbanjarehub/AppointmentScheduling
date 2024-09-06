// import { Button, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";

// const RenderForm = () => {
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     const fetchFormData = async () => {
//       const response = await fetch("http://localhost:5000/api/form_builder");
//       const data = await response.json();
//       setFormData(data[0]?.formData);
//     };

//     fetchFormData();
//   }, []);

//   const renderFields = () => {
//     if (!formData) return null; // Handle case where formData is not loaded yet

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
//               fullWidth
//               margin="normal"
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
//       <form>{renderFields()}</form>
//     </div>
//   );
// };

// export default RenderForm;

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
    // try {
    //   const response = await fetch("http://localhost:5000/api/save_form_data", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formValues),
    //   });
    //   const result = await response.json();
    //   console.log("Form data saved successfully:", result);
    // } catch (error) {
    //   console.error("Error saving form data:", error);
    // }
  };

  const renderFields = () => {
    if (!formData) return null; // Handle case where formData is not loaded yet

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
              name={field.name} // Ensure the name attribute matches the form schema
              fullWidth
              margin="normal"
              onChange={handleInputChange}
              value={formValues[field.name] || ""} // Populate form values dynamically
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
