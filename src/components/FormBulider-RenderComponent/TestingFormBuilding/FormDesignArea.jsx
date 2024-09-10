import React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

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
    //   sx={{ border: "1px solid red" }}
    >
      {children}
    </Box>
  );
};

export default FormDesignArea;
