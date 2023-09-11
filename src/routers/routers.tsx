import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "user",
        element: <div>dsadas</div>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
