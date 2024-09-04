import {
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import React from "react";
import MultipleSelect from "../../components/selectbox/SeclectBox";
import SearchField from "../../components/SearchBox/SearchBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Dashboard = () => {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Stack
        sx={{ paddingLeft: "80px", paddingTop: "40px", marginBottom: "40px" }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            lineHeight: "32px",
            fontWeight: 600,
            color: "black",
          }}
        >
          Event types
        </Typography>
      </Stack>

      <Stack sx={{ marginLeft: "72px", marginBottom: "40px" }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            justifyContent: "space-between",           
            width: { xl: "40%", lg: "40%", md: "40%", sm: "100%", xs: "100%" },
          }}
        >
          <Stack>
            <MultipleSelect />
          </Stack>
          <Stack>
            <SearchField />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",        
          width: { xl: "60%", lg: "60%", md: "60%", sm: "100%", xs: "100%" },
          marginLeft: "72px",
          marginBottom: "40px",
        }}
      >
        {/* User Info */}
        <Stack direction="row" alignItems="center">
          <Avatar>A</Avatar>
          <Stack sx={{ ml: 2 }}>
            <Typography variant="subtitle1">Atmik Bharat</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              https://calendly.com/management-atmikbharat
            </Typography>
          </Stack>
        </Stack>

        {/* Right-side Buttons */}
        <Stack direction="row" alignItems="center">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", marginRight: "10px" }}
          >
            + New Event Type
          </Button>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Card
        sx={{
          maxWidth: 365,
          borderRadius: "8px",
          boxShadow: 2,
          marginLeft: "80px",
        }}
      >
        {/* Top Bar with Border and Settings Icon */}
        <Box sx={{ height: "5px", backgroundColor: "#9c27b0" }} />
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {/* Event Info */}
            <Box>
              <Typography variant="h6">Atmik Bharat</Typography>
              <Typography variant="body2" color="text.secondary">
                30 mins, One-on-One
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  mt: 1,
                }}
              >
                View booking page
              </Typography>
            </Box>
            {/* Settings Icon */}
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Stack>
        </CardContent>
        <Box sx={{ borderTop: "1px solid #e0e0e0", padding: "8px 16px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              sx={{ textTransform: "none" }}
            >
              Copy link
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Share
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
};

export default Dashboard;
