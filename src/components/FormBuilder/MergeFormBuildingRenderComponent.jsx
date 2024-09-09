import { Stack } from "@mui/material";
import React from "react";
import FormBuilderComponent from "./FormBuilderComponent";
import RenderFormComponent from "./FormRenderComponent";

const MergeFormBuildingRenderComponent = () => {
  return (
    <Stack
      sx={{
        // border: "1px solid red",
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
        //   border: "1px solid blue",
          width: "50%",
          margin: "10px",
          diaplay: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormBuilderComponent />
      </Stack>

      <Stack
        sx={{
        //   border: "1px solid blue",
          width: "50%",
          margin: "10px",
          diaplay: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RenderFormComponent />
      </Stack>
    </Stack>
  );
};

export default MergeFormBuildingRenderComponent;
