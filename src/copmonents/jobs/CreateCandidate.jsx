import React, { useState } from "react";
import "./CreateCandidate.css";
import axiosInstance from "../../../axiosInstance"; 

const jobRoles = ["Telecaller", "Counsellor", "Trainer", "HR"];
const experienceOptions = ["Fresher", "1yrs", "2yrs"];

const CreateCandidate = ({ onSuccess }) => {
  const [candidate, setCandidate] = useState({
    role: jobRoles[0],
    name: "",
    contact: "",
    email: "",
    gender: "",
    experience: experienceOptions[0],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    const { name, contact, email, gender, experience, role } = candidate;
    if (!name || !contact || !email || !gender || !experience || !role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Axios POST request
      const response = await axiosInstance.post("/recruitment/candidates", candidate);
      console.log("Candidate created:", response.data);
      alert("Candidate created successfully!");

      // Reset form
      setCandidate({
        role: jobRoles[0],
        name: "",
        contact: "",
        email: "",
        gender: "",
        experience: experienceOptions[0],
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "An error occurred";
      setError(msg);
    }
  };

  return (
    <div className="create-candidate-container">
      <h2 className="title">Add New Candidate</h2>
      {error && <div className="error">{error}</div>}
      <form className="candidate-form" onSubmit={handleSubmit}>
        <label>Role:</label>
        <select name="role" value={candidate.role} onChange={handleChange}>
          {jobRoles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />

        <label>Contact:</label>
        <input
          type="tel"
          name="contact"
          value={candidate.contact}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={candidate.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />

        <label>Gender:</label>
        <select name="gender" value={candidate.gender} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <label>Experience:</label>
        <select name="experience" value={candidate.experience} onChange={handleChange}>
          {experienceOptions.map((exp) => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>

        <button type="submit" className="submit-btn">Create Candidate</button>
      </form>
    </div>
  );
};

export default CreateCandidate;
