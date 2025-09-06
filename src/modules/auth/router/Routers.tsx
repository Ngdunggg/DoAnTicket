import { Path } from "@share/constants/routers";
import { RouteObject } from "react-router-dom";
import Login from "../pages/Login";

const authRouters: RouteObject[] = [
  {
    children: [
      {
        element: <Login />,
        index: true,
      },
    ],
    path: Path.PathLogin,
  },
];

export default authRouters;
