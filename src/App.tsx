import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import Games from "./pages/games/games";
import AddGame from "./pages/games/overview/addGame";
import SingleGame from "./pages/games/overview/singleGame";
import { SideBarProvider } from "./pages/global/sidebar/SidebarContext";
import Topbar from "./pages/global/Topbar";
import AddUser from "./pages/users/overview/addUser";
import SingleUser from "./pages/users/overview/singleUser";
import Users from "./pages/users/users";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const queryClient = new QueryClient();
  const [theme, colorMode] = useMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SideBarProvider>
            <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
              <main>
                <Topbar />
                <Routes>
                  <Route path="/" element={<Users />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/users/:id" element={<SingleUser />} />
                  <Route path="/games/:id" element={<SingleGame />} />
                  <Route path="/add-new-user" element={<AddUser />} />
                  <Route path="/add-new-game" element={<AddGame />} />
                </Routes>
              </main>
            </div>
          </SideBarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
