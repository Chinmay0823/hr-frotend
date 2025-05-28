import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import PlacementList from "./pages/placement/PlacementDashboard";
import PlacementCreate from "./pages/placement/PlacementCreate";
import Recruitment from "./copmonents/recruter/Recruitment";
import Jobs from "./copmonents/jobs/Jobs";
import ScheduledInterviews from "./copmonents/sheduled/SheduledInterview";
import OfferRolledOut from "./copmonents/offer/Offer";
import Report from "./copmonents/report/Report";



function App() {
  const [candidatesData, setCandidatesData] = useState({});

  

  return (
    <>
    

      <Routes>
        <Route path="/" element={<Recruitment />} />

        <Route path="/placements" element={<PlacementList />} />
        <Route path="/placements/create" element={<PlacementCreate />} />

        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/jobs" element={<Jobs setCandidatesData={setCandidatesData} />} />
        <Route path="/report" element={<Report candidatesData={candidatesData} />} />
        <Route path="/scheduled-interviews" element={<ScheduledInterviews />} />
        <Route path="/offers" element={<OfferRolledOut />} />
      </Routes>
    </>
  );
}

export default App;
