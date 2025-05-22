// src/pages/Placement/PlacementCreate.jsx
import React, { useState } from 'react';
import axios from '../../utils/axios';

const PlacementCreate = () => {
  const [form, setForm] = useState({
    studentName: '',
    companyName: '',
    position: '',
    placementDate: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/placements', form);
      alert('Placement created successfully');
      setForm({
        studentName: '',
        companyName: '',
        position: '',
        placementDate: '',
      });
    } catch (error) {
      alert('Failed to create placement');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="studentName"
        placeholder="Student Name"
        value={form.studentName}
        onChange={handleChange}
        required
      />
      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        required
      />
      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="placementDate"
        value={form.placementDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Placement</button>
    </form>
  );
};

export default PlacementCreate;
