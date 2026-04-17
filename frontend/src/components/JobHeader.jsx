import { Plus } from "lucide-react";

export default function JobHeader() {
  const tabs = ["Candidates", "Job Info", "Calendar", "Notes", "Matches"];

  return (
    <div className="job-header">
      <div className="job-header-top">
        <div className="job-title-wrapper">
          <button className="back-btn">&larr;</button>
          <div className="title-info">
            <h1>Research and Development Officer</h1>
            <span className="status-badge">Active</span>
          </div>
        </div>
        <button className="primary-btn">
          <Plus size={16} />
          Add Candidate
        </button>
      </div>
      
      <div className="job-tabs">
        {tabs.map(tab => (
          <button key={tab} className={`tab-btn ${tab === "Candidates" ? "active" : ""}`}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
