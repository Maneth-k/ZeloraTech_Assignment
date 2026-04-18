import { useState } from "react";
import { X } from "lucide-react";
import "./AddCandidateModal.css";

export default function AddCandidateModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    stage: "Applying Period",
    applicationDate: new Date().toISOString().split("T")[0],
    overallScore: 0,
    referral: "Direct",
    assessmentStatus: "Pending",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/db-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          overallScore: Number(formData.overallScore), // Ensure number
        }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert("Failed to add candidate");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              required 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="form-group">
            <label>Application Stage</label>
            <select name="stage" value={formData.stage} onChange={handleChange}>
              <option value="Applying Period">Applying Period</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Test">Test</option>
            </select>
          </div>

          <div className="form-group">
            <label>Application Date</label>
            <input 
              required 
              type="date" 
              name="applicationDate" 
              value={formData.applicationDate} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Overall Score</label>
            <input 
              required 
              type="number" 
              step="0.1"
              min="0"
              max="10"
              name="overallScore" 
              value={formData.overallScore} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Referral Status</label>
            <input 
              required 
              type="text" 
              name="referral" 
              value={formData.referral} 
              onChange={handleChange} 
              placeholder="e.g. LinkedIn, Internal, Direct"
            />
          </div>

          <div className="form-group">
            <label>Assessment Status</label>
            <select name="assessmentStatus" value={formData.assessmentStatus} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
