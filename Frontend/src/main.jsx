import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Signing from "./Pages/Signing.jsx";
import EducationalInfo from "./Pages/EducationalInfo.jsx";
import EnrolledCourses from "./Pages/EnrolledCourses.jsx";
import ProfileDetails from "./Pages/ProfileDetails.jsx";
import Protected from "./Components/ProtectedRoute.jsx";
import EditProfile from "./Pages/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signing />,
  },
  {
    path: "/educationalInfo",
    element: <Protected Component={EducationalInfo} />,
  },
  {
    path: "/enrolledCourses",
    element: <Protected Component={EnrolledCourses} />,
  },
  {
    path: "/profileDetails",
    element: <Protected Component={ProfileDetails} />,
  },
  {
    path: "/editProfile/:section",
    element: <Protected Component={EditProfile} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
