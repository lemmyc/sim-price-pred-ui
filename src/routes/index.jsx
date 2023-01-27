

import PageNotFound from "../pages/PageNotFound";
import Password from "../pages/Password";
import Profile from "../pages/Profile";
import Recovery from "../pages/Recovery";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Username from "../pages/Username";

import config from '../configs/routeConfig'

import {
  createBrowserRouter
} from 'react-router-dom'

const publicRoutes = [
  {
    path: config.username, 
    element: <Username></Username>
  },
  {
    path: config.pageNotFound, 
    element: <PageNotFound></PageNotFound>
  },
  {
    path: config.profile, 
    element: <Profile></Profile>
  },
  {
    path: config.register, 
    element: <Register></Register>
  },
  {
    path: config.password, 
    element: <Password></Password>
  },
  {
    path: config.recovery, 
    element: <Recovery></Recovery>
  },
  {
    path: config.resetPassword, 
    element: <ResetPassword></ResetPassword>
  },
]

export const publicRouter = createBrowserRouter(publicRoutes)


