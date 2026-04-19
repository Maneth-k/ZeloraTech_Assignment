import { Plus, UserSearch, MapPin, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AddCandidateModal from "./AddCandidateModal";

export default function JobHeader({ activeTab, setActiveTab }) {
  const tabs = ["Candidates", "Job Info", "Calendar", "Score Card", "Activity", "Application Form", "Automation"];
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const handleModalSuccess = () => {
    setShowModal(false);
    queryClient.invalidateQueries({ queryKey: ["candidates"] });
    alert("Candidate added successfully!");
  };

  return (
    <div className="job-header">
      <div className="job-header-top">
        <div className="job-title-wrapper">
          <button className="back-btn">&larr;</button>
          <div className="title-info">
            <h1>Research and Development Officer</h1>
            <div className="job-meta-row">
              <div className="status-dropdown">
                <select name="status" id="status">
                  <option value="active">Active</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <span className="meta-dot">·</span>
              <div className="meta-item">
                <UserSearch size={14} className="meta-icon" />
                <span>Researcher</span>
              </div>
              <span className="meta-dot">·</span>
              <div className="meta-item">
                <MapPin size={14} className="meta-icon" />
                <span>Onsite</span>
              </div>
              <span className="meta-dot">·</span>
              <div className="meta-item">
                <div className="creator-info">
                  <User size={14} className="meta-icon" />
                  <span>Created by</span>
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                    alt="Creator"
                    className="creator-avatar"
                  />
                  <span className="creator-name">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Candidate
        </button>
      </div>

      <div className="job-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {showModal && (
        <AddCandidateModal 
          onClose={() => setShowModal(false)} 
          onSuccess={handleModalSuccess} 
        />
      )}
    </div>
  );
}
