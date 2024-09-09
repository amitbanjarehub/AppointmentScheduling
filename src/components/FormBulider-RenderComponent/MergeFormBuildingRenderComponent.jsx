import { Stack } from "@mui/material";
import React, { useState } from "react";
import FormBuilderComponent from "./FormBuilderComponent";
import RenderFormComponent from "./RenderFormComponent";

const MergeFormBuildingRenderComponent1 = () => {
  const [formSchema, setFormSchema] = useState([]);

  const handlePreview = (schema) => {
    setFormSchema(schema);
  };

  return (
    <Stack
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          width: "50%",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormBuilderComponent onPreview={handlePreview} />
      </Stack>

      <Stack
        sx={{
          width: "50%",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RenderFormComponent formSchema={formSchema} />
      </Stack>
    </Stack>
  );
};

export default MergeFormBuildingRenderComponent1;
