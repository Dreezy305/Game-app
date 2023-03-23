import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";

function SingleUser(): JSX.Element {
  const location = useLocation();
  const navigation = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(location.state);
  return (
    <Box m={"20px"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => {
              navigation("/users");
            }}
            color="success"
          >
            Go back
          </Button>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            startIcon={<ModeOutlinedIcon />}
            color="primary"
            sx={{ backgroundColor: `${colors.blueAccent[700]} !important` }}
          >
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />} color="error">
            Delete
          </Button>
        </Box>
      </Box>


      
    </Box>
  );
}

export default SingleUser;
