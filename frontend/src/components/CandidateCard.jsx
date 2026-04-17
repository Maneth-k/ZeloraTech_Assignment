import { MoreHorizontal, Star } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

export default function CandidateCard({ candidate, index }) {
  // Format the application date (assuming "2026-04-01")
  const dateObj = new Date(candidate.applicationDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`candidate-card ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-header-top">
            <div className="candidate-info">
              <img src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`} alt={candidate.name} className="candidate-avatar" />
              <div className="candidate-details">
                <h3 className="candidate-name">{candidate.name}</h3>
                <p className="candidate-date">Applied at {formattedDate}</p>
              </div>
            </div>
            <button className="menu-btn"><MoreHorizontal size={18} /></button>
          </div>
          
          <div className="card-metrics">
            <div className="score-pill">
              <Star size={14} className="star-icon" fill="#FBBF24" color="#FBBF24" />
              <span className="score-value">{candidate.overallScore} Overall</span>
            </div>
          </div>
          
          <div className="card-footer">
            <span className="referral-tag">{candidate.referral}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
