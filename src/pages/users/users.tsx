/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { tokens } from "../../theme";

export default function Users() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return <div>users</div>;
}
