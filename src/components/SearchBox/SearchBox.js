import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Filter"
      sx={{
        width: '300px',
        backgroundColor: '#f9f9f9',
        borderRadius: '25px',
        marginTop: "8px",
        marginRight: "8px",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
