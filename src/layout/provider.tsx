import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { ColorModeContext, useMode } from "../theme";
import Layout from "./layout";

function Provider() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Provider;
