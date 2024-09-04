import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Switch,
  Typography,
  Button,
  Popover,
  ClickAwayListener,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { useNavigate } from "react-router-dom";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Logo from "./canlendlylogo.png";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";

// Array for menu items
const menuItems = [
  {
    title: "Dashboard",
    icon: <AccessibilityIcon />,
    path: "/dashboard",
  },
  {
    title: "Products",
    icon: <AccessibilityIcon />,
    subMenu: [
      { title: "Categories", icon: <AccessibilityIcon />, path: "/categories" },
      { title: "Orders", icon: <AccessibilityIcon />, path: "/orders" },
    ],
  },
  {
    title: "Customers",
    icon: <AccessibilityIcon />,
    path: "/customers",
  },
  {
    title: "Settings",
    icon: <AccessibilityIcon />,
    path: "/settings",
  },
  {
    title: "Dark Mode",
    icon: <AccessibilityIcon />,
    toggle: true,
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

  const handleArrow = (arrowOpen) => {
    {
      arrowOpen ? setArrowOpen(false) : setArrowOpen(true);
    }
  };

  const handleClickCreate = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        },
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        {isOpen && (
          <img
            src={Logo}
            alt="logo"
            style={{ height: "40px", width: "120px", marginLeft: "20px" }}
          />
        )}

        <IconButton
          onClick={() => {
            dispatch(toggleSidebar());
            handleArrow(arrowOpen);
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
              width: "200px",
              height: "46px",
              borderRadius: "36px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(0 105 255)",
              color: "white",            
            }}
            onClick={handleClickCreate}
          >
            <AddIcon sx={{ marginRight: "8px" }} />
            Create
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
                // border: "1px solid red",
              }}
            >
              <Typography variant="body1" fontWeight={"bold"}>Event type</Typography>
              <Typography variant="body2">
                Create a new template for your regularly scheduled events.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }} fontWeight={"bold"}>
                One-off meeting
              </Typography>
              <Typography variant="body2">
                Invite someone to pick a time to meet with you.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }} fontWeight={"bold"}>
                Meeting poll
              </Typography>
              <Typography variant="body2">
                Schedule a group meeting after offering times for a vote.
              </Typography>
            </Box>
          </Popover>
        </div>
      </ClickAwayListener>

      {/* Menu List */}
      <List>
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
              {isOpen && <ListItemText primary={menu.title} />}
              {menu.subMenu && isOpen ? (
                openSubMenu[index] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>

            {/* SubMenu Handling */}
            {menu.subMenu && (
              <Collapse in={openSubMenu[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      sx={{ pl: 4 }}
                      onClick={() => handleNavigation(subMenu.path)} // Navigate to submenu path
                    >
                      <ListItemIcon>{subMenu.icon}</ListItemIcon>
                      {isOpen && <ListItemText primary={subMenu.title} />}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {/* Dark Mode Toggle */}
            {menu.toggle && (
              <ListItem>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={menu.title} />}
                <Switch />
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
