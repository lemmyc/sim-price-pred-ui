import {Home} from "../pages";

import config from "../configs/routeConfig";

import { createBrowserRouter } from "react-router-dom";

const publicRoutes = [
  {
    path: config.home,
    element: <Home></Home>,
  },
];

export const publicRouter = createBrowserRouter(publicRoutes);
