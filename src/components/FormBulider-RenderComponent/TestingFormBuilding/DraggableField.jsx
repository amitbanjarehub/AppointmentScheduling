import React from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

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

export default DraggableField;
