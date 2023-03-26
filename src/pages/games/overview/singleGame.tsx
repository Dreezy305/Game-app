/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteGameData } from "../../../hooks/games";
import { tokens } from "../../../theme";

function SingleGame(): JSX.Element {
  const navigation = useNavigate();
  const params: any = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { gameDelete } = useDeleteGameData();

  // STATE
  const [loading, setLoading] = React.useState<boolean>(false);

  const deleteGame = async () => {
    try {
      setLoading(true);
      const response = await gameDelete.mutateAsync(params.id);
      if (response.status === 200) {
        setLoading(false);
        navigation("/games");
        // refetch();
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Box m={"20px"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        mb={7}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => {
              navigation("/games");
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
          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => deleteGame()}
            >
              Delete
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: colors.blueAccent[700],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SingleGame;
