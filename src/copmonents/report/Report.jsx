import React, { useEffect, useState } from 'react';
import './Report.css';

const Report = ({ candidatesData }) => {
  const [todayStats, setTodayStats] = useState({
    totalCalls: 0,
    connectedCalls: 0,
    scheduledInterviews: 0,
    offers: 0,
  });

  const [monthStats, setMonthStats] = useState({
    totalCalls: 0,
    connectedCalls: 0,
    scheduledInterviews: 0,
    offers: 0,
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const now = new Date();

    // ✅ Normalize candidatesData: flat array or grouped object
    const allCandidates = Array.isArray(candidatesData)
      ? candidatesData
      : Object.values(candidatesData || {}).flat();

    const totalCalls = allCandidates.length;

    // ✅ Get scheduled interviews and offers from localStorage
    const scheduled = JSON.parse(localStorage.getItem('scheduledInterviews')) || [];
    const offers = JSON.parse(localStorage.getItem('offerRolledOut')) || [];

    const connectedCalls = scheduled.length;

    const scheduledToday = scheduled.filter(item => item.interviewDate === todayStr).length;
    const offersToday = offers.filter(item => item.interviewDate === todayStr).length;

    const scheduledMonth = scheduled.filter(item => {
      if (!item.interviewDate) return false;
      const d = new Date(item.interviewDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    const offersMonth = offers.filter(item => {
      if (!item.interviewDate) return false;
      const d = new Date(item.interviewDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    setTodayStats({
      totalCalls,
      connectedCalls,
      scheduledInterviews: scheduledToday,
      offers: offersToday,
    });

    setMonthStats({
      totalCalls,
      connectedCalls,
      scheduledInterviews: scheduledMonth,
      offers: offersMonth,
    });
  }, [candidatesData]);

  const renderGrid = (stats) => {
    const data = {
      'Total Calls (Candidates)': stats.totalCalls,
      'Connected Calls (Scheduled)': stats.connectedCalls,
      'Scheduled Interviews': stats.scheduledInterviews,
      'Offers Rolled Out': stats.offers,
    };

    return (
      <div className="report-grid">
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="report-item">
            <div className="report-value">{value}</div>
            <div className="report-label">{label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="report-container">
      <h1 className="report-heading">Report</h1>

      <section className="report-section">
        <h2 className="section-title">Today</h2>
        {renderGrid(todayStats)}
      </section>

      <section className="report-section">
        <h2 className="section-title">This Month</h2>
        {renderGrid(monthStats)}
      </section>
    </div>
  );
};

export default Report;
