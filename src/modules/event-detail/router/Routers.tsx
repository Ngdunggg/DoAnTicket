import { Path } from "@share/constants/routers";
import { RouteObject } from "react-router-dom";
import EventDetail from "../pages/EventDetail";

const eventDetailRouters: RouteObject[] = [
  {
    children: [
      {
        element: <EventDetail />,
        index: true,
      },
    ],
    path: Path.PathEventDetail,
  },
];

export default eventDetailRouters;
