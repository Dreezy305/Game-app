import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useProSidebar } from "react-pro-sidebar";
import { ColorModeContext, tokens } from "../../theme";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  return (
    <Box display={"flex"} justifyContent="space-between" padding={2}>
      <Box display="flex">
        {/* COLLAPSIBLE MENU */}
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlined />
          </IconButton>
        )}
        {/* SEARCH BAR */}
        <Box
          display={"flex"}
          sx={{
            backgroundColor: colors.primary[400],
            borderRadius: "3px",
            background: `${colors.primary[400]}`,
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
          <IconButton type="button">
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display={"flex"} alignItems="center">
        <IconButton onClick={() => colorMode.toggleColorMode()}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlined />
        </IconButton>
        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlined />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default Topbar;
