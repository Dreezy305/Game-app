import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Games from "../pages/games/games";
import AddGame from "../pages/games/overview/addGame";
import SingleGame from "../pages/games/overview/singleGame";
import Topbar from "../pages/global/Topbar";
import { SideBarProvider } from "../pages/global/sidebar/SidebarContext";
import AddUser from "../pages/users/overview/addUser";
import SingleUser from "../pages/users/overview/singleUser";
import Users from "../pages/users/users";

function Layout() {
  return (
    <SideBarProvider>
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <main>
          <Topbar />
          <Suspense
            fallback={
              <div className="absoluteCenterY">
                <CircularProgress size={40} thickness={5} color="success" />
              </div>
            }
          >
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/users"} replace={true} />}
              />
              <Route path="/users" element={<Users />} />
              <Route path="/games" element={<Games />} />
              <Route path="/users/:id" element={<SingleUser />} />
              <Route path="/games/:id" element={<SingleGame />} />
              <Route path="/add-new-user" element={<AddUser />} />
              <Route path="/add-new-game" element={<AddGame />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </SideBarProvider>
  );
}

export default Layout;
