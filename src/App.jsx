import React, { useState, useEffect } from "react";
import axios from "axios";
import badgeImage from "./images/image.png"; // MoraSpirit badge
import "./index.css";

export default function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://task.moraspirit.com/api/members")
      .then((res) => setMembers(res.data.members))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCheck = async () => {
    if (!selectedMember || !selectedDate) return;
    setChecking(true);
    try {
      const res = await axios.post(
        "https://task.moraspirit.com/api/availability/check",
        { msp_id: selectedMember.id, date: selectedDate },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus(res.data);
    } catch (err) {
      console.error(err);
      setStatus(null);
    } finally {
      setChecking(false);
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* MoraSpirit Badge */}
      <img
        src={badgeImage}
        alt="MoraSpirit Badge"
        className="moraspirit-badge"
      />

      {/* Hero */}
      <div className="hero">
        <div className="hero-content fade-in">
          <h1>Welcome to MoraSpirit</h1>
          <p className="subtitle">Check member availability in real-time</p>
        </div>
      </div>

      <div className="app">
        {/* Search */}
        <input
          className="search fade-in"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Controls */}
        <div className="controls fade-in">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className="hero-btn"
            onClick={handleCheck}
            disabled={!selectedMember || checking}
          >
            {checking ? "Checking..." : "Check Availability"}
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="loader fade-in"></div>
        ) : (
          <>
            {/* Member Grid */}
            <div className="member-grid">
              {filteredMembers.map((m, index) => (
                <div
                  key={m.id}
                  className={`card ${
                    selectedMember?.id === m.id ? "selected" : ""
                  } fade-in-delay`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setSelectedMember(m);
                    setStatus(null);
                  }}
                >
                  <div
                    className={`dot ${
                      status?.id === m.id
                        ? status.status
                        : "inactive"
                    }`}
                  ></div>
                  <h3 className="member-name">{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                </div>
              ))}
            </div>

            {/* Status */}
            {status && (
              <div className={`status ${status.status} fade-in`}>
                {status.status === "available"
                  ? "Available"
                  : `Busy: ${status.reason}`}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}