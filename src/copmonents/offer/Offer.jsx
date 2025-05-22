import React, { useEffect, useState } from "react";
import "./Offer.css";

const jobRoles = ["Telecaller", "Counsellor", "Trainer", "HR"];

const OfferRolledOut = () => {
  const [offersByRole, setOffersByRole] = useState({});
  const [expandedRole, setExpandedRole] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("offerRolledOut")) || [];
    const grouped = jobRoles.reduce((acc, role) => {
      acc[role] = stored.filter((item) => item.role === role);
      return acc;
    }, {});
    setOffersByRole(grouped);
  }, []);

  const toggleRole = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
  };

  const closeModal = () => setSelectedOffer(null);

  return (
    <div className="or-container">
      <h1 className="or-heading">Offers Rolled Out</h1>

      {jobRoles.map((role) => {
        const offers = offersByRole[role] || [];
        const isExpanded = expandedRole === role;
        return (
          <section key={role}>
            <button
              onClick={() => toggleRole(role)}
              className={`role-button ${isExpanded ? "role-expanded" : ""}`}>
              {role}
              <span className="arrow">▶</span>
            </button>
            {isExpanded && (
              <>
                {offers.length === 0 ? (
                  <p className="no-data">No offers rolled out for {role}.</p>
                ) : (
                  <table className="candidate-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Experience</th>
                        <th>Interview Date</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers.map((c, idx) => (
                        <tr key={idx}>
                          <td>{c.name}</td>
                          <td>{c.contact}</td>
                          <td>{c.email}</td>
                          <td>{c.gender}</td>
                          <td>{c.experience}</td>
                          <td>{c.interviewDate}</td>
                          <td>{c.description}</td>
                          <td>
                            <button
                              className="view-button"
                              onClick={() => setSelectedOffer(c)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </section>
        );
      })}

      {selectedOffer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2 className="modal-title">Offer Details</h2>
            <p><strong>Name:</strong> {selectedOffer.name}</p>
            <p><strong>Contact:</strong> {selectedOffer.contact}</p>
            <p><strong>Email:</strong> {selectedOffer.email}</p>
            <p><strong>Gender:</strong> {selectedOffer.gender}</p>
            <p><strong>Experience:</strong> {selectedOffer.experience}</p>
            <p><strong>Interview Date:</strong> {selectedOffer.interviewDate}</p>
            <p><strong>Description:</strong> {selectedOffer.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferRolledOut;
