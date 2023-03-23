import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import {
    Avatar,
    Box,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";
import DialogBox from "../../components/Dialog";
import Header from "../../components/Header";
import { useDeleteUserData, useFetchUsersData } from "../../hooks/users";
import { tokens } from "../../theme";
import { userInterface } from "../../utils/interfaces";

export default function Users(): JSX.Element {
  // GET APP THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // STATES
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");

  // CALL USER HOOKS
  const { usersData, isLoading, refetch } = useFetchUsersData();
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
  };

  const handleClose = () => {
    setOpen(false);
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
        return (
          <Stack direction="row">
            <Tooltip title={`Edit ${userName}`} arrow>
              <IconButton>
                <ModeOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={`Delete ${userName}`} arrow>
              <IconButton
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
        >
          <DataGrid
            rows={data !== undefined ? data : []}
            columns={columns}
            loading={isLoading}
            checkboxSelection
            autoPageSize
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
