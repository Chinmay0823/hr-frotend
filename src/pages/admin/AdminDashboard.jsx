import React from 'react';
import './AdminDashboard.css'; 
import { FiBriefcase } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

 

  return (
    <div className="admin-container">
     

      <h1>Welcome Admin!</h1>
      <div className="admin-options">
        {/* <div className="admin-card" onClick={() => navigate('/placements')}>
          <div className="icon-circle">
            <FiBriefcase size={50} color="white" />
          </div>
          <h3>Placement</h3>
        </div> */}
        <div className="admin-card" onClick={() => navigate('/recruitment')}>
          <div className="icon-circle">
            <FaUsers size={50} color="white" />
          </div>
          <h3>Recruitment</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
