import { useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import "./AddCandidateModal.css";

export default function AddCandidateModal({ onClose, onSuccess, initialData }) {
  // If initialData exists, use it to pre-fill the form, otherwise use default values
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      stage: "Applying Period",
      applicationDate: new Date().toISOString().split("T")[0],
      overallScore: 0,
      referral: "Direct",
      assessmentStatus: "Pending",
    }
  );

  const mutation = useMutation({
    mutationFn: async (candidateData) => {
      const isEdit = !!initialData;
      const url = isEdit
        ? `http://localhost:5000/api/candidates/${initialData.id}`
        : "http://localhost:5000/api/candidates";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });
      if (!res.ok) throw new Error(isEdit ? "Failed to update candidate" : "Failed to add candidate");
      return res.json();
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
      toast.error(initialData ? "Error updating candidate." : "Error adding candidate.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      overallScore: Number(formData.overallScore),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? "Update Candidate" : "Add New Candidate"}</h2>
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
              value={
                // ensure format is valid for input type="date"
                formData.applicationDate && typeof formData.applicationDate === 'string'
                  ? formData.applicationDate.split("T")[0]
                  : formData.applicationDate
              }
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
            <select
              name="assessmentStatus"
              value={formData.assessmentStatus}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : (initialData ? "Update Candidate" : "Save Candidate")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
