import React, { Suspense } from "react";
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
import Spinner from "./components/ui/Spinner";

const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const CreateOrEditProfile = React.lazy(() =>
  import("./pages/CreateOrEditProfile/CreateOrEditProfile")
);
const AddExperience = React.lazy(() =>
  import("./pages/AddExperience/AddExperience")
);
const AddEducation = React.lazy(() =>
  import("./pages/AddEducation/AddEducation")
);
const AllProfiles = React.lazy(() => import("./pages/AllProfiles/AllProfiles"));
const ProfileByUserId = React.lazy(() =>
  import("./pages/UserProfile/ProfileByUserId")
);
const AllPosts = React.lazy(() => import("./pages/AllPosts/AllPosts"));
const PostById = React.lazy(() => import("./pages/PostById/PostById"));

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

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
