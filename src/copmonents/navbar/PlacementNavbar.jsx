import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const PlacementNavbar = (role) => {

  const homePath = role === 'admin' ? '/admin' : '/hr';

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
          <NavLink to="/placements" className="nav-link">Placement List</NavLink>
        </li>
        <li>
          <NavLink to="/placements/create" className="nav-link">Create Placement</NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default PlacementNavbar;
