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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Edit from "../../../components/Edit";
import { useDeleteUserData, useFetchUserData } from "../../../hooks/users";
import { tokens } from "../../../theme";

function SingleUser(): JSX.Element {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location: any = useLocation();
  const navigation = useNavigate();
  const param: any = useParams();

  const [isModal, setIsModal] = React.useState<boolean>(false);

  const locationObject = location.state;

  // STATE
  const [loading, setLoading] = React.useState<boolean>(false);

  // CUSTOM HOOKS CALL
  const { userData, refetch } = useFetchUserData(param.id);
  const { userDelete } = useDeleteUserData();

  const deleteUser = async () => {
    try {
      setLoading(true);
      const response = await userDelete.mutateAsync(param.id);
      if (response.status === 200) {
        setLoading(false);
        navigation("/users");
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const handleClickOpen = () => {
    setIsModal(true);
  };

  return (
    <React.Fragment>
      <Edit
        open={isModal}
        handleClose={handleClose}
        loading={loading}
        title={`Edit ${locationObject.name} data`}
        userObj={locationObject}
        refetch={() => refetch()}
      />
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
              onClick={handleClickOpen}
            >
              Edit
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => deleteUser()}
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

        <Card
          sx={{
            backgroundColor: colors.blueAccent[700],
            marginTop: "20px",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              flexBasis: { xs: "100%", sm: "50%" },
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography component="div" variant="h1">
                {locationObject.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              ></Typography>
              <List sx={{ width: "100%" }}>
                {/* List items go here */}
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
                  key={2}
                  disableGutters
                  secondaryAction={
                    <Typography variant="h6">
                      {locationObject?.email}
                    </Typography>
                  }
                >
                  <ListItemText primary={`Email`} />
                </ListItem>
                <ListItem
                  key={3}
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
                  key={4}
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
                  key={5}
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
                  key={6}
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
                  key={7}
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
          </Box>
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "auto", sm: "100%" },
              objectFit: "cover",
            }}
            image={locationObject?.avatar}
            alt="user_image"
          />
        </Card>
      </Box>
    </React.Fragment>
  );
}

export default SingleUser;
