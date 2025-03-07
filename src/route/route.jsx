import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../page/HomePage";
import MovieDetail from "../page/MovieDetail";
import SearchPage from "../page/SearchPage";
import AdminLayout from "../dashboard/AdminLayout";
import Dashboard from "../dashboard/page/Dash";
import Settings from "../dashboard/page/Settings";
import Tables from "../dashboard/page/Tables";

import VerifyRedirect from "../page/auth/VerifyRedirect";
import Login from "../page/auth/Login";
import SignUp from "../page/auth/SignUp";
import UserManager from "../dashboard/page/UserManager";
import CategoryManager from "../dashboard/page/CategoryManager";
import Profile from "../page/Profile";
import MovieManager from "../dashboard/page/MovieManager";
import AllMovie from "../page/AllMovie";
import ProtectedRoute from "./ProtectedRoute";
import SearchResults from "../components/SearchResults";


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
        path: "/all",
        element: <AllMovie />,
      },
      {
        path: "/search",
        element: <SearchResults  />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
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
  // {
  //   path: "/admin",
  //   element: <AdminLayout />, // Layout riêng cho admin
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "settings",
  //       element: <Settings />,
  //     },
  //     {
  //       path: "tables",
  //       element: <Tables />,
  //     },
  //     {
  //       path: "movies",
  //       element: <MovieManager />,
  //     },
  //     {
  //       path: "category",
  //       element: <CategoryManager />,
  //     },
  //     {
  //       path: "users",
  //       element: <UserManager />,
  //     },
  //     {
  //       index: true,
  //       element: <Dashboard />,
  //     },
  //   ],
  // },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
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
            path: "movies",
            element: <MovieManager />,
          },
          {
            path: "category",
            element: <CategoryManager />,
          },
          {
            path: "users",
            element: <UserManager />,
          },
        ],
      },
    ],
  },
]);
