import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home.jsx";
import Pokemon from "./routes/Pokemon.jsx";
import Games from "./routes/Games.jsx";
import Comm from "./routes/Comm.jsx";
import Write from "./routes/Write.jsx";
import Item from "./routes/Item.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "pokemon/:id",
        element: <Pokemon />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "community",
        element: <Comm />,
      },
      { path: "community/write", element: <Write /> },
      { path: "community/item/:index", element: <Item /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
