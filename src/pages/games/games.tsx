import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../components/Bootstrap";
import DialogBox from "../../components/Dialog";
import EditGame from "../../components/EditGame";
import Header from "../../components/Header";
import { useDeleteGameData, useFetchGamesData } from "../../hooks/games";
import { tokens } from "../../theme";
import { ExcelFileDownload } from "../../utils/excel";
import { GameInterface } from "../../utils/interfaces";

export default function Games(): JSX.Element {
  // GET APP THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // EXCEL FILE DOWNLOAD CLASS INSTANCE
  const ExcelFile = new ExcelFileDownload();

  // const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate: any = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");
  const [userObj, setUserObj] = React.useState<any>({});
  const [title, setTitle] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");

  const { gamesData, isLoading, refetch } = useFetchGamesData(query);
  const { gameDelete } = useDeleteGameData();
  const data: GameInterface[] = gamesData?.data;

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

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

  const handleFileDownload = () => {
    const fileName: string = "games_data.xlsx";
    const jsonData = gamesData?.data;
    ExcelFile.generatsGamesCsv(fileName, jsonData);
  };

  const deleteGame = async (id: string) => {
    try {
      setLoading(true);
      const response = await gameDelete.mutateAsync(id);
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

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "gameCategory", headerName: "Game Category", width: 120 },
    {
      field: "createdAt",
      headerName: "Creation Date",
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const date = dayjs(params.row.createdAt).format("MM/DD/YYYY");
        return <Typography>{date}</Typography>;
      },
    },
    { field: "scores", headerName: "Scores", width: 120 },
    { field: "reviews", headerName: "Reviews", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const userName = params.row.name;
        const userId = params.row.id;
        const data: any = params.row;
        return (
          <Stack direction="row">
            <Tooltip title={`View ${userName}`} arrow>
              <IconButton
                onClick={() => {
                  navigate(`/games/${userId}`, { state: { ...data } });
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
    <>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        userName={userName}
        handleDelete={() => deleteGame(id)}
        loading={loading}
      />
      <EditGame
        open={isModal}
        handleClose={handleClose}
        loading={loading}
        title={title}
        userObj={userObj}
        refetch={refetch}
      />
      <Box m={"20px"}>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Header title="Games" subtitle="Table below displays games data" />
        </Box>

        <Grid container spacing={2} alignItems="baseline">
          {/* FILTERS */}
          <Grid item xs={12} sm={6} md={4} lg={6}>
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
                  <MenuItem value="gameCategory">Game Category</MenuItem>
                  <MenuItem value="scores">Scores</MenuItem>
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
          </Grid>

          {/* ACTIONS */}
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Stack direction={"row"} spacing={2}>
              <Box mr={1}>
                <Button
                  variant="contained"
                  startIcon={<DownloadOutlinedIcon />}
                  onClick={() => {
                    handleFileDownload();
                  }}
                  color="secondary"
                >
                  Download CSV
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<GamesOutlinedIcon />}
                  onClick={() => {
                    navigate("/add-new-game");
                  }}
                  color="success"
                >
                  Add New Game
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>

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
    </>
  );
}
