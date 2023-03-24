import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetchUserData } from "../../../hooks/users";
import { tokens } from "../../../theme";

function SingleUser(): JSX.Element {
  const location: any = useLocation();
  const navigation = useNavigate();
  const param: any = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const locationObject = location.state;

  // FETCH USER DATA HOOK
  const { userData } = useFetchUserData(param.id);
  console.log(userData?.data);
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

      <Card
        sx={{
          // width: "75%",
          backgroundColor: colors.blueAccent[700],
          marginTop: "20px",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h1">
              {locationObject.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            ></Typography>

            <List sx={{ width: "80%" }}>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6">
                    {userData?.data?.gender}
                  </Typography>
                }
              >
                <ListItemText primary={`Gender`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6">{locationObject?.email}</Typography>
                }
              >
                <ListItemText primary={`Email`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6" textAlign={"start"}>
                    {locationObject?.phoneNumber}
                  </Typography>
                }
              >
                <ListItemText primary={`Phone Number`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6" textAlign={"start"}>
                    {locationObject?.address}
                  </Typography>
                }
              >
                <ListItemText primary={`Address`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6">
                    {userData?.data?.currency}
                    {userData?.data?.accountBalance}
                  </Typography>
                }
              >
                <ListItemText primary={`Account Balance`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6">
                    {userData?.data?.gamesPlayed}
                  </Typography>
                }
              >
                <ListItemText primary={`Number of Games`} />
              </ListItem>
              <ListItem
                key={1}
                disableGutters
                secondaryAction={
                  <Typography variant="h6" textAlign={"start"}>
                    {dayjs(locationObject?.createdAt).format("MM/DD/YYYY")}
                  </Typography>
                }
              >
                <ListItemText primary={`Creation Date`} />
              </ListItem>
            </List>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: "50%" }}
          image={locationObject?.avatar}
          alt="Live from space album cover"
        />
      </Card>
    </Box>
  );
}

export default SingleUser;
