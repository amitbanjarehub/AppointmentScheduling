// import { Stack } from "@mui/material";
// import React, { useState } from "react";

// import CustomFormBuilder from "./CustomFormBuilder";
// import RenderFormComponent from "../RenderFormComponent";

// const CustomMergeformRender = () => {
//   const [formSchema, setFormSchema] = useState([]);

//   const handlePreview = (schema) => {
//     setFormSchema(schema);
//   };

//   return (
//     <Stack
//       sx={{
//         height: "90vh",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//       }}
//     >
//       <Stack
//         sx={{
//           width: "50%",
//           margin: "10px",

//         }}
//       >
//         <CustomFormBuilder />
//       </Stack>

//       <Stack
//         sx={{
//           width: "30%",
//           margin: "10px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <RenderFormComponent formSchema={formSchema} />
//       </Stack>
//     </Stack>
//   );
// };

// export default CustomMergeformRender;

import { Stack } from "@mui/material";
import React, { useState } from "react";

import CustomFormBuilder from "./CustomFormBuilder";
import RenderFormComponent from "../RenderFormComponent";

const CustomMergeformRender = () => {
  const [formSchema, setFormSchema] = useState([]);

  const handlePreview = (schema) => {
    setFormSchema(schema); // Update form schema for preview
  };

  return (
    <Stack
      sx={{
        height: "100vh", // Increase height
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* Left Side (Form Builder) */}
      <Stack
        sx={{
          width: "50%", // Adjust width of Form Builder area
          margin: "10px",
        }}
      >
        <CustomFormBuilder onPreview={handlePreview} />
      </Stack>

      {/* Right Side (Form Preview) */}
      <Stack
        sx={{
          width: "50%", // Increase width of preview area
          height: "86vh", // Increase height of preview area
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        //   border: "1px solid red",
        }}
      >
        <RenderFormComponent formSchema={formSchema} />
      </Stack>
    </Stack>
  );
};

export default CustomMergeformRender;
