import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Provider from "./layout/provider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
