import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/admin" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruitment" className="nav-link">
            Recruitment
          </NavLink>
        </li>

        <li>
          <NavLink to="/jobs" className="nav-link">
            Job Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/scheduled-interviews" className="nav-link">
            Scheduled Interviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/offers" className="nav-link">
            Offers Rolled Out
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className="nav-link">
            Report
          </NavLink>
        </li>

       
      </ul>
    </nav>
  );
};

export default Navbar;
