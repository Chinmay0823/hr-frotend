import React, { useEffect, useState } from "react";
import "./Report.css";

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

    // Normalize candidatesData to a flat array
    const allCandidates = Array.isArray(candidatesData)
      ? candidatesData
      : Object.values(candidatesData || {}).flat();

    const totalCalls = allCandidates.length;

    // Get scheduled interviews and offers from localStorage
    const scheduled = JSON.parse(localStorage.getItem("scheduledInterviews")) || [];
    const offers = JSON.parse(localStorage.getItem("offerRolledOut")) || [];

    // Filter scheduled interviews by date
    const scheduledTodayList = scheduled.filter(
      (item) => item.interviewDate === todayStr
    );
    const scheduledMonthList = scheduled.filter((item) => {
      if (!item.interviewDate) return false;
      const d = new Date(item.interviewDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    // Filter offers by date
    const offersTodayList = offers.filter(
      (item) => item.interviewDate === todayStr
    );
    const offersMonthList = offers.filter((item) => {
      if (!item.interviewDate) return false;
      const d = new Date(item.interviewDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    setTodayStats({
      totalCalls,
      connectedCalls: scheduledTodayList.length, // connected calls TODAY only
      scheduledInterviews: scheduledTodayList.length,
      offers: offersTodayList.length,
    });

    setMonthStats({
      totalCalls,
      connectedCalls: scheduledMonthList.length, // connected calls THIS MONTH only
      scheduledInterviews: scheduledMonthList.length,
      offers: offersMonthList.length,
    });
  }, [candidatesData]);

  const renderGrid = (stats) => {
    const data = {
      "Total Calls (Candidates)": stats.totalCalls,
      "Connected Calls (Scheduled)": stats.connectedCalls,
      "Scheduled Interviews": stats.scheduledInterviews,
      "Offers Rolled Out": stats.offers,
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
