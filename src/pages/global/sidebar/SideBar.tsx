import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
// import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
// import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Profile from "../../../assets/profile.jpeg";
import { tokens } from "../../../theme";
import { itemProps } from "../../../utils/interfaces";
// import { useSidebarContext } from "./SidebarContext";

const Item = ({ title, to, icon, selected, setSelected }: itemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function MaterialSideBar(): JSX.Element {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [select, setSelect] = useState("Users");
  // const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        // rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        // image={sidebarImage}
      >
        <Menu>
          {/* SIDEBAR TOGGLE AND COLLAPSE */}
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  GAME
                </Typography>
                <IconButton
                  onClick={() => {
                    if (broken) {
                      toggleSidebar();
                    } else {
                      collapseSidebar();
                    }
                  }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* AVATAR */}
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={Profile}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Game Admin
                </Typography>
              </Box>
            </Box>
          )}
          {/* SIDE BAR MENUS */}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={select}
              setSelected={setSelect}
            /> */}
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography> */}
            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={select}
              setSelected={setSelect}
            />
            <Item
              title="Games"
              to="/games"
              icon={<SportsEsportsOutlinedIcon />}
              selected={select}
              setSelected={setSelect}
            />
            {/* <Item
              title="Game Configurations"
              to="/game-configurations"
              icon={<SettingsSuggestOutlinedIcon />}
              selected={select}
              setSelected={setSelect}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default MaterialSideBar;
