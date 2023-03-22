import React, { createContext, useContext, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { contextProps } from "../../../utils/interfaces";
import MaterialSideBar from "./SideBar";

const SidebarContext = createContext({});

export const SideBarProvider = ({ children }: contextProps) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<any>();
  const [sidebarImage, setSidebarImage] = useState<any>();

  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBackgroundColor,
          setSidebarBackgroundColor,
          sidebarImage,
          setSidebarImage,
          sidebarRTL,
          setSidebarRTL,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MaterialSideBar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
