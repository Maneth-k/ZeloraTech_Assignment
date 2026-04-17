import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { User, Calendar, Award, ExternalLink, X, Plus } from "react-feather";
import "./index.css";

const API_URL = "http://localhost:5000/api/candidates";

const COLUMNS = [
  { id: "Applying Period", title: "Applying Period" },
  { id: "Screening", title: "Screening" },
  { id: "Interview", title: "Interview" },
  { id: "Test", title: "Test" },
];

function App() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(API_URL);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const updateCandidateStage = async (id, stage) => {
    try {
      await axios.put(`${API_URL}/${id}`, { stage });
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newCandidates = Array.from(candidates);
    const candidateIndex = newCandidates.findIndex((c) => c.id === draggableId);

    // Update local state for fast UI response
    newCandidates[candidateIndex].stage = destination.droppableId;
    setCandidates(newCandidates);

    // Update backend
    updateCandidateStage(draggableId, destination.droppableId);
  };

  const getCandidatesByStage = (stage) => {
    return candidates.filter((c) => c.stage === stage);
  };

  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "passed":
        return "badge-passed";
      case "failed":
        return "badge-failed";
      default:
        return "badge-pending";
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Recruitment Pipeline</h1>
        <button
          className="btn-primary"
          onClick={() => alert("Add candidate functionality can go here")}
        >
          <Plus
            size={18}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />
          Add Candidate
        </button>
      </header>

      <div className="board-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            {COLUMNS.map((column) => {
              const columnCandidates = getCandidatesByStage(column.id);

              return (
                <div key={column.id} className="column">
                  <div className="column-header">
                    <span className="column-title">{column.title}</span>
                    <span className="column-count">
                      {columnCandidates.length}
                    </span>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        className="column-content"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "var(--board-bg)"
                            : "transparent",
                        }}
                      >
                        {columnCandidates.map((candidate, index) => (
                          <Draggable
                            key={candidate.id}
                            draggableId={candidate.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.8 : 1,
                                }}
                              >
                                <div className="card-header">
                                  <div className="card-title">
                                    {candidate.name}
                                  </div>
                                  <div className="card-score">
                                    {candidate.overallScore}
                                  </div>
                                </div>

                                <div className="card-body">
                                  <div className="card-row">
                                    <Calendar />{" "}
                                    <span>{candidate.applicationDate}</span>
                                  </div>
                                  <div className="card-row">
                                    <User /> <span>{candidate.referral}</span>
                                  </div>
                                  <div className="card-row">
                                    <Award />
                                    <span
                                      className={`badge ${getBadgeClass(candidate.assessmentStatus)}`}
                                    >
                                      {candidate.assessmentStatus}
                                    </span>
                                  </div>
                                </div>

                                <div className="card-footer">
                                  <button
                                    className="view-details-btn"
                                    onClick={() =>
                                      setSelectedCandidate(candidate)
                                    }
                                  >
                                    View Details <ExternalLink size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      {selectedCandidate && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCandidate(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Candidate Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedCandidate(null)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-detail-row">
                <div className="modal-detail-label">Name</div>
                <div className="modal-detail-value">
                  {selectedCandidate.name}
                </div>
              </div>
              <div className="modal-detail-row">
                <div className="modal-detail-label">Application Stage</div>
                <div className="modal-detail-value">
                  {selectedCandidate.stage}
                </div>
              </div>
              <div className="modal-detail-row">
                <div className="modal-detail-label">Application Date</div>
                <div className="modal-detail-value">
                  {selectedCandidate.applicationDate}
                </div>
              </div>
              <div className="modal-detail-row">
                <div className="modal-detail-label">Overall Score</div>
                <div className="modal-detail-value">
                  {selectedCandidate.overallScore}
                </div>
              </div>
              <div className="modal-detail-row">
                <div className="modal-detail-label">Referral Source</div>
                <div className="modal-detail-value">
                  {selectedCandidate.referral}
                </div>
              </div>
              <div className="modal-detail-row">
                <div className="modal-detail-label">Assessment Status</div>
                <div className="modal-detail-value">
                  <span
                    className={`badge ${getBadgeClass(selectedCandidate.assessmentStatus)}`}
                  >
                    {selectedCandidate.assessmentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
