// src/pages/Placement/PlacementList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPlacements = async () => {
    try {
      const response = await axios.get('/placements');
      setPlacements(response.data);
    } catch (err) {
      setError('Failed to fetch placements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  if (loading) return <p>Loading placements...</p>;
  if (error) return <p>{error}</p>;
  if (placements.length === 0) return <p>No placement records found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Placement Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Student Name</th>
            <th className="border border-gray-300 p-2">Company</th>
            <th className="border border-gray-300 p-2">Position</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {placements.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border border-gray-300 p-2">{p.studentName}</td>
              <td className="border border-gray-300 p-2">{p.companyName}</td>
              <td className="border border-gray-300 p-2">{p.position}</td>
              <td className="border border-gray-300 p-2">
                {new Date(p.placementDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementList;
