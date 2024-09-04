import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
