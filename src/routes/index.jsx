import {Home, About} from "../pages";

import config from "../configs/routeConfig";

import { createBrowserRouter } from "react-router-dom";

const publicRoutes = [
  {
    path: config.home,
    element: <Home></Home>,
  },
  {
    path: config.about,
    element: <About></About>,
  },
];

export const publicRouter = createBrowserRouter(publicRoutes);
