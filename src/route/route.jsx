import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../page/HomePage";
import MovieDetail from "../page/MovieDetail";
import SearchPage from "../page/SearchPage";
import AdminLayout from "../dashboard/AdminLayout";
import Dashboard from "../dashboard/page/Dash";
import Settings from "../dashboard/page/Settings";
import Tables from "../dashboard/page/Tables";
import Profile from "../components/Profile";

import VerifyRedirect from "../page/auth/VerifyRedirect";
import Login from "../page/auth/Login";
import SignUp from "../page/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <ProtectedRoute element={<Home />}></ProtectedRoute>,
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth/redirect/verify",
    element: <VerifyRedirect />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Layout riêng cho admin
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "tables",
        element: <Tables />,
      },
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
