import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/dashboard";
import Games from "./pages/games/games";
import { SideBarProvider } from "./pages/global/sidebar/SidebarContext";
import Topbar from "./pages/global/Topbar";
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
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/games" element={<Games />} />
                </Routes>
              </main>
            </div>
          </SideBarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
