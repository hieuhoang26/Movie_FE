import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Layout from "./Layout";
import HomePage from "../page/HomePage";
import SignUp from "../page/SignUp";
import MovieDetail from "../page/MovieDetail";
import SearchPage from "../page/SearchPage";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  //   {
  //     path: "/auth/forgot-password",
  //     element: <ForgotPassword />,
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);
