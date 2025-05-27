import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = (role) => {
  const homePath = role === 'admin' ? '/admin' : '/hr';

  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to={homePath} className="nav-link">
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

          <li>
             <button className="logout-btn top-right" onClick={handleLogout}>
        Logout
      </button>
          </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
