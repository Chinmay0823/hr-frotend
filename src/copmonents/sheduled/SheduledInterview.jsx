import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance"; // Adjust path if needed
import "./ScheduledInterviews.css";

const jobRoles = ["Telecaller", "Counsellor", "Trainer", "HR"];

const ScheduledInterviews = () => {
  const [interviewsByRole, setInterviewsByRole] = useState({});
  const [expandedRole, setExpandedRole] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = () => {
    const data = JSON.parse(localStorage.getItem("scheduledInterviews")) || [];
    const grouped = jobRoles.reduce((acc, role) => {
      acc[role] = data.filter((item) => item.role === role);
      return acc;
    }, {});
    setInterviewsByRole(grouped);
  };

  const toggleRole = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setDescriptionInput("");
  };

  const handleDecision = async (decision) => {
    if (!selectedCandidate) return;

    const updatedCandidate = {
      ...selectedCandidate,
      status: decision,
      description: descriptionInput,
    };

    try {
      // ✅ Update in MongoDB
      await axiosInstance.put(`/recruitment/candidates/${updatedCandidate._id}`, {
        status: decision,
        description: descriptionInput,
      });

      // ✅ Update selected/rejected list in localStorage
      const key = decision === "Selected" ? "offerRolledOut" : "rejectedCandidates";
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      const filtered = existing.filter((item) => item._id !== updatedCandidate._id);
      localStorage.setItem(key, JSON.stringify([...filtered, updatedCandidate]));

      // ✅ Update scheduledInterviews list in localStorage
      const all = JSON.parse(localStorage.getItem("scheduledInterviews")) || [];
      const updatedList = all.map((c) =>
        c._id === updatedCandidate._id ? updatedCandidate : c
      );
      localStorage.setItem("scheduledInterviews", JSON.stringify(updatedList));

      setSelectedCandidate(updatedCandidate);
      loadInterviews();
    } catch (error) {
      console.error("Error updating candidate:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return "Scheduled";
    return status;
  };

  return (
    <div className="si-container">
      <h1 className="si-heading">Scheduled Interviews</h1>
      {jobRoles.map((role) => {
        const candidates = interviewsByRole[role] || [];
        const isExpanded = expandedRole === role;
        return (
          <section key={role}>
            <button
              onClick={() => toggleRole(role)}
              className={`role-button ${isExpanded ? "role-expanded" : ""}`}
            >
              {role} <span className="arrow">▶</span>
            </button>
            {isExpanded && (
              <>
                {candidates.length === 0 ? (
                  <p className="no-data">No interviews scheduled for {role}.</p>
                ) : (
                  <table className="candidate-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Experience</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((c, idx) => (
                        <tr key={idx}>
                          <td>{c.name}</td>
                          <td>{c.contact}</td>
                          <td>{c.email}</td>
                          <td>{c.gender}</td>
                          <td>{c.interviewDate}</td>
                          <td>{c.experience}</td>
                          <td>{getStatusLabel(c.status)}</td>  
                          <td>
                            <button
                              onClick={() => {
                                setSelectedCandidate(c);
                                setDescriptionInput(c.description || "");
                              }}
                              className="view-button"
                            >
                              View
                            </button>
                          </td>
                          <td>{getStatusLabel(c.status)}</td>
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

      {/* Modal */}
      {selectedCandidate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2 className="modal-title">Interview Details</h2>
            <p><strong>Name:</strong> {selectedCandidate.name}</p>
            <p><strong>Contact:</strong> {selectedCandidate.contact}</p>
            <p><strong>Email:</strong> {selectedCandidate.email}</p>
            <p><strong>Gender:</strong> {selectedCandidate.gender}</p>
            <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
            <p><strong>Date:</strong> {selectedCandidate.interviewDate}</p>
            <div>
              <label><strong>Description:</strong></label>
              <textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                rows={3}
                style={{ width: "100%", marginTop: "5px" }}
              />
            </div>

            {selectedCandidate.status === "Scheduled" || !selectedCandidate.status ? (
              <div className="decision-buttons">
                <button className="select-btn" onClick={() => handleDecision("Selected")}>
                  Select
                </button>
                <button className="reject-btn" onClick={() => handleDecision("Rejected")}>
                  Reject
                </button>
              </div>
            ) : (
              <p className="status-display"><strong>Status:</strong> {selectedCandidate.status}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledInterviews;
