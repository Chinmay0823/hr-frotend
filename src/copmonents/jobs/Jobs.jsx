import React, { useEffect, useState } from "react";
import "./Jobs.css";
import CreateCandidate from "./CreateCandidate";
import axiosInstance from "../../../axiosInstance";

const jobRoles = ["Telecaller", "Counsellor", "Trainer", "HR"];
const experienceOptions = ["All", "Fresher", "1yrs", "2yrs"];

const Jobs = ({ setCandidatesData }) => {
  const [expandedRole, setExpandedRole] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [schedule, setSchedule] = useState({ date: "", description: "" });
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [localCandidatesData, setLocalCandidatesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittingSchedule, setSubmittingSchedule] = useState(false);

  const fetchCandidates = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await axiosInstance.get("/recruitment/candidates");
    const scheduled =
      JSON.parse(localStorage.getItem("scheduledInterviews")) || [];

    // Log API response for debugging
    console.log("API candidate response:", res.data);

    const candidates = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.candidates)
      ? res.data.candidates
      : [];

    const groupedByRole = {};
    candidates.forEach((candidate) => {
      const scheduledData = scheduled.find((sc) => sc._id === candidate._id);
      const mergedCandidate = scheduledData
        ? { ...candidate, ...scheduledData, status: "Scheduled" }
        : { ...candidate, status: "Pending" };

      const role = mergedCandidate.role;
      if (!groupedByRole[role]) {
        groupedByRole[role] = [];
      }
      groupedByRole[role].push(mergedCandidate);
    });

    setLocalCandidatesData(groupedByRole);
    setCandidatesData(groupedByRole);
    setFilters({}); // reset filters on fetch
  } catch (err) {
    console.error("Failed to fetch candidates", err);
    setError("Failed to fetch candidates");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCandidates();
  }, []);

  const toggleRole = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
    if (!filters[role]) {
      setFilters((prev) => ({ ...prev, [role]: "All" }));
    }
  };

  const handleFilterChange = (role, value) => {
    setFilters((prev) => ({ ...prev, [role]: value }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const updateCandidateSchedule = async (candidateId, interviewDate, description) => {
    try {
      await axiosInstance.put(`/recruitment/candidates/${candidateId}`, {
        interviewDate,
        description,
        status: "Scheduled",
      });
    } catch (error) {
      console.error("Failed to update candidate schedule", error);
      alert("Failed to schedule interview on the server.");
      throw error;
    }
  };

  const handleScheduleSubmit = async () => {
    if (!schedule.date || !schedule.description) {
      alert("Please fill in both date and description.");
      return;
    }

    setSubmittingSchedule(true);

    const updatedCandidate = {
      ...selectedCandidate,
      interviewDate: schedule.date,
      description: schedule.description,
      status: "Scheduled",
    };

    try {
      // Update backend
      await updateCandidateSchedule(selectedCandidate._id, schedule.date, schedule.description);

      // Update localStorage
      const scheduled =
        JSON.parse(localStorage.getItem("scheduledInterviews")) || [];
      const filteredScheduled = scheduled.filter(
        (sc) => sc._id !== selectedCandidate._id
      );
      filteredScheduled.push(updatedCandidate);
      localStorage.setItem("scheduledInterviews", JSON.stringify(filteredScheduled));

      // Update local state
      const updatedRoleData = localCandidatesData[expandedRole].map((c) =>
        c._id === selectedCandidate._id ? updatedCandidate : c
      );

      setLocalCandidatesData((prev) => ({
        ...prev,
        [expandedRole]: updatedRoleData,
      }));
      setCandidatesData((prev) => ({
        ...prev,
        [expandedRole]: updatedRoleData,
      }));

      setSelectedCandidate(updatedCandidate);
      alert("Interview scheduled!");
      setSchedule({ date: "", description: "" });
    } catch {
      // error handled in updateCandidateSchedule
    } finally {
      setSubmittingSchedule(false);
    }
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setSchedule({ date: "", description: "" });
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1 className="jobs-heading">Job Posts</h1>
        <button
          onClick={() => setShowCandidateForm(true)}
          className="add-candidate-btn"
        >
          Add Candidate
        </button>
      </div>

      {loading && <p>Loading candidates...</p>}
      {error && <p className="error-text">{error}</p>}

      {jobRoles.map((role, index) => {
        const isExpanded = expandedRole === role;
        const candidates = localCandidatesData[role] || [];
        const filteredCandidates =
          filters[role] === "All" || !filters[role]
            ? candidates
            : candidates.filter((c) => c.experience === filters[role]);

        return (
          <section key={role}>
            <button
              onClick={() => toggleRole(role)}
              className={`role-button ${isExpanded ? "role-expanded" : ""}`}
            >
              <span className="role-number">{index + 1}</span>
              {role} <span style={{ marginLeft: 6 }}>({candidates.length})</span>
              <span className="arrow">{isExpanded ? "▼" : "▶"}</span>
            </button>

            {isExpanded && (
              <div id={`${role}-content`}>
                <label htmlFor={`${role}-exp-filter`} className="exp-filter">
                  Filter by Experience:
                </label>
                <select
                  id={`${role}-exp-filter`}
                  value={filters[role] || "All"}
                  onChange={(e) => handleFilterChange(role, e.target.value)}
                  className="exp-dropdown"
                >
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>

                {filteredCandidates.length > 0 ? (
                  <table className="candidate-table">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Mail ID</th>
                        <th>Gender</th>
                        <th>Experience</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((c, i) => (
                        <tr key={c._id || i}>
                          <td>{i + 1}</td>
                          <td>{c.name}</td>
                          <td>{c.contact}</td>
                          <td>{c.email}</td>
                          <td>{c.gender}</td>
                          <td>{c.experience}</td>
                          <td>{c.status || "Pending"}</td>
                          <td>
                            <button
                              className="view-button"
                              onClick={() => setSelectedCandidate(c)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No candidates found.</p>
                )}
              </div>
            )}
          </section>
        );
      })}

      {selectedCandidate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>Candidate Details</h2>
            <p>
              <strong>Name:</strong> {selectedCandidate.name}
            </p>
            <p>
              <strong>Contact:</strong> {selectedCandidate.contact}
            </p>
            <p>
              <strong>Email:</strong> {selectedCandidate.email}
            </p>
            <p>
              <strong>Gender:</strong> {selectedCandidate.gender}
            </p>
            <p>
              <strong>Experience:</strong> {selectedCandidate.experience}
            </p>
            <hr />
            {selectedCandidate.status !== "Scheduled" ? (
              <>
                <h3>Schedule Interview</h3>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={schedule.date}
                  onChange={handleScheduleChange}
                  className="exp-dropdown"
                />
                <label>Remark:</label>
                <textarea
                  name="description"
                  value={schedule.description}
                  onChange={handleScheduleChange}
                  rows="3"
                  className="exp-dropdown"
                  style={{ marginBottom: 15 }}
                />
                <button
                  onClick={handleScheduleSubmit}
                  className="view-button"
                  disabled={submittingSchedule}
                >
                  {submittingSchedule ? "Submitting..." : "Submit"}
                </button>
              </>
            ) : (
              <>
                <h3>Interview Scheduled</h3>
                <p>
                  <strong>Status:</strong> {selectedCandidate.status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedCandidate.interviewDate
                    ? new Date(selectedCandidate.interviewDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedCandidate.description || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {showCandidateForm && (
        <div className="modal-overlay" onClick={() => setShowCandidateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowCandidateForm(false)}
            >
              &times;
            </button>
            <CreateCandidate
              onSuccess={() => {
                setShowCandidateForm(false);
                fetchCandidates();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
