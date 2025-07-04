import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/HomePage";
import { Features } from "./pages/Features";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/features",
        element: <Features />,
      },
    ],
  },
];
