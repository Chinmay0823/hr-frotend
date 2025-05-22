import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recruitment.css";

const sections = [
  { label: "Job Posts", path: "/jobs" },
  { label: "Scheduled Interviews", path: "/scheduled-interviews" },
  { label: "Offers", path: "/offers" },
  { label: "Report", path: "/report" },
];

const RecruitmentMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <h1>Recruitment</h1>
      <nav className="vertical-menu">
        {sections.map(({ label, path }) => (
          <button
            key={path}
            className="menu-button"
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default RecruitmentMenu;
