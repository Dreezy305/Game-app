/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

export default function Users() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "avatar", headerName: "Image", width: 110 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 120 },
    { field: "phoneNumber", headerName: "Phone Number", width: 120 },
  ];
  return (
    <Box m={"20px"}>
      {/* Header */}
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Header title="Users" subtitle="Table below displays users data" />
      </Box>
      {/* TABLE / DATA GRID */}
      <Box
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
        m="8px 0 0 0"
        height="80vh"
      ></Box>
    </Box>
  );
}
