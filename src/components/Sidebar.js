import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Button,
  Popover,
  ClickAwayListener,
  Box,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import Logo1 from "./companyLogo.png";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import SchemaIcon from "@mui/icons-material/Schema";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import RouteIcon from "@mui/icons-material/Route";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HelpIcon from "@mui/icons-material/Help";

// Array for menu items
const menuItems = [
  {
    title: "Event types",
    icon: <InsertLinkIcon sx={{ color: "black" }} />,
    path: "/event-types",
  },

  {
    title: "Meetings",
    icon: <Diversity3Icon sx={{ color: "black" }} />,
    path: "/event-types",
  },
  {
    title: "Availability",
    icon: <AlarmOnIcon sx={{ color: "black" }} />,
    path: "/customers",
  },
  {
    title: "Contacts",
    icon: <ContactPhoneIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
  {
    title: "Workflows",
    icon: <SchemaIcon sx={{ color: "black" }} />,
  },
  {
    title: "Integration & Apps",
    icon: <ManageHistoryIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
  {
    title: "Routing",
    icon: <RouteIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
];

// Array for menu items
const bottomMenuItems = [
  {
    title: "Upgrade plan",
    icon: <MonetizationOnIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
  {
    title: "Admin center",
    icon: <ManageAccountsIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
  {
    title: "Help",
    icon: <HelpIcon sx={{ color: "black" }} />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [arrowOpen, setArrowOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const handleSubMenuClick = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleArrow = () => {
    setArrowOpen((prevArrowOpen) => !prevArrowOpen);
  };

  const handleClickCreate = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEventType = () => {
    navigate("/event-type");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={isOpen}
      sx={{
        width: isOpen ? "260px" : "80px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? "260px" : "80px",
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        {/* Sidebar Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          {isOpen && (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img
                src={Logo1}
                alt="logo"
                style={{ height: "52px", width: "52px", marginLeft: "20px" }}
              />
              <Typography sx={{ fontSize: "32x", marginTop: "16px" }}>
                Vertex Suite
              </Typography>
            </Stack>
          )}

          <IconButton
            onClick={() => {
              dispatch(toggleSidebar());
              handleArrow();
            }}
          >
            {arrowOpen ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </IconButton>
        </div>

        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: isOpen ? "200px" : "50px", // Width adjusts based on sidebar state
                height: "46px",
                borderRadius: "36px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(0 105 255)",
                color: "white",
                transition: "width 0.3s", // Smooth transition for width
              }}
              onClick={handleClickCreate}
            >
              <AddIcon />
              {isOpen && (
                <Typography sx={{ marginLeft: "8px" }}>Create</Typography>
              )}
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClickAway}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: -10,
                horizontal: "center",
              }}
            >
              {/* Box Content that opens below the button */}
              <Box
                sx={{
                  p: 2,
                  width: "192px",
                  height: "300px",
                }}
              >
                <Stack onClick={() => handleEventType()}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    Event type
                  </Typography>
                  <Typography variant="body2">
                    Create a new template for your regularly scheduled events.
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    variant="body1"
                    sx={{ mt: 2 }}
                    fontWeight={"bold"}
                  >
                    One-off meeting
                  </Typography>
                  <Typography variant="body2">
                    Invite someone to pick a time to meet with you.
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    variant="body1"
                    sx={{ mt: 2 }}
                    fontWeight={"bold"}
                  >
                    Meeting poll
                  </Typography>
                  <Typography variant="body2">
                    Schedule a group meeting after offering times for a vote.
                  </Typography>
                </Stack>
              </Box>
            </Popover>
          </div>
        </ClickAwayListener>

        {/* Menu List */}
        <List sx={{ marginTop: "20px" }}>
          {menuItems.map((menu, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() =>
                  menu.subMenu
                    ? handleSubMenuClick(index)
                    : handleNavigation(menu.path)
                }
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={menu.title}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                )}
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
      <Box sx={{ paddingBottom: "20px" }}>
        <List>
          {bottomMenuItems.map((menu, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleNavigation(menu.path)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={menu.title}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
