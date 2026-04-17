import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import JobHeader from "./components/JobHeader";
import FilterBar from "./components/FilterBar";
import KanbanBoard from "./components/KanbanBoard";

const API_URL = "http://localhost:5000/api/candidates";

const COLUMNS = [
  { id: "Applying Period", title: "Applying Period", color: "#FF7D01" },
  { id: "Screening", title: "Screening", color: "#C474CD" },
  { id: "Interview", title: "Interview", color: "#1D79BC" },
  { id: "Test", title: "Test", color: "#50C7CB" },
];

function App() {
  const [candidates, setCandidates] = useState([]);

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

    newCandidates[candidateIndex].stage = destination.droppableId;
    setCandidates([...newCandidates]);

    updateCandidateStage(draggableId, destination.droppableId);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <div className="content-wrapper">
          <JobHeader />
          <FilterBar />
          <div className="board-scroll-area">
            <KanbanBoard
              columns={COLUMNS}
              candidates={candidates}
              onDragEnd={onDragEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
