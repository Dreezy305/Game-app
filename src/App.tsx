import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/dashboard";
import { SideBarProvider } from "./pages/global/sidebar/SidebarContext";
import Topbar from "./pages/global/Topbar";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
        </SideBarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
