import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HRDashboard from "./pages/Hr/HrDashboard";
import SuperAdminDashboard from "./pages/superadmin/Superadmindashboard";
import PrivateRoute from "./copmonents/privateroute/PrivateRoute";
import PlacementList from "./pages/placement/PlacmentList";
import PlacementCreate from "./pages/placement/PlacementCreate";
import Recruitment from "./copmonents/recruter/Recruitment";
import Jobs from "./copmonents/jobs/Jobs";
import ScheduledInterviews from "./copmonents/sheduled/SheduledInterview";
import OfferRolledOut from "./copmonents/offer/Offer";
import Navbar from "./copmonents/navbar/Navbar";
import Report from "./copmonents/report/Report";

function App() {
  const [candidatesData, setCandidatesData] = useState({}); // Shared state

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />

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
          path="/superadmin"
          element={
            <PrivateRoute role="superadmin">
              <SuperAdminDashboard />
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

        {/* Pass setCandidatesData to Jobs */}
        <Route
          path="/jobs"
          element={<Jobs setCandidatesData={setCandidatesData} />}
        />

        {/* Pass candidatesData to Report */}
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
