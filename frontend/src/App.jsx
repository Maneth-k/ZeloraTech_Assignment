import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import JobHeader from "./components/JobHeader";
import FilterBar from "./components/FilterBar";
import KanbanBoard from "./components/KanbanBoard";
import TabPlaceholder from "./components/TabPlaceholder";

const API_URL = import.meta.env.VITE_API_URL;

const COLUMNS = [
  { id: "Applying Period", title: "Applying Period", color: "#FF7D01" },
  { id: "Screening", title: "Screening", color: "#C474CD" },
  { id: "Interview", title: "Interview", color: "#1D79BC" },
  { id: "Test", title: "Test", color: "#50C7CB" },
];

function App() {
  const [activeTab, setActiveTab] = useState("Candidates");
  const queryClient = useQueryClient();

  // Fetch candidates using React Query
  const {
    data: rawCandidates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const json = await response.json();
      return json.data || json;
    },
  });

  const candidates = Array.isArray(rawCandidates)
    ? rawCandidates
    : rawCandidates?.data || [];

  // Mutation for updating candidate stage
  const updateMutation = useMutation({
    mutationFn: async ({ id, stage }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      if (!response.ok) throw new Error("Failed to update candidate");
      return response.json();
    },
    // Optimistic Update
    onMutate: async ({ id, stage }) => {
      await queryClient.cancelQueries({ queryKey: ["candidates"] });
      const previousCandidates = queryClient.getQueryData(["candidates"]);

      queryClient.setQueryData(["candidates"], (old) => {
        const currentData = Array.isArray(old) ? old : old?.data || [];
        return currentData.map((c) => (c.id === id ? { ...c, stage } : c));
      });

      return { previousCandidates };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["candidates"], context.previousCandidates);
      console.error("Error updating candidate:", err);
      toast.error("Failed to update candidate stage.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    updateMutation.mutate({ id: draggableId, stage: destination.droppableId });
  };

  if (isLoading)
    return <div className="loading-state">Loading Candidates...</div>;
  if (isError)
    return (
      <div className="error-state">Error fetching data. Please try again.</div>
    );

  return (
    <div className="layout">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <div className="content-wrapper">
          <JobHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "Candidates" ? (
            <>
              <FilterBar />
              <div className="board-scroll-area">
                <KanbanBoard
                  columns={COLUMNS}
                  candidates={candidates}
                  onDragEnd={onDragEnd}
                />
              </div>
            </>
          ) : (
            <TabPlaceholder name={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
