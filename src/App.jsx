import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HRDashboard from "./pages/Hr/HrDashboard";
  import PrivateRoute from "./copmonents/privateroute/PrivateRoute";

import PlacementList from "./pages/placement/PlacementDashboard";
import PlacementCreate from "./pages/placement/PlacementCreate";
import Recruitment from "./copmonents/recruter/Recruitment";
import Jobs from "./copmonents/jobs/Jobs";
import ScheduledInterviews from "./copmonents/sheduled/SheduledInterview";
import OfferRolledOut from "./copmonents/offer/Offer";
import Report from "./copmonents/report/Report";

// Custom navbars
import PlacementNavbar from "./copmonents/navbar/PlacementNavbar";
import RecruitmentNavbar from "./copmonents/navbar/RecruitmentNavbar";

function App() {
  const [candidatesData, setCandidatesData] = useState({});
  const location = useLocation();

  // Determine which navbar to show
  const showPlacementNavbar = location.pathname.startsWith("/placements");
  const showRecruitmentNavbar =
    location.pathname === "/recruitment" ||
    location.pathname === "/jobs" ||
    location.pathname === "/scheduled-interviews" ||
    location.pathname === "/offers" ||
    location.pathname === "/report";

  return (
    <>
      {showPlacementNavbar && <PlacementNavbar />}
      {showRecruitmentNavbar && <RecruitmentNavbar />}

      <Routes>
        <Route path="/recruitment" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/hr"
          element={
            <PrivateRoute role="hr">
              <HRDashboard />
            </PrivateRoute>
          }
        />


        <Route
          path="/placements"
          element={
            <PrivateRoute role="hr">
              <PlacementList />
            </PrivateRoute>
          }
        />

        <Route
          path="/placements/create"
          element={
            <PrivateRoute role="hr">
              <PlacementCreate />
            </PrivateRoute>
          }
        />

        <Route path="/recruitment" element={<Recruitment />} />

        <Route
          path="/jobs"
          element={<Jobs setCandidatesData={setCandidatesData} />}
        />

        <Route
          path="/report"
          element={<Report candidatesData={candidatesData} />}
        />

        <Route path="/scheduled-interviews" element={<ScheduledInterviews />} />
        <Route path="/offers" element={<OfferRolledOut />} />
      </Routes>
    </>
  );
}

export default App;
