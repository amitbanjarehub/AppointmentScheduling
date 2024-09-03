import React, { useState } from 'react';
import { Box, MenuItem, TextField, Button, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TimeZones } from './TimeZones'; // Assume this is a file with all timezones data

const TimezoneSelector = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('India Standard Time (18:30)');
  const [timezoneList, setTimezoneList] = useState(TimeZones); // Assuming TimeZones is an array of all timezones
  const [searchTerm, setSearchTerm] = useState('');

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredTimezones = TimeZones.filter(tz => tz.toLowerCase().includes(event.target.value.toLowerCase()));
    setTimezoneList(filteredTimezones);
  };

  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
        <Select
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          displayEmpty
          renderValue={() => (
            <Box display="flex" alignItems="center">
              <SearchIcon />
              <span>{selectedTimezone}</span>
            </Box>
          )}
        >
          <Box padding="8px">
            <TextField
              fullWidth
              placeholder="Search..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
          {timezoneList.map((timezone, index) => (
            <MenuItem key={index} value={timezone}>
              {timezone}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimezoneSelector;
