import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/Dialog";
import Edit from "../../components/Edit";
import Header from "../../components/Header";
import { useDeleteUserData, useFetchUsersData } from "../../hooks/users";
import { tokens } from "../../theme";
import { userInterface } from "../../utils/interfaces";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function Users(): JSX.Element {
  // GET APP THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // NAVIGATION
  const navigate = useNavigate();

  // STATES
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");
  const [userObj, setUserObj] = React.useState<any>({});
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  // SELECT CHANGE EVENT
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  // CALL USER HOOKS
  const { usersData, isLoading, refetch } = useFetchUsersData(query);
  const { userDelete } = useDeleteUserData();
  const data: userInterface[] = usersData?.data;

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await userDelete.mutateAsync(id);
      if (response.status === 200) {
        setLoading(false);
        setOpen(false);
        refetch();
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  // DIALOG OPEN AND CLOSE
  const handleClickOpen = () => {
    setOpen(true);
    setIsModal(false);
  };

  const handleClickEdit = () => {
    setOpen(false);
    setIsModal(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsModal(false);
  };

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatar",
      headerName: "Image",
      width: 110,
      renderCell: (params: GridRenderCellParams) => {
        return <Avatar alt="Remy Sharp" src={params.row.avatar} />;
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 120 },
    { field: "phoneNumber", headerName: "Phone Number", width: 120 },
    {
      field: "createdAt",
      headerName: "Creation Date",
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const date = dayjs(params.row.createdAt).format("MM/DD/YYYY");
        return <Typography>{date}</Typography>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const userName = params.row.name;
        const userId = params.row.id;
        const data: userInterface = params.row;
        return (
          <Stack direction="row">
            <Tooltip title={`View ${userName}`} arrow>
              <IconButton
                onClick={() => {
                  navigate(`/users/${userId}`, { state: { ...data } });
                }}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={`Edit ${userName}`} arrow>
              <IconButton
                onClick={() => {
                  handleClickEdit();
                  setTitle(`Edit ${userName} data`);
                  setUserName(userName);
                  setId(userId);
                  setUserObj(params.row);
                }}
              >
                <ModeOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={`Delete ${userName}`} arrow>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleClickOpen();
                  setTitle(`Delete ${userName}`);
                  setUserName(userName);
                  setId(userId);
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Edit
        open={isModal}
        handleClose={handleClose}
        loading={loading}
        title={title}
        userObj={userObj}
        refetch={refetch}
      />
      <DialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        userName={userName}
        handleDelete={() => deleteUser(id)}
        loading={loading}
      />
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
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems="baseline"
        >
          {/* FILTERS */}
          <Stack direction={"row"} sx={{ mb: "20px" }}>
            <FormControl variant="standard">
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={value}
                onChange={handleChange}
                input={<BootstrapInput />}
                label="Select"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phoneNumber">Phone</MenuItem>
                <MenuItem value="address">Address</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <BootstrapInput
                id="demo-customized-textbox"
                placeholder="Search..."
                value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setText(event.target.value);
                  setQuery(`?${value}=${event.target.value}`);
                }}
              />
            </FormControl>
          </Stack>

          {/* ACTIONS */}
          <Stack direction={"row"}>
            <Box mr={1}>
              <Button
                variant="contained"
                startIcon={<DownloadOutlinedIcon />}
                onClick={() => {}}
                color="secondary"
              >
                Download CSV
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                startIcon={<PersonAddAlt1OutlinedIcon />}
                onClick={() => {
                  navigate("/add-new-user");
                }}
                color="success"
              >
                Add New User
              </Button>
            </Box>
          </Stack>
        </Box>

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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
          m="8px 0 0 0"
          height="80vh"
        >
          <DataGrid
            rows={data !== undefined ? data : []}
            columns={columns}
            loading={isLoading}
            checkboxSelection
            autoPageSize
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
