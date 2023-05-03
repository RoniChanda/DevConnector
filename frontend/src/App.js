import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import ErrorPage from "./components/layout/ErrorPage";
import RootLayout from "./components/layout/RootLayout";
import useUserRequests from "./hooks/useUserRequests";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateOrEditProfile from "./pages/CreateOrEditProfile/CreateOrEditProfile";
import AddExperience from "./pages/AddExperience/AddExperience";
import AddEducation from "./pages/AddEducation/AddEducation";
import AllProfiles from "./pages/AllProfiles/AllProfiles";
import ProfileByUserId from "./pages/UserProfile/ProfileByUserId";
import AllPosts from "./pages/AllPosts/AllPosts";
import PostById from "./pages/PostById/PostById";

function App() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { loadUser } = useUserRequests();

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [loadUser, token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />,
        },
        {
          path: "profiles",
          element: <AllProfiles />,
        },
        {
          path: "profile/:user_id",
          element: <ProfileByUserId />,
        },
        {
          path: "register",
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Register />
          ),
        },
        {
          path: "login",
          element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login />,
        },
        {
          path: "dashboard",
          element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
        },
        {
          path: "create-profile",
          element: isAuthenticated ? (
            <CreateOrEditProfile />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "edit-profile",
          element: isAuthenticated ? (
            <CreateOrEditProfile edit />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "add-experience",
          element: isAuthenticated ? (
            <AddExperience />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "add-education",
          element: isAuthenticated ? (
            <AddEducation />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "posts",
          element: isAuthenticated ? <AllPosts /> : <Navigate to="/login" />,
        },
        {
          path: "posts/:post_id",
          element: isAuthenticated ? <PostById /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
