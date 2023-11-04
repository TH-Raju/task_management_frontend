import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShareContextData from "./Context/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShareContextData>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ShareContextData>
  </React.StrictMode>
);
