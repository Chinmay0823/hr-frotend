import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import placment from "../../assets/placment.png";
import recruiter from "../../assets/Recrutment.jpeg";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome Admin!</h1>
      <div className="circle-button-container">
        <div className="circle" onClick={() => navigate("/placements")}>
          <img src={placment} alt="Placement" />
          <span>Placement</span>
        </div>

        <div className="circle" onClick={() => navigate("/recruitment")}>
          <img src={recruiter} alt="Recruiter" />
          <span>Recruiter</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
