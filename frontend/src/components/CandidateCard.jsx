import { MoreHorizontal, Star, Edit, Trash2 } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddCandidateModal from "./AddCandidateModal";

export default function CandidateCard({ candidate, index }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef(null);
  const queryClient = useQueryClient();

  const dateObj = new Date(candidate.applicationDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete candidate");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting candidate:", error);
      toast.error("Failed to delete candidate.");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      deleteMutation.mutate(candidate.id || candidate._id);
    }
    setShowMenu(false);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    queryClient.invalidateQueries({ queryKey: ["candidates"] });
    toast.success("Candidate updated successfully!");
  };

  return (
    <>
      <Draggable draggableId={candidate.id || candidate._id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`candidate-card ${snapshot.isDragging ? "dragging" : ""}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-header-top">
              <div className="candidate-info">
                <img
                  src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`}
                  alt={candidate.name}
                  className="candidate-avatar"
                />
                <div className="candidate-details">
                  <h3 className="candidate-name">{candidate.name}</h3>
                  <p className="candidate-date">Applied at {formattedDate}</p>
                </div>
              </div>
              <div className="menu-wrapper" ref={menuRef}>
                <button
                  className="menu-btn"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <MoreHorizontal size={18} />
                </button>
                {showMenu && (
                  <div className="card-dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowEditModal(true);
                        setShowMenu(false);
                      }}
                    >
                      <Edit size={14} /> Update Details
                    </button>
                    <button
                      className="dropdown-item delete-item"
                      onClick={handleDelete}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 size={14} /> {deleteMutation.isPending ? "Deleting..." : "Delete Candidate"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-metrics">
              <div className="score-pill">
                <Star size={14} className="star-icon" fill="#FBBF24" color="#FBBF24" />
                <span className="score-value">{candidate.overallScore} Overall</span>
              </div>
            </div>

            <div className="card-footer" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="referral-tag">{candidate.referral}</span>
              {candidate.assessmentStatus && (
                <span 
                  className="assessment-tag" 
                  style={{ 
                    fontSize: '11px', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    backgroundColor: candidate.assessmentStatus === 'Passed' ? '#dcfce7' : candidate.assessmentStatus === 'Failed' ? '#fee2e2' : '#f3f4f6', 
                    color: candidate.assessmentStatus === 'Passed' ? '#166534' : candidate.assessmentStatus === 'Failed' ? '#991b1b' : '#374151',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  {candidate.assessmentStatus}
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {showEditModal && (
        <AddCandidateModal
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
          initialData={candidate}
        />
      )}
    </>
  );
}
